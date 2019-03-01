import http from '../..'

window.run(
  (resolve, reject, url) => http.ky.post(url).json().catch(e => resolve(e.name))
)
