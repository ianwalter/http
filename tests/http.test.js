import ky from 'ky'
import http from '../'

test('http has a ky instance', () => {
  expect(http.ky).toBe(ky)
})

test('http.ky instance can be updated', () => {
  const newKy = ky.extend({ headers: { 'csrf-token': 'abc123' } })
  http.replace(newKy)
  expect(http.ky).not.toBe(ky)
  expect(http.ky).toBe(newKy)
})
