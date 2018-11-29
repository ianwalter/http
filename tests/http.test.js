import 'whatwg-fetch'
import http from '../'
import fetchMock from 'fetch-mock'

describe('Http', () => {
  it(`can replace it's ky instance`, () => {
    const headers = { 'content-type': 'application/json' }
    const newKy = http.ky.extend({ headers })
    http.replace(newKy)
    expect(http.ky).toBe(newKy)
  })

  it('can make a GET request', async () => {
    try {
      const msg = { msg: 'Hello World!' }
      fetchMock.mock('http://myapi.com/msg', msg)
      expect(await http.ky.get('http://myapi.com/msg').json()).toEqual(msg)
    } catch (err) {
      fail(err)
    }
  })

  it('throws an HTTPError on a 400 Bad Request response', async () => {
    try {
      fetchMock.mock('http://myapi.com/bad', 400)
      await http.ky.post('http://myapi.com/bad').json()
      fail('HTTPError was not thrown!')
    } catch (err) {
      expect(err.name).toBe('HTTPError')
      expect(err.message).toBe('Bad Request')
    }
  })
})
