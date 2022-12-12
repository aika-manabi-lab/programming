# <ruby>秋鹿学<rt>あいかまな</rt></ruby>びラボ プログラミング<ruby>教室<rt>きょうしつ</rt></ruby> ステップアップ

## シューティングゲームを<ruby>作<rt>つく</rt></ruby>ってみよう

### 1. シューティングゲームの<ruby>説明<rt>せつめい</rt></ruby>

- みどりの<ruby>旗<rt>はた</rt></ruby>が<ruby>押<rt>お</rt></ruby>されたらゲームスタート

  <img src="images/green-flag.png" width="80">

- キーボードの<ruby>矢印<rt>やじるし</rt></ruby>キーでネコが<ruby>上下<rt>じょうげ</rt></ruby>に<ruby>動<rt>うご</rt></ruby>かせるようにします

  <img src="images/cat-up-down.png" width="80">

- キーボードのスペースキーを<ruby>押<rt>お</rt></ruby>したらネコが<ruby>右<rt>みぎ</rt></ruby>にビームを<ruby>出<rt>だ</rt></ruby>します

  <img src="images/cat-and-arrow.png" width="120" align="middle"> <ruby>赤<rt>あか</rt></ruby>の<ruby>矢印<rt>やじるし</rt></ruby>がビーム！

- <ruby>敵<rt>てき</rt></ruby>は<ruby>右端<rt>みぎはし</rt></ruby>で<ruby>上下<rt>じょうげ</rt></ruby>に<ruby>動<rt>うご</rt></ruby>きます

  <img src="images/cat-arrow-frank.png" width="500">

- <ruby>敵<rt>てき</rt></ruby>にビームが<ruby>当<rt>あ</rt></ruby>たると「やられた」と<ruby>言<rt>い</rt></ruby>って<ruby>消<rt>き</rt></ruby>えます

  <img src="images/skeleton.png" width="120" align="middle"> がいこつになって<ruby>消<rt>き</rt></ruby>える

<div class="page"/>

### 2. <ruby>準備<rt>じゅんび</rt></ruby>

- スプライトを 3 つ<ruby>準備<rt>じゅんび</rt></ruby>します

  <img src="images/prepare-1.png">

- このテキストではネコ（<ruby>味方<rt>みかた</rt></ruby>）、<ruby>矢印<rt>やじるし</rt></ruby>（ビーム）、フランケンシュタイン（<ruby>敵<rt>てき</rt></ruby>）を<ruby>使<rt>つか</rt></ruby>います
- <ruby>好<rt>す</rt></ruby>きなスプライトを 3 つ<ruby>選<rt>えら</rt></ruby>んでみましょう
  - <img src="images/sprite-icon.png" width="30" align="middle">を押すとスプライトを<ruby>選<rt>えら</rt></ruby>べます
- <ruby>味方<rt>みかた</rt></ruby>、ビーム、<ruby>敵<rt>てき</rt></ruby>で<ruby>別々<rt>べつべつ</rt></ruby>にプログラムを<ruby>作<rt>つく</rt></ruby>っていきます

  <img src="images/prepare-2.png">

<div class="page">

### 3. スプライトの<ruby>設定<rt>せってい</rt></ruby>

3 つのスプライトの<ruby>名前<rt>なまえ</rt></ruby>や<ruby>大<rt>おお</rt></ruby>きさなどを<ruby>設定<rt>せってい</rt></ruby>します。

- <ruby>味方<rt>みかた</rt></ruby>の<ruby>設定<rt>せってい</rt></ruby>

  <img src="images/friend.png" width="400">

  - スプライトの<ruby>名前<rt>なまえ</rt></ruby>を「みかた」にします
  - x を「-180」にします
  - y を「0」にします
  - <ruby>大<rt>おお</rt></ruby>きさを「50」にします

- ビームの<ruby>設定<rt>せってい</rt></ruby>

  <img src="images/beam.png" width="400">

  - スプライトの<ruby>名前<rt>なまえ</rt></ruby>を「ビーム」にします
  - x を「0」にします
  - y を「0」にします
  - <ruby>大<rt>おお</rt></ruby>きさを「50」にします

<div class="page"/>

- <ruby>敵<rt>てき</rt></ruby>の<ruby>設定<rt>せってい</rt></ruby>

  <img src="images/enemy.png" width="400">

  - スプライトの<ruby>名前<rt>なまえ</rt></ruby>を「てき」にします
  - x を「180」にします
  - y を「0」にします
  - <ruby>大<rt>おお</rt></ruby>きさを「50」にします

