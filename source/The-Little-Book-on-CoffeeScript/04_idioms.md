<div class="back"><a href="index.html">&laquo; 索引に戻る</a></div>

#CoffeeScriptに共通なイディオム

各言語には慣用句や慣習があります。CoffeeScriptも例外ではありません。この章ではそれらの規約を説明し、JavaScriptとCoffeeScriptの比較をいくつかご紹介することでこの言語の実践的なセンスを得て頂きます。

##Each

JavaScriptでは配列の全てのアイテムに対し繰返しを行う場合、新しく追加された[`forEach()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/foreach)関数を用いるか、古いC言語のスタイルである`for`ループを用いることができました。もしECMAScript 5で紹介されたJavaScriptの最新の機能を用いる計画でしたら、私は古いブラウザもサポートするために[shim](https://github.com/kriskowal/es5-shim)をページに入れておくことをお勧めします。
    
    for (var i=0; i < array.length; i++)
      myFunction(array[i]);
      
    array.forEach(function(item, i){
      myFunction(item)
    });

`forEach()`の文法は簡潔で読み易いものですが、配列の個々の繰り返しにおいてコールバック関数が実行されるための不利益を被ります。つまり同等な`for`ループに比べると遅くなります。CoffeeScriptではどうなるか見てみましょう。

<span class="csscript"></span>
      
    myFunction(item) for item in array
    
読み易く簡潔な文法です。あなたも同意されることを疑いません。そしてこれの良いところは裏側では`for`ループにコンパイルされることです。つまりCoffeeScriptの文法は`forEach()`と同じ表現力を持ちながら、パフォーマンスやshimの必要性といった警告がありません。
    
##Map

`forEach()`と同じように、ES5は自然なmap関数も持っています。以前の`for`ループに比べより簡潔な文法を持っています。すなわち[`map()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map)です。残念なことにこれも`forEach()`と同じ警告を受けています。実行速度が関数呼出のために大きく劣っているのです。

    var result = []
    for (var i=0; i < array.length; i++)
      result.push(array[i].name)

    var result = array.map(function(item, i){
      return item.name;
    });

文法の章で説明したとおり、CoffeeScriptの内包表記は`map()`と同じ処理を行うことが可能です。内包表記を括弧で囲んでいることに注意して下さい。それはあなたが期待したmapを実行した結果の配列を得ることを確実にするのに**とても重要**です。

<span class="csscript"></span>

    result = (item.name for item in array)

##選択

同様に、ES5は配列を縮約するのに便利な関数、[`filter()`](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/filter)を持っています。
    
    var result = []
    for (var i=0; i < array.length; i++)
      if (array[i].name == "test")
        result.push(array[i])

    result = array.filter(function(item, i){
      return item.name == "test"
    });

CoffeeScriptの基本的文法は`when`キーワードをアイテムを比較しながらフィルタリングするのに用います。裏側では`for`ループが生成されています。実行の全体は無名関数の中で行なわれ、スコープが漏れることや変数名の衝突を防ぎます。

<span class="csscript"></span>

    result = (item for item in array when item.name is "test")

括弧を絶対に忘れないで下さい。でなければ`result`は配列の最後の要素になるでしょう。
CoffeeScriptの内包表記はとても自由度が高く次の例のようにとても強力な選択を行うことを可能にします。

<span class="csscript"></span>

    passed = []
    failed = []
    (if score > 60 then passed else failed).push score for score in [49, 58, 76, 82, 88, 90]
    
    # または
    scores = [49, 58, 76, 82, 88, 90]
    passed = (score for score in scores when score > 60)
    
もし内包表記が長すぎる場合には複数行に分けることが可能です。

<span class="csscript"></span>

    passed = []
    failed = []
    for score in [49, 58, 76, 82, 88, 90]
      (if score > 60 then passed else failed).push score

##含む

配列の中に値が存在するかを確認するには通常は`indexOf()`を用います。しかしInternet Explorerがそれを実装していないがために、うんざりすることですが今でも代替法が必要です。

    var included = (array.indexOf("test") != -1)

CoffeeScriptはPythonプログラマなら気付くであろうこれに対する素敵な代替法を持っています。つまり`in`です。

<span class="csscript"></span>
    
    included = "test" in array

裏側ではCoffeeScriptは配列の中に値があるかを確認するのに`Array.prototype.indexOf()`を使用しています。そしてもし必要ならその代替を利用しています。残念なことですがこれは同じ`in`という文法が文字列に対しては動作しないことを意味します。`indexOf()`を使う方法に戻って、結果が`-1`でないか確認します。

<span class="csscript"></span>

    included = "a long test string".indexOf("test") isnt -1

またはより良い方法として、ビット演算をハイジャックして`-1`との比較をしなくてもすむようにします
<span class="csscript"></span>
    
    string   = "a long test string"
    included = !!~ string.indexOf "test"
    
##プロパティの繰り返し

JavaScriptでプロパティの塊について繰返す場合には`in`演算子を用いました。次の例をご覧下さい。

    var object = {one: 1, two: 2}
    for(var key in object) alert(key + " = " + object[key])
    
しかし、前のセクションで見たとおり、CoffeeScriptは既に`in`を配列に用いるのに予約済みです。その代わりに、演算子は`of`と名前を変えこのように使えます。

