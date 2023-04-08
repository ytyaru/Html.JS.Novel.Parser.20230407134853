# h1,h2,h3,h4,h5,h6

　見出しにはレベルがある。そのせいで面倒事が起きる。

* https://zenn.dev/neet/articles/f25abb616ec105

　ふつうレベルは`<h1>`〜`<h6>`で階層を指定する。これによって文書の構造を把握する。SEOやアクセシビリティに役立てられる。

```markdown
# h1
## h2
### h3
#### h4
##### h5
###### h6
```
```html
<h1>見出しレベル1</h1>
<h2>見出しレベル2</h2>
<h3>見出しレベル3</h3>
<h4>見出しレベル4</h4>
<h5>見出しレベル5</h5>
<h6>見出しレベル6</h6>
```

* 見出しレベル1
	* 見出しレベル2
		* 見出しレベル3
			* 見出しレベル4
				* 見出しレベル5
					* 見出しレベル6

　しかしレベルは前後の見出しレベルと+1,-1,=のいずれかでないと不正値となる。正しく階層を解釈できなくなる。なのにテキスト上では書くことができてしまう。

　文書の規模が大きくなると全体の階層レベルを把握して適切なレベルを用いるのはかなり難しくなる。そこでHTML5の当初は`<section>`内でなら常に`<h1>`が使える仕様だった。たとえネストしていてもレベルを一定にできるのでミスが起きない。

　しかしアルゴリズムが複雑だとされ、仕様からも削除されてしまった。

```html
<section><h1>見出し1</h1>
本文。
	<section><h1>見出し1-1</h1>
	本文。
	</section>
</section>
```
```html
<section class="part,chapter,section,item"><h1>見出し</h1>
本文。
</section>
```

* 部(part)、章(chapter)、節(section)、項(itme)

　結局、最初の`<h1>`〜`<h6>`を正しく使うことを求められるようになった。

　最近はコンテンツの一部を動的に挿入することが頻繁に起きるようになったせいで、もはや階層を単純にハードコーディングできない。見出しのレベルも動的に変更する必要がある。

　これはもうパーサとしては範囲外である。

* レベル差が不正でも知らない（マークダウンを正しく書いてないお前が悪い）
* `<section>`なんて使わない（どうせ何度もHTMLの仕様が変更されるならもう使いたくない）
* `<hgroup>`なんて使わない（どうせ何度もHTMLの仕様が変更されるならもう使いたくない）

　HTMLは何度も仕様変更されて信用できない。

# 問題

* 仕様変更されまくる（後方互換もなくなる）
	* レベリング
		* `<section>`内なら常に`<h1>`でいい（廃止）
		* 書き分けねばならない
			* 動的にできない
			* 構造が変わったらすべて書き換えねばならない
			* 構造をすべて正確に把握せねばならない
		* `<hgroup>`があるくせに副題を正しくマークアップする手段が統一されていない
* レベルが6までしかない
* 別ファイル化
	* 文書の量が多すぎるので別ファイル化したがレベリングできない
* ツリー構造であるべきか
	* HTMLの特徴はリンクでありグラフ（ネットワーク関係図）なのに、なぜ文書はツリー構造なのか
	* ツリー構造がいい時もあれば、グラフ構造やリスト構造、テーブル構造がいいときもある
	* どのデータ構造でまとめるべきかは場合によって変わる
	* 文書の構造化については別の方法にすべきでは？

# レベリング

## +1

```markdown
# 1

a

## 2

b
```
```html
<section><h1>1</h1>a
<section><h1>2</h1>b
</section>
</section>
```

## =

```markdown
## 2

b

## 3

c
```
```html
<section><h1>2</h1>b
</section>
<section><h1>3</h1>c
</section>
```

## -1

```markdown
## 3

c

# 4

d
```
```html
<section><h1>3</h1>c
</section>
</section>
<section><h1>4</h1>d
</section>
```

## NG

　=,+1,-1より差が大きいのはダメ。

```markdown
# 1

a

### 2

b
```
```html
<section><h1>1</h1>a
<section><h1>2</h1>b
</section>
</section>
```
