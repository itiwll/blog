---
title: 怎么用 webpack 实现 js 模块按需懒加载？
date: 2020-01-28 11:28:49
categories:
  - 技术
tags: 
  - 懒加载
  - import
  - vue
  - webpack
  - ECMAScript
  - web 开发
---
## 动态导入，ECMAScript `import()` 提案
ECMAScript 有一项允许使用 `import()` 方法传入 url 返回 `Promise` 动态导入 ES 模块的提案。已经进入 stage 4(Finished) 阶段，等待加入标准。
<!-- more -->
示例
```javascript
import("https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js")
  .then(rep => { 
    console.log('Vue',rep.default)
  })
```

Webpack 提供了 `import()` 语法，但是 Webpack 并不支持网络模块的导入。 Webpack 可以以本地路径或项目中安装的模块名动态导入模块。


示例：
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
Vue Router 配置的 component 属性支持传递一个返回 `Promise` 的方法，在匹配到路由准备渲染组件前会掉用此方法加载组件。

示例：
```javascript
const Foo = () => import('./Foo.vue')

const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
```


## 组件加载状态
Vue 函数式组件的 `createElemnt` （即 `h`）方法的第一个参数支持传递一个指定异步渲染的组件、加载时渲染的组件和加载失败渲染的组件的对象。我们可以据此创建一个懒加载容器组件。
```javascript
async function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    // 需要加载的组件 (应该是一个 `Promise` 对象)
    component: AsyncView,

    // 异步组件加载时使用的组件
    loading: Loading,
    
    // 加载失败时使用的组件
    // error: Error,

    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay: 200,

    // 如果提供了超时时间且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout: 10000
  });
  return {
    functional: true,
    render(h, { data, children }) {
      return h(AsyncHandler, data, children);
    }
  };
}
```

然后修改路由配置：
```javascript
const router = new VueRouter({
  routes: [
    {
      path: "/foo",
      component: () =>
        lazyLoadView(
         import("./Foo.vue")
          // 模拟网络延迟
          // new Promise(resolve => {
          //   window.setTimeout(rep => {
          //     resolve(import("./Foo.vue"));
          //   }, 5000);
          // })
        )
    }
  ]
});
```

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
- [Vue异步组件处理路由组件加载状态](https://juejin.im/post/5b90d0fcf265da0aa81bd728)
