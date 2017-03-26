<div class="back"><a href="index.html">&laquo; 索引に戻る</a></div>

#クラス

JavaScriptのクラスは純粋主義者にとってニンニクがドラキュラに対して与えるものと同様な影響を持っていました。とはいえ、正直に言ってあなたがそのような傾倒をお持ちでしたらCoffeeScriptの本を呼んだりはしないでしょう。しかし、クラスは他の言語と同じようにJavaScriptでもとても便利であると判明しました。そしてCoffeeScriptは素晴しい抽象化を提供します。

その裏では、CoffeeScriptはJavaScriptのネイティブなprototypeをクラスを作成するのに用いています。少しの構文糖を静的なプロパティの継承とコンテキストの永続化のために用いています。開発者としてのあなたに見えるのは`class`キーワードだけです。

<span class="csscript"></span>

    class Animal
    
この上の例では`Animal`がクラス名であり、かつ結果としてインスタンスの作成に用いる変数です。裏側ではCoffeeScriptはコンストラクタ関数を用いており、クラスのインスタンスを`new`演算子を用いて作成することが可能です。

<span class="csscript"></span>

    animal = new Animal

コンストラクタ(インスタンス化において実行される関数)を定義することは簡単です。`constructor`という名前の関数を使用してください。これはRubyの`initialize`やPythonの`__init__`と同様です。

<span class="csscript"></span>

    class Animal
      constructor: (name) ->
        @name = name

実はCoffeeScriptはインスタンスのプロパティ設定の一般的なパターンのために速記法を用意しています。引数の直前に`@`を置くことで、CoffeeScriptはコンストラクタの中では自動的に引数をインスタンスのプロパティに設定します。実際にはこの速記法はクラスの外の通常の関数でも使用可能です。下の例は先程の例と等価です。先程はインスタンスのプロパティを手で設定しています。

<span class="csscript"></span>

    class Animal
      constructor: (@name) ->

期待どおりに、インスタンス化において渡される任意数の引数はコンストラクタ関数に渡されます。

<span class="csscript"></span>

    animal = new Animal("Parrot")
    alert "Animal is a #{animal.name}"

##インスタンスプロパティ

クラスにインスタンスプロパティを追加することはとても簡単です。オブジェクトにプロパティを追加する文法そのものです。ただプロパティがクラスの本体で正しくインデントされているかは注意してください。

<span class="csscript"></span>

    class Animal
      price: 5

      sell: (customer) ->
        
    animal = new Animal
    animal.sell(new Customer)

JavaScriptにおけるコンテキストの変更は嫌なものです。以前の文法の章でCoffeeScriptがファットアロー`=>`を用いることで`this`の値を特有のコンテキストにロックすることを説明しました。関数がどのようなコンテキストの下に呼ばれようとも、関数が作成されたコンテキストの下で実行されます。つまりファットアローをインスタンスメソッドに用いることで、それが正しいコンテキストで実行されることを確認することができます。`this`は常に現在のインスタンスになります。
    
<span class="csscript"></span>

    class Animal
      price: 5

      sell: =>
        alert "#{@price}シリングになります!"
        
    animal = new Animal
    $("#sell").click(animal.sell)
    
上の例でデモしたとおり、これはイベントコールバックにおいてとても便利です。通常は`sell()`関数は`#sell`要素の下で実行されます。しかし`sell()`に対しファットアローを用いることで正しいコンテキストが管理されていることを確認できます。`this.price`は`5`に等しくなります。

##静的なプロパティ

クラスの(つまり静的な)プロパティはどうやって定義するのでしょうか？実はクラス定義の中では`this`はクラスオブジェクトを指しています。つまりクラスプロパティは`this`の上に直接設定することになります。

<span class="csscript"></span>

    class Animal
      this.find = (name) ->      

    Animal.find("Parrot")
    
実際には、あなたも覚えておいででしょうが、CoffeeScriptには`this`を`@`で記述可能で、静的プロパティをより簡潔に記述可能です。
    
<span class="csscript"></span>

    class Animal
      @find: (name) ->
      
    Animal.find("Parrot")

##継承とsuper

何らかの形の継承が無ければ正しいクラスの実装にはならないでしょう。CoffeeScriptは失望させません。`extends`キーワードを用いて他のクラスを継承することが可能です。下の例では`Parrot`は`Animal`を拡張し、全てのインスタンスプロパティ、`alive()`等を継承しています。

