const methods = [
  'get',
  'post',
  'put',
  'delete'
]

export class HttpError extends Error {
  constructor (response) {
    super(response.statusText)
    this.name = this.constructor.name
    this.response = response
  }
}

export class Http {
  constructor (options = {}) {
    this.options = options

    methods.forEach(method => {
      this[method] = async (url, options) => this.fetch(method, url, options)
    })
  }

  async fetch (method, url, options = {}) {
    const init = { method, headers: {}, ...this.options, ...options }
    init.headers = new window.Headers(init.headers)

    if (typeof init.body === 'object') {
      init.headers.append('Content-Type', 'application/json')
      init.body = JSON.stringify(init.body)
    }

    if (init.baseUrl) {
      url = init.baseUrl + url
      delete init.baseUrl
    }

    const response = await window.fetch(url, init)
    const packagedResponse = { ...response }

    //
    const contentType = response.headers.get('Content-Type')
    const isJson = contentType && contentType.indexOf('application/json') > -1
    if (response.body && isJson) {
      packagedResponse.body = await response.json()
    } else if (response.body) {
      packagedResponse.body = await response.text()
    }

    if (response.ok) {
      return packagedResponse
    } else {
      throw new HttpError(packagedResponse)
    }
  }
}

export const http = new Http()
