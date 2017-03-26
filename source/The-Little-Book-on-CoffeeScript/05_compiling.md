<div class="back"><a href="index.html">&laquo; 索引に戻る</a></div>

#自動的にCoffeeScriptをコンパイルする

CoffeeScriptの問題はあなたとJavaScriptの間に他のレイヤーを増やすことです。CoffeeScriptのファイルが変更され、古くなる度に手動でコンパイルせねばなりません。幸いなことにCoffeeScriptはいくつかのコンパイル代替形態を持っており、開発サイクルをいくらかスムーズにすることが可能です。

最初の章で説明したとおり、CoffeeScriptは`coffee`コマンドを用いてコンパイル可能です。
    
    coffee --compile --output lib src
    
上の例では全ての`src`ディレクトリ内の`.coffee`ファイルはコンパイルされ、`lib`ディレクトリに個々の出力が置かれます。これを呼ぶだけでもちょっと面倒かもしれません。自動化する方法を探しましょう。

##Cake

[Cake](http://jashkenas.github.com/coffee-script/#cake)はとてもシンプルなビルドシステムで[Make](http://www.gnu.org/software/make/) や [Rake](http://rake.rubyforge.org/)に倣っています。このライブラリは`coffee-script`のnpmパッケージにバンドルされており`cake`という名前のコマンドで利用可能です。

`Cakefile`と呼ばれるファイルにCoffeeScriptを用いることでタスクを定義できます。`cake [task] [options]`を同じディレクトリで実行することにより、Cakeがそれらのタスクを取り上げ、起動します。全てのタスクとオプションのリストを表示するにはただ`cake`と入力します。

タスクは`task()`関数を用いて定義します。名前と任意で詳細説明とコールバック関数を与えます。例として`Cakefile`という名のファイルを作り、`lib`と`src`という2つのディレクトリを作成してください。`Cakefile`には次の内容を追加します。

<span class="csscript"></span>

    fs = require 'fs'

    {print} = require 'sys'
    {spawn} = require 'child_process'

    build = (callback) ->
      coffee = spawn 'coffee', ['-c', '-o', 'lib', 'src']
      coffee.stderr.on 'data', (data) ->
        process.stderr.write data.toString()
      coffee.stdout.on 'data', (data) ->
        print data.toString()
      coffee.on 'exit', (code) ->
        callback?() if code is 0
    
    task 'build', 'Build lib/ from src/', ->
      build()
      
上の例では`build`というタスクを定義しました。`cake build`で実行できます。これは先の例と同じコマンドを実行し`src`にあるCoffeeScriptファイルを全てJavaScriptにコンパイルし、`lib`に置きます。これでHTMLファイルから通常どおりに`lib`の中にあるJavaScriptファイルを参照できます。

<span class="csscript"></span>

    <!DOCTYPE html>
    <html>
    <head>
    <meta charset=utf-8>
    <script src="lib/app.js" type="text/javascript" charset="utf-8"></script>      
    </head>
    <body>
    </body>
    </html>

これではまだ`cake build`をCoffeeScriptのコードを変更するたびに手動で実行せねばなりません。理想からは遠いです。幸運なことに、`coffee`コマンドは別のオプションがあります。`--watch`はコマンドにディレクトリに対して変更を見張るように指示し、必要な場合にはリコンパイルします。それを用いて別のタスクを定義しましょう。

<span class="csscript"></span>

     task 'watch', 'Watch src/ for changes', ->
        coffee = spawn 'coffee', ['-w', '-c', '-o', 'lib', 'src']
        coffee.stderr.on 'data', (data) ->
          process.stderr.write data.toString()
        coffee.stdout.on 'data', (data) ->
          print data.toString()

もしあるタスクが別のタスクに依存する場合、別のタスクを`invoke(name)`を用いて実行することが可能です。`Cakefile`にもう一つ便利なタスクを追加しましょう。`index.html`を開きソースの変更の見張りを開始します。

<span class="csscript"></span>

    task 'open', 'Open index.html', ->
      # 最初に開いて、次に見張る
      spawn 'open', 'index.html'
      invoke 'watch'

タスクには`option()`関数を用いてオプションを定義することが可能です。引数として短かい名前、長い名前、そして説明を渡せます。

<span class="csscript"></span>

    option '-o', '--output [DIR]', 'output dir'

    task 'build', 'Build lib/ from src/', ->
      # Now we have access to a `options` object
      coffee = spawn 'coffee', ['-c', '-o', options.output or 'lib', 'src']
      coffee.stderr.on 'data', (data) ->
        process.stderr.write data.toString()
      coffee.stdout.on 'data', (data) ->
        print data.toString()

ご覧のとおり、タスクコンテキストがユーザが指定した任意のデータを持つ`options`オブジェクトにアクセス可能となりました。もし`cake`を引数無しで実行した場合、全てのタスクと引数がリストされます。

Cakeは、bashやMakeファイルを用いずにCoffeeScriptをコンパイルするような一般的なタスクを自動化する、素晴しい方法です。[Cakeのソース](http://jashkenas.github.com/coffee-script/documentation/docs/cake.html)を読むことにはとても価値があります。CoffeeScriptの表現力の素晴しい例です。コードにはコメントが添えられて美しくドキュメント化されています。

##サーバサイドサポート

CakeをCoffeeScriptのコンパイルに用いるのは静的なサイトでは問題ありません。しかし動的なサイトではCoffeeScriptのコンパイルをリクエスト/レスポンスサイクルに統合せねばなりません。色々な統合ソリューションが人気の高いバックエンドの言語とフレームワークに対して既に存在します。例えば[Rails](http://rubyonrails.org/) や [Django](https://www.djangoproject.com/)です。

Rails3.1ではCoffeeScriptのサポートは[Sprockets & the asset pipeline](https://github.com/sstephenson/sprockets)を通して提供されます。CoffeeScriptファイルを`app/assets/javascripts`の下に追いてください。Railsは十分に賢くリクエストを受けたときに事前にコンパイルします。JavaScriptとCoffeeScriptのファイルは特別なコメントの指示を用いて包まれ、連結されます。これは1つのリクエストでアプリケーションの全てのJavaScriptを取得することが可能であることを意味します。運用時にはRailsはコンパイル結果をディスクに記録し、キャッシュされ、高速なサービスを保障します。

他のRubyの選択肢には[rack](http://rack.github.com/)サーバがあります。例えば37signalの[Pow](http://pow.cx/) や Joshua Peek の [Nack](http://josh.github.com/nack/)があります。両者共、もしあなたのアプリケーションがRailsの他の機能や関連するオーバーヘッドを必要としないのなら最高にお勧めです。

Djangoもまた[CoffeeScriptのサポート](http://pypi.python.org/pypi/django-coffeescript/)を特別なテンプレートタグを通して行います。インラインコードでも外部ファイルでも利用可能です。

RubyとPythonは共にCoffeeScriptをコンパイルする時、NodeやCoffeeScriptのライブラリへパイプから出力します。そのためそれらを開発の間にインストールしなければなりません。もしNodeを直接、あなたのサイトのバックエンドとして使用している場合、CoffeeScriptの統合はよりシンプルで、バックエンドとフロントエンドコードの両方で使用可能です。このことについては次の章でより詳しく説明します。[Stitch](https://github.com/sstephenson/stitch)を用いて全てのクライアントサイドCoffeeScriptを提供します。

