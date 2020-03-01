---
title: HTTP 的 Header 中的缓存相关字段介绍
date: 2020-02-28 22:21:02
tags:
  - http
  - 前端
  - 性能优化
categories:
  - 技术
todo:
  - [x] 阅读[彻底弄懂HTTP缓存机制及原理]
  - [x] 题大纲
  - [] 分段完成
---

## Http Header 中的缓存相关字段
Http 请求和响应都包含 header 和 body 两个部分, 缓存相关的字段存在于 header 当中。Http 响应 header 中包含  `Expires`、`Cache-Control`、`Last-Modified`、`Etag`，请求 header 中包含 `If-Modified-Since`、`If-None-Match`。

### Expires
### Cache-Control
### Last-Modified / If-Modified-Since
### Etag / If-None-Match

## 缓存更新的流程图



[彻底弄懂HTTP缓存机制及原理]:https://www.cnblogs.com/chenqf/p/6386163.html