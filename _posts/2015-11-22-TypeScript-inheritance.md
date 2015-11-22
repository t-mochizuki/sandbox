---
layout: post
title: TypeScriptの継承・ダックタイピング
tags: TypeScript
date: 2015-11-22 00:00:00
---

## まえがき

TypeScriptにはクラスがあり、継承があります。

クラスを継承すると、継承元のクラス(スーパークラスまたは基底クラス)と継承先のクラス(サブクラスまたは派生クラス)の間に継承関係が生じます。

継承関係がある場合、サブクラスのインスタンスをスーパークラスの変数に代入することができます。

また、TypeScriptでは継承関係がない場合でも、異なるクラス間に共通のインタフェースがあれば、異なるクラスのインスタンスを同じ変数に代入することができます。

これはダックタイピングと呼ばれます。

継承とダックタイピングを確認してみたいと思います。

## 継承

クラスなどを継承するためのキーワードは`extends`キーワードです。

継承というよりも文字通り拡張という感じのキーワードです。

これは継承の例です。

{% highlight javascript %}
class Base {
  name;
  base() {
    return "base";
  }
}

class Derived extends Base {
  derived() {
    return "derived";
  }
}

var base: Base = new Derived();
console.log(base.base());
{% endhighlight %}

`base`変数に対して`derived`メソッドを呼び出そうとすると、次のようなエラーメッセージが出力されます。

{% highlight text %}
TS2339: Property 'derived' does not exist on type 'Base'.
{% endhighlight %}

`base`変数の型は`Base`型で、`Base`型には`derived`メソッドがありません。

TypeScriptでは存在しないメソッドを呼び出そうとするとコンパイルエラーになります。

そのためコンパイルエラーになります。

## ダックタイピング

これはダックタイピングの例です。

{% highlight javascript %}
class Bike {
  name;
  engine() {
    return "Bururun";
  }
  bbb() {
    return "bbb";
  }
}

class Car {
  name;
  engine() {
    return "Bororon";
  }
  ccc() {
    return "ccc";
  }
}

var it: {
  name;
  engine();
} = new Bike();
console.log(it.engine());
it = new Car();
console.log(it.engine());
{% endhighlight %}

`Bike`と`Car`の間に継承関係はありませんが、`Bike`と`Car`に共通のインタフェースがあるので、同じ変数に代入することができます。

## あとがき

継承とダックタイピングを確認しました。
