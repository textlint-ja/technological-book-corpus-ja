# technological-book-corpus-ja

日本語技術書のコーパス。

日本語の再配布が可能な技術書を集めたものです。

## Install

Install with [npm](https://www.npmjs.com/):

    npm install technological-book-corpus-ja

## Usage

```js
const References = {
    "JavaScript-Plugin-Architecture": {
        name: "JavaScript-Plugin-Architecture",
        url: "https://github.com/azu/JavaScript-Plugin-Architecture",
        license: "https://github.com/azu/JavaScript-Plugin-Architecture#license"
    },
    "Introduction-to-Add-on-Development-in-Blender": {
        name: "Introduction-to-Add-on-Development-in-Blender",
        url: "https://github.com/nutti/Introduction-to-Add-on-Development-in-Blender",
        license: "https://github.com/nutti/Introduction-to-Add-on-Development-in-Blender/blob/draft/LICENSE"
    },
    ...
};
/**
 * get files by glob pattern
 * @param {string} patterns glob pattern
 * "/" root is source directory
 * @see https://github.com/isaacs/node-glob
 */
module.exports.findByPattern = function findByPattern(patterns) {};
/**
 * get files by type
 * default all files
 * @param {string} ext
 * e.g) ".md"
 */
module.exports.get = function get(ext = ".*") {};
```

## References

このコーパスは次の文書を含んでいます。
それぞれの文書のライセンスに基づき再配布されています。

- [JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture)
  - License: <https://github.com/azu/JavaScript-Plugin-Architecture#license>
- [Introduction-to-Add-on-Development-in-Blender](https://github.com/nutti/Introduction-to-Add-on-Development-in-Blender)
  - License: <https://github.com/nutti/Introduction-to-Add-on-Development-in-Blender/blob/draft/LICENSE>
- [The-Little-Book-on-CoffeeScript](https://github.com/minghai/library/tree/gh-pages)
  - License: <https://github.com/minghai/library/tree/gh-pages>

## Changelog

See [Releases page](https://github.com/textlint-ja/technological-book-corpus-ja/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/textlint-ja/technological-book-corpus-ja/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
