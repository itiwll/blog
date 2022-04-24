---
title: Commitlint 使用入门
author: Eson Wong
date: 2022-04-24 12:00:00
categories:
	- 技术
	- Web 开发
tags:
	- ESLint
	- Web 开发
	- 前端
	- 技术
	- 开发规范
	- 团队协作
	- Git
---

Commitlint 是一个命令行工具，用于检查 Git 提交的 message 是否符合项目的规范。规范的提交内容可以让开必者方便快速浏览查找比较代码，可以直接从 提交内容 生成 Change log，触发 CI 流程。

```bash
echo '提交内容' | npx commitlint
```

<!-- more -->

## 命令行工具

### 安装

全局安装 `@commitlint/cli`

```shell
npm install -g @commitlint/cli

# or

yarn global add @commitlint/cli
```

### 配置规则

`@commitlint/config-conventional` 包含了 [约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/) 的规则。

#### 安装

```shell
npm install -g @commitlint/config-conventional

# or

yarn global add @commitlint/config-conventional
```

#### 创建 `commitlint.config.js` 文件来配置

```js
// commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

### 使用 `commitlint` 命令来测试 commit message

运行 `echo '提交内容' | commitlint` 来测试 commit message。commitlint 命令会打印规范检查信息和返回状态码。

```shell
# Lint from stdin
echo 'foo: bar' | commitlint
# ⧗   input: foo: bar
# ✖   type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]

# ✖   found 1 problems, 0 warnings
# ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
```

### npx 使用

```shell
npx @commitlint/cli
```

## 配合 Husky 使用

我写了一篇 [Husky 入门教程](/husky) 博文。下面介绍怎么配合 Husky 在提交 message 前自动使用 Commitlint 检查提交规范。

按照 [Husky 入门教程](/husky) 配置好 Husky， 使用下面的命令添加 Husky 的 `commit-msg` 的 hook:

```shell
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
# or
yarn husky add .husky/commit-msg 'yarn commitlint --edit $1'
```

配制好后，提交时，Commitlint 会自动检查 commit message 是否符合项目中 `commitlint.config.js` 文件配制的规范。
