
# Component Wiki

  Quick script to fetch `component.json` files for components
  defined in the [component wiki](https://github.com/component/component/wiki/Components), which is
  effectively our "registry". This is used for `component-search(1)`.

## Installation

    $ npm install component-wiki

## Example

```js
[ { name: 'ajax',
    repo: 'ForbesLindesay/ajax',
    description: 'Standalone AJAX library inspired by jQuery/zepto',
    version: '0.0.0',
    keywords: [],
    dependencies: { 'component/type': '*' },
    development: {},
    scripts: [ 'index.js' ] },
  { name: 'superagent',
    repo: 'visionmedia/superagent',
    description: 'awesome http requests',
    version: '0.9.0',
    keywords: [ 'http', 'ajax', 'request', 'agent' ],
    main: 'lib/superagent.js' },
  { name: 'upload',
    repo: 'component/upload',
    description: 'file upload and progress api',
    version: '0.0.2',
    keywords: [ 'upload', 'file' ],
    dependencies: { 'component/emitter': '*' },
    development: {},
    scripts: [ 'index.js' ] },
  { name: 'path-to-regexp',
    description: 'Express style path to RegExp utility',
    version: '0.0.1',
    keywords: [ 'express', 'regexp', 'route', 'routing' ],
    scripts: [ 'index.js' ] },
  { name: 'page',
    description: 'Tiny client-side router (~1200 bytes)',
    version: '1.3.0',
    scripts: [ 'index.js' ] },

```

# License

  MIT
