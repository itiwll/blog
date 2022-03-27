---
title: 怎么创建自定义 React Hooks?
author: Eson Wong
date: 2022-03-27 00:00:00.000
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
  - React
---

![React Hooks](/asset/react-hooks.jpg)

## React Hooks 是什么？

React Hooks 是 React 16.8 版本引入的新特性，它可以让你在 React 函数组件中使用状态和其它 React Class 组件的特性。

<!-- more -->

```jsx
import React, { useState, useEffect } from "react";

const App = () => {
  const [title, setTitle] = useState("App");

  useEffect(() => {
    document.title = title;
  });

  return (
    <div>
      <H1>{title}</H1>
    </div>
  );
};
```

自定义 React Hooks 是以 `use` 开头命名创建一个函数，它可以在内部调用其它 React Hooks。以将组件中可复用的逻辑提取出来，供多个组件使用。

## React Hooks 的使用规则

1. 只能在函数组件中使用, 不能在类组件中使用。
2. 只能在函数组件内顶层使用。不能在循环语句、条件语句、嵌套函数中使用。

   ```jsx
   import React, { useState, useEffect } from "react";

   const App = () => {
     // ✅
     const [title, setTitle] = useState("App");
     useEffect(() => {
       document.title = title;
     });

     // ❌
     // if (condition) {
     //   const [title, setTitle] = useState("App");
     //   useEffect(() => {
     //     document.title = title;
     //   });
     // }

     return (
       <div>
         <H1>{title}</H1>
       </div>
     );
   };
   ```

3. 只能在函数组件内部和自定义 React Hooks 内使用。不能在其它普通函数中使用。

## 创建自定义 React Hooks

下面我们来把上面的例子中的设置标题的逻辑提取出来，并且把它放到一个自定义的 React Hooks 中。

1. 创建一个自定义 React Hooks，以 use 开头命名为 `useTitle`。

   ```js
   // src/hooks/useTitle.js
   const useTitle = (title) => {};
   ```

   命名以 use 开头可以一眼看出它是一个 React Hook。在 `useTitle` 中，我们需要把标题作为参数传入。

2. 在 `useTitle` 中使用 React 预置的 `useEffect` Hook 来设置标题。

   ```js
   // src/hooks/useTitle.js
   import React, { useEffect } from "react";

   const useTitle = (title) => {
     useEffect(() => {
       document.title = title;
     });
   };
   ```

## 使用自定义 React Hooks

在 `App.js` 中使用 `useTitle` Hook 来设置标题。

```js
// src/App.js
import React from "react";
import useTitle from "./hooks/useTitle";

const App = () => {
  useTitle("App");

  return (
    <div>
      <H1>{title}</H1>
    </div>
  );
};
```

[create your own react hooks]: https://blog.logrocket.com/create-your-own-react-hooks/
