import { http } from '..'

window.run(
  (resolve, reject, url) => http.get(url).catch(e => resolve(e.name))
)
