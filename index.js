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

    // TODO:
    methods.forEach(method => {
      this[method] = async (url, options) => this.fetch(method, url, options)
    })
  }

  async fetch (method, url, options = {}) {
    // TODO:
    const init = { method, headers: {}, ...this.options, ...options }
    init.headers = new window.Headers(init.headers)

    // TODO:
    if (typeof init.body === 'object') {
      init.headers.append('Content-Type', 'application/json')
      init.body = JSON.stringify(init.body)
    }

    // TODO:
    if (init.baseUrl) {
      url = init.baseUrl + url
      delete init.baseUrl
    }

    // TODO:
    const fetchResponse = await window.fetch(url, init)
    const response = {
      ...fetchResponse,
      headers: fetchResponse.headers,
      ok: fetchResponse.ok,
      status: fetchResponse.status,
      statusText: fetchResponse.statusText
    }

    // TODO:
    const contentType = response.headers.get('Content-Type')
    const isJson = contentType && contentType.indexOf('application/json') > -1
    if (fetchResponse.body && isJson) {
      response.body = await fetchResponse.json()
    } else if (fetchResponse.body) {
      response.body = await fetchResponse.text()
    }

    // TODO:
    if (response.ok) {
      return response
    } else {
      throw new HttpError(response)
    }
  }
}

export const http = new Http()
