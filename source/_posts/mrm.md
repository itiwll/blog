---
title: Mrm 使用入门
author: Eson Wong
date: 2022-04-17 12:00:00
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
	- Vscode
---

构建前端项目会使用很多的工具，比如 ESLint、Prettier、Webpack、Babel、Husky、lint-staged、git 、编辑器等等。创建一个项目配置起来相当繁琐。

Mrm 是一个命令行工具，用于帮助开发者更好对这些工具进行管理配置。除此之外还可以对帮助我们配置 `README.md`、`license`、`package.json` 等文件进行管理。

```bash
npx mrm gitignore # 生成或更新 .gitignore
```

用 npx 命令可以在不安装的情况下使用 mrm。

<!--more-->

## 预设的任务

```bash
npx mrm
```

这个命令将会列出所有预设支持的配置。

```plain
ci                Adds GitHub Actions workflow to run Node.js tests
codecov           Adds Codecov
contributing      Adds contributing guidelines
dependabot        Adds GitHub Actions workflow to automerge Dependabot pull requests
editorconfig      Adds EditorConfig
eslint            Adds ESLint
gitignore         Adds .gitignore
jest              Adds Jest
license           Adds license file
lint-staged       Adds lint-staged
package           Adds package.json
prettier          Adds Prettier
readme            Adds readme file
semantic-release  Adds semantic-release
styleguidist      Adds React Styleguidist
stylelint         Adds Stylelint
travis            Adds Travis CI
typescript        Adds TypeScript
```

其中比较常用的有：

- 创建或更新 .gitignore 文件

  ```bash
  npx mrm gitignore
  ```

- 配置 Prettier 代码格式化工具

  ```bash
  npx mrm prettier
  ```

- 配置 ESLint 代码检查工具

  ```bash
  npx mrm eslint
  ```

- 配置 lint-staged 只对被提交的文件进行代码检查

  ```bash
  npx mrm lint-staged
  ```

## 自定义

也可在 `~/.mrm/<TASK>/index.js` 创建自定义任务。

比如，我们可以创建一个自定义的 `my-gitignore` 任务，用于生成或更新 `.gitignore` 文件。

1. 安装 `mrm-core`

   ```bash
   cd ~/.mrm
   npm init -y
   npm install --save mrm-core
   ```

2. 创建自定义任务

   ```js
   // ~/.mrm/my-gitignore/index.js
   const { lines } = require("mrm-core");

   module.exports = function task() {
     lines(".gitignore")
       // 添加新的行
       .add(["node_modules/", ".DS_Store"])
       // 更新或保存文件
       .save();
   };

   module.exports.description = "Adds .gitignore";
   ```

3. 执行自定义任务

   ```bash
   npx mrm my-gitignore
   ```
