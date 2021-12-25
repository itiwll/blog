---
title: Vue 3.0 的 UI 库对比
author: Eson Wong
date: 2021-12-26 00:00:00
categories:
  - 技术
  - Web 开发
tags:
  - Vue
  - Vue 3.0
  - Ant Design
  - Element Plus
  - Vuetify
  - Native UI
  - 技术
  - Web 开发
  - 技术选型
  - 前端
---



## 主要特征

|UI库|适用场景|语言|模版|Style|打包
|---|---|---|---|---|---|
Ant Design Vue 3.0|中后台|Typescript|JSX|LESS|Webpack|
Element Plus|中后台|Typescript|Vue Template|SCSS|Rollup|
Vuetify 3.0|通用|Typescript|JSX|SASS|Rollup|
Naive UI|中后台|Typescript|JSX|Typescript Style|Vite|

### 主要目录结构

* Ant Design Vue 3.0
  
	```yml
	- components
	  - component
      - demo
      - style
      - index.tsx
      - index.zh-CN.md
	```

* Element Plus
  
  ```yml
  - packages
      - components # 组件
          - component
              - src
                  - component.ts
                  - component.vue
              - style
                  - css.ts 
                  - index.ts
      - theme-chalk # 样式
      - directives
      - locale
      - mixins
      - locale
      - utils
      - element-okus
  - docs # 文档 
  - play # 开发环境
  ```

* Vuetify 3.0
  
  目录过于复杂，层级太深，不建议参考
  ```yml
  - packages
      - vuetify
          - src
              - components
                  - component
  ```

* Naive UI
  
  ```yml
  - demo
  - design-notes
  - src
      - component
          - demos
          - src
              - Component.tsx
          - styles
  - themes
  ```

For 小黎：

我在整理查找这些资料的的时看到 [Naive UI 作者创作这个组件库的经历](https://www.zhihu.com/question/463736268/answer/1928240435)，才回想起自己学到的对于完成一个目标的方法：把目标细分，能够获得连绵不断的反馈。我觉得写一个组件库这个目标对于我们来说太大了，在它达到一个可用的状态之前，我们不能得到足够的反馈，来让我们保持热心维持下去。

我们的目标可以小一些，给 Naive UI 提 PR，学习制作 UI 库的经验。在这个过程当中确定我们的 UI 库的适用场景和设计原则。

