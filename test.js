import test from 'ava'
import puppeteerHelper from '@ianwalter/puppeteer-helper'
import createTestServer from '@ianwalter/test-server'

const withPage = puppeteerHelper()

test('GET json', withPage, async t => {
  const msg = { msg: 'Hello World!' }

  // Set up the mock server.
  const server = await createTestServer()
  server.use(ctx => (ctx.body = msg))

  // Run the evaluation script in the browser.
  t.deepEqual(await t.evaluate('./evals/get.js', server.url), msg)

  // Close the mock server.
  await server.close()
})

test('POST text', withPage, async t => {
  const msg = { msg: 'Hello World!' }

  // Set up the mock server.
  const server = await createTestServer()
  server.use(ctx => (ctx.body = ctx.request.body))

  // Run the evaluation script in the browser.
  const options = { url: server.url, body: msg.msg }
  t.deepEqual(await t.evaluate('./evals/post.js', options), msg.msg)

  // Close the mock server.
  await server.close()
})

test('POST json', withPage, async t => {
  const msg = { msg: 'Hello World!' }

  // Set up the mock server.
  const server = await createTestServer()
  server.use(ctx => (ctx.body = ctx.request.body))

  // Run the evaluation script in the browser.
  const options = { url: server.url, body: msg }
  t.deepEqual(await t.evaluate('./evals/post.js', options), msg)

  // Close the mock server.
  await server.close()
})

test('GET with header', withPage, async t => {
  // Set up the mock server.
  const server = await createTestServer()
  server.use(ctx => (ctx.body = ctx.request.header.authorization))

  // Run the evaluation script in the browser.
  const token = 'Bearer 123'
  const options = { url: server.url, header: { 'Authorization': token } }
  t.is(await t.evaluate('./evals/header.js', options), token)

  // Close the mock server.
  await server.close()
})

test('500 response throws HttpError', withPage, async t => {
  // Set up the mock server.
  const server = await createTestServer()
  server.use(ctx => (ctx.status = 500))

  // Run the evaluation script in the browser.
  t.is(await t.evaluate('./evals/error.js', server.url), 'HttpError')

  // Close the mock server.
  await server.close()
})

test('baseUrl', withPage, async t => {
  // Set up the mock server.
  const server = await createTestServer()
  server.use(ctx => (ctx.body = ctx.request.path))

  // Run the evaluation script in the browser.
  const path = '/i-am-a-path'
  t.is(await t.evaluate('./evals/baseUrl.js', { url: server.url, path }), path)

  // Close the mock server.
  await server.close()
})
