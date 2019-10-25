# @ianwalter/http
> A convenience wrapper around the [fetch][fetchUrl] API

[![npm page][npmImage]][npmUrl]

## Installation

```console
yarn add @ianwalter/http
```

## Usage

```js
import { http } from '@ianwalter/http'

// Add a new header to the global http instance.
http.options.headers = { 'csrf-token': 'abc123' }

// Send a POST request with some data.
const response = await http.post('/api/thing', { body: { complete: true } })
```

## Intercepting requests and responses

```js
http.after = (url, init, response) => ({
  ...response,
  ok: false,
  status: 401,
  statusText: 'Unauthorized'
})
```

## License

Apache 2.0 with Commons Clause - See [LICENSE][licenseUrl]

&nbsp;

Created by [Ian Walter](https://iankwalter.com)

[fetchUrl]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[npmImage]: https://img.shields.io/npm/v/@ianwalter/http.svg
[npmUrl]: https://www.npmjs.com/package/@ianwalter/http
[licenseUrl]: https://github.com/ianwalter/http/blob/master/LICENSE
