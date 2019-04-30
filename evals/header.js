import { http } from '..'

window.run(
  (resolve, reject, { url, header }) => {
    http.options.headers = header
    http.get(url).then(res => resolve(res.body), reject)
  }
)
