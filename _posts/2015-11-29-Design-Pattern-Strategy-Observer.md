---
layout: post
title: Strategy & Observer
date: 2015-11-29 00:00:00
---

## まえがき

『Rubyによるデザインパターン』を読んでいます。

ストラテジパターンとオブザーバパターンを確認してみたいと思います。

ストラテジパターンとオブザーバパターンは委譲をベースとしたパターンで、クラス図が似ていますが目的が違います。

ストラテジパターンはコンテキストが何かを処理するためにストラテジを呼び出します。

オブザーバパターンはサブジェクトが変化を通知するためにオブザーバを呼び出します。

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

## オブザーバパターン

オブザーバパターンを使って実装してみます。

{% gist t-mochizuki/79335fd68889024b8ac4 %}

こんな感じで使います。

``` sh
scala> import Observer._
import Observer._

scala> new Subject
res0: Observer.Subject = Observer$Subject@e6caa3a

scala> new Observer
res1: Observer.Observer = Observer$Observer@4b7acefd

scala> res0 add res1
res2: Observer.Subject = Observer$Subject@36324c3e

scala> new Observer
res3: Observer.Observer = Observer$Observer@505d1a7a

scala> res2 add res3
res4: Observer.Subject = Observer$Subject@6445c93d

scala> res4.send
received
received
```

## あとがき

ストラテジパターンとオブザーバパターンを確認しました。
