package wiring

import play.api.routing.Router
import filters.{CacheHeadersCheck, SetCookiesCheck}
import lib.CustomHttpErrorHandler
import play.api.libs.ws.ahc.AhcWSComponents
import play.api.mvc.EssentialFilter
import play.filters.gzip.GzipFilter
import play.api.BuiltInComponentsFromContext
import controllers.AssetsComponents
import monitoring.{SentryLogging, StateMachineMonitor}
import play.filters.HttpFiltersComponents

trait AppComponents extends PlayComponents
  with AhcWSComponents
  with AssetsComponents
  with Controllers
  with Services
  with ApplicationConfiguration
  with ActionBuilders
  with Assets
  with GoogleAuth
  with HttpFiltersComponents {
  self: BuiltInComponentsFromContext =>

  override lazy val httpErrorHandler = new CustomHttpErrorHandler(
    environment,
    configuration,
    sourceMapper,
    Some(router),
    assetsResolver,
    appConfig.settings
  )

  override lazy val httpFilters: Seq[EssentialFilter] = Seq(
    new SetCookiesCheck(),
    securityHeadersFilter,
    new CacheHeadersCheck(),
    new GzipFilter(shouldGzip = (req, _) => !req.path.startsWith("/assets/images"))
  )

  override lazy val router: Router = new _root_.router.Routes(
    httpErrorHandler,
    applicationController,
    siteMapController,
    regularContributionsController,
    identityController,
    oneOffContributions,
    subscriptionsController,
    loginController,
    testUsersController,
    payPalRegularController,
    payPalOneOffController,
    directDebitController,
    assetController
  )

  SentryLogging.init(appConfig)
  new StateMachineMonitor(regularContributionsClient, actorSystem).start()
}
