import http from '..'

const headers = { 'content-type': 'application/json' }
const newKy = http.ky.extend({ headers })
http.replace(newKy)
window.run(resolve => resolve(http.ky === newKy))
