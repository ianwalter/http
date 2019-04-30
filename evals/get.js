import { http } from '..'

window.run(
  (resolve, reject, url) => http.get(url).then(res => resolve(res.body), reject)
)
