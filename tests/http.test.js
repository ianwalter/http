beforeAll(async () => {
  const path = './node_modules/fetch-mock/dist/es5/client-bundle.js'
  await page.addScriptTag({ path })
  await page.addScriptTag({ path: './dist/http.iife.js' })
})

test(`http can replace it's ky instance`, async () => {
  const result = await page.evaluate(() => {
    const headers = { 'content-type': 'application/json' }
    const newKy = http.ky.extend({ headers })
    http.replace(newKy)
    return http.ky === newKy
  })
  expect(result).toBe(true)
})

test('http can make a GET request', async () => {
  const msg = { msg: 'Hello World!' }
  const pageFn = msg => {
    fetchMock.mock('http://myapi.com/msg', msg)
    return http.ky.get('http://myapi.com/msg').json()
  }
  const result = await page.evaluate(pageFn, msg)
  expect(result).toEqual(msg)
})

test('http throws an HTTPError on a 400 Bad Request response', async () => {
  const err = await page.evaluate(() => {
    return new Promise(resolve => {
      fetchMock.mock('http://myapi.com/bad', 400)
      http.ky.post('http://myapi.com/bad').json().catch(resolve)
    })
  })
  expect(err.name).toBe('HTTPError')
  // expect(err.message).toBe('Bad Request')
})
