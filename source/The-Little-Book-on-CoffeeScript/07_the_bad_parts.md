<div class="back"><a href="index.html">&laquo; 索引に戻る</a></div>

#The Bad Parts: 悪い所

JavaScriptは狡猾な猛獣です。あなたにとって避けるべき部分を知ることは使うべき部分を知ることと同じくらい重要です。孫子は"己の敵を知れ"と言いました。それは完全に私達がこれからこの章で行おうとしていることです。JavaSriptの闇の側面を探検すると、疑うことを知らない開発者を急襲するのに準備万端なモンスター達が潜んでいます。全てを陽の下に晒しましょう。

イントロで説明しましたとおり、CoffeeScriptの良さはその文法だけでなく、JavaScriptの欠点を直す能力にあります。しかしCoffeeScriptの文は直接JavaScriptに翻訳され、仮想機械やインタプリタ上で実行される訳ではないため、CoffeeScriptは全てのJavaScriptの恐怖に対する銀の弾丸ではなく、注意しなければならない問題がまだあります。

最初にCoffeeScriptが何を解決するかを話しましょう。

##JavaScriptの部分集合

CoffeeScriptの文法はJavaScriptの部分集合をカバーするのみです。著名な*Good Parts*です。したがって既に直すものはほとんどありません。例として`with`文について考えましょう。この文は長い間"有害である(Considered harmful)"とされ、避けるべきものでした。`with`はオブジェクトに対するプロパティ操作の記述の繰返しに対する構文糖を提供することを狙っていました。次の例をご覧下さい。

    dataObj.users.alex.email = "info@eribium.org";
    
上は以下のように書けます。

    with(dataObj.users.alex) {
      email = "info@eribium.org";
    }
    
実際に最初からそんな深いオブジェクトを持つべきでないのは置いておいて、この文法はとても簡潔です。ただし1つの例外がありました。これはとてもJavaScriptインタプリタにとって混乱の元だったのです。インタプリタはあなたが`with`の中で何をするつもりなのかわかりません。そこで全ての名前解決を最初に特定のオブジェクトに対して行うよう強制しました。

