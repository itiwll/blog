---
title: 怎么使用 React Context API
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
  - React
---

React context 是 React 提供的基本工具，用于在组件间共享状态。

本文介绍 React context 的基本用法。

![React Context]()

<!-- more -->

## 什么是 React Context?

React context 允许我们不使用 props 来传递数据的情况下，在组件间共享数据。它能让我们更容易的跨组件共享状态。

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

## 怎么使用 React Context?

### Provider 组件

### Context Hook

## 使用场景

### Theme

### 全局状态
