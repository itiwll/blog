---
title: HTTP 的 Header 中的缓存相关字段介绍
date: 2020-02-28 22:21:02
tags:
  - http缓存相关字段
  - http header
  - 缓存
  - 前端
  - web 开发
  - 缓存技术
  - 性能优化
categories:
  - 技术
---

## HTTP Header 中的缓存相关字段
HTTP 请求和响应都包含 header 和 body 两个部分, 缓存相关的字段存在于 header 当中。HTTP 响应 header 中包含  `Expires`、`Cache-Control`、`Last-Modified`、`Etag`，请求 header 中包含 `If-Modified-Since`、`If-None-Match`。

<!-- more -->

### Expires
`Expires` 字段存在于 HTTP 响应头当中，仅在 HTTP 1.0 中生效。它的值是 资源过期的日期。现在的浏览器默认使用 HTTP 1.1, Expires 已经基本被淘汰。

### Cache-Control
`Cache-Control` 在 HTTP 请求和响应 Header 里。

`Cache-Control` 可能的值为:
- max-age=\<seconds\>  设置缓存存储的最长时间
- no-cache 不使用缓存的数据
- no-store 不缓存数据
- no-transform Header 里的某些字段不能由代理修改

仅存在于请求 Header 的 `Cache-Control` 值:
- max-stale[=\<seconds\>]  设置共享缓存存储的最长时间
- min-fresh=\<seconds\>  客户端希望获取一个能在指定的秒数内保持其最新状态的响应
- only-if-cached 表明客户端只使用缓存，但是会请求验证资源是否还有效

仅存在于响应 Header 中的 `Cache-Control` 值:
- must-revalidate  过期后不可用
- public  可以被客户端或者代理服务器缓存
- private  不能被代理服务器缓存
- proxy-revalidate  共享缓存的资源过期后不可用
- s-maxage=\<seconds\>  设置共享缓存存储的最长时间

`Cache-Control` 多个值之间用 `,` 隔开。
> 共享缓存：代理服务器缓存

### Last-Modified / If-Modified-Since
#### Last-Modified
存在于响应 Header 中，告诉客户端响应的资源最后的修改时间。
####  If-Modified-Since
存在于请求 Header 中，告诉响应服务器请求的资源上次服务器返回的资源最后修改时间。
如果服务器上的资源又被修改过，则服务器应当返回新的资源，否者服务器返回 `304` HTTP 状态码告诉客户端使用缓存的资源.

### Etag / If-None-Match
#### Etag
存在于响应 Header 中, 值为的资源的唯一标识符。由服务器决定唯一标识符的生成方法，比如哈希值。
#### If-None-Match
存在于请求 Header 中，告诉响应服务器请求的资源上次服务器返回的资源最后的 `Etag` 值。
如果服务器上的资源的唯一标识符与请求头中的 `Etag` 的值不一样，则服务器应当返回新的资源，否者服务器返回 `304` HTTP 状态码告诉客户端使用缓存的资源。唯一标识符 `Etag` 的规则优先于 `Last-Modified`。




[彻底弄懂HTTP缓存机制及原理]:https://www.cnblogs.com/chenqf/p/6386163.html
[Cache-Control]:https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control