<span class="csscript"></span>

    class Animal
      constructor: (@name) ->
      
      alive: ->
        false

    class Parrot extends Animal
      constructor: ->
        super("Parrot")
      
      dead: ->
        not @alive()

上の例でお気付きになられるでしょうが、ここでは`super()`キーワードを使いました。裏側ではクラスの親のprototypeの関数呼出に翻訳され、現在のコンテキストにて実行されます。この例では`Parrot.__super__.constructor.call(this, "Parrot");`になります。実際にこれはRubyやPythonで`super`を実行したのと同じ影響を持ち、オーバーライドされた関数を実行します。

`constructor`をオーバーライドしない限り、デフォルトでCoffeeScriptは親のコンストラクタをインスタンスが作成された時に実行します。

CoffeeScriptはprotype形式の継承を用いて、自動的にクラスの全てのインスタンスプロパティを継承します。これはクラスが動的であることを示します。子が作成された後に親クラスにインスタンスプロパティを追加すればそのプロパティは全ての継承した子に伝播します。

<span class="csscript"></span>

    class Animal
      constructor: (@name) ->
      
    class Parrot extends Animal
    
    Animal::rip = true
    
    parrot = new Parrot("Macaw")
    alert("This parrot is no more") if parrot.rip

しかし静的なプロパティはサブクラスにコピーされるのであり、インスタンスプロパティのようにプロトタイプを用いて継承されるのではないことは重要です。これはJavaScriptのプロトタイプアーキテクチャの実装の詳細によります。そして次善の策を探すのは難しい問題です。

##ミックスイン

ミックスイン[Mixins](http://en.wikipedia.org/wiki/Mixin)はCoffeeScriptの言語仕様としてサポートされたものではありません。しかし簡単に実装可能です。例として、2つの関数を考えます。`extend()`と`include()`はあるクラスにクラスとインスタンスのプロパティを別々に追加します。

<span class="csscript"></span>

    extend = (obj, mixin) ->
      obj[name] = method for name, method of mixin        
      obj

    include = (klass, mixin) ->
      extend klass.prototype, mixin
    
    # Usage
    include Parrot,
      isDeceased: true
      
    (new Parrot).isDeceased
    
ミックスインは継承が適切でない場合にモジュール間で共通なロジックを共有するのにとても良いパターンです。ミックスインの利点は継承が1つのクラスからしか継承できないのに対し、複数を取り込めることです。

##クラスの拡張

ミックスインはとても格好良いです。しかしあまりオブジェクト指向ではありません。代わりとしてCoffeeScriptのクラスにミックスインを統合しましょう。`Module`と呼ばれるクラスを定義してミックスインサポートのために継承できるようにしましょう。`Module`は2つの静的関数を持ちます。`@extend()`と`@include()`で静的プロパティとインスタンスプロパティを個別に拡張するのに利用可能です。

<span class="csscript"></span>

    moduleKeywords = ['extended', 'included']

    class Module
      @extend: (obj) ->
        for key, value of obj when key not in moduleKeywords
          @[key] = value

        obj.extended?.apply(@)
        this
        
      @include: (obj) ->
        for key, value of obj when key not in moduleKeywords
          # Assign properties to the prototype
          @::[key] = value

        obj.included?.apply(@)
        this

`moduleKeywords`変数まわりのちょっとしたダンスはミックスインがクラスを拡張した時にコールバックをサポートするためです。我々の`Module`クラスがどう動くか見てみましょう。

<span class="csscript"></span>

    classProperties = 
      find: (id) ->
      create: (attrs) ->
      
    instanceProperties =
      save: -> 

    class User extends Module
      @extend classProperties
      @include instanceProperties
    
    # Usage:
    user = User.find(1)
    
    user = new User
    user.save()
    
ご覧のとおり、我々は静的プロパティとして`find()`と`create()`を`User`クラスに追加しました。またインスタンスプロパティも`save()`を追加しました。
モジュールが拡張されたときにはコールバックを得ますので静的、及びインスタンスプロパティを適用するプロセスはショートカット可能です。

<span class="csscript"></span>

    ORM = 
      find: (id) ->
      create: (attrs) ->
      extended: ->
        @include
          save: -> 

    class User extends Module
      @extend ORM

とてもシンプルでエレガントでしょう！
