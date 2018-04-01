
package EntryPoint

import io.javalin.Javalin
import Test.TestRoute

fun main(args: Array<String>) {

  val test = TestRoute()


  val app = Javalin.create().port(4000).start()
  app.get("/") { ctx -> ctx.result("Hello World") }
  app.get("/test1") {ctx -> ctx.json(test.test1())}
  app.get("/test2") {ctx -> ctx.json(test.test2("pants"))}
}
