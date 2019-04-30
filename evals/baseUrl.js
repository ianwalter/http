import { http } from '..'

window.run(
  (resolve, reject, { url, path }) => {
    http.options.baseUrl = url
    http.get(path).then(res => resolve(res.body), reject)
  }
)
