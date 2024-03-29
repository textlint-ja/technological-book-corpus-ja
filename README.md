# technological-book-corpus-ja [![Actions Status: test](https://github.com/textlint-ja/technological-book-corpus-ja/workflows/test/badge.svg)](https://github.com/textlint-ja/technological-book-corpus-ja/actions?query=workflow%3A"test")

日本語技術書のコーパス。

日本語の再配布が可能な技術書を集めたものです。
商用利用できないライセンスを含みます。

主にMarkdownで書かれた技術書を集めたものです。

## 収集対象

- 日本語の技術文書
- 特殊なDSL(Markdownの拡張など)を行っていない文書
- ある程度の量がある文書
- 再配布が可能なライセンスである文書

**条件に含んでいないもの**

- 校正が十分に行われているかどうか(校正済みの文書を収集するものではない)

## 利用目的

- [textlint](https://github.com/textlint/textlint "textlint")ルールのテストのfixtureとして利用する
  - 文書は逐次更新されるため、自動テストには適していません

例) コーパスに含まれている文章に対してtextlintでチェックして意図しない結果がないかを確かめる

```sh
npm install --global textlint technological-book-corpus-ja
# --rule でルール名を指定する
technological-book-corpus-ja | xargs textlint --rule textlint-no-todo -f pretty-error
```

開発中のルールをコーパスでテストする方法。

`--prefix tmp/`で一時的なディレクトリにインストールして確認する。

```sh
mkdir tmp/
npm install --save-dev textlint-rule-preset-ja-technical-writing textlint technological-book-corpus-ja --prefix tmp/
cd tmp
# --rule でルール名を指定する
./node_modules/.bin/technological-book-corpus-ja | xargs ./node_modules/.bin/textlint --rule textlint-rule-my-rule -f pretty-error --no-textlintrc
```

## Install

Install with [npm](https://www.npmjs.com/):

    npm install technological-book-corpus-ja

## Usage

### CLI

    $ npm i -g technological-book-corpus-ja
    $ technological-book-corpus-ja
    /Users/technological-book-corpus-jasource/js-primer/array/README.md
    /Users/technological-book-corpus-ja/source/js-primer/comments/README.md
    /Users/technological-book-corpus-ja/source/js-primer/condition/README.md
    /Users/technological-book-corpus-ja/source/js-primer/data-type/README.md
    /Users/technological-book-corpus-ja/source/js-primer/function-method/README.md
    /Users/technological-book-corpus-ja/source/js-primer/implicit-coercion/README.md
    /Users/technological-book-corpus-ja/source/js-primer/introduction/README.md
    /Users/technological-book-corpus-ja/source/js-primer/loop/README.md
    /Users/technological-book-corpus-ja/source/js-primer/object/README.md
    /Users/technological-book-corpus-ja/source/js-primer/operator/README.md
    /Users/technological-book-corpus-ja/source/js-primer/read-eval-print/README.md
    /Users/technological-book-corpus-ja/source/js-primer/README.md
    /Users/technological-book-corpus-ja/source/js-primer/statement-expression/README.md
    /Users/technological-book-corpus-ja/source/js-primer/string/README.md
    /Users/technological-book-corpus-ja/source/js-primer/variables/README.md

パターンでの絞り込みもできます。

    $ technological-book-corpus-ja "/**/js-primer/**/*.md"

### Node.js

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

- [js-primer](https://github.com/asciidwango/js-primer)
  - License: CC BY-NC <https://github.com/asciidwango/js-primer/blob/master/LICENSE>
- [JavaScript-Plugin-Architecture](https://github.com/azu/JavaScript-Plugin-Architecture)
  - License: CC BY-NC <https://github.com/azu/JavaScript-Plugin-Architecture#license>
- [Introduction-to-Addon-Development-in-Blender-Web](https://github.com/nutti/Introduction-to-Addon-Development-in-Blender-Web)
  - License: CC BY <https://github.com/nutti/Introduction-to-Addon-Development-in-Blender-Web/blob/master/LICENSE>
- [The-Little-Book-on-CoffeeScript](https://github.com/minghai/library/tree/gh-pages)
  - License: MIT <https://github.com/minghai/library/blob/gh-pages/coffeescript/LICENSE>
- [progit](https://github.com/progit/progit)
  - License: CC BY-NC-SA 3.0 <https://git-scm.com/book/en/v2>
- [what-is-maven](https://github.com/KengoTODA/what-is-maven)
  - License: CC BY-NC 4.0 <https://github.com/KengoTODA/what-is-maven/blob/main/preface/README.md>
- [Hatena-Textbook](https://github.com/hatena/Hatena-Textbook)
  - License: CC BY-NC-SA 2.0 <https://github.com/hatena/Hatena-Textbook#%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9>
- [build-web-application-with-golang](https://github.com/astaxie/build-web-application-with-golang)
  - License: BSD 3-Clause <https://github.com/astaxie/build-web-application-with-golang/blob/master/LICENSE.md>
- [Go-SCP-jaJP](https://github.com/techtouch-inc/Go-SCP-jaJP)
  - License: CC BY-SA 4.0 <https://github.com/techtouch-inc/Go-SCP-jaJP#%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9>

## 文書の追加方法

1. `git submodule add <追加するGit URL> repo/<name>`
2. `index.js`の`References`に定義を追加する
3. `build.js`の`copyTask`に文書のみをコピーする処理を追加する

## 文書の更新方法

次のコマンドでsubmoduleを更新できる。

1. `npm run update-refs`

文書の構造が変わっていないかを確認し、build.jsを修正する

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
