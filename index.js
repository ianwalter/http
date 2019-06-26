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

    // Create an insutance method for each HTTP method and just calls the
    // general fetch method with the HTTP method as the first argument.
    methods.forEach(method => {
      this[method] = async (url, options) => this.fetch(method, url, options)
    })
  }

  async fetch (method, url, options = {}) {
    // Create the init options based on some simple defaults, the options set
    // during class instantiation, and the options passed to the HTTP method.
    const init = { method, headers: {}, ...this.options, ...options }
    init.headers = new window.Headers(init.headers)

    // If the given request body is a JavaScript Object, automatically stringify
    // it and add a JSON content-type header to the request.
    if (typeof init.body === 'object') {
      init.headers.append('Content-Type', 'application/json')
      init.body = JSON.stringify(init.body)
    }

    // If there is a base URL set, re-construct the URL to use it.
    if (init.baseUrl) {
      url = init.baseUrl + url
      delete init.baseUrl
    }

    // Make the request using the fetch API and construct a custom response
    // Object.
    const fetchResponse = await window.fetch(url, init)
    const response = {
      ...fetchResponse,
      headers: fetchResponse.headers,
      ok: fetchResponse.ok,
      status: fetchResponse.status,
      statusText: fetchResponse.statusText
    }

    // If there is a JSON content-type response header, automatically JSON-parse
    // the response, otherwise parse it as text.
    const contentType = response.headers.get('Content-Type')
    const isJson = contentType && contentType.indexOf('application/json') > -1
    try {
      if (isJson) {
        response.body = await fetchResponse.json()
      } else {
        response.body = await fetchResponse.text()
      }
    } catch (err) {
      console.error(err)
    }

    // If the response is OK, return the response, otherwise return an HTTPError
    // instance with the response.
    if (response.ok) {
      return response
    } else {
      throw new HttpError(response)
    }
  }
}

export const http = new Http()
