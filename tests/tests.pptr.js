import { test } from '@ianwalter/bff-puppeteer'
import { http, HttpError } from '..'

test('GET json', async ({ expect, testServerUrl }) => {
  const { body } = await http.get(`${testServerUrl}/hello-world`)
  expect(body).toEqual({ msg: 'Hello World!' })
})

test('POST text', async ({ expect, testServerUrl }) => {
  const url = `${testServerUrl}/hello-world`
  const msg = 'Hello World!'
  const { body } = await http.post(url, { body: msg })
  expect(body).toBe(msg)
})

test('POST json', async ({ expect, testServerUrl }) => {
  const url = `${testServerUrl}/hello-world`
  const msg = 'Hello World!'
  const { body } = await http.post(url, { body: { msg } })
  expect(body.msg).toBe(msg)
})

test('GET with request header', async ({ expect, testServerUrl }) => {
  const token = 'Bearer 123'
  http.options.headers = { Authorization: token }
  const { body } = await http.get(`${testServerUrl}/request-header`)
  expect(body).toBe(token)
})

test('500 response throws HttpError', async ({ expect, testServerUrl }) => {
  try {
    await http.get(`${testServerUrl}/error`)
  } catch (err) {
    console.log(err)
    expect(err instanceof HttpError).toBe(true)
    expect(err.response.status).toBe(500)
    expect(err.message).toBe('Internal Server Error')
    expect(err.response.statusText).toBe('Internal Server Error')
  }
})

test('baseUrl', async ({ expect, testServerUrl }) => {
  http.options.baseUrl = testServerUrl
  const path = '/i-am-a-path'
  const { body } = await http.get(path)
  expect(body).toBe(path)
})

test('manual JSON', async ({ expect, testServerUrl }) => {
  const { body } = await http.get(`${testServerUrl}/manual-json`)
  expect(body.song).toBe('Gulf Shores')
})

test('intercepting response', async ({ expect, testServerUrl }) => {
  http.after = (url, init, response) => ({
    ...response,
    ok: false,
    status: 401,
    statusText: 'Unauthorized'
  })
  try {
    await http.get(`${testServerUrl}/hello-world`)
  } catch (err) {
    expect(err instanceof HttpError).toBe(true)
    expect(err.response.status).toBe(401)
    expect(err.message).toBe('Unauthorized')
    expect(err.response.statusText).toBe('Unauthorized')
  }
})

test('blob', async ({ expect, testServerUrl }) => {
  const response = await http.get(`${testServerUrl}/cat.gif`)
  const body = await response.blob()
  expect(await body.text()).toMatchSnapshot()
})
