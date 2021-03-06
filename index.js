const methods = [
  'get',
  'post',
  'put',
  'delete'
]

export class HttpError extends Error {
  constructor (request, response) {
    const statusText = response.statusText ? ` ${response.statusText}` : ''
    super(`Bad response: ${response.status}${statusText}`)
    this.name = this.constructor.name
    this.request = request
    this.response = response
  }
}

export class Http {
  constructor (options = {}) {
    this.options = Object.assign(
      {
        // NOTE: This default is not implemented in all browsers yet. Context:
        // https://www.chromestatus.com/feature/4539473312350208
        credentials: 'same-origin'
      },
      options
    )

    // Create an instance method for each HTTP method and just calls the general
    // fetch method with the HTTP method as the first argument.
    methods.forEach(method => {
      this[method] = async function (url, options) {
        return this.fetch(method, url, options)
      }
    })
  }

  async fetch (method, url, options = {}) {
    // Create the request object based on some simple defaults, the options set
    // during class instantiation, and the options passed to the HTTP method.
    const request = { method, url, headers: {}, ...this.options, ...options }

    // Allow modification of the request object with a before hook.
    if (this.before) await this.before(request)

    // Create the init object that will be used with fetch based on the request
    // object.
    const init = { ...request, headers: new window.Headers(request.headers) }

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
      statusText: fetchResponse.statusText,
      blob: fetchResponse.blob.bind(fetchResponse),
      text: fetchResponse.text.bind(fetchResponse)
    }

    // If there is a JSON content-type response header, automatically JSON-parse
    // the response, otherwise parse it as text.
    const contentType = response.headers.get('Content-Type')
    const isJson = contentType && contentType.indexOf('application/json') > -1
    const isText = contentType && contentType.indexOf('text/') === 0
    try {
      if (isJson) {
        response.body = await fetchResponse.json()
      } else if (isText) {
        response.body = await fetchResponse.text()
      }
    } catch (err) {
      console.error(err)
    }

    // If a after hook exists, call it with the request and response info after
    // the request is made, and use the return value as the new response object.
    if (this.after) await this.after(request, response)

    // If the response is OK, return the response, otherwise return an HTTPError
    // instance with the response.
    if (response.ok) {
      return response
    } else {
      throw new HttpError(request, response)
    }
  }
}

export const http = new Http()

// If the window object is defined, add http to it.
if (typeof window !== 'undefined') {
  window.HttpError = HttpError
  window.Http = Http
  window.http = http
}
