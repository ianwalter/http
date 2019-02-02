import test from 'ava'
import puppeteerHelper from '@ianwalter/puppeteer-helper'

const withPage = puppeteerHelper(
  [
    './node_modules/fetch-mock/dist/es5/client-bundle.js',
    './dist/http.iife.js'
  ],
  { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
)

test(`ky instance can be replaced`, withPage, async (t, page) => {
  t.true(await page.evaluate(() => {
    const headers = { 'content-type': 'application/json' }
    const newKy = http.ky.extend({ headers })
    http.replace(newKy)
    return http.ky === newKy
  }))
})

test('http can make a GET request', withPage, async (t, page) => {
  const msg = { msg: 'Hello World!' }
  const result = await page.evaluate(
    msg => {
      fetchMock.mock('http://myapi.com/msg', msg)
      return http.ky.get('http://myapi.com/msg').json()
    },
    msg
  )
  t.deepEqual(result, msg)
})

test('http throws an HTTPError on a 400 Bad Request response', withPage, async (t, page) => {
  const err = await page.evaluate(() => {
    return new Promise(resolve => {
      fetchMock.mock('http://myapi.com/bad', 400)
      http.ky.post('http://myapi.com/bad').json().catch(resolve)
    })
  })
  t.is(err.name, 'HTTPError')
  // expect(err.message).toBe('Bad Request')
})
