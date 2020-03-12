---
title: HTTP 状态码的意义
date: 2020-03-10 08:59:29
tags:
  - 前端
  - http
  - web 开发
  - 开发规范
categories:
  - 技术
---

![HTTP 状态码]

## 介绍
HTTP 状态吗是指 HTTP 响应报文里状态行里的 Status-Code，用于指示特定 HTTP 响应的状态和类型。在开发时我们协商接口规范时，需要要求接口返回的状态码符合 [section 10 of RFC 2616] 的定义 ，以便在客户端封装请求模块通过判断状态码统一处理请求异常。

HTTP 响应报文状态行由 HTTP-Version、Status-Code、Reason-Phrase 组成：
```
HTTP/1.1 200 OK
```

## 响应状态码分为五类
### 信息响应(100–199)
#### 100 Continue
如果客户端向服务器发送请求的 Header 里包含 `Expect: 100-continue`头，服务器应当响应 `100`,然后客户端再向服务器发送 body 数据。
#### 101 Switching Protocol
#### 102 Processing (WebDAV)
#### 103 Early Hints

### 成功响应(200–299)
### 重定向(300–399)
### 客户端错误(400–499)
### 服务器错误 (500–599)
## 4xx 和 5xx 的区别

## 封装请求库处理异常状态
## 参考
- [HTTP 响应代码]
- [section 10 of RFC 2616]
- [系统服务化构建-状态码设计要点]

[HTTP 状态码]:../asset/http-status-codes.jpg
[section 10 of RFC 2616]:https://tools.ietf.org/html/rfc2616#section-10
[HTTP 响应代码]:https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
[系统服务化构建-状态码设计要点]:https://cloud.tencent.com/developer/article/1540087