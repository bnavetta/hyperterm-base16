# hyperterm-base16
[![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/hyperterm-base16.svg
[npm-url]: https://npmjs.org/package/hyperterm-base16

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

[Hyperterm](hyperterm) plugin to use [base16](base16) themes.

## Configuration

```javascript
base16: {
    schemeFile: '~/my-scheme.yaml',
    schemeRepositories: [
        'https://github.com/chriskempson/base16-default-schemes.git'
    ],
    schemeName: 'default-dark',
    refreshSchemes: '2d',
    dataDir: '~/.hyperterm-base16',
    schemesDir: '~/.hyperterm-base16/schemes'
}
```

All repositories in `schemeRepositories` will be cloned into `schemesDir`. If `schemeFile` is set, the scheme at that path
will be loaded. Otherwise, if `schemeName` is set, it will be searched for in all cloned schemes. On startup, if a repository is
older than `refreshSchemes`, it will be re-pulled. `schemeRepositories` defaults to an empty array, `schemeFile` and `schemeName` have
no default, and the defaults for `refreshSchemes`, `dataDir`, and `schemesDir` are shown.

See [`Scheme.toConfig`](src/scheme.js) for how base16 schemes get mapped to Hyperterm configuration. Other than basic color mappings,
it's currently a bit haphazard, and suggestions for better styling are welcome. 

[hyperterm]: https://hyperterm.org/
[base16]: http://chriskempson.com/projects/base16/