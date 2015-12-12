---
layout: post
title: Strategy Pattern
date: 2015-12-13 00:00:00
---

## まえがき

『Rubyによるデザインパターン』を読んでいます。

ストラテジパターンを確認してみたいと思います。

## ストラテジパターン

ストラテジパターンを使って実装してみます。

{% gist t-mochizuki/acda2c9b8f22faebdbbd %}

こんな感じで使います。

``` sh
scala> import Strategy._
import Strategy._

scala> new Context(new C)
res0: Strategy.Context = Strategy$Context@1905f473

scala> res0.execute("tokyo")
res1: Strategy.AST = C

scala> new Context(new B)
res2: Strategy.Context = Strategy$Context@4d62e5a3

scala> res2.execute("tokyo")
res3: Strategy.AST = B

scala> new Context(new D)
res4: Strategy.Context = Strategy$Context@1b65e2f8

scala> res4.execute("tokyo")
res5: Strategy.AST = D
```

## あとがき

ストラテジパターンを確認しました。
