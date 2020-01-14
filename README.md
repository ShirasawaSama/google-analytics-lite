# google-analytics-lite ![npm](https://img.shields.io/npm/v/google-analytics-lite) ![GitHub](https://img.shields.io/github/license/Apisium/PureLauncher) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A lightweight google Analytics module.

## Features

- Lightweight
- TypeScript support

## Why?

Most other modules (such as `universal-analytics` and `electron-google-analytics`) are too large (more than 1MB) after packaging due to the import of module `request`, these modules also do not support `TypeScript`.

## Install

```bash
npm install google-analytics-lite
```

## Usage

### Init

`new GoogleAnalytics(tid: string, cid?: string, fetcher?: typeof fetch, root?: string)`

- tid: Google Analytics ID **Must**
- cid: Client ID (Can be generated atomically)
- fetcher: Fetch function (Default is window.fetch)
- root: (Default is https://www.google-analytics.com/collect)

```ts
import GoogleAnalytics from 'google-analytics-lite'

const ga = new GoogleAnalytics('UA-123456-1')
```

### Default values

By edit `gs.defaultValues`:

```ts
Object.assign(gs.defaultValues, {
  an: 'My App',
  aid: 'com.company.app'
})
```

### Protocol

#### pageView(dl: string, dh?: string, dp?: string, other?: GAParameters)

```ts
ga.pageView('http://examples.com/a.html').then(console.log)
```

#### event(ec: string, ea: string, el?: string, ev?: number, other?: GAParameters)

```ts
ga.event('audio', 'Play')
```

#### exception(exd?: string, exf?: boolean, other?: GAParameters)

```ts
ga.exception('Audio play exception')
```

#### social(sn: string, sa: string, st: string, other?: GAParameters)

```ts
ga.social('facebook', 'like', 'http://example.com/myApp')
```

#### Other

```ts
ga.post({ cn: 'xxx', cs: 'xxx' }) // ga.post(data: GAParameters)
```

> If you need other protocols, please contact me through github issue! :)

### Utils

```ts
import { assign, genUUID, random } from 'google-analytics-lite'

random(4) // Random string
genUUID() // Random UUID
assign(obj1, obj2) // Assign two objects
```

## Author

Shirasawa

## License

[MIT](./LICENSE)
