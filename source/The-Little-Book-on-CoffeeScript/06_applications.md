<div class="back"><a href="index.html">&laquo; 索引に戻る</a></div>

#アプリケーションを作成する

ここまでで文法の概要について学びました。ここからは実際にCoffeeScriptアプリケーションを構築しましょう。この章の狙いは初心者や熟練の技術者に限らず、全てのCoffeeScript開発者にとって有益なものになることです。本当に、JavaScriptの開発者にとっても適切なものとなるはずです。

幾つかの原因により、開発者がクライアントサイドJavaScriptアプリケーションを構築する時、パターンと規約を試し、テストはするもののそれらはしばしば窓から飛んでいってしまい、最終的な結果はひどいスパゲッティで、保守不可能にこんがらがったJavaScriptになります。私は常にアプリケーションアーキテクチャがどれだけ重要かを強調しています。もしあなたがJavaScript/CoffeeScriptを単純なフォームの妥当性確認を越えて用いるのであれば、[MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)のようなアプリケーション構造を実装するべきです。

保守可能な巨大アプリケーションを実装するための秘密は巨大なアプリケーションを作らないことです。つまり言い換えれば、一連のモジュールとして分割されたコンポーネントを作るのです。アプリケーションロジックは出来る限り一般的にし、適切に抽象化します。最後にロジックを分割し、ビュー、モデル、コントローラ(MVC)に分けます。MVCの実装はこの章の範囲を越えています。MVCについては私の本、[JavaScript Web Applications](http://oreilly.com/catalog/9781449307530/)をチェックして、[Backbone](http://documentcloud.github.com/backbone/) や [Spine](https://github.com/maccman/spine)のようなフレームワークを利用して下さい。ここではそうではなくCommonJSモジュールを用いてアプリケーションの構造化を説明します。

##構造とCommonJS

さて、CommonJSモジュールとは一体何でしょうか？もしあなたが[NodeJS](http://nodejs.org/)を以前に使ったことがあるのなら、あなたはCommonJSを恐らく気付かずに使ったことがあります。CommonJSモジュールは最初にサーバサイドJavaScriptライブラリを書くために開発されました。ローディング時間や名前空間、スコープの問題に向き合うためにです。CommonJSは全てのJavaScript実装の間で互換性を保持するようにするための共通フォーマットでした。その狙いは[Rhino](http://www.mozilla.org/rhino/)向けのライブラリがnodeでも動くことでした。やがてこのアイデアはブラウザに向けられました。そして今私達は[RequireJS](http://requirejs.org) や [Yabble](https://github.com/jbrantly/yabble)のような素晴しいライブラリをクライアントサイドでモジュールを用いるために持っている訳です。

実際に、モジュールはあなたのコードがローカルネームスペース(コードカプセル化)の中で動くことを保障します。他のモジュールを`require()`関数で読むことができます。そして`module.exports`を通してモジュールプロパティを外部に公開することができます。それではそのことについてもう少し掘り下げてみましょう。

###ファイルを要求(require)する

他のモジュールやライブラリ内で`require()`を用いてロードすることが可能です。単純にモジュールの名前を渡すだけです。もしロードパスの中に存在すれば、そのモジュールを表すオブジェクトを返します。次の例をご覧下さい。

    User = require("models/user")
    
同期的なrequireのサポートは議論の余地のある問題です。しかし多くは主流のローダーライブラリと最新のCommonJSの[提案](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition)により解決されています。もしあなたが私の支持する以下のStichとの道とは別の道を選択することを決められたのであれば、それがあなたが良く理解しなければならないものとなるでしょう。

###プロパティを外部に公開する

デフォルトでは、モジュールはプロパティを1つも公開しません。中身は`require()`の呼出に対し、完全に不可視です。もしあるプロパティがあなたのモジュールからアクセス可能であって欲しいと思った場合、`module.exports`を用いて設定する必要があります。

    # random_module.js
    module.exports.myFineProperty = ->
      # 何か
    
これでこのモジュールがrequireされる度に`myFineProperty`は公開されます。

    myFineProperty = require("random_module").myFineProperty

##Stitch: 縫い上げよう

あなたのコードをCommonJSモジュールとして形式化することは全く問題がありません。しかし実際にどうやってこれをクライアントで実行するのでしょうか？私の選択した方法はあまり聞き慣れない[Stitch](https://github.com/sstephenson/stitch)ライブラリです。StichはSam Stephensonにより開発され、色々な物の中でも[Prototype.js](http://www.prototypejs.org)の影響を受け、モジュールの問題をとてもエレガントに解決するので私は喜びのダンスを踊りたくなります！依存性を動的に解決するのではなく、Stichは単純にあなたのJavaScriptファイル全てを1つに結合します。それらをCommonJSの魔法で包みます。あぁ、 そういえばこれはお伝えしましたでしょうか？CoffeeScriptやJSテンプレート、[LESS CSS](http://lesscss.org) それに [Sass](http://sass-lang.com)ファイルもコンパイルします！

物事には順序があります。まず[node.js](http://nodejs.org/) と [npm](http://npmjs.org/)をまだお持ちでないのならインストールする必要があります。私達はこれからこの章を通してそれらを使用します。
    
それでは私達のアプリケーションの構造を作りましょう。もし[Spine](https://github.com/maccman/spine)をお使いでしたら[Spine.App](http://github.com/maccman/spine.app)を用いてこれを自動化できます。そうでなければこれは手動で行わねばなりません。私は通常、`app`フォルダを全てのアプリケーション特有のコードのために用意します。そして`lib`フォルダを一般的なライブラリのために作ります。他の物は全て静的なリソースも含めて`public`ディレクトリに入れましょう。

    app
    app/controllers
    app/views
    app/models
    app/lib
    lib
    public
    public/index.html

それではStichサーバを実際に起動します。`index.coffee`という名のファイルを作り、次のスクリプトを入力してください。

<span class="csscript"></span>

    require("coffee-script")
    stitch  = require("stitch")
    express = require("express")
    argv    = process.argv.slice(2)
    
    package = stitch.createPackage(
      # Stitchに自動的に結合して欲しいパスを指定する
      paths: [ __dirname + "/app" ]
      
      # ベースとなるライブラリを指定する
      dependencies: [
        # __dirname + '/lib/jquery.js'
      ]
    )
    app = express.createServer()
    
    app.configure ->
      app.set "views", __dirname + "/views"
      app.use app.router
      app.use express.static(__dirname + "/public")
      app.get "/application.js", package.createServer()

    port = argv[0] or process.env.PORT or 9294
    console.log "Starting server on port: #{port}"
    app.listen port
    
いくつかの依存ライブラリ、`coffee-script`, `stich`, そして`express`が並べられているのが見えますでしょうか？ 我々は`package.json`ファイルを作成し、これらの依存性を記述せねばなりません。そうすることでnpmがそれらを取り上げることができます。我々の`./package.js`ファイルは次のようになります。

    {
      "name": "app",
      "version": "0.0.1",
      "dependencies": { 
        "coffee-script": "~1.1.2",
        "stitch": "~0.3.2",
        "express": "~2.5.0",
        "eco": "1.1.0-rc-1"
      }
    }
    
それではnpmを用いて依存ライブラリをインストールしましょう。

    npm install .
    npm install -g coffee-script
    
OK.もうそこまで来ました。それでは次を実行します。

    coffee index.coffee
    
うまくいけばStitchサーバが立ち上がるでしょう。それでは先に進み`app`フォルダの中の`app.coffee`スクリプトを与えてテストしてみましょう。このファイルは私達のアプリケーションを起動するものになります。

<span class="csscript"></span>

    module.exports = App =
      init: ->
        # アプリケーションを起動する
        
次にメインページとなる`index.html`を作成します。もし我々がシングルページアプリを作るのならば、ユーザがアクセスする唯一のページとなるでしょう。これは静的なリソースですから`public`の下に置きます。
  
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset=utf-8>
      <title>Application</title>
      <!-- Stitchのメインファイルを必要とする -->
      <script src="/application.js" type="text/javascript" charset="utf-8"></script>
      <script type="text/javascript" charset="utf-8">
        document.addEventListener("DOMContentLoaded", function(){
          var App = require("app");
          App.init();
        }, false);
      </script>
    </head>
    <body>
    </body>
    </html>

ページがロードされた時、*DOMContentLoaded*イベントコールバックは`app.coffee`スクリプトをrequireします。(それは自動的にコンパイルされます。) 次に`init()`関数を実行します。あるべきものはそれだけです。私達は既にCommonJSモジュールを起動して実行しています。HTTPサーバとCoffeeScriptコンパイラもです。例えばもしモジュールをインクルードしたい場合、`require()`を呼ぶだけです。新しいクラス、`user`を作り、`app.coffee`から参照してみましょう。

<span class="csscript"></span>

    # app/models/user.coffee
    module.exports = class User
      constructor: (@name) ->
      
    # app/app.coffee
    User = require("models/user")

##JavaScriptテンプレート

ロジックをクライアントサイドに動かしたい場合、あなたは間違いなく何らかのテンプレートライブラリを必要とするでしょう。JavaScriptテンプレートはサーバのテンプレートとほぼ同じものです。例えばRubyのERBやPythonのテキスト内挿法のようなものでもちろんクライアントサイドでも動作します。世の中には数多くのテンプレートライブラリがあります。そのため私はあなたにいくらかの調査と試用を行うことをお勧めします。Stitchはデフォルトでは[Eco](https://github.com/sstephenson/eco)テンプレートを内部に持っています。

JavaScriptテンプレートはサーバサイドのそれと似たようなものです。HTMLの中にテンプレートタグを挿入し、描画の間にそれらのタグが評価され置換されます。[Eco](https://github.com/sstephenson/eco)テンプレートの優れている点はテンプレートタグが実はCoffeeScriptで記述されていることです。

例を見てみましょう

    <% if @projects.length: %>
      <% for project in @projects: %>
        <a href="<%= project.url %>"><%= project.name %></a>
        <p><%= project.description %></p>
      <% end %>
    <% else: %>
      No projects
    <% end %>

ご覧のとおり、文法は際立って直接的です。ただ`<%`タグを使って式を評価し、`<%=`タグは表示のために用います。テンプレートタグの一部のリストは次のとおりです。
    
* `<% expression %>`  
  CoffeeScriptの式を評価する。その返り値はプリントしない。

* `<%= expression %>`  
  CoffeeScriptの式を評価する。その返り値をエスケープし、プリントする。

* `<%- expression %>`  
  CoffeeScriptの式を評価し、その返り値をエスケープせずにプリントする。

任意のCoffeeScriptの式をテンプレートタグの中で使用することが可能ですが、気をつけることが1つだけあります。CoffeeScriptは空白に敏感です。しかしEcoテンプレートはそうではありません。従ってインデントされたCoffeeScriptブロックを始めるEcoテンプレートタグはコロンを追加せねばなりません。インデントブロックの終わりを示すには特別なタグ`<% end %>`を使用します。次の例をご覧下さい。

    <% if @project.isOnHold(): %>
      On Hold
    <% end %>
    
`if`と`end`のタグを行を分けて書く必要はありません。

    <% if @project.isOnHold(): %> On Hold <% end %>

ご期待通り、1行で書くための後置形式も利用可能です。

    <%= "On Hold" if @project.isOnHold() %>

さて文法については取っ掛かりを得ました。`views/users/show.eco`の中にEcoテンプレートを定義しましょう。
    
    <label>Name: <%= @name %></label>
    
Stichは自動的に私達のテンプレートをコンパイルして`application.js`に含めてしまいます。そして私達のアプリケーションのコントローラではテンプレートをrequireすることがモジュールのように可能で、必要なデータを渡して実行することができます。
    
<span class="csscript"></span>

    require("views/users/show")(new User("Brian"))
    
私達の`app.coffee`ファイルは以下のようになっているはずです。テンプレートを描画し、ドキュメントがロードされた時にページに対して追加します。

<span class="csscript"></span>

    User = require("models/user")

    App =
      init: ->
        template = require("views/users/show")
        view     = template(new User("Brian"))

        # 明らかにこれはjQueryを用いて綺麗にできるでしょう
        element = document.createElement("div")
        element.innerHTML = view
        document.body.appendChild(element)
    
    module.exports = App
    
[アプリケーション](http://localhost:9294/)を開いて試してみてください。願わくばこのチュートリアルがクライアントサイドのCoffeeScriptアプリケーションをどう構造化するについて良いアイデアを与えていることを期待します。次のステップとして、私はクライアントサイドフレームワークをチェックすることをお勧めします。例えば[Backbone](http://documentcloud.github.com/backbone/) or [Spine](http://spinejs.com)などです。それらは基本的なMVC構造を与え、あなたをより面白い仕事へと解放します。
    
##ボーナス - 30秒でHerokuへデプロイ

[Heroku](http://heroku.com)は信じられないほど最高なWebホストで全てのサーバを管理し、スケールし、あなたがエキサイティングな物(素晴しいJavaScriptアプリケーションを構築すること)と共に乗り込むことを可能にします。このチュートリアルを行うにはHerokuのアカウントを必要とします。しかしうれしいことにHerokuのベーシックプランは完全に無料です。元々はRubyのホストでしたが、Herokuは最近、Cedarスタックをリリースし、それにはnodeサポートを含んでいます。

最初に`Procfile`を作ります。これはHerokuに我々のアプリケーションについて伝えます。

    echo "web: coffee index.coffee" > Procfile

まだお済みでなければあなたのアプリケーションに対しローカルgitリポジトリを作成して下さい。

    git init
    git add .
    git commit -m "First commit"    
    
それではアプリケーションをデプロイしましょう。`heroku`コマンドを使います。(まだインストールしていなければする必要があります。)

    heroku create myAppName --stack cedar
    git push heroku master
    heroku open
    
以上です！ 本当にこれだけなんです。nodeアプリケーションをホスティングすることはこれ以上には簡単にならないでしょう。

##追加のライブラリ

[Stitch](https://github.com/sstephenson/stitch) と [Eco](https://github.com/sstephenson/eco)だけがCoffeeScriptとnodeのアプリケーションを作るのに利用可能なライブラリではありません。他にも各種あります。

例えばテンプレートに関しては[Mustache](http://mustache.github.com), [Jade](http://jade-lang.com) または純粋にCoffeeScriptを使ってHTMLを書く[CoffeeKup](http://coffeekup.org)もあります。

アプリケーションの提供に関しては[Hem](http://github.com/maccman/hem)は良い選択です。CommonJSとNPMモジュールの両方をサポートし、CoffeeScriptのMVCフレームワークである[Spine](http://spinejs.com)とシームレスに結合できます。[node-browsify](https://github.com/substack/node-browserify)も同様のプロジェクトです。もし[express](http://expressjs.com/)を用いて低レベルの結合をしたい場合にはTrevor Burnhamの [connect-assets](https://github.com/TrevorBurnham/connect-assets)もあります。

CoffeeScriptのWebフレームワークプラグインの完全なリストは[project's wiki](https://github.com/jashkenas/coffee-script/wiki/Web-framework-plugins)にあります。
