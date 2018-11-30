# http
> A transpiled global instance of [ky][kyUrl] (the fetch-based HTTP client)

[![build status][buildImage]][buildUrl]

## Installation

```console
npm install @ianwalter/http --save
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

[kyUrl]: https://github.com/sindresorhus/ky
[buildImage]: https://dev.azure.com/ianwalter/http/_apis/build/status/ianwalter.http
[buildUrl]: https://dev.azure.com/ianwalter/http/_build
[licenseUrl]: https://github.com/ianwalter/http/blob/master/LICENSE
