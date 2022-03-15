---
title: 怎么解决 Prettier 和 ESLint 在 VSCode 里的冲突?
date: 2021-11-20 11:36:29
category: 
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

Prettier 是一个代码格式化工具。ESLint 是一个代码检查工具，它可以检查你的代码是否遵循了规范。他们通常会在项目中一起使用。前端开发过程中，我们通常会使用 Prettier 和 ESLint 来保持代码的可读性和统一代码风格和规范。项目脚手架工具和代码编辑器都可以引入 Prettier 和 ESLint 工具。

<!-- more -->

Prettier 和 ESlint 配置不当，会导致代码格式化和代码检查的冲突。项目脚手架工具和代码编辑器的配置不统一也会导致格式自动修复的冲突。

要解决这些问题我们得先弄清楚 Prettier 和 ESlint 在项目当中和编辑器中如何配置。

### ESLint 的配置

```json
{
  "plugins": ["prettier"],
  "extends": ["eslint:recommended", "plugin:prettier/recommended"]
}
```

### Prettier 的配置

#### htmlWhitespaceSensitivity

默认 Prettier 配置的 `"htmlWhitespaceSensitivity": "css"` 在格式化时会认为 HTML 行内元素的空格和换行是有意义的，不会按其他规则格式化时在标签内部头部和尾部添加换行。因为行内元素内的起始换行和结束换行会在浏览器中渲染出空格。而且会导致一些情况下的行内元素的 `>` 前换行，不太美观。

```html
<!-- <span> 是行内元素, <div> 块级元素 -->

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

### VSCode

VSCode 体验

`.vscode/extensions.json` 文件

```json
{
  "recommendations": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
}
```
