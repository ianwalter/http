import { http } from '..'

window.run(
  (resolve, reject, { url, body }) => http
    .post(url, { body })
    .then(res => resolve(res.body), reject)
)
