---
title: Commitlint 使用入门
author: Eson Wong
date: 2022-04-21 12:00:00
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

Commitlint 是一个命令行工具，用于检查 Git 提交的 message 是否符合项目的规范。

```bash
echo '提交内容' | npx commitlint
```

## 命令行工具

### 安装

全局安装 `@commitlint/cli` 和 `@commitlint/config-conventional` npm

```shell
npm install -g @commitlint/cli @commitlint/config-conventional

or

yarn global add @commitlint/cli @commitlint/config-conventional
```

### 配置

```js
// commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

###

### npx 使用

```shell
npx @commitlint/cli
```

## 配合 Husky 使用

我这了一篇 [Husky 入门教程](/husky) 博文。下面介绍怎么配合 Husky 使用 Commitlint。

Add hook

```shell
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
# or
yarn husky add .husky/commit-msg 'yarn commitlint --edit $1'
```
