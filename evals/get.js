import { http } from '..'

http.options.mode = 'cors'

window.run(
  (resolve, reject, url) => http.get(url).then(res => resolve(res.body), reject)
)
