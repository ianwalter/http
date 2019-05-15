const createTestServer = require('@ianwalter/test-server')

let testServer

module.exports = {
  async before (context) {
    testServer = await createTestServer()
    testServer.use(ctx => {
      if (ctx.request.path.includes('/hello-world')) {
        if (ctx.request.method === 'POST') {
          ctx.body = ctx.request.body
        } else {
          ctx.body = { msg: 'Hello World!' }
        }
      } else if (ctx.request.path.includes('/request-header')) {
        ctx.body = ctx.request.header.authorization
      } else if (ctx.request.path.includes('/error')) {
        ctx.status = 500
      } else if (ctx.request.path.includes('/i-am-a-path')) {
        ctx.body = ctx.request.path
      }
    })
    context.testServerUrl = testServer.url
  },
  beforeEach (context) {
    context.testContext.testServerUrl = context.testServerUrl
  },
  async after () {
    await testServer.close()
  }
}
