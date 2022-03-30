---
title: Husky 入门教程
author: Eson Wong
date: 2021-12-12 12:00:00
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
  - Git
---

Husky 是一个 NPM 包，用更好的使用 Git 钩子来管理项目。通常它被用于项目的代码提交前的各类规范的检查。

<img src="/asset/prettier.png" max-width="400px" alt="prettier" />

<!-- more -->

## 安装

1. 安装 Husky

   ```shell
   npm install husky --save-dev
   ```

2. 启用 Husky

   ```shell
   npx husky install
   ```

3. 在 package.json 中添加 prepare 钩子，用于在 `npm install` 之后自动启用 Husky

   ```shell
   npm set-script prepare "husky install"
   ```

   `package.json` 文件将会添加一个 `prepare` script:

   ```json
   {
     "scripts": {
       "prepare": "husky install"
     }
   }
   ```

## 使用

1. 创建钩子

   ```shell
   npx husky add .husky/pre-commit "npm run lint"
   ```

## 配置工具

husky-init 是一个在项目当中快速初始化 Husky 的工具。

```shell
npx husky-init && npm install #npm
npx husky-init && yarn #yarn
```

运行上面的命令会配制好 husky，并会创建一个简单的 `pre-commit` husky 钩子。

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm test
```
