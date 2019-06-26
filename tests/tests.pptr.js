import { test } from '@ianwalter/bff-puppeteer'
import { http, HttpError } from '..'

test('GET json', async ({ expect, testServerUrl }) => {
  const url = `${testServerUrl}/hello-world`
  const { body } = await http.get(url)
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
  const url = `${testServerUrl}/request-header`
  const token = 'Bearer 123'
  http.options.headers = { 'Authorization': token }
  const { body } = await http.get(url)
  expect(body).toBe(token)
})

test('500 response throws HttpError', async ({ expect, testServerUrl }) => {
  const url = `${testServerUrl}/error`
  try {
    await http.get(url)
  } catch (err) {
    console.log(err)
    expect(err instanceof HttpError).toBe(true)
    expect(err.response.status).toBe(500)
    expect(err.response.statusText).toBe('Internal Server Error')
  }
})

test('baseUrl', async ({ expect, testServerUrl }) => {
  http.options.baseUrl = testServerUrl
  const path = '/i-am-a-path'
  const { body } = await http.get(path)
  expect(body).toBe(path)
})
