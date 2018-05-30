package controllers

import actions.CustomActionBuilders
import akka.http.scaladsl.model.HttpRequest
import assets.AssetsResolver
import cats.implicits._
import com.gu.identity.play.{AccessCredentials, AuthenticatedIdUser, IdMinimalUser, IdUser}
import com.gu.support.config.{PayPalConfigProvider, StripeConfigProvider}
import com.gu.support.workers.model.User
import io.circe.syntax._
import lib.PlayImplicits._
import monitoring.SafeLogger
import monitoring.SafeLogger._
import play.api.libs.circe.Circe
import play.api.mvc._
import services.MembersDataService.UserNotFound
import services.stepfunctions.{CreateRegularContributorRequest, RegularContributionsClient}
import services.{IdentityService, MembersDataService, TestUserService}
import views.html.monthlyContributions

import scala.concurrent.{ExecutionContext, Future}

class RegularContributions(
    client: RegularContributionsClient,
    val assets: AssetsResolver,
    actionRefiners: CustomActionBuilders,
    membersDataService: MembersDataService,
    identityService: IdentityService,
    testUsers: TestUserService,
    stripeConfigProvider: StripeConfigProvider,
    payPalConfigProvider: PayPalConfigProvider,
    components: ControllerComponents
)(implicit val exec: ExecutionContext) extends AbstractController(components) with Circe {

  import actionRefiners._

  implicit val ar = assets

  def displayFormSignedIn(user: AuthenticatedIdUser)(implicit request: RequestHeader): Future[Result] = {
    identityService.getUser(user).semiflatMap { fullUser =>
      isMonthlyContributor(user.credentials) map {
        case Some(true) =>
          SafeLogger.info(s"Determined that ${user.id} is already a monthly contributor; re-directing to /contribute/recurring/existing")
          Redirect("/contribute/recurring/existing")
        case Some(false) | None =>
          val uatMode = testUsers.isTestUser(fullUser.publicFields.displayName)
          Ok(
            monthlyContributions(
              title = "Support the Guardian | Monthly Contributions",
              id = "regular-contributions-page",
              js = "regularContributionsPage.js",
              css = "regularContributionsPageStyles.css",
              idUser = Some(fullUser),
              uatMode = uatMode,
              defaultStripeConfig = stripeConfigProvider.get(false),
              uatStripeConfig = stripeConfigProvider.get(true),
              payPalConfig = payPalConfigProvider.get(uatMode)
            )
          )
      }
    } fold ({ error =>
      SafeLogger.error(scrub"Failed to display recurring contributions form for ${user.id} due to error from identityService: $error")
      InternalServerError
    },
      identity
    )
  }

  def displayForm(): Action[AnyContent] = MaybeAuthenticatedAction.async { implicit request =>
    request.user.fold {
      Future(Ok(
        monthlyContributions(
          title = "Support the Guardian | Monthly Contributions",
          id = "regular-contributions-page",
          js = "regularContributionsPage.js",
          css = "regularContributionsPageStyles.css",
          idUser = None,
          uatMode = false,
          defaultStripeConfig = stripeConfigProvider.get(false),
          uatStripeConfig = stripeConfigProvider.get(true),
          payPalConfig = payPalConfigProvider.get(false)
        )
      ))
    } {
      idUser => displayFormSignedIn(idUser)
    }
  }

  def status(jobId: String): Action[AnyContent] = AuthenticatedAction.async { implicit request =>
    client.status(jobId, request.uuid).fold(
      { error =>
        SafeLogger.error(scrub"Failed to get status of step function execution for user ${request.user.id} due to $error")
        InternalServerError
      },
      response => Ok(response.asJson)
    )
  }

  def create: Action[CreateRegularContributorRequest] = AuthenticatedAction.async(circe.json[CreateRegularContributorRequest]) { implicit request =>
    SafeLogger.info(s"[${request.uuid}] User ${request.user.id} is attempting to create a new ${request.body.contribution.billingPeriod} contribution")

    val result = for {
      user <- identityService.getUser(request.user)
      response <- client.createContributor(request.body, contributor(user, request.body), request.uuid).leftMap(_.toString)
    } yield response

    result.fold(
      { error =>
        SafeLogger.error(scrub"Failed to create new ${request.body.contribution.billingPeriod} contribution for ${request.user.id}, due to $error")
        InternalServerError
      },
      response => Accepted(response.asJson)
    )
  }

  private def contributor(user: IdUser, request: CreateRegularContributorRequest) = {
    User(
      id = user.id,
      primaryEmailAddress = user.primaryEmailAddress,
      firstName = request.firstName,
      lastName = request.lastName,
      country = request.country,
      state = request.state,
      allowMembershipMail = false,
      allowThirdPartyMail = user.statusFields.flatMap(_.receive3rdPartyMarketing).getOrElse(false),
      allowGURelatedMail = user.statusFields.flatMap(_.receiveGnmMarketing).getOrElse(false),
      isTestUser = testUsers.isTestUser(user.publicFields.displayName)
    )
  }

  private def isMonthlyContributor(credentials: AccessCredentials) = credentials match {
    case cookies: AccessCredentials.Cookies =>
      membersDataService.userAttributes(cookies).fold(
        {
          case UserNotFound => Some(false)
          case error =>
            SafeLogger.warn(s"Failed to fetch user attributes due to an error from members-data-api: $error")
            None
        },
        { response => Some(response.contentAccess.recurringContributor) }
      ).recover {
          case throwable @ _ =>
            SafeLogger.warn(s"Failed to fetch user attributes from members-data-api due to a failed Future: ${throwable.getCause}")
            None
        }
    case _ => Future.successful(None)
  }

}
