---
layout: post
title: Graphviz入門
tags: Scala
date: 2015-11-20 00:00:00
---

## まえがき

プログラミング言語の１つであるScalaを字句解析してみようと思い、[scala-parser-combinators](https://github.com/scala/scala-parser-combinators)を読んでいます。

リモートリポジトリをクローンして、`git ls-remote`でタグを確認して、`git checkout refs/tags/v1.0.4`でチェクアウトして読んでいます。

Scalaのバージョンは`2.11.6`を指定しています。

`find ./src/main -name \*.scala | wc -l`でファイル数を確認したところ、26でした。

`find ./src/main/scala/scala/util/parsing/combinator -name \*.scala | wc -l`は14でした。

## Graphviz

グラフがあったほうが良さそうだったので、Graphvizをインストールしました。

まず、[source \| Graphviz - Graph Visualization Software](http://www.graphviz.org/Download_source.php)からソースコードをダウンロードします。

次に、`tar zxf`などで解凍して、`./configure --prefix=$HOME/graphviz`などでMakefileを用意して、`make; make install`で実行ファイルなどを配置します。

適当なdotファイルを用意して、`$HOME/graphviz/bin/dot -Tsvg graph.dot > graph.svg`などでdotコマンドの動作を確認します。

dotファイルは[こちら](http://i.loveruby.net/ja/rhg/cd/graphviz.html)で調達しました。

![graph.svg]({{ site.baseurl }}/images/2015-11-20-graph.svg)

## あとがき

ソースコードのチェックアウトとGraphvizのインストールを振り返りました。
