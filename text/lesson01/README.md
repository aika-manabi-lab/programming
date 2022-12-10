# <ruby>秋鹿学<rt>あいかまな</rt></ruby>びラボ プログラミング<ruby>教室<rt>きょうしつ</rt></ruby> <ruby>初級<rt>しょきゅう</rt></ruby>テキスト

## <ruby>準備<rt>じゅんび</rt></ruby>

- ブラウザアプリを<ruby>起動<rt>きどう</rt></ruby>します

  ![chrome](images/chrome.png)

- アドレスバーに「**smalruby.app**」と<ruby>入力<rt>にゅうりょく</rt></ruby>して<ruby>Enter<rt>エンター</rt></ruby>キーを<ruby>押<rt>お</rt></ruby>します

  ![input sumalruby.app](images/input-smalruby.app.png)

- スモウルビーのページが<ruby>開<rt>ひら</rt></ruby>きます

  ![smalruby main](images/smalruby-main.png)

<div class="page"/>

## スモウルビーの<ruby>画面<rt>がめん</rt></ruby>の<ruby>説明<rt>せつめい</rt></ruby>

![smalruby](images/smalruby-description.png)

### **<span style="color: red;">1. ブロックパレット</span>**

ブロックパレットには、さまざまな<ruby>種類<rt>しゅるい</rt></ruby>のブロック（プログラムの<ruby>部品<rt>ぶひん</rt></ruby>）があります。

ブロックパレットからブロックを<ruby>選<rt>えら</rt></ruby>んで、スクリプトエリアに<ruby>並<rt>なら</rt></ruby>べると、プログラムを<ruby>作<rt>つく</rt></ruby>ることができます。

### **<span style="color: orange;">2. スクリプトエリア</span>**

スクリプトエリアにブロックパレットのブロックを<ruby>並<rt>なら</rt></ruby>べます。

スクリプトとは<ruby>台本<rt>だいほん</rt></ruby>のことです。<ruby>台本<rt>だいほん</rt></ruby>のとおりにスプライト（キャラクター）を<ruby>動<rt>うご</rt></ruby>かすことができます。

### **<span style="color: green;">3. スプライトとステージ</span>**

スプライトとはプログラムで<ruby>動<rt>うご</rt></ruby>くキャラクターのことです。ステージの<ruby>中<rt>なか</rt></ruby>で<ruby>動<rt>うご</rt></ruby>いたりしゃべったりします。

ステージはスプライトが<ruby>動<rt>うご</rt></ruby>く<ruby>舞台<rt>ぶたい</rt></ruby>のことです。いくつものスプライトを<ruby>表示<rt>ひょうじ</rt></ruby>したり、<ruby>動<rt>うご</rt></ruby>かすことができます。

プログラムはスプライトごとに<ruby>作<rt>つく</rt></ruby>れます。

<img src="images/cat.png" width="120" align="middle" alt="cat"> このネコなどのキャラクターを「**スプライト**」とよびます。

<div class="page"/>

### **<span style="color: blue;">4. スプライトリストと<ruby>背景選択<rt>はいけいせんたく</rt></ruby></span>**

スプライトはネコのほかにもたくさんあります。もちろん<ruby>自分<rt>じぶん</rt></ruby>で<ruby>作<rt>つく</rt></ruby>ることもできます。  
スプライトの<ruby>右下<rt>みぎした</rt></ruby>のアイコンをクリックしてみましょう。

ステージの<ruby>背景<rt>はいけい</rt></ruby>も<ruby>選<rt>えら</rt></ruby>ぶことができます。<ruby>自分<rt>じぶん</rt></ruby>で<ruby>作<rt>つく</rt></ruby>ることもできます。  
お<ruby>気<rt>き</rt></ruby>に<ruby>入<rt>い</rt></ruby>りの<ruby>背景<rt>はいけい</rt></ruby>を<ruby>選<rt>えら</rt></ruby>んでみましょう。

## かんたんなプログラムを<ruby>作<rt>つく</rt></ruby>ってみよう

### 1. スプライトを 10 <ruby>歩動<rt>ぽうご</rt></ruby>かす

- <ruby>黄色<rt>きいろ</rt></ruby>の「イベント」にある「<ruby>緑<rt>みどり</rt></ruby>の<ruby>旗<rt>はた</rt></ruby>が<ruby>押<rt>お</rt></ruby>されたとき」と  
  <ruby>青色<rt>あおいろ</rt></ruby>の「<ruby>動<rt>うご</rt></ruby>き」にある「10 <ruby>歩動<rt>ぽうご</rt></ruby>かす」をスクリプトエリアに<ruby>置<rt>お</rt></ruby>いてみましょう