### 4. <ruby>味方<rt>みかた</rt></ruby>のプログラム

キーボードで<ruby>上下<rt>じょうげ</rt></ruby>に<ruby>動<rt>うご</rt></ruby>かすには、「イベント」の「〜キーが<ruby>押<rt>お</rt></ruby>されたとき」と、「<ruby>動<rt>うご</rt></ruby>き」の「y<ruby>座標<rt>ざひょう</rt></ruby>を〜ずつ<ruby>変<rt>か</rt></ruby>える」を<ruby>使<rt>つか</rt></ruby>います。

<img src="images/friend-program.png" width="300">

> チャレンジ
>
> y<ruby>座標<rt>ざひょう</rt></ruby>は<ruby>上下<rt>じょうげ</rt></ruby>の<ruby>方向<rt>ほうこう</rt></ruby>のことです。
>
> - 10 は<ruby>上<rt>うえ</rt></ruby>に<ruby>動<rt>うご</rt></ruby>きます
> - -10 は<ruby>下<rt>した</rt></ruby>に<ruby>動<rt>うご</rt></ruby>きます
>
> <ruby>数字<rt>すうじ</rt></ruby>を<ruby>変<rt>か</rt></ruby>えてみたらどうなるかやってみましょう！

<div class="page"/>

### 5. ビームのプログラム

ゲームをスタートしたときはビームが<ruby>見<rt>み</rt></ruby>えないようにします。

<img src="images/beam-program-1.png" width="200">

「<ruby>緑<rt>みどり</rt></ruby>の<ruby>旗<rt>はた</rt></ruby>が<ruby>押<rt>お</rt></ruby>されたとき」に「<ruby>隠<rt>かく</rt></ruby>す」のブロックを<ruby>組<rt>く</rt></ruby>み<ruby>合<rt>あ</rt></ruby>わせます。  
「<ruby>隠<rt>かく</rt></ruby>す」は「<ruby>見<rt>み</rt></ruby>た<ruby>目<rt>め</rt></ruby>」のところにあるので<ruby>探<rt>さが</rt></ruby>してみましょう。

キーボードのスペースキーを<ruby>押<rt>お</rt></ruby>したら、<ruby>味方<rt>みかた</rt></ruby>から<ruby>右<rt>みぎ</rt></ruby>にビームが<ruby>出<rt>で</rt></ruby>るようにします。

<img src="images/beam-program-2.png" width="300">

1. <ruby>赤枠<rt>あかわく</rt></ruby>の<ruby>部分<rt>ぶぶん</rt></ruby>で、スペースキーを<ruby>押<rt>お</rt></ruby>したらビームが<ruby>味方<rt>みかた</rt></ruby>から<ruby>出<rt>で</rt></ruby>てくる<ruby>仕組<rt>しく</rt></ruby>みを<ruby>作<rt>つく</rt></ruby>っています
2. <ruby>青枠<rt>あおわく</rt></ruby>の<ruby>部分<rt>ぶぶん</rt></ruby>でビームが<ruby>味方<rt>みかた</rt></ruby>から<ruby>出<rt>で</rt></ruby>たあとに<ruby>右<rt>みぎ</rt></ruby>に<ruby>動<rt>うご</rt></ruby>いていく<ruby>仕組<rt>しく</rt></ruby>みを<ruby>作<rt>つく</rt></ruby>っています

「<ruby>表示<rt>ひょうじ</rt></ruby>する」は「<ruby>隠<rt>かく</rt></ruby>す」と<ruby>同<rt>おな</rt></ruby>じで「<ruby>見<rt>み</rt></ruby>た<ruby>目<rt>め</rt></ruby>」のところにあります。  
この 2 つを<ruby>組<rt>く</rt></ruby>み<ruby>合<rt>あ</rt></ruby>わせてビームが<ruby>出<rt>で</rt></ruby>たり<ruby>消<rt>き</rt></ruby>えたりするようになっています。

> チャレンジ
>
> x<ruby>座標<rt>ざひょう</rt></ruby>は<ruby>左右方向<rt>さゆうほうこう</rt></ruby>のことです。  
> <ruby>数字<rt>すうじ</rt></ruby>を<ruby>変<rt>か</rt></ruby>えてみるとビームはどうなるでしょうか？
