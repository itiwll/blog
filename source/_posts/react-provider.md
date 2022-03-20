---
title: 怎么使用 React Context API
author: Eson Wong
date: 2022-03-20 00:00:00.000
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

React context 是 React 提供的基本工具，用于在组件间共享状态。

本文介绍 React context 的基本用法。

![React Context API](/asset/react-context-api.jpg)

<!-- more -->

## 什么是 React Context?

React context 允许我们不对组件树的每层组件手动添加 props 来传递数据的情况下，在组件间共享数据。它能让我们更容易的跨组件共享状态。

## 什么时候使用 React Context?

当某些状态可能在任何组件中都会被使用时，React context 是非常有用的。

比如：

- UI 主题状态（亮暗模式、用户定制的 UI 风格等）
- 当前会话的用户数据（用户名、头像等）
- 当前语言或区域

React context 会让项目里的任何组件都能轻松访问到这些状态。

## React context 解决了什么问题？

React context 帮我们解决了 props drilling 问题。

Props drilling 是指状态以 props 的形式从 React 组件树中一直往下传递, 但中间层组件并不需要这些 props, 只是做一个向下转发，这种情况就叫做 props drilling。

下面是一个例子：

```javascript
export default function App() {
  const [user, setUser] = useState({ name: 'Eson', age: 18 });

  return (
    <Header user={user}>
  )
}

const Header = ({ user }) => {
  return (
    <>
      <Menu user={user}>
    </>
  )
}
```

你可以看到，Header 组件中的 user 状态是通过 props drilling 来获取的。App 的直接子组件 Header 并不需要 user 状态，它只是做一个向下转发。

## 怎么使用 React context?

1. 使用 React context API `React.createContext` 方法创建 context

   ```javascript
   const UserContext = React.createContext({ name: "Eson", age: 18 }); // 第一个参数是默认值

   export default UserContext;
   ```

2. 使用 React context 的 Provider 组件包裹你的组件

   ```javascript
   import React, { useState } from "react";
   import UserContext from "userContext.js";

   const App = () => {
     const [user, setUser] = useState({ name: "Eson", age: 18 });

     return (
       <UserContext.Provider value={user}>
         <Header />
       </UserContext.Provider>
     );
   };
   ```

3. 使用 React context 的 Consumer 组件获取 context 状态，提供给使用状态的组件

   ```javascript
   import React from "react";
   import UserContext from "userContext.js";

   const Header = () => {
     return <Menu />;
   };

   const Menu = () => {
     return (
       <UserContext.Consumer>
         {(user) => (
           <div>
             {user.name}
             <button>退出</button>
           </div>
         )}
       </UserContext.Consumer>
     );
   };
   ```

上面的示例代码中，被 `UserContext.Provider` 组件包裹的组件树才可以通过 `UserContext.Consumer` 组件来获取用户的状态。

### Context hook

随着 React 带来了 Hooks，我们可以使用 `useContext` 来获取 context 状态。

`useContext`` 接收一个 context 对象，返回一个 context 的值。它使我们的组件更加简洁，并允许我们创建自己的自定义钩子。

```javascript
import React, { useContext } from "react";
import UserContext from "userContext.js";

const Menu = () => {
  const user = useContext(UserContext);

  return (
    <div>
      {user.name}
      <button>退出</button>
    </div>
  );
};
```

## 使用 React context 的注意事项

解决 props drilling 的问题，React context 可以解决，但是它不是一个好的选择。第一是因为这会让组件的复用性变差，第二是 context 状态如果是一个对象，更新的时候会导致所有使用这个 context 的组件重新渲染，即使仅使用了未更新的属性值。

我们也可以更好组合我们的组件来解决这个问题，比如：

```javascript
import React from "react";

const App = () => {
  const [user, setUser] = useState({ name: "Eson", age: 18 });

  return (
    <Header>
      <Menu user={user} />
    </Header>
  );
};

const Header = ({ children }) => {
  return <header>{children}</header>;
};

const Menu = ({ user }) => {
  return (
    <div>
      {user.name}
      <button>退出</button>
    </div>
  );
};
```

[react context for beginners – the complete guide (2021)]: https://www.freecodecamp.org/news/react-context-for-beginners/
