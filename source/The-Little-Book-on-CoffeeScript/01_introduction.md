<div class="back"><a href="index.html">&laquo; 索引へ戻る</a></div>

#CoffeeScriptって何?

[CoffeeScript](http://coffeescript.org)はJavaScriptにコンパイルできる小さな言語です。文法がRubyとPythonに影響を受けていてそれらの2つの言語の多くの機能を実装しています。この本はあなたがCoffeeScriptを学習し、ベストプラクティスを理解し、優れたクライアントサイドアプリケーションの開発を開始するのを手助けします。この本は小さく、7章しかありません。しかしそれは適切なことでしょう、CoffeeScriptもまた小さな言語ですから。

この本は完全なオープンソースです。[Alex MacCaw](http://alexmaccaw.co.uk) (または [@maccman](http://twitter.com/maccman))により書かれました。また次の人々より大きなご協力を頂きました。[David Griffiths](https://github.com/dxgriffiths), [Satoshi Murakami](http://github.com/satyr), そして[Jeremy Ashkenas](https://github.com/jashkenas)です.

もしあなたが間違いを見つけたり提案をお持ちならどうぞためらわずにこの本の [githubページ](https://github.com/arcturo/library)にてチケットをオープンして下さい。また読者は私が書いた別の本、 [JavaScript Web Applications by O'Reilly](http://oreilly.com/catalog/9781449307530/)にも興味を持たれるかもしれません。こちらの本はリッチなJavaScriptアプリケーションや状態をクライアントサイドに移動させることについて説明しています。

それでは始めましょう。なぜCoffeeScriptを書くことは純粋なJavaScriptを書くよりも良いことなのでしょうか? 最初に上げられるのはコードの記述量が減ることです。CoffeeScriptはとても簡潔で、また空白を頼りにします。私の経験ではこれによりコードはオリジナルのJavaScriptに比べて3分の1から半分になります。さらにCoffeeScriptにはいくつかの素敵な機能があります。例えば配列の内包表記やプロトタイプエイリアス、クラスなどがあり、それらはあなたに必要なタイプ量をさらに減らします。

もっと重要なことは、JavaScriptには多くの[悩みの種](http://bonsaiden.github.com/JavaScript-Garden/)が存在し、多くの初心者をつまづかせます。CoffeeScriptはJavaScriptの機能から選抜された機能を用い、多くのおかしな点を直すことで美しくそれらを避けてしまいます。

CoffeeScriptはJavaScriptの拡張ではありません。そのためCoffeeScriptの中でJavaScriptの外部ライブラリを使用可能とは言え、JavaScriptを変換無しにそのまま用いればシンタックスエラーとなります。コンパイラはCoffeeScriptのコードを対応するJavaScriptに変換しますので実行時に翻訳はしません。

最初によくある誤解を解きましょう。CoffeeScriptを書くにつれJavaScriptの理解が必要となるでしょう。実行時エラーがJavaScriptの知識を要求するためです。しかしその事を言うなら、実行時エラーは普通、とても自明的です。そのため私はJavaScriptをCoffeeScriptに戻すことを今の所問題に感じたことはありません。2つ目の問題として私が良く聞くのはCoffeeScriptの実行速度に関するものです。つまりCoffeeScriptのコンパイラが生成したコードは同等なJavaScriptよりも遅いというものです。しかし実際にはそれもまた問題ではありません。CoffeeScriptは手で書いたJavaScriptと同等に、またはより速く動作する傾向があります。

CoffeeScriptを使用することの欠点は何でしょうか? そう、それはあなたとあなたのJavaScriptの間にまた別のコンパイルステップを挿入することです。CoffeeScriptは、明快で理解しやすいJavaScriptを生成することと、サーバー統合によるコンパイルの自動化によってその問題をできる限り軽減します。他の欠点として、他のどんな新しい言語でもそうですが、コミュニティが現時点では小さいことが挙げられます。あなたは既に詳しい協力者を得るのに苦労するでしょう。しかしCoffeeScriptは急速に勢いを得ています。IRCリストは充実していますのであなたのどんな問題も通常は適切に解答を得ることができるでしょう。

CoffeeScriptはブラウザに限定されません。[node.js](http://nodejs.org/)のようなJavaScriptのサーバーサイド実装でも大きな効果を得ることができるでしょう。加えてCoffeeScriptはより広い範囲での使用や統合を得ています。例えばRails3.1ではデフォルトとなりました。今がCoffeeScripitという列車に飛び乗るのに絶好の時です。今この言語を学習する時間の投資は後に多くの時間を節約することとして返還されるでしょう。

##最初のセットアップ

最初に試してみる最も簡単な方法はブラウザを用いることです。[http://coffeescript.org](http://coffeescript.org)を開いて*Try CoffeeScript*をクリックして下さい。このサイトはブラウザ版のCoffeeScriptコンパイラを用いています。左側のパネルに入力した任意のCoffeeScriptを右側のパネルにJavaScriptとして変換します。

JavaScriptからCoffeeScriptに戻す変換を行うことも[js2coffee](http://js2coffee.org/)プロジェクトを用いて可能です。JavaScriptのプロジェクトをCoffeeScriptに移行する場合に特に便利です。

実際にブラウザ版のCoffeeScriptコンパイラをあなた自身が用いることも可能です。[このライブラリ](http://jashkenas.github.com/coffee-script/extras/coffee-script.js)をあなたのページに入れ、任意のCoffeeScriptをscriptタグと正しい型で記述します。

    <script src="http://jashkenas.github.com/coffee-script/extras/coffee-script.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/coffeescript">
      # ここに CoffeeScript
    </script>
    
実際の運用では明らかに、実行時にCoffeeScriptを翻訳したくはないでしょう。あなたのクライアントに対し全てを遅くしてしまいます。その代わりとして、CoffeeScriptは[node.js](http://nodejs.org)上のコンパイラを事前にCoffeeScriptファイルをコンパイルするために提供します。

インストールするためにはまず最新の安定版[node.js](http://nodejs.org)と[npm](http://npmjs.org/) (the Node Package Manager)を持っているか確認してください。そうしたら次にnpmを用いてCoffeeScriptをインストールします。

    npm install -g coffee-script
    
こうすることで実行コマンド`coffee`を得ます。コマンドラインオプションを与えずに実行するとCoffeeScriptのコンソールに入りCoffeeScriptの文を手早く実行することが可能です。ファイルのコンパイルを行うには`--compile`オプションを与えます。

    coffee --compile my-script.coffee
    
`--output`が指定されていなければ、CoffeeScriptはJavaScriptファイルを同じ名前で作成します。この場合には`my-script.js`です。既存のファイルは上書きしますので不注意に存在するJavaScriptファイルを上書きしないよう注意してください。コマンドラインオプションの完全なリストを得るためには`--help`を与えます。


上で見られるように、CoffeeScriptのデフォルト拡張子は`.coffee`です。このことが[TextMate](http://macromates.com/)のようなテキストエディタにそのファイルがどの言語を保持しているのか理解させ、適切な構文ハイライトの提供を可能にします。デフォルトではTextMateはCoffeeScriptをサポートしません。しかし[bundle](https://github.com/jashkenas/coffee-script-tmbundle) を用いて簡単にインストール可能です。

もしここまでのコンパイルが少しばり不便で面倒に感じたとしても、それはその通りだからです。私達は後程、CoffeeScriptファイルを自動的にコンパイルすることでその問題を解決します。でもまずは言語の文法を見てみましょう。
