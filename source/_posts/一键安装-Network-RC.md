---

title: Network RC 一键安装
tags:
  - 网络遥控车
  - 技术
  - 网络 RC
  - WiFi/4G/5G 网络遥控车
  - 教程
  - 树莓派
  - 网络图传
  - 树莓派小车
  - WiFi/4G/5G 网络遥控车制作教程
categories:
  - 教程
  - 网络遥控车
  
---

## 树莓派安装系统

树莓派安装系统，系统设置里开启摄像头，连接网络。


## 一键安装命令

在树莓派的终端里运行下面代码:

```bash
bash <(curl -sL https://network-rc.esonwong.com/download/install-beta.sh)
```
<!-- more -->



## 选择穿透方法

### 使用内置穿透

输入 `yes` 回车

### 使用自定义穿透

1. 输入`no`
2. 输入 frp 配置信息
3. 输入 https 证书的路径

## 连接信息

配置完穿透信息后会显示控制界面的访问地址和密码，记住！

## 开始安装

输入 `ok` 后开始下载安装，并且设置开机启动服务。安装成功后会启动 Network RC。

## 查看运行状态

查看运行状态的命令是:

```bash
journalctl -u network-rc.service -e
```
