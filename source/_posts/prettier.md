---
title: Prettier 入门教程
author: Eson Wong
date: 2021-12-12 08:00:00
categories:
  - 技术
  - Web 开发
tags:
  - ESLint
  - Web 开发
  - 前端
  - 技术
  - ECMAScript
  - Javascript
  - Babel
  - 开发规范
  - VSCode
  - 团队协作
  - Prettier
---

Prettier 是一个代码格式化工具，支持 JavaScript、JSON、TypeScript、GraphQL、CSS、HTML、Markdown、Vue、JSx 等语言和工具。

<img src="/asset/prettier.png" max-width="400px" alt="prettier" />

你可以在项目编辑器中或者在项目脚手架使用 Prettier 格式化代码，来确保项目中的代码有一致的风格。下面是一个简单的例子：

```js
// 格式化前
function HelloWorld() {
  return "Hello" + "World";
}

// 格式化后
function HelloWorld() {
  return "Hello" + "World"
}
```

<!-- more -->

## 配置

Prettier 的配置文件可以是一个名为 `.prettierrc` 的 JSON 文件。存放在项目的根目录下面，或者在操作系统的 HOME 目录下。

比如：

```json
{
  "parser": "babel",
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true
}
```

> 更多配置请参看 [Prettier 文档](https://prettier.io/docs/en/options.html)。

Prettier CLI, 编辑器的 Prettier 插件和其它 Prettier 工具都会读取这个配置文件。

## NPM 包

如果需要调用 Prettier 的 API 进行格式化，就要安装 `prettier` 模块。

```js
// 使用 npm
npm install prettier --save-dev

// 使用 yarn
yarn add prettier --dev
```

然后就可以在项目使用 Prettier 的 API：

```js
// index.mjs
import prettier from "prettier";

const options = {
  semi: false,
  parser: "babel",
};

const formatResult = prettier.format("foo();", options);
console.log("formatResult:", formatResult); 
// output: "formatResult: foo()"

const checkResult = prettier.check("foo();", options);
console.log("checkResult:", checkResult); 
// output: "checkResult: false"
```

## Prettier CLI

NPM 的 prettier 包可以用于命令行格式化代码。在不全局安装的情况下，可以用 npx 配合使用。

下面这行命令将会格式化当前目录下的所有文件：

```bash
npx prettier --write .
```

## 在浏览器环境中使用

Prettier 也可以不依赖 Node.js 在浏览器环境中使用，但是无法自动加载配置文件和插件。

```html
<script src="https://unpkg.com/prettier@2.5.1/standalone.js"></script>
<script src="https://unpkg.com/prettier@2.5.1/parser-babel.js"></script>
<script>
  const formatResult = prettier.format("foo();", {
    parser: "babel",
    semi: false,
    plugins: prettierPlugins,
  });
  console.log("formatResult:", formatResult); // output: "formatResult: foo()"
</script>
```

## 在线格式化

Prettier 提供了一个 [在线格式化 playground](https://prettier.io/playground/)。

![prettier playground](/asset/prettier-playground.png)

## 配合其它工具使用

通常我们会使用 Linter 来检查代码的规范，比如 ESLint、TSLint、Stylelint。他们在某些规则上会与 Prettier 相互矛盾。

解决这个问题我以 ESLint 为例，安装 `eslint-config-prettier`，并在 ESLint 的配置文件的 `extends` 添加 `prettier`。

```json
// .eslintrc.json
{····
  "extends": ["eslint:recommended", "prettier"]
}
```

TSLint 和 Stylelint 如法炮制。具体可参看以下项目：

* [tslint-config-prettier](https://github.com/prettier/tslint-config-prettier)
* [stylelint-config-prettier](https://github.com/prettier/stylelint-config-prettier)

## 其它

如果你不喜欢 Prettier 将 HTML 、Vue 模板 或者 JSX 等的默认配置 `"whitespace-sensitive": "css"` 格式化时把一对尖括号分为两行：

```html
<!-- input -->
<span class="dolorum atque aspernatur">Est molestiae sunt facilis qui rem.</span>
<div class="voluptatem architecto at">Architecto rerum architecto incidunt sint.</div>

<!-- output -->
<span class="dolorum atque aspernatur"
  >Est molestiae sunt facilis qui rem.</span
>
<div class="voluptatem architecto at">
  Architecto rerum architecto incidunt sint.
</div>
```

可以配置 Prettier 的 `whitespace-sensitive` 选项为 `ignore`。