<span class="csscript"></span>
    
    object = {one: 1, two: 2}
    alert("#{key} = #{value}") for key, value of object
    
ご覧のように、プロパティの名前とその値の両方に変数を指定可能です。より便利になりました。
    
##最小/最大

このテクニックはCoffeeScript特有のものではありません。しかし便利なのでとにかく紹介してみましょう。`Math.max`と`Math.min`は複数の引数を取ります。そのため`...`を用いることで配列を渡し、配列の中の最大値と最小値を得ることができます。

<span class="csscript"></span>

    Math.max [14, 35, -7, 46, 98]... # 98
    Math.min [14, 35, -7, 46, 98]... # -7
    
このトリックが本当に大きな配列では失敗してしまうのは仕方がありません。ブラウザは関数に渡せる引数の数に制限があります。
    
##複数の引数

上の`Math.max`の例では`...`を使い配列を解体し複数の引数として`max`に渡しました。裏側ではCoffeeScriptは関数呼出を`apply()`を使うように変換し、配列が複数の引数として`max`に渡るようにしています。この機能を他にも使うことが可能です。例えば関数呼出を委任(proxy)するには次のようにします。

<span class="csscript"></span>

    Log =
      log: ->
        console?.log(arguments...)
      
または引数をパスする前に変えてしまうことも可能です。

<span class="csscript"></span>

    Log =
      logPrefix: "(App)"

      log: (args...) ->
        args.unshift(@logPrefix) if @logPrefix
        console?.log(args...)
        
しかし次のことは心に留めておいてください。CoffeeScriptは自動的に関数の実行コンテキストをその関数が実行されるオブジェクトに設定します。上の例では`console`になるでしょう。もし特定のコンテキストを設定したい場合には`apply()`を手動で呼ばなければなりません。

##And/or

CoffeeScriptスタイルガイドは`or`は`||`より好ましく、`and`は`&&`より好ましいと指示しています。私はそれが何故だかわかります。前者のほうがより読み易いといったところです。それでもなお2つのスタイルは同じ結果をもたらします。

このより英語らしいスタイルという優先度は`==`の代わりに`is`、`!=`の代わりに`isnt`ということにも当て嵌ります。
    
<span class="csscript"></span>

    string = "migrating coconuts"
    string == string # true
    string is string # true
    
CoffeeScriptへのとても嬉しい拡張の1つは`or=`です。これはRuby使いなら`||=`と認識するでしょう。
    
<span class="csscript"></span>

    hash or= {}
    
もしhashが`false`と評価されるならそれには空のオブジェクトが代入されます。ここで重要なのはこの式は`0`、`""`、`null`もまたfalseと判定することです。もしそれがあなたの意図することでなければCoffeeScriptの存在確認演算子を用いるべきでしょう。そちらは`hash`が`undefined`であるか`null`である場合のみ作動します。

<span class="csscript"></span>

    hash ?= {}

##割当の解体

割当の解体は任意の深さの配列とオブジェクトのネストに用いられ、奥にネストされたプロパティを取り出すのを手助けします。

<span class="csscript"></span>

    someObject = { a: 'value for a', b: 'value for b' }
    { a, b } = someObject
    console.log "a is '#{a}', b is '#{b}'"
    
これはNodeのアプリケーションにおいてモジュールを必要とする場合に特に有効です。

<span class="csscript"></span>

    {join, resolve} = require('path')
    
    join('/Users', 'Alex')

##外部ライブラリ

外部ライブラリを利用することはCoffeeScriptのライブラリの関数を呼ぶのと全く同じです。なぜなら全ては最後にはJavaScriptへとコンパイルされるからです。CoffeeScriptと[jQuery](http://jquery.com)を同時に利用するのは特にエレガントです。jQueryのAPIには大量のコールバックがあるからです。

<span class="csscript"></span>

    # ローカルの別名を使う
    $ = jQuery

    $ ->
      # DOMコンテンツのロード終了後
      $(".el").click ->
        alert("Clicked!")
    
全てのCoffeeScriptの出力は無名関数にてラップされるため、ローカルの`$`を`jQuery`のエイリアスとして設定可能です。これによりjQueryの衝突回避モードが許可されていて`$`が再定義されていても私達のスクリプトは望んだとおりに機能することを確実にします。

##プライベート変数

CoffeeScriptの`do`キーワードは関数を直ぐに実行しますが、スコープをカプセル化し、変数を守るのに最高の方法です。下の例では、`classToType`という変数を無名関数のコンテキストで定義し、`do`により直ぐに実行しています。その無名関数は2つ目の無名関数を返します。

<span class="csscript"></span>

    # 関数をすぐに実行する
    type = do ->
      classToType = {}
      for name in "Boolean Number String Function Array Date RegExp Undefined Null".split(" ")
        classToType["[object " + name + "]"] = name.toLowerCase()
      
      # 関数を返す
      (obj) ->
        strType = Object::toString.call(obj)
        classToType[strType] or "object"

つまり、`classToType`は完全にプライベートで実行中の無名関数の外側からは二度と参照することはできません。このパターンはスコープをカプセル化し、変数を隠すのに最適です。
