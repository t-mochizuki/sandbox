---
layout: post
title: TypeScriptの型パラメータ
tags: TypeScript
date: 2015-11-14 00:00:00
---

## まえがき

TypeScriptには型パラメータがあります。

この型パラメータを使うと、型チェックを無効にせずに任意の型を受け付ける関数を書くことができます。

制約のない型パラメータは、任意の型を受け入れる性質上、メンバー変数・関数を持たないことを意味します。

制約のある型パタメータは、制約された型のメンバー変数・関数を持つことを意味します。

型を指定した場合は、型パラメータにその型が指定されます。

型を指定しない場合は、型推論によって型パラメータに型が指定されるようです。

型の制約を確認して、型の指定を確認してみたいと思います。

## 型パラメータ

型パラメータは山括弧で囲います。

型の制約がない型パラメータの例です。

{% highlight javascript %}
function f<T>(p: T) { console.log(typeof p); }
f("tokyo");
{% endhighlight %}

型の制約がある型パラメータの例です。

{% highlight javascript %}
class A {
  message() {
    return "wait a minutes";
  }
}
function f<T extends A>(p: T) { console.log(p.message()); }
f(new A());
{% endhighlight %}

型Aで制約したので、関数fの仮引数pは型Aのインターフェイスを持つことになります。

## 型を指定した場合

この例はコンパイルエラーになります。

{% highlight javascript %}
class A {
  evening() {
    return "good evening";
  }
}
class B extends A {
  morning() {
    return "good morning";
  }
}
function f<T extends A>(p: T) {
  p.evening();
}
f<B>(new A());
{% endhighlight %}

次のようなエラーメッセージが出力されます。

{% highlight text %}
error TS2345: Argument of type 'A' is not assignable to parameter of type 'B'.
  Property 'morning' is missing in type 'A'.
{% endhighlight %}

型パラメータに型Bを指定したので、関数fの仮引数pは型Bのインターフェイスを持つことになります。

しかし、実引数の型がAなのでインターフェイスにmorningがなくコンパイルエラーになります。

ランタイムエラーではなくコンパイルエラーになるところが面白いですね。

## 型を指定しない場合

最後に、型を指定しない場合を確認してみます。

{% highlight javascript %}
class A {
  evening() {
    return "good evening";
  }
}
class B extends A {
  evening() {
    return "good morning";
  }
}
class C {
  evening() {
    return "good night";
  }
}
function f<T extends A>(p: T) {
  console.log(p.evening());
}
f(new C());
{% endhighlight %}

これはコンパイルエラーになりません。

型Cは型Aを継承していないので、コンパイルエラーになることを期待しました。

しかし、型推論によって型が指定されたかのようにコンパイルエラーになりませんでした。

## あとがき

型パラメータで型の制約と型の指定を確認しました。

型の制約と型の指定が別物だと認識できました。

最後の例に`f(new A());`を追加しても、出力されるJavaScriptのコードは追加分しか変わりませんでした。

TypeScriptの型はコンパイル時だけのためのものだということを実感しました。
