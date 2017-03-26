<div class="back"><a href="index.html">&laquo; 索引に戻る</a></div>

#CoffeeScriptの文法

最初にこのセクションを始める前に再確認しておきましょう。CoffeeScriptの文法はしばしばJavaScriptと同じですが拡張ではありません。従っていくらかのJavaScriptのキーワード、例えば`function`や`var`は許されません。文法エラーになります。CoffeeScriptのファイルを書くのであれば純粋にCoffeeScriptである必要があります。2つの言語を混ぜることはできません。

なぜCoffeeScriptは拡張ではないのでしょうか? それはCoffeeScriptプログラムの空白が重要であることが、拡張であることを妨げるからです。その決定が行われてからはチームはあなたもまたそれに完璧に従いJavaScriptのいくつかのキーワードを非推奨として扱うことを、簡潔さの掟とよくあるバグを減らすための努力の名の元に行うよう決定したのです。

メタ的な意味で驚いたのはCoffeeScriptインタプリタ自身が実際にCoffeeScriptで書かれていたことでした。それは卵と鶏のパラドックスがついに解決したかに見えました！

さて、それでは最初に基本的な事柄に取り掛かりましょう。CoffeeScriptにはセミコロンがありません。コンパイル時に自動的に追加してくれます。セミコロンはJavaScriptコミュニティにおいて、いくつかのおかしなインタプリタの[挙動](http://bonsaiden.github.com/JavaScript-Garden/#core.semicolon)により多くの議論の的でした。とにかく、CoffeeScriptはこの問題を単純にセミコロンを文法から消し、裏側で必要に応じて追加することで解決しました。

コメントはRubyのコメントと同じフォーマットです。ハッシュ文字(`#`:通称、シャープ)で始めます。

<span class="csscript"></span>

    # これはコメント
    
複数行のコメントもまたサポートされており、生成されたJavaScriptにも保存されます。3つのシャープで括ります。

<span class="csscript"></span>

    ###
      複数行のコメント。たぶん、ライセンス
    ###

既に手短に説明しましたが、CoffeeScriptでは空白が重要です。実際に、これは中括弧(`{}`)をタブで置き換えられることを意味します。これはPythonの文法からインスピレーションを得ており、あなたのスクリプトが同じ様式で整形されることが保障されるという素敵な副作用を持っています。そうしなければコンパイルもできません！


##変数とスコープ

CoffeeScriptはJavaScriptの主な問題の1つを直しました。グローバル変数です。JavaScriptでは変数宣言の前に`var`を置くのを忘れてしまったために不本意にグローバル変数を宣言してしまうことが頻繁でした。CoffeeScriptはこれを単純にグローバル変数を無くすことで解決しています。裏側ではCoffeeScriptはスクリプトを無名関数でラップすることでローカルコンテキストを保持しています。そして自動的に全ての変数宣言に`var`を付けています。例えば次の単純な変数の割当をご覧下さい。

<span class="csscript"></span>

    myVariable = "test"

上のコード例の右上にダークグレーの箱があるのに気付かれますでしょうか。それをクリックしてください。コードはCoffeeScriptとコンパイルされたJavaScriptとでスィッチします。これはページの丁度中で実行時に描かれています。そのためコンパイルされた出力が正しいことを確認できるでしょう。

ご覧になられたとおり、変数の割当は完全にローカルに保持されます。グローバル変数を事故で作ることは不可能です。CoffeeScriptは実際にはこのステップをさらに延長し、高いレベルの変数を隠すことを難しくしています。このことがJavaScriptにおいて開発者が最も一般的に行ってしまう誤りを防ぐ良い取引となっています。

しかしながら、時々、グローバル変数を作ることは便利な事です。グローバルオブジェクト(ブラウザでは`window`)のプロパティとして直接設定するか、次のパターンを用いることで可能です。

<span class="csscript"></span>

    exports = this
    exports.MyVariable = "foo-bar"
    
rootコンテキストでは`this`はグローバルオブジェクトに等しくなります。`exports`という名の変数を作成することで、あなたのコードを読む誰にとってもスクリプトがどんなグローバル変数を作っているかが明らかになるでしょう。加えて、CommonJSモジュールについて可能とします。この本では後でその事についてもカバーします。

##関数

CoffeeScriptはとても冗長なfunction文を削除しました。そしてそれを細い矢印`->`で置き換えました。関数は1行でも良いし、インデントを行って複数行記述も可能です。関数の最後の式が暗黙的に返り値となります。つまり`return`文を使う必要がありません。関数の途中で返り値を返したい場合には使うことも可能です。
    
そのことを頭に入れて、次の例を見てみましょう
    
<span class="csscript"></span>

    func = -> "bar"

コンパイルの結果が、`->`が`function`になるのが見えると思います。そして`"bar"`という文字列が自動的にreturnされるのもおわかりでしょうか。

先程お話しましたとおり、複数行を問題無く使うことができます。ただし適切に関数の本体をインデントする必要があります。

<span class="csscript"></span>

    func = ->
      # 余分な行
      "bar"
      
###関数引数

引数はどうやって指定するのでしょうか？CoffeeScriptでは矢印の前で、括弧の中に引数を指定します。

<span class="csscript"></span>

    times = (a, b) -> a * b

CoffeeScriptはデフォルト引数もサポートします。例えば：

<span class="csscript"></span>

    times = (a = 1, b = 2) -> a * b
    
また可変長引数を利用するのにスプラットを用いることも可能です。`...`の名称です。

<span class="csscript"></span>

    sum = (nums...) -> 
      result = 0
      nums.forEach (n) -> result += n
      result

上の例では`nums`は関数に渡された全ての引数の配列です。これは`arguments`オブジェクトではありません。本物の配列です。だからこれを取り扱うのに`Array.prototype.splice`や`jQuery.makeArray()`の使用をあなた自身で考慮する必要がありません。

<span class="csscript"></span>

    trigger = (events...) ->
      events.splice(1, 0, this)
      this.constructor.trigger.apply(events)

###関数の実行

関数はJavaScriptと全く同じように実行することが可能です。括弧:`()`を付けたり、`apply()`を適用したり、`call()`を呼んだりです。しかしRubyのように、CoffeeScriptは関数が最低一つの引数と実行されれば、自動的に関数を呼出します。

<span class="csscript"></span>

    a = "Howdy!"
    
    alert a
    # 次と同じ
    alert(a)

    alert inspect a
    # 次と同じ
    alert(inspect(a))
    
括弧は必須ではありませんが、何がどんな引数と実行されるか直ぐに明らかに判る場合以外は使用することをお勧めします。`inspect`を用いる最後の例では、私は最低でも`inspect`の実行には括弧を付けることを強くお勧めします。

<span class="csscript"></span>

    alert inspect(a)

もし実行時に1つも引数を渡さない場合、CoffeeScriptはあなたが関数の実行を意味しているのか、変数として取り扱って欲しいのか理解できません。この事実より、CoffeeScriptの処理は常に関数参照を実行するRubyとは異なり、Pythonにより近いものとなっています。このことが私のCoffeeScriptプログラムではいくつかのエラーの元となりました。従ってあなたが引数無しで関数を起動する場合には十分に気を付けて括弧を付けましょう。

###関数コンテキスト

コンテキストの変化はJavaScriptにおいて嫌なものです。特にイベントコールバックにおいては顕著です。そのためCoffeeScriptではこれを管理するためにいくらか助けとなるものを用意しました。そのようなヘルパーの一つが`->`のバリエーションである太った矢印(ファットアロー)`=>`の関数です。

細い矢印の代わりにファットアローを用いることで、関数のコンテキストがローカルのものに紐付けられることを確実にします。以下の例をご覧下さい。

<span class="csscript"></span>

    this.clickHandler = -> alert "clicked"
    element.addEventListener "click", (e) => this.clickHandler(e)

これを行いたい理由は`addEventListener()`からのコールバックは通常`element`のコンテキストにて実行されるからです。すなわち`this`は`element`に等しくなります。もしあなたが`self = this`のような面倒をせずに`this`をローカルコンテキストに留めたい場合にはファットアローを用います。

このバインディングのアイデアはjQueryの[`proxy()`](http://api.jquery.com/jQuery.proxy/)や[ES5](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind)の`bind()`関数と似たコンセプトです。

##オブジェクトの構文と配列の定義

オブジェクト構文はJavaScriptと全く同じように指定可能です。中括弧のペアやキー/バリューの文を使います。しかし関数実行と同じように、CoffeeScriptは中括弧を省略可能です。実はインデントもまた使うことが可能ですし、改行をカンマの変わりに用いることができます。

<span class="csscript"></span>

    object1 = {one: 1, two: 2}

    # 中括弧無しで
    object2 = one: 1, two: 2
    
    # 改行をカンマの変わりにする
    object3 = 
      one: 1
      two: 2
    
    User.create(name: "John Smith")

同様に、配列はインデントをカンマの代わりに区切に用いることができます。ただし角括弧(`[]`)は必須です。

<span class="csscript"></span>

    array1 = [1, 2, 3]

    array2 = [
      1
      2
      3
    ]

    array3 = [1,2,3,]
    
上の`array3`の例でわかるようにCoffeeScriptは最後のカンマ(`trailing comma`)を取り除いています。これもまた良くあるクロスブラウザでのエラーの元です。

##フローコントロール

CoffeeScriptの括弧が必須でないというお約束は`if`と`else`キーワードでも続きます。

<span class="csscript"></span>

    if true == true
      "We're ok"
      
    if true != true then "Panic"
    
    # 以下と同じ意味
    #  (1 > 0) ? "Ok" : "Y2K!"
    if 1 > 0 then "Ok" else "Y2K!"
    
上でわかりますように、もし`if`文が1行であるなら`then`キーワードを用いる必要があります。そうすることでCoffeeScriptはいつブロックが始まるか理解できます。条件演算子(`?:`)はサポートされていません。そのかわりに1行で`if/else`文を用いなければいけません。

CoffeeScriptはまたRubyの慣用句である後置`if`文を利用可能です。

<span class="csscript"></span>

    alert "It's cold!" if heat < 5

否定にびっくりマーク(`!`)を用いる代わりに、`not`キーワードを用いることが可能です。それを用いることでコードをより読み易くすることが可能です。びっくりマークは簡単に見落としますから。

<span class="csscript"></span>

    if not true then "Panic"
    
上の例ではCoffeeScriptの`unless`文を`if`の反対として使用可能です。

<span class="csscript"></span>

    unless true
      "Panic"

`not`と似た感覚で、CoffeeScriptは`is`文も持っています。`===`に変換されます。

<span class="csscript"></span>

    if true is 1
      "Type coercion fail!"
      
`is not`の代わりに、`isnt`を使用可能です。

<span class="csscript"></span>

    if true isnt true
      alert "Opposite day!"

上の例でお気付きでしょうが、CoffeeScriptは`==`演算子を`===`に変換し、`!=`を`!==`に変換します。これは私の好きなこの言語の最もシンプルな機能の1つです。この考えの背景にあるものは何でしょうか？率直に言ってJavaScriptの型変換は少し変です。そしてそれらの比較演算子は比較のために型変換を強制します。そのことが理解し難い挙動に繋り、ひいては多くのバグの元となります。この話題については第7章でより長い議論を行います。
    
##文字列への挿入

CoffeeScriptはRuby式の文字列への挿入をJavaScriptに対し追加しています。ダブルクォートで括った文字列に対しては`#{}`タグを含むことができます。その中に文字列に対して挿入される式を記述します。

<span class="csscript"></span>

    favourite_color = "Blue. No, yel..."
    question = "Bridgekeeper: What... is your favourite color?
                Galahad: #{favourite_color}
                Bridgekeeper: Wrong!
                "

上の例を見てわかります通り、複数行に渡る文字列もまた可能です。各行に`+`を置く必要はありません。

##ループと内包表記

JavaScriptの配列の繰り返しはとても古風な文法でした。C言語のようなより古い言語を思い出させ、現在のオブジェクト指向言語とは異なります。ES5の`forEach()`の登場により状況はいくらか改善されました。しかしそれでも毎回関数呼出を必要とし、そのために遅いものとなっています。再びCoffeeScriptの美しい文法がその救いとなります。

<span class="csscript"></span>

    for name in ["Roger", "Roderick", "Brian"]
      alert "Release #{name}"
      
もし繰り返しのインデックスが必要なら、もう1つの引数を渡すだけです。
      
<span class="csscript"></span>

    for name, i in ["Roger the pickpocket", "Roderick the robber"]
      alert "#{i} - Release #{name}"

後置形式を用いることで1行で繰返すことも可能です。

<span class="csscript"></span>

    release prisoner for prisoner in ["Roger", "Roderick", "Brian"]
    
Pythonの内包表記のように、フィルタリングを行うことも可能です。

<span class="csscript"></span>

    prisoners = ["Roger", "Roderick", "Brian"]
    release prisoner for prisoner in prisoners when prisoner[0] is "R" 

内包表記を用いてオブジェクトのプロパティについて繰り返しを行うことも可能です。`in`キーワードの代わりに`of`を使用して下さい。

<span class="csscript"></span>

    names = sam: seaborn, donna: moss
    alert("#{first} #{last}") for first, last of names

CoffeeScriptが持つ低レベルなループは`while`のみです。JavaScriptの`while`と同じような動作をします。しかし利点が追加されており、結果として配列を返します。つまり`Array.prototype.map()`関数と同じ挙動です。

<span class="csscript"></span>

    num = 6
    minstrel = while num -= 1
      num + " Brave Sir Robin ran away"

##配列

CoffeeScriptは配列の範囲(region)を用いたスライスについてRubyからヒントを得ています。範囲は2つの数値から作られます。最初と最後の位置を示す2つの数値は`..`か`...`で区切られます。もし範囲の前に何も無い場合にはCoffeeScriptはそれを配列に変換します。

<span class="csscript"></span>

    range = [1..5]
    
しかし、もし範囲が変数の直後に置かれたならCoffeeScriptはそれを`slice()`メソッドの呼出に変換します。
    
<span class="csscript"></span>

    firstTwo = ["one", "two", "three"][0..1]
    
上の例では範囲は新しい配列を返します。元の配列の最初の2つの要素のみを持つ配列です。同じ文法を配列の一部を他の配列で置換することにも使えます。

<span class="csscript"></span>

    numbers = [0..9]
    numbers[3..5] = [-3, -4, -5]

便利なことにJavaScriptでは`slice()`を文字列に対しても呼ぶことが可能です。そのため範囲を文字列に対して使用することで部分文字列を返すことが可能です。
    
<span class="csscript"></span>

    my = "my string"[0..2]

JavaScriptでは配列の中にある値が存在するか確認することはとても面倒でした。`indexOf()`が全てのブラウザ間においてサポートされている訳ではなかったからです。(IE、君のことを言っているんだよ)。CoffeeScripitはこれを`in`演算子で解決します。次の例をご覧下さい。

<span class="csscript"></span>

    words = ["rattled", "roudy", "rebbles", "ranks"]
    alert "Stop wagging me" if "ranks" in words 

##エイリアス(別名)と存在確認演算子

CoffeeScriptはいくつかの便利なエイリアスをタイピングの量を減らすために利用できます。そのうちの1つは`@`です。これは`this`のエイリアスです。

<span class="csscript"></span>

    @saviour = true
    
もう1つは`::`です。これは`prototype`の別名です。

<span class="csscript"></span>

    User::first = -> @records[0]
    
JavaScriptでは`if`を`null`チェックに用いることは普通です。しかし空文字列と0が共に`false`に変換されることが落とし穴として存在し、あなたを陥れます。CoffeeScriptの存在確認演算子である`?`は変数が`null`でないか、`undefined`でなければtrueを返します。Rubyの`nil?`と同様です。

<span class="csscript"></span>

    praise if brian?
    
これは`||`演算子の代わりにも使えます。

<span class="csscript"></span>

    velocity = southern ? 40
    
もし`null`チェックをプロパティにアクセスする前に行う場合、存在確認演算子をその前に置くだけでスキップすることが可能です。これはActive Supportの[`try`](http://guides.rubyonrails.org/active_support_core_extensions.html#try)メソッドに似ています。

<span class="csscript"></span>

    blackKnight.getLegs()?.kick()
    
同様に、プロパティが実際に関数であり呼出可能かチェックすることが括弧の直前に存在確認演算子を置くことで可能です。もしプロパティが存在しないか、関数ではない場合、呼出は行われません。

<span class="csscript"></span>

    blackKnight.getLegs().kick?()
