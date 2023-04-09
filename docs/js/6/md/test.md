# 見出《みだ》し

　MarkedのextensionsでRubyを実装してみた。残念ながらパイプ付の形式しかまともに動作しない。パイプ省略型も実装したが壊れてしまっている。ルビの前後にあるはずのテキストが消えてしまう。他のマークダウンの要素内にルビがあるときも動作しない。`<code>`内だけはパースされず正常に表示される。

　さあ、*ここを強調*するよ。

---

　今、山田《やまだ》太郎《たろう》は笑《わら》った。

　そう、｜Oh, my god!《おお神よ》さらば。

　｜一行《いちぎょう》あたり｜二《ふた》つのパイプ付ルビがある。

　ルビの*前後*に、｜山田《やまだ》｜太郎《たろう》、*他*のマークダウンがある。

## 他のマークダウン要素の中にルビがある場合

　強調の中にルビ*｜山田《やまだ》*がある。

　リンクの中にルビ[｜山田《やまだ》][1]がある。

[1]:https://www.google.co.jp/

　[｜山田《やまだ》](https://www.google.co.jp/)

　`<code>`の中にルビがある。`｜山田《やまだ》`

　`<pre><code>`の中にルビがある。

```markdown
｜山田《やまだ》
```

````markdown
```markdown
｜山田《やまだ》
```
````

　山田｜《そのまま》

　｜《の前にパイプ文字｜を入れたら《がそのまま使える。変換されない箇所ならパイプを入れずともそのまま使える。でも、変換される部分で《を使いたいときは《の前に｜を入れることで《の文字をそのまま出力することができる。

　パラグラフ１の１行目
　パラグラフ１の２行目

　パラグラフ２の１行目
　パラグラフ２の２行目


　パラグラフ３の１行目
　パラグラフ３の２行目

# 次の見出し

　あああああああああ。

# 既知のバグ

* ruby記法は強制的に置換される

## ruby記法は強制的に置換される

　`<code>`内に書いたruby記法は置換して欲しくない。でも置換されてしまう。

````markdown
```markdown
`｜置換《ちかん》`されたくないのに
```
````

````markdown
`｜置換《ちかん》`されたくないのに
````


　marked.jsのTokenizerで実装したいが、上手くできない。
