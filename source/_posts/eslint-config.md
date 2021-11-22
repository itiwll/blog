---
title: 怎么配置 ESLint ？
date: 2021-11-20 16:26:58
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

<img src="/asset/eslint-logo.svg" width="200px" />

ESLint 是一个 ECMAScript/JavaScript 代码检查工具，它可以检查你的代码是否遵循了规范，它的目标是保证代码的一致性和避免错误。

本篇文章介绍一下 ESLint 的配置方式。

<!-- more -->

## 脚手架和编辑器中的

Web 前端开发的脚手架中一般会引入 eslint-loader 来帮我们检查代码的规范。编辑器中也有 ESLint 插件，可以帮我们检查代码的规范。代码编辑器的 ESLint 功能或插件和 eslint-loader 都遵循下面介绍的配置方式。

## ESLint 的配置方式

ESLint 有三种配置方式：

1. 注释配置
   使用注释把配置信息直接嵌入到一个代码源文件中。
2. 项目配置文件
   在项目根目录中使用 JavaScript、JSON 或者 YAML 文件为整个项目指定配置信息。可以配置一个独立的 `.eslintrc.*` 文件，或者直接在 `package.json` 文件里的 `eslintConfig` 字段指定配置，ESLint 会查找和自动读取它们。
   如果同一目录下 `.eslintrc.*` 和 `package.json` 的 `eslintConfig` 字段同时存在 `.eslintrc.*` 优先级高会被使用。
3. 用户配置
   如果你在你的 Home 目录(通常是`~/`)有一个配置文件，ESLint 只有在无法找到其他配置文件时才使用它。

> 优先级: 注释配置 > 项目配置文件 `.eslintrc.*` > 项目配置文件 `package.json` 的 `eslintConfig` 字段 > 用户配置

另外你可以在代码编辑器或者脚手架的 eslint-loader 配置中指定一个配置文件。它的优先级将大于项目配置文件, 小于注释配置。

## 配置文件的内容

下面介绍一下 ESLint 的配置文件中的一些字段。

### extends

`extends` 字段指定一个或多个基础配置，最终的配置将从这些基础配置继扩展和覆盖。可以是字符串，或者是一个数组。如果是数组，最终的配置会在前面的配置的基础上扩展和覆盖。

ESLint 内置了两种基础配置：

- eslint:recommended
  这个配置启用一些在 [ESLint 可用规则列表] 中有对勾标记的核心规格。
- eslint:all
  这个配置启用 [ESLint 可用规则列表] 中所有的核心规则
  > 重要：这些配置不推荐在产品中使用，因为它随着 ESLint 版本进行更改。使用的话，请自己承担风险。

> 如果你在编辑器中使用 Prettier 自动格式化需要安装 `eslint-config-prettier`，并在 `extends` 添加 `prettier`。以避免 Prettier 与 ESLint 的格式化冲突。

json 配置示例：

```json
// .eslintrc.json
{····
  "extends": ["eslint:recommended", "prettier"]
}
```

### root

默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。如果你想要你所有项目都遵循一个特定的约定时，这将会很有用，但有时候会导致意想不到的结果。为了将 ESLint 限制到一个特定的项目，在你项目根目录下的 `package.json` 文件或者 `.eslintrc.*` 文件里设置 `"root": true`。ESLint 一旦发现配置文件中有 `"root": true`，它就会停止在父级目录中寻找配置。

### rules

`rules` 字段中的每一条规则的键名可以在 [ESLint 可用规则列表] 中找到。

值可以是一个字符串、数字的规则开关值，或包含开关值和规则选项的数组。

规则开关的值可以是下列值之一：

- `off` 或 `0` - 关闭规则
- `warn` 或 `1` - 开启规则，规则不通过时，会输出警告
- `error` 或 `2` - 开启规则，规则不通过时，会输出错误，并终止构建

json 配置示例：

```json
// .eslintrc.json
{
  "root": true,
  "rules": {
    "eqeqeq": "off",
    "curly": "error",
    "quotes": ["error", "double"]
  }
}
```

### env 和 globals

`env` 定义一个或多个环境，每个环境都有一组预定义的全局变量，ESLint 对这些全局变量进行检查。需要额外的环境变量可在 `globals` 字段中定义。

json 配置示例：

```json
// .eslintrc.json
{
  "env": {
    "browser": true,
    "node": true
  },
  "globals": {
    "$": "readonly",
    "token": "writable"
  }
}
```

### 其它常用配置介绍

- parser
  指定解析器，默认为 `esprima`, 其他常用的有：

  - `babel-eslint` 一个对 Babel 解析器的包装，使其能够与 ESLint 兼容。
  - `@typescript-eslint/parser` 将 TypeScript 转换成与 estree 兼容的形式，以便在 ESLint 中使用。

- processor
  插件可能会提供处理器。处理器可以从其他类型的文件中提取 JavaScript 代码，然后让 ESLint 处理，或者处理器可以出于某种目的在预处理中转换 JavaScript 代 码。

- plugins
  ESLint 的插件，可以为 ESLint 添加配置、规则、解析器等。

## 过滤文件和目录

`.eslintignore` 文件可以用来过滤 ESLint 处理的文件和目录。用法和 `.gitignore` 相同。

如果没有 `.eslintignore` 文件，ESLint 将在 package.json 文件中查找 `eslintIgnore` 键，来检查要忽略的文件。

## 参考文档

- [ESLint 文档](https://eslint.org/docs/user-guide/configuring)
- [ESLint 可用规则列表]

[eslint 可用规则列表]: https://cn.eslint.org/docs/rules/
