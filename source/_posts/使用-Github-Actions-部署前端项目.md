---
title: 使用 Github Actions 部署前端项目到
date: 2020-02-08 09:37:28
categories:
  - 技术
    - 自动化
tags:
  - github actions
  - 自动部署
  - 前端部署
  - 自动化
  - 教程
  - 前端
  - web 开发
---

## Github Actions 简介
GitHub Actions 是 Github 推出的一项服务。提供了虚拟服务器环境和 [Actions 市场]，用于 github 上的项目进行持续集成。这对于 Github 上公开的仓库是免费的，私有仓库有服务器运行时间和存储空间的限制，具体请看 [about billing for github actions]。

## 教程
下面介绍怎么如使用 GitHub Actions 部署一个前端项目到 linux 服务器上。
<!-- more -->

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
更多触发方式参考 [Triggering a workflow with events] 和 [Workflow syntax for GitHub Actions]。
### 配置 jobs 和 build
事件可以触发的多个 job，这里我们添加一个 build job, 指定运行环境。
```yml
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [12.x]
```
### 配置 steps
在 build 下配置 steps。
```yml
    steps:
```
#### 获取源码
使用 [Actions 市场] 里的 [actions/checkout] 获取仓库代码，
```yml
      - name: Checkout
        uses: actions/checkout@v2
```
#### 安装模块和构建
使用 npm 安装模块和运行 build script。
```yml
      - name: Build
        run: |
          npm install && npm run build
```
#### 部署
我们要使用 `rsync` 命令来同步构建好的文件目录到到发布目标服务器。

首先要准备可以在目标服务器上发布的私钥和 known-hosts，添加到仓库设置的 Secrets 中，命名为 `SSH_PRIVATE_KEY` 和 `KNOWN_HOSTS_TEST` 这样可以避免被暴露而在配置中使用。用 [shimataro/ssh-key-action] 安装私钥到 Github Action 的虚拟服务器。

![添加服务器发布私钥](/asset/add-secret.png)


```yml
      - name: Install SSH key for deploy
        uses: shimataro/ssh-key-action@v1
        with:
          name: id_rsa-deploy
          private-key: ${{ secrets.SSH_PRIVATE_KEY }}
          known-hosts: ${{ secrets.KNOWN_HOSTS_TEST }}
          config: |
            Host deploy
              HostName xxx.xxx.xxx
              User user-of-deploy
              IdentityFile ~/.ssh/id_rsa-deploy
```
使用 `rsync` 命令同步发布文件夹。
```yml
      - name: Deploy
        run: |
          rsync -rv $GITHUB_WORKSPACE/dist/ user@xxx.xxx.xxx:/www/demo
```
### 推送代码
接下来推送代码到 master 分支即可执行这个 workflow ，将项目部署到服务器。可以在仓库的 Actions 菜单查看运行日志。

## 示例
链接：[Github Actions 发布前端项目演示]



## 参考
- [GitHub Actions Documentation]
- [Triggering a workflow with events]
- [actions 市场]
- [about billing for github actions]
- [Github Actions 发布前端项目演示]
- [actions/checkout]
- [Workflow syntax for GitHub Actions]

[Actions 市场]:https://github.com/marketplace?type=actions
[GitHub Actions Documentation]:https://help.github.com/cn/actions/automating-your-workflow-with-github-actions
[Triggering a workflow with events]:https://help.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow#triggering-a-workflow-with-events
[about billing for github actions]:https://help.github.com/en/github/setting-up-and-managing-billing-and-payments-on-github/about-billing-for-github-actions#about-billing-for-github-actions
[Github Actions 发布前端项目演示]:https://github.com/itiwll/github-actions-deploy-front-end-example
[Workflow syntax for GitHub Actions]: https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions
[actions/checkout]:https://github.com/actions/checkout
[shimataro/ssh-key-action]: https://github.com/shimataro/ssh-key-action