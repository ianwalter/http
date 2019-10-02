const { promises: fs } = require('fs')
const path = require('path')
const { createKoaServer } = require('@ianwalter/test-server')

let testServer

module.exports = {
  async before (context) {
    testServer = await createKoaServer()
    testServer.use(async ctx => {
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
      } else if (ctx.request.path.includes('/manual-json')) {
        ctx.set('content-type', 'application/json; charset=utf-8')
        ctx.body = '{ "song": "Gulf Shores" }'
      } else if (ctx.request.path.includes('/cat.gif')) {
        ctx.body = await fs.readFile(path.join(__dirname, 'fixtures/cat.gif'))
      }
    })
    context.testContext.testServerUrl = testServer.url
  },
  async after () {
    await testServer.close()
  }
}
