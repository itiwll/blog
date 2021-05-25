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
HTTP 状态码是指 HTTP 响应报文里状态行里的 Status-Code，用于指示特定 HTTP 响应的状态和类型。

HTTP 响应报文状态行由 HTTP-Version、Status-Code、Reason-Phrase 组成：
```
HTTP/1.1 200 OK
```

<!-- more -->

## 响应状态码分为五类
### 信息响应(100–199)
#### 100 Continue
如果客户端向服务器发送请求的 Header 里包含 `Expect: 100-continue`头，服务器应当响应 `100`,然后客户端再向服务器发送 body 数据。

#### 101 Switching Protocol
在如果客户端请求切换协议，切换协议之前，服务器响应 `101` 表示服务器也正在切换的协议。

比如客户端请求切换到 websocket 协议：
```
GET /ws HTTP/1.1
Host: xxx.com
Upgrade: websocket
```
服务器响应：
```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
```
接下来将以 websocket 协议进行通信。

#### 102 Processing (WebDAV)
此代码表示服务器已收到并正在处理该请求，但没有响应可用。如果服务器需要很长时间处理一个请求，可以先响应此状态码，处理完再发送 body。

#### 103 Early Hints
与[Link]一起使用告知客户端需要预加载的一些文件，可加速网页加载。以 HTML 为列，通常浏览器需要加载 html 文件并解析到外部文件的引用才会开始加载这些文件，而利用此特性可以提前加载这些文件。

### 成功响应(200–299)
成功响应状态的具体意义：[成功响应](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status#%E6%88%90%E5%8A%9F%E5%93%8D%E5%BA%94)

响应状态是 `202 Accepted` 的话，可能需要客户端继续轮询接口至响应状态为 `200 ok`。

### 重定向(300–399)
重定向响应状态的具体意义：[重定向响应](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status#重定向)

### 客户端错误(400–499)
4xx 错误是客户端发送的请求本身存在错误返回的状态，包括请求地址错误、请求参数错误、认证错误等。客户端不应该再重新发送请求，而是先解决错误。

客户端错误响应状态的具体意义：[客户端错误响应](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status#客户端响应)

### 服务器错误 (500–599)
5xx 码告诉客户端其发送的请求是完美通过验证的但服务器端出现了一些问题。客户端可以无需做任务修改来继续向服务端发送请求。

服务器错误响应状态的具体意义：[服务器错误响应](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status#服务端响应)

## 封装请求库处理异常状态
在开发时我们协商接口规范时，需要要求接口返回的状态码符合 [section 10 of RFC 2616] 的定义 ，以便在客户端封装请求模块通过判断状态码统一处理请求异常。  
比如： 
- 接口响应状态为 `401 Unauthorized` 时，客户端提示用户没有权限
- 接口响应状态为 5xx 时，弹出错误消息
- 接口响应状态为 `404 Not Found` 时， 提示“发出的请求针对的是不存在的记录，服务器没有进行操作” 

等等...


## 参考
- [HTTP 响应代码]
- [section 10 of RFC 2616]
- [系统服务化构建-状态码设计要点]

[HTTP 状态码]:../asset/http-status-codes.jpg
[section 10 of RFC 2616]:https://tools.ietf.org/html/rfc2616#section-10
[HTTP 响应代码]:https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
[系统服务化构建-状态码设计要点]:https://cloud.tencent.com/developer/article/1540087
[Link]:https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Link