const http = require('../')

test('http has a ky instance', () => {
  expect(http.ky).toHaveProperty('post')
})

test('http.ky instance can be replaced', () => {
  const newKy = http.ky.extend({ headers: { 'csrf-token': 'abc123' } })
  http.replace(newKy)
  expect(http.ky).toBe(newKy)
})
