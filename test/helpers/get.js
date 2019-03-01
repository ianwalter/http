import http from '../..'

window.run(
  (resolve, reject, url) => http.ky.get(url).json().then(resolve, reject)
)
