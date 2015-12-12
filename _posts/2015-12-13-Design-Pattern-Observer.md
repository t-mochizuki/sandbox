---
layout: post
title: Observer Pattern
date: 2015-12-13 00:00:00
---

## まえがき

『Rubyによるデザインパターン』を読んでいます。

オブザーバパターンを確認してみたいと思います。

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

オブザーバパターンを確認しました。
