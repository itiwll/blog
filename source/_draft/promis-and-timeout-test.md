---
title: 前端面试题解析之 Promise 和 setTimeout 执行顺序
author: Eson Wong
date: 2022-03-10T00:00:00.000Z
categories:
  - 技术
  - Web 开发
tags:
  - 技术
  - Web 开发
  - 前端
  - 面试题
  - Javascript
  - Promise
  - ES6
  - EcmaScript
---

```javascript
async function outerAsyncFun() {
  console.log("Outer async function start");
  await innerAsyncFun();
  console.log("Outer async function end");
}
async function innerAsyncFun() {
  console.log("Inner async function run");
}
console.log("Script start");
outerAsyncFun();
console.log("Script end");
```
