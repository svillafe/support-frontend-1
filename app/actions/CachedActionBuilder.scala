package actions

import org.joda.time.DateTime
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}
import scala.concurrent.duration._

class CachedActionBuilder(
    val parser: BodyParser[AnyContent],
    val executionContext: ExecutionContext,
    val maxAge: FiniteDuration,
    val headers: List[(String, String)]
) extends ActionBuilder[Request, AnyContent] {

  implicit private val ec = executionContext
  private val maximumBrowserAge = 1.minute

  override def invokeBlock[A](request: Request[A], block: (Request[A]) => Future[Result]): Future[Result] =
    block(request).map(_.withHeaders(mergeHeader("Vary", cacheHeaders() ++ headers): _*))

  private def cacheHeaders(now: DateTime = DateTime.now): List[(String, String)] = {
    val browserAge = maximumBrowserAge min maxAge
    CacheControl.defaultCacheHeaders(maxAge, browserAge, now)
  }

  private def mergeHeader(header: String, headers: List[(String, String)]): List[(String, String)] = {
    val (vary, others) = headers.partition(_._1.toLowerCase == header.toLowerCase)
    (header -> vary.map(_._2).mkString(", ")) :: others
  }
}