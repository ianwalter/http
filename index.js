const defaults = { mode: 'same-origin' }
const methods = [
  'get',
  'post',
  'put',
  'delete'
]

export class Http {
  constructor (options = {}) {
    this.options = Object.assign(defaults, options)

    methods.forEach(method => {
      this[method] = async (url, options) => this.fetch(method, url, options)
    })
  }

  async fetch (method, url, options = {}) {
    const init = { method, ...this.options, ...options }

    if (typeof init.body === 'object') {
      init.headers = init.headers || new window.Headers()
      init.headers.append('Content-Type', 'application/json')
      init.body = JSON.stringify(init.body)
    }

    const response = await window.fetch(url, init)
    if (response.ok) {
      const contentType = response.headers.get('Content-Type')
      const isJson = contentType && contentType.indexOf('application/json') > -1
      if (response.body && isJson) {
        return { ...response, body: await response.json() }
      } else if (response.body) {
        return { ...response, body: await response.text() }
      }
      return response
    } else {
      // TODO: throw error
    }
  }
}

export const http = new Http()
