# http
> A transpiled global instance of [ky][kyUrl] (the fetch-based HTTP client)

[![npm page][npmImage]][npmUrl]

## Installation

```console
yarn add @ianwalter/http
```

## Usage

```js
import http from '@ianwalter/http'

// Update the ky instance to add a new header globally.
http.update(http.ky.extend({ headers: { 'csrf-token': 'abc123' } }))

// Use ky to post some data.
const response = await http.ky.post('/api/thing', { json: { complete: true } })
```

## License

Apache 2.0 with Commons Clause - See [LICENSE][licenseUrl]

&nbsp;

Created by [Ian Walter](https://iankwalter.com)

[npmImage]: https://img.shields.io/npm/v/@ianwalter/http.svg
[npmUrl]: https://www.npmjs.com/package/@ianwalter/http
[kyUrl]: https://github.com/sindresorhus/ky
[licenseUrl]: https://github.com/ianwalter/http/blob/master/LICENSE
