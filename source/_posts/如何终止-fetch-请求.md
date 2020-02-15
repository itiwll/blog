---
title: 如何终止 fetch 请求
date: 2020-02-14 09:30:00
tags:
  - 前端
  - javascript
  - ECMAScript
  - fetch
  - 终止 fetch
  - AbortController
---

## fetch 介绍
fetch 以返回 `Promise` 方式替代 `XMLHttpRequest` 实现的异步请求。可以使代码书写显得更简介。

```javascript
const data = await fetch(url).then(respones =>{
   return response.json();
 })
```
我们通常要使用 [fetch polyfill] ，以确保可以在使用 fetch 时可以兼容常用浏览器。

## `AbortController` 介绍
如果我们需要手动终止 fetch 发出的请求。则需要使用 `AbortController`。
<!-- more -->

`AbortController` 实例化对象提供一个 `signal` 标记属性，把该 `signal` 作为参数传入 fetch 方法，则可以调用该实例化对象的 `abort` 方法来终止 fetch 请求。

```javascript
let controller = new AbortController();
let signal = controller.signal;
fetch(url, {
  signal: signal
 });
 controller.abort();
```
使用 [fetch polyfill] 时如何使用 `AbortController` ：[aborting requests] 

## 参考
- [使用 Fetch]
- [fetch polyfill]
- [aborting requests]

[使用 Fetch]: https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
[fetch polyfill]: https://github.com/github/fetch
[aborting requests]: https://github.com/github/fetch#aborting-requests
