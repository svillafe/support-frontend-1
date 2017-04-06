package controllers

import play.api.mvc.{Action, AnyContent, Controller}

class Application extends Controller {

  def helloWorld: Action[AnyContent] = Action {
    Ok(views.html.index())
  }

  def healthcheck: Action[AnyContent] = Action {
    Ok("healthy")
  }
}