これは本当にパフォーマンスに悪影響を与え、インタプリタにはJIT最適化の類を全てオフにすることを強制しました。加えて`with`文は[uglify-js](https://github.com/mishoo/UglifyJS)のようなツールを用いて最小化を行なうことが不可能でした。`with`は将来のJavaScriptのバージョンでは非推奨となり、削除されます。考慮すべきことは、それを使わないことを考えたほうがずっと良いということです。CoffeeScriptはさらに進めてそれを文法から消してしまいました。CoffeeScriptで`with`を使うとシンタックスエラーになります。

##大域変数

デフォルトではJavaScriptのプログラムはグローバルスコープで実行されます。そしてデフォルトでは全ての変数はグローバルスコープにて作成されます。もし変数をローカルスコープで作成したければJavaScriptでは`var`キーワードを用いてその意思を示さねばなりません。

    usersCount = 1;        // Global
    var groupsCount = 2;   // Global
                          
    (function(){              
      pagesCount = 3;      // Global
      var postsCount = 4;  // Local
    })()

これは少しおかしな決定です。なぜならほとんど多くの場合、あなたが作るのはローカル変数であり、グローバルではないからです。ですからそれをデフォルトにしてはどうでしょうか？現状では開発者は`var`文を全ての変数の前に、初期化時に置くことを覚えなければなりません。そうしなければ変数名が不注意で衝突しお互いを上書きした時に、変なバグに直面することでしょう。

幸運なことにCoffeeScriptがここではあなたの助けとなります。暗黙のグローバル変数宣言を完全に消しました。言い方を変えれば`var`キーワードはCoffeeScriptでは予約語ですが、もし使用するとシンタックスエラーとなります。ローカル変数が暗黙的にデフォルトで作成されます。明示的に`window`のプロパティとして割り当てない限り、グローバル変数を作ることはとても難しいです。

CoffeeScriptの変数宣言の例を見てみましょう。

<span class="csscript"></span>

    outerScope = true
    do ->
      innerScope = true
      
上の例は以下のようにコンパイルされます。

    var outerScope;
    outerScope = true;
    (function() {
      var innerScope;
      return innerScope = true;
    })();
    
CoffeeScriptがどのように(`var`を用いて)変数を自動的にそれが最初に使用されたコンテキストで初期化するかご覧下さい。外部の変数を覆い隠すのは無理ですが、それらを参照し、アクセスすることは可能です。これには注意が必要です。深くネストする関数やクラスを書く場合に、不注意で外部の変数の名前を再利用しないように気を付けてください。例えば次の例では不注意でClass関数の`package`変数を上書きしています。

<span class="csscript"></span>

    package = require('./package')
    
    class Hem
      build: ->
        # 外部変数を上書きしてる!!
        package = @hemPackage.compile()
        
      hemPackage: ->
        package.create()
        
グローバル変数は時には必要です。作成するには`window`のプロパティとして設定する必要があります。

<span class="csscript"></span>

      class window.Asset
        constructor: ->

グローバル変数が暗黙的でなく明示的であることで、CoffeeScriptはJavaScriptプログラムのバグの原因の主な一つを消しています。

##セミコロン

JavaScriptはセミコロンの使用をソースコード内で強制はしません。よって省略可能です。しかし、裏側ではJavaScriptコンパイラはそれを必要としています。そのためパーサはセミコロンが無いために起こるパースエラーが発生する度に、自動的にセミコロンを挿入しています。言い替えると文をセミコロン無しで評価し、もしそれが失敗したらセミコロンを用いて再評価を試します。

不幸なことに、これは途方もなく悪い考えでした。実際にあなたのコードの挙動を変えてしまいます。次の例を見てください。正しいJavaScriptに見えるでしょう？ でも本当に？

    function() {}
    (window.options || {}).property
    
誤りです。少なくともパーサに従えばシンタックスエラーを出します。先の括弧に対し、パーサはセミコロンを挿入しません。コードは1行に変換されます。

    function() {}(window.options || {}).property

もう問題がおわかりになるでしょう。そしてなぜパーサが文句を言うのかも。JavaScriptを書くときに常に文の最後にセミコロンを置くべきです。幸いなことに、CoffeeScriptはこの問題に対しその文法にセミコロンを持たないことで対処しました。正確に言えばCoffeeScriptがJavaScriptにコンパイルされる時に、(正確な場所に)セミコロンが自動的に挿入されます。

##予約語

いくつかのJavaScriptのキーワードは将来のJavaScriptのバージョンのために予約されています。例えば`const`や`enum`、`class`です。これらを変数名としてJavaScriptプログラムにて使用すると予測できない結果が起こり得ます。あるブラウザはこれに問題なく対処できますが、他のブラウザでは首を締めます。CoffeeScriptはこの問題をうまく回避します。予約語の使用を見つけると必要な場合にはエスケープします。

例として`class`という予約語をオブジェクトのプロパティとして利用するとしましょう。CoffeeScriptは次のようになります。

<span class="csscript"></span>

    myObj = {
      delete: "I am a keyword!"
    }
    myObj.class = ->
    

CoffeeScriptのパーサはあなたが予約語を使用していることを見つけ括ってくれます。

    var myObj;
    myObj = {
      "delete": "I am a keyword!"
    };
    myObj["class"] = function() {};
    
##等価比較

javascriptの弱い等価比較(`==`)は人を混乱させる挙動があり、しばしばバグの温床となっています。下の例は[javascript garden's equality section](http://bonsaiden.github.com/javascript-garden/#types.equality)からの引用ですが、問題についてある深さまで掘り下げています。

<span class="csscript"></span>

    ""           ==   "0"           // false
    0            ==   ""            // true
    0            ==   "0"           // true
    false        ==   "false"       // false
    false        ==   "0"           // true
    false        ==   undefined     // false
    false        ==   null          // false
    null         ==   undefined     // true
    " \t\r\n"    ==   0             // true

この挙動の理由は弱い等価比較は自動的に型変換を強制します。この結果はとても不明瞭で、予測できない結果とバグの原因になるという意見にあなたもきっと同意してくれるでしょう。

解決方法は代わりに厳密な等価演算子を用いることです。それは3つの＝記号から成ります(`===`)。これは普通の等価演算子と全く同じように働きますが、型の強制変換を行いません。常に厳密な等価演算子を使い、必要な場合には明示的に型を変換することが推奨されています。
    
CoffeeScriptではこれを単純に全ての弱い等価比較を厳密なものに置き換えることで解決します。つまり全ての`==`比較演算子を`===`に取り替えます。CoffeeScriptでは弱い等価比較は使えません。そしてもし必要であれば比較する前に明示的に型を変換しなければなりません。

しかし、これはCoffeeScriptで常に型の強制変換を完璧に無視できるということではありません。特にフローコントロールにおける変数の真偽値のチェックにおいて顕著です。空文字列、`null`、`undefined`、それに数値の`0`は`false`に変換されます。

<span class="csscript"></span>

    alert("空配列")      unless [].length
    alert("空文字列")    unless ""
    alert("数値の0")     unless 0
    
もし明示的に`null`と`undefined`をチェックしたい場合には、CoffeeScriptの存在確認演算子を利用可能です。

<span class="csscript"></span>

    alert("これは呼ばれない") unless ""?
    
この例の`alert()`は呼ばれません。空文字列は`null`とは等しくないためです。

##関数定義

JavaScriptでは十分に変なことに、関数が使用後に定義可能です。次の例をご覧ください。これは全く問題なく実行できます。`wem`が呼ばれた後に定義されているのにです。

    wem();
    function wem() {}

これは関数スコープのためです。関数はプログラムの実行前に引き上げられます。そのようなものとしてそれが定義されたスコープの中ではどこでも有効です。
    
    if (true) {
      function declaration() {
        return "first";
      }
    } else {
      function declaration() {
        return "second";
      }
    }
    declaration();
    
いくつかのブラウザ、例えばFirefoxでは`declaration()`は`"first"`を返します。そして他のブラウザ、例えばChromeでは例え`else`節が永久に実行されないように見えても`"second"`を返します。

もし宣言的な関数についてより知りたいのであれば、[Juriy Zaytsevのガイド](http://kangax.github.com/nfe/)を読むべきです。彼は仕様について掘り下げました。それらはとても不明瞭な挙動を持ち、いつか後に問題の発端となるだろうと言うだけで十分でしょう。全てを考慮に入れて、それらの問題を解決するには代わりに関数式を用いるのが最良でしょう。

    var wem = function(){};
    wem();

CoffeeScriptのこの問題に対するアプローチは宣言的関数を全体的に取り除くことでした。関数式のみを用います。

##数値のプロパティを参照する

JavaScriptパーサの問題として数値に対する*ドット表記*がプロパティの参照でなく浮動小数点記述だと翻訳されることでしょう。次の例をご覧下さい。次のJavaScriptはシンタックスエラーとなります。

    5.toString();
    
JavaScriptのパーサはドットの後ろに別の数値を探します。そして`toString()`に出くわした時に`Unexpected token`エラーを起こします。これに対する解決法は括弧を用いるか、追加のドットを足すことです。
    
    (5).toString();
    5..toString();
    
幸い、CoffeeScriptのパーサはこの問題に対処するに十分に賢く、数値のプロパティにアクセスする場合全てにおいて、上の例に対しても自動的に、2つのドット表記を用います。

#直されていない部分

CoffeeScriptがJavaScriptの設計上の問題に対し、いくらかの解決法を提供しているにせよ、ここまでの程度になります。先にお伝えしたとおり、CoffeeScriptは設計上、静的解析に厳密に制限されています。実行時チェックはパフォーマンスを理由に全く行っていません。CoffeeScriptはソース・トゥ・ソースなコンパイラであり、そのアイデアは「全てのCoffeeScriptの文は等価なJavaScriptの文に置き換わる」です。CoffeeScriptは例えば`typeof`のようなJavaScriptのキーワードのどれ1つにも抽象化を与えず、そのようなものとするので、JavaScriptの設計上の問題のいくつかはCoffeeScriptにもそのまま当て嵌ります。

先のセクションで、CoffeeScriptが直したJavaScriptの設計上の問題について説明しました。ここからはCoffeeScriptが直していないJavaScriptの問題について話しましょう。

##evalの使用

CoffeeScriptはJavaScriptのいくつかの欠点を無くしましたが、他の機能は必要悪です。あなたはそれらの欠点について注意しなければなりません。該当する例は`eval()`関数です。疑いなくそれにはその用途があります。しかしあなたはその欠点も知る必要があります。そして可能なら防がなければなりません。`eval()`関数はJavaScriptコードの文字列をローカルスコープにて実行します。また`setTimeout()`や`setInterval()`といった関数もまた最初の引数として文字列を取り、評価します。

しかし`with`のように、`eval()`はコンパイラから手掛かりを失わせます。パフォーマンスを悪くする主な原因です。コンパイラには実行時に中身に何が入っているかは検討もつきません。インライン展開のような最適化を実行することも不可能です。もう1つの憂慮点はセキュリティです。もし精査していない入力を与えれば`eval`は簡単にあなたのコードをインジェクション攻撃に対し無力にします。あなたが`eval`を使用する場合の99%にはより良く、より安全な、(角括弧のような)代替法があります。

<span class="csscript"></span>

    # やってはいけません
    model = eval(modelName)
    
    # 代わりに角括弧を使いましょう
    model = window[modelName]
    
##typeofを使う

`typeof`演算子は恐らく最も大きなJavaScriptの設計上の問題でしょう。なぜなら基本的に完全に壊れているからです。実際にそれの用途は本当に1つしかありません。値が`undefined`であるかチェックすることです。

<span class="csscript"></span>

    typeof undefinedVar is "undefined"

他のタイプの型チェックに関しては`typeof`はとても惨めに失敗します。ブラウザの種類とインスタンスがどのようにインスタンス化されたかにより異なった結果を返します。これはCoffeeScriptでもあなたを助けることができません。なぜならCoffeeScriptは静的解析のみを用いており、実行時の型チェックを持たないからです。ここで頼れるのはあなただけです。

問題をはっきりさせるために、[JavaScript Garden](http://bonsaiden.github.com/JavaScript-Garden/)から引用した表を用意しました。これはキーワードの型チェックにおける主な不安定さを表示します。
  
    値                  クラス     型
    -------------------------------------
    "foo"               String     string
    new String("foo")   String     object
    1.2                 Number     number
    new Number(1.2)     Number     object
    true                Boolean    boolean
    new Boolean(true)   Boolean    object
    new Date()          Date       object
    new Error()         Error      object
    [1,2,3]             Array      object
    new Array(1, 2, 3)  Array      object
    new Function("")    Function   function
    /abc/g              RegExp     object
    new RegExp("meow")  RegExp     object
    {}                  Object     object
    new Object()        Object     object
    
ご覧のとおり、文字列をクォートで括るか、`String`クラスで定義するかが`typeof`の結果に影響します。論理的には`typeof`は`"string"`を両者のチェックに対し返すべきです。しかし後者には`"object"`を返します。不幸なことに不安定さはそこからさらに悪くなります。

それではJavaScriptにおける型チェックには何を使えるのでしょうか？幸運なことに`Object.prototype.toString()`がここでは救いとなります。この関数を適切なオブジェクトのコンテキストで実行した場合、正しい型を返します。やらねばならぬ事は返り値をマッサージして、`typeof`が本来返すべきだった値のような文字列にすることです。次のコードはjQueryの`$.type`から移植した実装例です。

<span class="csscript"></span>

    type = do ->
      classToType = {}
      for name in "Boolean Number String Function Array Date RegExp Undefined Null".split(" ")
        classToType["[object " + name + "]"] = name.toLowerCase()
      
      (obj) ->
        strType = Object::toString.call(obj)
        classToType[strType] or "object"
    
    # 期待する型を返します
    type("")         # "string"
    type(new String) # "string"
    type([])         # "array"
    type(/\d/)       # "regexp"
    type(new Date)   # "date"
    type(true)       # "boolean"
    type(null)       # "null"
    type({})         # "object"
    
もし変数が既に定義済みであるかを調べたいのならば、今でも`typeof`を使用する必要があります。そうしなければ`ReferenceError`を受け取ることになるでしょう。

<span class="csscript"></span>

    if typeof aVar isnt "undefined"
      objectType = type(aVar)
      
またはより簡潔に存在確認演算子を用います。

    objectType = type(aVar?)
    
型チェックの代わりに、しばしばダックタイピングとCoffeeScriptの存在確認演算子を一緒に用いることでオブジェクトの型を解く必要を無くすことが可能です。例として、配列に値をプッシュするとしましょう。こう言うことができます。「もし`array`であるかのようなオブジェクトが`push()`を実装しているのであれば、それを配列として扱うべきだろう。」

<span class="csscript"></span>

    anArray?.push? aValue
    
もし`anArray`が配列ではないオブジェクトだとしても、存在確認演算子が`push()`が呼ばれないことを保障します。
    
##instanceofの使用

JavaScriptの`instanceof`キーワードは`typeof`のようにほとんど壊れています。理想的には`instanceof`は2つのオブジェクトのコンストラクタを比較し、一方が他方のインスタンスであるかの真偽値を返すはずです。しかし実際には`instanceof`はカスタムメイドのオブジェクトを比較する場合のみ、うまく動作します。ビルトインタイプを比較する場合には`typeof`と同じように使いものになりません。

<span class="csscript"></span>

    new String("foo") instanceof String # true
    "foo" instanceof String             # false
    
さらに`instanceof`はまた、ブラウザの異なるフレームからのオブジェクトを比較する場合に動作しません。実際に`instanceof`はカスタムメイドのオブジェクトに対してのみ正しい結果を返します。例えばCoffeeScriptのクラスです。

<span class="csscript"></span>

    class Parent
    class Child extends Parent
    
    child = new Child
    child instanceof Child  # true
    child instanceof Parent # true
    
あなた自身が作成したオブジェクトに用いるか、より良くは、無かったことにしましょう。

##deleteの使用

`delete`キーワードはオブジェクトの中のプロパティを消去する場合にだけ安全に使用可能です。

<span class="csscript"></span>

    anObject = {one: 1, two: 2}
    delete anObject.one
    anObject.hasOwnProperty("one") # false

他のどんな使用も、例えば変数や関数を消す場合はうまくいきません。

<span class="csscript"></span>

    aVar = 1
    delete aVar
    typeof Var # "integer"

とても奇妙な挙動ですが、とにかく動作はしました。もし変数への参照を消したいのであれば、ただ代わりに`null`を代入しましょう。

<span class="csscript"></span>

    aVar = 1
    aVar = null

##parseIntの使用

JavaScriptの`parseInt()`関数は適切な基数を与えずに文字列を与えると思いもよらない結果を返します。

    # 8を返します。10でなく!
    parseInt('010') is 8
    
常に基数を関数に渡して正しく動作するようにしましょう。

    # 10を基数として用いることで正しい結果に
    parseInt('010', 10) is 10

これはCoffeeScriptがどうにかしてあげられることではありません。`parseInt()`を用いる場合には必ず基数を指示することを覚えなければなりません。
    
##ストリクトモード

ストリクトモードはECMAScript 5の新しい機能で、JavaScriptプログラムや関数を*strict*なコンテキストで実行することを許可します。このストリクトなコンテキストではより多くの例外や警告を通常のコンテキストに比べて投げるようになります。開発者に対しベストプラクティスから離れた場合や、最適化不能なコードや一般的な間違いを犯した場合に目安のようなものを与えます。つまりストリクトモードはバグを減らし、セキュリティを向上し、パフォーマンスも向上し、言語機能を用いるにおいての難しさを解消します。誰も嫌わないでしょう？

ストリクトモードは執筆時現在では次のブラウザでサポートされています。

* Chrome >= 13.0
* Safari >= 5.0
* Opera >= 12.0
* Firefox >= 4.0
* IE >= 10.0

そうはいってもストリクトモードは完全に後方互換性が古いブラウザに対してあります。それを用いたプログラムはストリクトとノーマルの両方のコンテキストで問題なく動作するはずです。

###ストリクトモードでの変化

ストリクトモードの変更のほとんどはJavaScriptの文法に関連するものです。

* プロパティと関数引数名の複製のエラー
* 不正な`delete`演算子の使用上のエラー
* `arguments.caller`と`arguments.callee`へのアクセスはエラーを投げる。(パフォーマンス上の理由で)
* `with`演算子を使用するとシンタックスエラーを上げる
* `undefined`のような変数には最早書込不可である
* 追加の予約語が増える。例えば`implements`, `interface`, `let`, `package`, `private`, `protected`, `public`, `static`, `yield`

しかし、ストリクトモードはまた実行時の挙動にも変更があります。

* グローバル変数が明示的になり、`var`が常に要求される。`this`のグローバルでの値は`undefined`
* `eval`はローカルコンテキストに新しい変数を追加できない
* 関数は使用される前に定義されねばならない。(以前は[関数はどこで定義しても良かった](http://whereswalden.com/2011/01/24/new-es5-strict-mode-requirement-function-statements-not-at-top-level-of-a-program-or-function-are-prohibited/))。
* `arguments`は変更不可(インミュータブル)

CoffeeScriptは既にストリクトモードの要求の多くを遵守しています。例えば変数定義では常に`var`を用います。しかしそれでもあなたのCoffeeScriptプログラムにおいてストリクトモードを許可するのはとても有益です。実際にCoffeeScriptはこれをより一歩進めて、[将来のバージョン](https://github.com/jashkenas/coffee-script/issues/1547)ではコンパイル時にストリクトモードに対する整合性をチェックするようになります。

###ストリクトモードの使用

ストリクトモードを使用するのに必要なことはスクリプトや関数を次の文字列で開始するだけです。

<span class="csscript"></span>
    
    ->
      "use strict"
    
      # ... あなたのコード ...
      
これで全てです。`'use strict'`で始めるだけです。これ以上簡単にならないくらいですし、後方互換性も完璧にあります。実際にストリクトモードを見てみましょう。次の関数はストリクトモードではシンタックスエラーを上げます。しかし通常のモードでは問題なく動作します。

<span class="csscript"></span>

    do ->
      "use strict"
      console.log(arguments.callee)
      
ストリクトモードでは`arguments.caller`と`arguments.callee`に対するアクセスを削除しました。それらはパフォーマンス悪化の主な原因であるためです。そしてそれらが使われる場合全てにおいてシンタックスエラーを上げます。

ストリクトモードを用いる場合に注意すべき心得があります。グローバル変数を作るときに`this`を用いる場合です。次の例は`TypeError`をストリクトモードでは投げます。しかし通常のコンテキストでは問題なく動作し、グローバル変数を作ります。

<span class="csscript"></span>

    do ->
      "use strict"
      class @Spine
      
裏側にあるこの違いの理由はストリクトモードでは`this`が`undefined`であるためです。通常では`window`オブジェクトを参照します。この問題の解決法は明示的に外部変数を`window`オブジェクトに対し設定することです。

<span class="csscript"></span>

    do ->
      "use strict"
      class window.Spine
      
ストリクトモードを許可することをお勧めしましたが、ストリクトモードは何も新しい機能をJavaScriptで使用可能にはしません。それに実際にはコードのパフォーマンスを少しだけ遅くします。VMにより多くのチェックを実行時にさせるためです。ストリクトモードで開発を行い、運用ではそれを外すのも良いでしょう。

##JavaScript Lint

[JavaScript Lint](http://www.javascriptlint.com/)はJavaScriptコードの品質チェックツールです。あなたのプログラムをLintに通してみることはコード品質を向上させるために最良の方法であり、ベストプラクティスでもあります。このプロジェクトは似たようなツールである[JSLint](http://www.jslint.com)を基にしています。JSLintのサイトにあるチェック対象の問題の[リスト](http://www.jslint.com/lint.html)を見てみてください。グローバル変数やセミコロンの存在や弱い等価比較などが含まれます。

良いニュースとして、CoffeeScriptは既に全ての出力に対して`lints`をかけています。従ってCoffeeScriptで生成されたJavaScriptは既にJavaScript Lint互換です。実際に`coffee`ツールは`--lint`オプションをサポートしています。

    coffee --lint index.coffee
      index.coffee:	0 error(s), 0 warning(s)
