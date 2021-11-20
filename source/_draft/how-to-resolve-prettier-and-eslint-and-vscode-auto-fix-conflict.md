---
title: 怎么解决 Prettier 和 ESLint 和 VSCode 自动修复的冲突
date: 2021-11-20 11:36:29
category: 
	- 技术
	- Web 开发
tags:
	- prettier
	- eslint
	- vscode
	- Web 开发
	- Babel
	- 技术
	- 项目管理
	- javascript
	- 教程
---

Prettier 是一个代码格式化工具。ESLint 是一个代码检查工具，它可以检查你的代码是否遵循了规范。他们通常会在项目中一起使用。前端开发过程中，我们通常会使用 Prettier 和 ESLint 来保持代码的可读性和统一代码风格和规范。项目脚手架工具和代码编辑器都可以引入 Prettier 和 ESLint 工具。

<!-- more -->

Prettier 和 ESlint 配置不当，会导致代码格式化和代码检查的冲突。项目脚手架工具和代码编辑器的配置不统一也会导致格式自动修复的冲突。

要解决这些问题我们得先弄清楚 Prettier 和 ESlint 在项目当中和编辑器中如何配置。

### Prettier 的配置
