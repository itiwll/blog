---
title: fetch 上传进度的替代发方案
date: 2020-02-16 08:39:54
tags:
  - javascript
  - fetch
  - 上传文件
  - XMLHttpRequest
---

## fetch 无法获取上传文件的进度

## 使用 XMLHttpRequest 替代

```javascript
await new Promise((resolve, reject) => {
  const xhr = (this.xhr = new XMLHttpRequest());
  xhr.open("put", uploadUrl);
  xhr.setRequestHeader("auth", "xxx");
  xhr.upload.onprogress = event => {
    if (event.lengthComputable) {
      this.progress = Math.floor((event.loaded / event.total) * 100);
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

## 定制中的标准
