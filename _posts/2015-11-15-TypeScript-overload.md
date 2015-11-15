---
layout: post
title: TypeScriptのオーバーロード
tags: TypeScript
date: 2015-11-15 00:00:00
---

## まえがき

TypeScriptのバージョンはVersion 1.6.2です。

TypeScriptにはオーバーロードがあります。

オーバーロードとは、同じ関数名で複数のメンバー関数を定義することです。

ただし、まったく同じシグネチャだと判別できないので、引数の数、引数の型、戻り値の型が異なるメンバー関数を定義することを意味します。

TypeScriptではany型を用いてオーバーロードを実現します。

オーバーロードを確認してみたいと思います。

## 引数の数・型

この例はコンパイルエラーになります。

{% highlight javascript %}
class X {
  func(x: string);
  func(x: number);
  func(x: number, y: boolean);
  func(x: any, y?: boolean) {
    if (y != undefined) {
      console.log(typeof y);
    } else {
      console.log(typeof x);
    }
  }
}
var o = new X();
o.func("123");
o.func(123);
o.func(234, true);
o.func(true);
{% endhighlight %}

次のようなエラーメッセージが出力されます。

{% highlight text %}
TS2345: Argument of type 'boolean' is not assignable to parameter of type 'number'.
{% endhighlight %}

エラーの原因は`x.func(true)`です。

この行を削除すると、エラーが解消されます。

ちなみに、エラーメッセージですが、`func(x: string;)`と`func(x: number);`の行を入れ替えると、`Argument of type 'boolean' is not assignable to parameter of type 'string'.`となります。

## 戻り値の型

この例はコンパイルエラーになりません。

{% highlight javascript %}
class X {
  func(x: number): number;
  func(x: string): string;
  func(x: number, y: boolean): boolean;
  func(x: any, y?: boolean) {
    if (y != undefined) {
      return y;
    } else {
      return x;
    }
  }
}
var o = new X();
o.func("123");
o.func(123);
o.func(234, true);
{% endhighlight %}

しかし、`return x;`を`return +x;`に書き換えると、次のようなエラーメッセージが出力されます。

{% highlight text %}
TS2354: No best common type exists among return expressions.
{% endhighlight %}

注意深く確認して、`return +x;`のときに`o.func("123");`がnumber型を返すことに気付くかもしれません。

しかし、エラーの原因はnumber型に算術演算子+を作用させたことのようです。

次のように修正すると、コンパイルエラーが解消されます。

{% highlight javascript %}
class X {
  func(x: number): number;
  func(x: string): number;
  func(x: number, y: boolean): boolean;
  func(x: any, y?: boolean) {
    if (y != undefined) {
      return y;
    } else {
      if (typeof x == "number") return x;
      if (typeof x == "string") return +x;
    }
  }
}
var o = new X();
o.func("123");
o.func(123);
o.func(234, true);
{% endhighlight %}

## あとがき

オーバーロードを確認しました。

オーバーロードで戻り値の型、引数の数、引数の型を変えてみました。

そして、型チェックが有効であることを確認しました。
