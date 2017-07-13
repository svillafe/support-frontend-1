package wiring

import controllers.{Application, AssetsComponents, MonthlyContributions, TestUsersManagement}
import play.api.BuiltInComponentsFromContext

trait Controllers {
  self: AssetsComponents with Services with BuiltInComponentsFromContext with ApplicationConfiguration with ActionBuilders with Assets with GoogleAuth =>

  lazy val assetController = new controllers.Assets(httpErrorHandler, assetsMetadata)

  lazy val applicationController = new Application(
    actionRefiners,
    assetsResolver,
    identityService,
    controllerComponents
  )

  lazy val monthlyContributionsController = new MonthlyContributions(
    monthlyContributionsClient,
    assetsResolver,
    actionRefiners,
    membersDataService,
    identityService,
    testUsers,
    appConfig.touchpointConfigProvider,
    controllerComponents
  )

  lazy val testUsersContoller = new TestUsersManagement(
    authAction,
    controllerComponents,
    testUsers
  )
}