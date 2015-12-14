---
layout: post
title: Command Pattern
date: 2015-12-14 00:00:00
---

## まえがき

『Rubyによるデザインパターン』を読んでいます。

コマンドパターンを確認してみたいと思います。

## コマンドパターン

コマンドパターンを使って実装してみます。

{% gist t-mochizuki/9515ce24fc956844333b %}

こんな感じで使います。

``` sh
scala> :paste
// Entering paste mode (ctrl-D to finish)

import Command._
val read1 = new ReadCommand("read1")
val read2 = new ReadCommand("read2")
val composite = new CompositeCommand
val composite1 = composite.add(read1)
val composite2 = composite1.add(read2)
val composite3 = composite2.add(WriteCommand)

// Exiting paste mode, now interpreting.

write processing
read processing
read processing
import Command._
read1: Command.ReadCommand = Command$ReadCommand@607c144a
read2: Command.ReadCommand = Command$ReadCommand@311149c5
composite: Command.CompositeCommand = Command$CompositeCommand@58572aa7
composite1: Command.CompositeCommand = Command$CompositeCommand@26ee70c9
composite2: Command.CompositeCommand = Command$CompositeCommand@26b0fe1a
composite3: Command.CompositeCommand = Command$CompositeCommand@1d54c468

scala> comp
composite    composite1   composite2   composite3   compat

scala> composite3.description
res1: String = write,read2,read1

scala> composite3.execute
write processing
read processing
read processing

scala>
```

## あとがき

コマンドパターンを確認しました。

コマンドパターンのクラス構造はオブザーバパターンのクラス構造と似ています。

大きな違いは呼び出し元の状態に関心があるかないかです。オブザーバパターンのオブザーバはサブジェクト(呼び出し元)の状態に関心がありますが、コマンドパターンのコマンドは呼び出し元の状態に関心がありません。
