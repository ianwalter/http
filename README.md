# http
> A transpiled global instance of [ky](https://github.com/sindresorhus/ky) (the
> fetch-based HTTP client)

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

&nbsp;

ISC &copy; [Ian Walter](https://iankwalter.com)

