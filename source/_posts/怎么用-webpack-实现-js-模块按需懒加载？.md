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

Webpack 提供了 `import()` 语法，但是 Webpack 并不支持网络模块的导入。 Webpack 可以以本地路径或项目中安装的模块名动态导入模块。

*注： 使用 Webpack 的 `import()` 传递动态的本地 path 需要一些技巧*

示例
```javascript
import("./a.js") // 本地路径
  .then(rep => { 
    console.log('Vue',rep.default)
  });

import("vue") // 安装的模块名
  .then(rep => { 
    console.log('a',rep.default)
  });
```

##  vue router


## 加载动画



## 参考
- [tc39/proposal-dynamic-import](https://github.com/tc39/proposal-dynamic-import)
- [The TC39 Process](https://tc39.es/process-document/)