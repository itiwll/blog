---
title: 'Ecmascript 提案：空值合并运算符 "??" '
date: 2020-02-05 20:37:15
tags: 
  - 空值合并运算符
  - nullish coalescing
  - '??'
  - babel
  - ECMAScript

---

## 简介

如果控制合并运算符 `??` 左边的值为 `null` 或 `undefined` ，表达式会返回控制合并运算符右边的值，否则返回左边的值。

已经进入 stage 4(Finished) 阶段，等待加入标准。

示例：

``` javascript
const user = {
    name: "eson",
    age: 0,
    address: null,
    gender: ""
};
const userName = user.name ?? "unknown"; // "eson"
const userAge = user.age ?? 18; // 0
const userAddress = user.address ?? "unknown"; // "unknown"
const userGender = user.gender ?? "male"; // ""
```

## 作用和使用场景

`??` 主要可以用来获取对象属性值时替代 `||` 来设定默认值。使用 `||` 时，如果 `||` 左边的值为 `0` 或者空字符串，表达仍然降返回右边的值.

如：

``` javascript
const userAge = user.age || 18; // 18
const userAddress = user.address || "unknown"; // "unknown"
const userGender = user.gender || "male"; // "male"
```

## 使用 bable 插件支持空值合并运算符
### 安装插件

``` bash
npm install --save-dev @babel/plugin-proposal-nullish-coalescing-operator
# or
yarn add @babel/plugin-proposal-nullish-coalescing-operator -D
```

### babel 配置

```json
{
  "plugins": ["@babel/plugin-proposal-nullish-coalescing-operator"]
}
```

## 参考

* [tc3/proposal-nullish-coalescing](https://github.com/tc39/proposal-nullish-coalescing)
* [@babel/plugin-proposal-nullish-coalescing-operator](https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator)