- <ruby>旗<rt>はた</rt></ruby>をクリックするとスプライトが 10 <ruby>歩動<rt>ぽうご</rt></ruby>きます

  <img src="images/move-10.png" width="150">

### 2. キーボードでスプライトを<ruby>動<rt>うご</rt></ruby>かす

- <ruby>黄色<rt>きいろ</rt></ruby>の「イベント」にある「スペースキーが<ruby>押<rt>お</rt></ruby>されたとき」と  
  <ruby>青色<rt>あおいろ</rt></ruby>の「<ruby>動<rt>うご</rt></ruby>き」にある「15 <ruby>度回<rt>どまわ</rt></ruby>す」をスクリプトエリアに<ruby>置<rt>お</rt></ruby>いてみましょう
- スペースキーを<ruby>押<rt>お</rt></ruby>すとスプライトが<ruby>少<rt>すこ</rt></ruby>しずつ<ruby>回<rt>まわ</rt></ruby>ります

  <img src="images/rotate-15.png" width="200">

> ひとこと  
> スペースキー<ruby>以外<rt>いがい</rt></ruby>のボタンに<ruby>変<rt>か</rt></ruby>えたり、10 <ruby>歩<rt>ぽ</rt></ruby>や 15 <ruby>度<rt>ど</rt></ruby>の<ruby>数字<rt>すうじ</rt></ruby>は<ruby>好<rt>す</rt></ruby>きな数に変えることができます。  
> いろいろ試してみましょう。

<div class="page"/>

### 3. <ruby>繰<rt>く</rt></ruby>り<ruby>返<rt>かえ</rt></ruby>し（<ruby>反復<rt>はんぷく</rt></ruby>）

- オレンジ<ruby>色<rt>いろ</rt></ruby>の「<ruby>制御<rt>せいぎょ</rt></ruby>」にある「ずっと」をつなげると、「ずっと」に<ruby>挟<rt>はさ</rt></ruby>まれたブロックの<ruby>命令<rt>めいれい</rt></ruby>をずっと<ruby>繰<rt>く</rt></ruby>り<ruby>返<rt>かえ</rt></ruby>します
- いろいろなブロックを<ruby>挟<rt>はさ</rt></ruby>んで<ruby>試<rt>ため</rt></ruby>してみましょう
- ↓ この<ruby>場合<rt>ばあい</rt></ruby>は「10<ruby>歩動<rt>ぽうご</rt></ruby>かす」を<ruby>挟<rt>はさ</rt></ruby>んでいるから、ずっと<ruby>前<rt>まえ</rt></ruby>に<ruby>進<rt>すす</rt></ruby>み<ruby>続<rt>つづ</rt></ruby>けます

  <img src="images/loop.png" width="150">

4. もし ○○ なら（<ruby>条件分岐<rt>じょうけんぶんき</rt></ruby>）

- オレンジ<ruby>色<rt>いろ</rt></ruby>の「<ruby>制御<rt>せいぎょ</rt></ruby>」にある「もし」をつなげると、「もし〇〇なら ×× する」という<ruby>命令<rt>めいれい</rt></ruby>を<ruby>使<rt>つか</rt></ruby>えます
- ○○ に「どういうときか」、×× に「やりたいこと」をあてはめましょう
- ↓ この<ruby>場合<rt>ばあい</rt></ruby>はずっと 10 <ruby>歩動<rt>ぽうご</rt></ruby>き<ruby>続<rt>つづ</rt></ruby>けて、スプライトが<ruby>端<rt>はし</rt></ruby>まで<ruby>行<rt>い</rt></ruby>ったら<ruby>向<rt>む</rt></ruby>きを<ruby>変<rt>か</rt></ruby>えて<ruby>進<rt>すす</rt></ruby>むようにしています

  <img src="images/if.png" width="220">

- <ruby>水色<rt>みずいろ</rt></ruby>の「<ruby>調<rt>しら</rt></ruby>べる」には「もし」の<ruby>条件<rt>じょうけん</rt></ruby>に<ruby>使<rt>つか</rt></ruby>えるブロックがたくさんあります。いろいろ<ruby>試<rt>ため</rt></ruby>してみましょう

  <img src="images/criteria.png" width="220">

> ひとこと  
> ゲームのプログラムなどにもよく<ruby>使<rt>つか</rt></ruby>われていて、たとえば「もしパンチがあたったらたおれる」とか、「<ruby>矢印<rt>やじるし</rt></ruby>のボタンが<ruby>押<rt>お</rt></ruby>されている<ruby>間<rt>あいだ</rt></ruby>、ずっと<ruby>前<rt>まえ</rt></ruby>に<ruby>進<rt>すす</rt></ruby>むといった<ruby>使<rt>つか</rt></ruby>われ<ruby>方<rt>かた</rt></ruby>をしています。
