---
title: Babel 的 Class 的转换
date: 2020-07-01 22:15:45
categories:
  - 技术
  - Web 开发
tags:
  - Babel
  - ECMAScript
  - class
  - Web 开发
  - 前端
  - 教程
  - 技术
  - Javascript
---

![babel class 转换](/asset/babel.png)

ES6 加入了 Class 的语法，Class 的大部分功能 ES5 都可以做到，我们可以把 `class` 看作是一个语法糖。本篇文章我们一步步来看看 Babel 是怎么把 `class` 转换成 ES5 语法的。

<!-- more -->

## 观察方发

在 Babel 的官网上有一个 [Try it out][babel: try it out] 的网页可以方便的看到编译后的代码。我们要看转换成 ES5 的语法，我们在 ENV PRESET 取消勾选 Enabled.

## 空类

我们先来看看一个没有属性、方法和构造函数的类会被转换成什么。

```javascript
class A {}
new A();

// ------------ 转换 ------------------ //

("use strict");

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var A = function A() {
  _classCallCheck(this, A);
};

new A();
```

可以看到 `class A{}` 被转化成了一个函数 `A`。除此之外还生成了一个函数 `_classCallCheck` 检测 `A` 是否用 `new` 关键只来调用的。

## 构造函数

我们来添加一个 `constructor` 方法到 `class A{}` 里

```javascript
class A {
  constructor() {
    this.propA = "A";
  }
}

// ------------ 转换 ------------------ //

// 略：function _classCallCheck(){}
var A = function A() {
  _classCallCheck(this, A);

  this.propA = "A";
};
```

转换后 `constructor` 方法内的代码内容被简单的搬到 `function A(){}` 内部。

## 属性

类的公有属性声明仍然处于实验性功能第 3 阶段。开启此特性我们要在 PULGINS 里添加 `@babel/plugin-proposal-class-properties` 插件。
添加一个属性：

```javascript
class A {
  constructor() {
    this.propA = "A";
  }
  propB = 1;
}

// ------------ 转换 ------------------ //

// 略：function _classCallCheck(){}
var A = function A() {
  _classCallCheck(this, A);
  this.propB = 1;
  this.propA = "A";
};
```

公有属性 `propB` 转换成 `fuxntion A(){}` 函数内的的 `this.propB`。

> 私有属性同样还没通过标准，需要添加 `@babel/plugin-proposal-class-properties` 插件来转换。

## 静态方法

添加一个方法：

```javascript
class A {
  method() {
    console.log("method");
  }
}
// ------------ 转换 ------------------ //

// 略：function _classCallCheck(){}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var A = (function () {
  function A() {
    _classCallCheck(this, A);
  }

  _createClass(A, null, [
    {
      key: "method",
      value: function staticMethod() {
        console.log("method");
      },
    },
  ]);

  return A;
})();
```

Bable 使用闭包函数并创建了一个 `_createClass` 函数来给 `function A(){}` 添加方法。

## 参考

- [Babel: Try it out]
- [Class 的基本语法]
- [类 - JavaScript | MDN]

[class 的基本语法]: https://es6.ruanyifeng.com/#docs/class
[babel: try it out]: https://babeljs.io/repl
[类 - javascript | mdn]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes
