---
title: 怎么用 webpack 实现 js 模块按需懒加载？
date: 2020-01-28 11:28:49
tags:
---
## 动态导入，ECMAScript `import()` 提案
ECMAScript 有一项允许使用 `import()` 方法传入 url 返回 `Promise` 动态导入 ES 模块的提案。已经进入 stage 4(Finished) 阶段，等待加入标准。

示例
```javascript
import("https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js")
.then(rep => {
  console.log('Vue',rep.default)
});
```

Webpack 提供了 `import()` 语法的支持，并且扩展了，使其可以打包和导入本地路径的模块。

> 注： 使用 Webpack 的 `import()` 传递动态的本地 path 需要一些技巧


##  vue router


## 加载动画



## 参考:
- [tc39/proposal-dynamic-import](https://github.com/tc39/proposal-dynamic-import)
- [The TC39 Process](https://tc39.es/process-document/)