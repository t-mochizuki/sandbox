---
layout: post
title: Graphvizで継承階層図を用意してみる
tags: Scala
date: 2015-11-21 00:00:00
---

## まえがき

[scala-parser-combinators](https://github.com/scala/scala-parser-combinators)を読んでいます。

ざっくりと目を通して、`./src/main/scala/scala/util/parsing/combinator`下の`lexical, syntactical, token`が有力そうだったので、その継承階層図を用意してみます。

## 線形化順序

この継承階層は線形化順序の例です。

{% highlight scala %}
class A
trait B extends A
trait C extends A
trait D extends C
class E extends A with B with D
{% endhighlight %}

この例の継承階層図は次のようになります。

![linearization.svg]({{ site.baseurl }}/images/2015-11-21-linearization.svg)

線形化順序はスーパークラスのほう(継承階層図の上のほう)から決まるようです。

まず、`class E extends A with B with D`のAからE -> Aが決まり、Aが確定します。

しかし、Eは確定しません。

次に、`class E extends A with B with D`のBからE -> B, B -> Aが決まり、B -> Aが確定します。

最後に、`class E extends A with B with D`のDからE -> D, D -> C, C -> Aが決まり、E -> D -> C -> B -> Aが確定します。

ここでAを省略していますが、継承階層の上のほうで確定したものは確定後は省略して取り扱うようです。

(矢印は拡張する側から拡張される側に引きました)

## 継承階層図

継承階層図を用意してみます。

lexicalだけ少し複雑(若干自信なし)なので、継承階層も用意してみます。

### syntactical

![syntactical.svg]({{ site.baseurl }}/images/2015-11-21-syntactical.svg)

### lexical

{% highlight scala %}
trait StdTokens extends Tokens
trait Scanners extends Parsers
abstract class Lexical extends Scanners with Tokens
class StdLexical extends Lexical with StdTokens
{% endhighlight %}

![lexical.svg]({{ site.baseurl }}/images/2015-11-21-lexical.svg)

`class StdLexical extends Lexical with StdTokens`からStdLexical -> Lexical, Lexical -> Scanners, Scanners -> Parsersが決まり、Scanners -> Parsersが確定します。

`abstract class Lexical extends Scanners with Tokens`からLexical -> Tokensが決まり、Tokens -> Scanners -> Parsersが確定します。

`class StdLexical extends Lexical with StdTokens`からStdLexical -> StdTokens, StdTokens -> Tokensが決まり、StdLexical -> StdTokens -> Tokens -> Scanners -> Parsersが確定します。

### token

![token.svg]({{ site.baseurl }}/images/2015-11-21-token.svg)

## あとがき

念のため、`git grep`でどのようなtrait, class, objectがあるかを確認してみます。

{% highlight text %}
src/main/scala/scala/util/parsing/combinator/ImplicitConversions.scala:trait ImplicitConversions { self: Parsers =>
src/main/scala/scala/util/parsing/combinator/JavaTokenParsers.scala:trait JavaTokenParsers extends RegexParsers {
src/main/scala/scala/util/parsing/combinator/PackratParsers.scala:  abstract class PackratParser[+T] extends super.Parser[T]
src/main/scala/scala/util/parsing/combinator/PackratParsers.scala:  class PackratReader[+T](underlying: Reader[T]) extends Reader[T] { outer =>
src/main/scala/scala/util/parsing/combinator/PackratParsers.scala:  private case class Head(var headParser: Parser[_], var involvedSet: List[Parser[_]], var evalSet: List[Parser[_]]){
src/main/scala/scala/util/parsing/combinator/PackratParsers.scala:  private case class LR(var seed: ParseResult[_], var rule: Parser[_], var head: Option[Head]){
src/main/scala/scala/util/parsing/combinator/PackratParsers.scala:  private case class MemoEntry[+T](var r: Either[LR,ParseResult[_]]){
src/main/scala/scala/util/parsing/combinator/PackratParsers.scala:trait PackratParsers extends Parsers {
src/main/scala/scala/util/parsing/combinator/Parsers.scala:  abstract class Parser[+T] extends (Input => ParseResult[T]) {
src/main/scala/scala/util/parsing/combinator/Parsers.scala:  case class Error(override val msg: String, override val next: Input) extends NoSuccess(msg, next) {
src/main/scala/scala/util/parsing/combinator/Parsers.scala:  case class Failure(override val msg: String, override val next: Input) extends NoSuccess(msg, next) {
src/main/scala/scala/util/parsing/combinator/Parsers.scala:  case class Success[+T](result: T, override val next: Input) extends ParseResult[T] {
src/main/scala/scala/util/parsing/combinator/Parsers.scala:  case class ~[+a, +b](_1: a, _2: b) {
src/main/scala/scala/util/parsing/combinator/Parsers.scala:  object NoSuccess {
src/main/scala/scala/util/parsing/combinator/Parsers.scala:  sealed abstract class NoSuccess(val msg: String, override val next: Input) extends ParseResult[Nothing] { // when we don't care about the difference between Failure and Error
src/main/scala/scala/util/parsing/combinator/Parsers.scala:  sealed abstract class ParseResult[+T] {
src/main/scala/scala/util/parsing/combinator/Parsers.scala:  trait OnceParser[+T] extends Parser[T] {
src/main/scala/scala/util/parsing/combinator/Parsers.scala:trait Parsers {
src/main/scala/scala/util/parsing/combinator/RegexParsers.scala:trait RegexParsers extends Parsers {
src/main/scala/scala/util/parsing/combinator/SubSequence.scala:private[combinator] class SubSequence(s: CharSequence, start: Int, val length: Int) extends CharSequence {
src/main/scala/scala/util/parsing/combinator/lexical/Lexical.scala:abstract class Lexical extends Scanners with Tokens {
src/main/scala/scala/util/parsing/combinator/lexical/Scanners.scala:  class Scanner(in: Reader[Char]) extends Reader[Token] {
src/main/scala/scala/util/parsing/combinator/lexical/Scanners.scala:trait Scanners extends Parsers {
src/main/scala/scala/util/parsing/combinator/lexical/StdLexical.scala:class StdLexical extends Lexical with StdTokens {
src/main/scala/scala/util/parsing/combinator/syntactical/StandardTokenParsers.scala:class StandardTokenParsers extends StdTokenParsers {
src/main/scala/scala/util/parsing/combinator/syntactical/StdTokenParsers.scala:trait StdTokenParsers extends TokenParsers {
src/main/scala/scala/util/parsing/combinator/syntactical/TokenParsers.scala:trait TokenParsers extends Parsers {
src/main/scala/scala/util/parsing/combinator/token/StdTokens.scala:  case class Identifier(chars: String) extends Token {
src/main/scala/scala/util/parsing/combinator/token/StdTokens.scala:  case class Keyword(chars: String) extends Token {
src/main/scala/scala/util/parsing/combinator/token/StdTokens.scala:  case class NumericLit(chars: String) extends Token {
src/main/scala/scala/util/parsing/combinator/token/StdTokens.scala:  case class StringLit(chars: String) extends Token {
src/main/scala/scala/util/parsing/combinator/token/StdTokens.scala:trait StdTokens extends Tokens {
src/main/scala/scala/util/parsing/combinator/token/Tokens.scala:  abstract class Token {
src/main/scala/scala/util/parsing/combinator/token/Tokens.scala:  case class ErrorToken(msg: String) extends Token {
src/main/scala/scala/util/parsing/combinator/token/Tokens.scala:  case object EOF extends Token {
src/main/scala/scala/util/parsing/combinator/token/Tokens.scala:trait Tokens {
{% endhighlight %}

`combinator`直下のファイルにあるtrait, class, objectの数のほうが多いです。
