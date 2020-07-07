---
title: Babel 的 Class 的转换
date: 2020-07-01 22:15:45
categories:
  - 技术
tags: 
  - babel
  - ECMAScript
  - class
---
![babel class 转换](../asset/babel.png)

ES6 加入了 Class 的语法，Class 的大部分功能 ES5 都可以做到，我们可以把 `class` 看作是一个语法糖。本篇文章我们一步步来看看 Babel 是怎么把 `class` 转换成 ES5 语法的。

<!-- more -->

## 观察方发
在 Babel 的官网上有一个 [Try it out][Babel: Try it out] 的网页可以方便的看到编译后的代码。我们要看转换成 ES5 的语法，我们在 ENV PRESET 取消勾选 Enabled.

## 空类
我们先来看看一个没有属性、方法和构造函数的类会被转换成什么。
```javascript
class A {
}
new A();

// ------------ 转换 ------------------ //

"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var A = function A() {
  _classCallCheck(this, A);
};

new A();
```
可以看到 `class A{}` 被转化成了一个函数 `A`。除此之外还生成了一个函数 `_classCallCheck` 检测 `A` 是否用 `new` 关键只来调用的。

## 构造函数
下面我们来添加一个 `constructor` 方法到 `class A{}` 里
```javascript
class A {
  constructor(){
    this.propA = "A"
  }
}

// ------------ 转换 ------------------ //
// function _classCallCheck(){}
var A = function A() {
  _classCallCheck(this, A);

  this.propA = "A";
};
```
转换后 `constructor` 方法内的代码内容被简单的搬到 `function A(){}` 内部。 
## 属性

### get/set
## 方法
## 私有属性和方法
## 继承

## 参考
- [Babel: Try it out]

[Class 的基本语法]:https://es6.ruanyifeng.com/#docs/class
[Babel: Try it out]:https://babeljs.io/repl

