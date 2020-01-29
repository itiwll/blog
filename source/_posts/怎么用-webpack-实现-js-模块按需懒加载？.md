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
  })
```

Webpack 提供了 `import()` 语法，但是 Webpack 并不支持网络模块的导入。 Webpack 可以以本地路径或项目中安装的模块名动态导入模块。


示例
```javascript
import("./a.js") // 本地路径
  .then(rep => { 
    console.log('Vue',rep.default)
  })

import("vue") // 安装的模块名
  .then(rep => { 
    console.log('a',rep.default)
  })
```

*注： 使用 Webpack 的 `import()` 传递动态的本地 path 需要一些技巧*
##  Vue Router
Vue Router 配置的 component 属性支持传递一个返回 `Promise` 方法，在匹配到路由准备渲染组件前会掉用此方法加载组件。

示例
```javascript
const Foo = () => import('./Foo.vue')

const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
```


## 加载动画
待续

## 最终效果
<iframe
     src="https://codesandbox.io/embed/vue-router-import-plws9?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vue-router-import"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>



## 参考
- [tc39/proposal-dynamic-import](https://github.com/tc39/proposal-dynamic-import)
- [The TC39 Process](https://tc39.es/process-document/)
- [Vue Router - 路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)