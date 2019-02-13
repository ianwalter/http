import test from 'ava'
import puppeteerHelper from '@ianwalter/puppeteer-helper'
import createTestServer from '@ianwalter/test-server'

const withPage = puppeteerHelper()

test('replace', withPage, async t => {
  t.true(await t.evaluate('./evals/replace.js'))
})

test('GET request', withPage, async t => {
  const msg = { msg: 'Hello World!' }

  // Set up the mock server.
  const server = await createTestServer()
  server.use(ctx => (ctx.body = msg))

  // Run the evaluation script in the browser.
  t.deepEqual(await t.evaluate('./evals/get.js', server.url), msg)

  // Close the mock server.
  await server.close()
})

test('400 response throws HTTPError', withPage, async t => {
  // Set up the mock server.
  const server = await createTestServer()
  server.use(ctx => (ctx.status = 400))

  // Run the evaluation script in the browser.
  t.is(await t.evaluate('./evals/error.js', server.url), 'HTTPError')

  // Close the mock server.
  await server.close()
})
