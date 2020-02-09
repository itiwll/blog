---
title: 'Ecmascript 提案：可选链 "?." '
date: 2020-01-31 20:37:15
tags: 
  - 可选链
  - optional chaining
  - '?.'
  - babel
  - ECMAScript
---

## 可选链提案
可选链 Optional Chaining 是一项方便读取对象属性值的 ECMAScript 语法提案。它将检测将要读取属性所属的对象是否为 `null` 或者 `undefined`，如果是将会返回 `undefinde`, 另外也可调用方法时用作于检测方法是否存在，如果存在则执行。已经进入 stage 4(Finished) 阶段，等待加入标准。
<!-- more -->

示例：
```javascript
const user = { name: "eson"};
const name = user?.name;

const list = [1,2,3];
const item0 = list?.[0];

const func = function(){};
func.?();
```

## 作用和使用场景
许多 API 或者后端接口返回的结果通常是一个 `object` 或者 `array`, 如果没有可用值则会返回 `null` 或 `undefined`， 通常只有结果不为 `null` 或 `undefined` 的时候我们才会去读取它的属性。`?.` 可以省去烦人的对象检测。

## 使用 bable 插件支持可选链语法
现在通过 babel 的 proposal-optional-chaining 插件可以提前享用可选链语法。

### 安装插件
```bash
npm install --save-dev @babel/plugin-proposal-optional-chaining
# or
yarn add @babel/plugin-proposal-optional-chaining -D
```

### babel 配置
```json
{
  "plugins": ["@babel/plugin-proposal-optional-chaining"]
}
```



## 参考
- [tc39 / proposal-optional-chaining](https://github.com/tc39/proposal-optional-chaining)

- [@babel/plugin-proposal-optional-chaining](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)