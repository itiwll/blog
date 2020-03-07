---
title: fetch 上传进度的替代发方案
date: 2020-02-16 08:39:54
categories:
  - 技术
tags:
  - javascript
  - fetch
  - 上传文件
  - XMLHttpRequest
  - web 开发
---

## fetch 无法获取上传文件的进度
目前 fetch 没有类似 `XMLHttpRequest` 实例的 `upload.onprogress`, 所以需要现实上传进度的话需要使用 `XMLHttpRequest` 来上传文件。
[相关讨论][github/fetch/issuse/upload progress?]

<!-- more -->
## 使用 XMLHttpRequest 替代
```javascript
await new Promise((resolve, reject) => {
  const xhr = (this.xhr = new XMLHttpRequest());
  xhr.open("put", uploadUrl);
  xhr.setRequestHeader("auth", "xxx");
  xhr.upload.onprogress = event => {
    if (event.lengthComputable) {
      console.log("上传进度", event.loaded / event.total);
    }
  };
  xhr.onerror = () => {
    reject("上传失败！");
  };
  xhr.onabort = () => {
    reject("已取消上传");
  };
  xhr.upload.onabort = () => {
    reject("已取消上传");
  };
  xhr.onload = () => {
    if (xhr.status === 200) {
      resolve();
    }
  };
  xhr.send(file);
}).catch(e => {
  throw new Error(e);
});
```
## 参考
- [github/fetch/issuse/upload progress?]

[github/fetch/issuse/upload progress?]:https://github.com/github/fetch/issues/89

