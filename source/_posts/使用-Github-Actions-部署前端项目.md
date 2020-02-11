---
title: 使用 Github Actions 部署前端项目
date: 2020-02-08 09:37:28
tags:
  - github actions
  - 自动部署
  - 前端部署
  - 自动化
  - 教程
---

## Github Actions 简介
GitHub Actions 是 Github 推出的一项服务。提供了虚拟服务器环境和 [acrions 市场]，用于 github 上的项目进行持续集成。这对于 Github 上公开的仓库是免费的，私有仓库有服务器运行时间和存储空间的限制,具体请看 [about billing for github actions]。

<!-- more -->
## 教程
下面介绍怎么如使用 GitHub Actions 部署一个前端项目。

### 建立 `workflow` 配置文件
在仓库的根目录中创建文件夹 `.github/workflows`。在此文件夹中创建一个 `.yml` 后缀的文件。 

文件内容：
```yml
name: CI
```

### 指定触发事件
我们以推送到 master 分支为例：
```yml
on: 
  push:
    branches: 
      - master
```
更多触发方式参考 [Triggering a workflow with events]。
### 配置 jobs 和 build
### 配置 steps
#### 获取源码
#### 安装模块和构建
#### 部署

## 示例

## 参考
- [GitHub Actions Documentation]
- [Triggering a workflow with events]
- [acrions 市场]
- [about billing for github actions]

[acrions 市场]:https://github.com/marketplace?type=actions
[GitHub Actions Documentation]:https://help.github.com/cn/actions/automating-your-workflow-with-github-actions
[Triggering a workflow with events]:https://help.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow#triggering-a-workflow-with-events
[about billing for github actions]:https://help.github.com/en/github/setting-up-and-managing-billing-and-payments-on-github/about-billing-for-github-actions#about-billing-for-github-actions

