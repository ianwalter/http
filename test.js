import test from 'ava'
import puppeteerHelper from '@ianwalter/puppeteer-helper'
import createTestServer from '@ianwalter/test-server'

const withPage = puppeteerHelper(['./dist/http.iife.js'])

test('replace', withPage, async (t, page) => {
  t.true(await page.evaluate(() => {
    const headers = { 'content-type': 'application/json' }
    const newKy = http.ky.extend({ headers })
    http.replace(newKy)
    return http.ky === newKy
  }))
})

test('GET request', withPage, async (t, page) => {
  const msg = { msg: 'Hello World!' }
  const server = await createTestServer()
  server.use(ctx => (ctx.body = msg))
  const result = await page.evaluate(url => http.ky.get(url).json(), server.url)
  t.deepEqual(result, msg)
  await server.close()
})

test('throws HTTPError', withPage, async (t, page) => {
  const server = await createTestServer()
  server.use(ctx => (ctx.status = 400))
  const err = await page.evaluate(
    url => new Promise(resolve => http.ky.post(url).json().catch(resolve)),
    server.url
  )
  t.is(err.name, 'HTTPError')
  await server.close()
})
