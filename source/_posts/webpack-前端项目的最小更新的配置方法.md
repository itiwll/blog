---
title: webpack 前端项目的最小更新的配置方法
date: 2020-02-18 08:40:29
categories:
  - 技术
tags:
  - javascript
  - webpack
  - 前端
  - webpack 配置
  - 最小更新
  - 教程
---

![webpak]

本文将介绍使用 webpack 打包的 web 应用如何在更新时只需下载有变动的模块。

<!-- more -->

## webpack 的默认输出
webpack 用于编译 javascript 模块。默认为 `entry` 配置中指定的每一个入口文件，输出每个入口文件引用的所有模块打包的 js 文件，共同引用的模块将被打包到每个入口的打包文件。

> 本文的 webpack 特指 webpakc v4。

## 代码分离
wepack 提供了 [SplitChunksPlugin] 分离代码，在 webpack 配置中加入 `optimization.splitChunks` 配置：
```javascript
module.exports = {
  //...
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  }
};
```
共用的模块将被抽出单独打包成js文件。

如果我们使用 `import()` 懒加载模块，此模块也将被单独打包js文件。

## 输出 content hash 文件名
为了达到最小更新的的目的，关键就是缓存没有更新的模块。

为了缓存模块，需要让输出文件的文件名在内容不变的情况下不发生改变。在 webpack 的 output 配置中使用 `contenthash` 占位符指定输出文件名，根据内容计算文件名称：
```javascript
module.exports = {
  //...
  output: {
    //...
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js"
  },
}
```

## Nginx 缓存配置
以 nginx 为例配置资源缓存。

对 index.html 进行无缓存配置。
```
location = /index.html {
	add_header Cache-Control "no-cache, no-store";
}
```
其它资源文件设置一个较长时间的缓存
```
location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
{
	expires  1y;
}
location ~ .*\.(js|css)?$
{
	expires  1y;
}
```
最小化前端项目更新的工作完成。

## 优缺点
### 优点
- 发布的时，服务器上有相同的路径和文件名的文件可以不传输，实现增量发布。
- 用户在回访网站的时候，未更新的模块将保持缓存，实现缓存效益最大化，大大增加加载速度。

### 缺点
- 用户在首次访问加载时会略微增加下载数据量。
- `contenthash`不能在启用 HMR 时使用。
- 一个模块更新时会导致整个引用链的更新，包含这个模块应用链的输出文件都需要更新。


## 参考

- [代码分离]
- [SplitChunksPlugin]
- [webpack-前端项目的最小更新的配置方法](webpack-前端项目的最小更新的配置方法.md) 











[代码分离]:https://webpack.docschina.org/guides/code-splitting/#src/components/Sidebar/Sidebar.jsx
[SplitChunksPlugin]:https://webpack.docschina.org/plugins/split-chunks-plugin/


[webpak]:data:image/png;base64,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