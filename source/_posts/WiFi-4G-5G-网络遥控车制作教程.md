---
title: WiFi/4G/5G 网络遥控车制作教程
date: 2020-04-09 10:26:19
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
![WiFi/4G/5G 网络遥控车制作教程]

## 简介

本教程介绍使用树莓派和遥控车制作一台可以通过网络控制的遥控车。软件使用我开发的 [network-rc]。

## 材料

- 树莓派3B+ (300元)
- 树莓派摄像头 (15元) / ps3 摄像头 (40远)
- 移动电源 (60元) / USB输出降压模块 (?元)
- 环奇743A (286元，某宝上找不到了)
- 杜邦线(公对公x1, 公对母x4) (3元)
- 其它固定材料

<!-- more -->

## 树莓派软件安装运行

### 安装 network-rc

0. 树莓派安装 buster 版本以上系统连接摄像头，连接wifi。

> **注意：最新系统存在兼通性问题， 使用此版本系统<http://downloads.raspberrypi.org/raspbian/images/raspbian-2020-02-07/>**
  
> 网络上有很多树莓派系统安装教程，请自行搜索.

1. 在树莓派上下载 [network-rc] 软件

```bash
wget https://network-rc.esonwong.com/download/network-rc.tar.gz
```

2. 解压文件

```bash
tar -zxvf network-rc.tar.gz
```

3. 运行程序

```bash
sudo ./network-rc/node ./network-rc/index.js
```
4. 用同一局域网网下的浏览器里打开 http://树莓派的ip地址:8080 即可看到控制界面

## 环奇743A 改装
如果你是用其它车的话，只要舵机和电调的接线和控制信号通用即可(__仅支持三线的电调和舵机__)。

![树莓派 GPIO 连接小车]

### 1. 取下舵机和电调与接收机之间的连线
### 2. 连接到树莓派 
树莓派关机。
- 将舵机和电调的正极线(VCC\红色) 和 电调的正极线用公对公杜邦线连接起来，舵机从电调上取电。
- 使用公对母杜邦线将舵机的信号线(PWM\白色或黄色) 连接到树莓派的 GPIO软件 12 (编号32\PWM0)
- 使用公对母杜邦线将舵机的信号线(PWM\白色或黄色) 连接到树莓派的 GPIO 13 (编号33\PWM1)
- 使用公对母杜邦线将舵机和电调的地线(Ground\黑色或棕色) 连接到树莓派的GPIO Group，建议连接到编号30和34，方便理线。

## 启动
树莓派接通电源，开机，运行软件。小车接通电源，开机。打开浏览器，开始享用吧。

## 视频教程
<iframe src="//player.bilibili.com/player.html?aid=882676306&bvid=BV1iK4y1r7mD&cid=177948237&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="480px"> </iframe>

链接：[WiFi/4G/5G 网络遥控车制作教程]
## 预告
作为一个可以网络控制且拥有网络图传的小车，它的梦想是自己周游世界（没有熊孩子的世界）。下次我会教大家如何通过 4G 网络来控制小车。

[网络遥控车互联网控制教程]

## 参考

- [Bilibili EsonWong](https://space.bilibili.com/96740361)
- [network-rc]
- [WiFi/4G/5G 网络遥控车制作教程]
- [4G 5G 网络 RC 遥控车03 - 无限距离远程遥控？]
- [树莓派 4G 网络遥控车图传延迟测试]
- [4G/5G 网络 RC 遥控车 04 - 人工智能(zhang)，自动驾驶，人体跟随]
- [4G/5G 网络 RC 遥控车 - 05 摄像头！麦克风！云台！语音对讲！]
- [网络遥控车互联网控制教程]

## 交流微信群

入群方法添: 加微信 EsonWong_ 备注 Network RC

## 捐赠

![微信赞赏吗](../asset/wechat-donate.jpg)


[network-rc]:https://github.com/itiwll/network-rc
[树莓派 4G 网络遥控车图传延迟测试]:https://www.bilibili.com/video/BV15K411W7bK
[4G/5G 网络 RC 遥控车 04 - 人工智能(zhang)，自动驾驶，人体跟随]:https://www.bilibili.com/video/BV1fi4y1t7dx/
[4G 5G 网络 RC 遥控车03 - 无限距离远程遥控？]:https://www.bilibili.com/video/BV1Xp4y1X7fa/
[树莓派 GPIO 连接小车]:../asset/树莓派-GPIO-连接小车.jpg
[WiFi/4G/5G 网络遥控车制作教程]:../asset/4g网络rc遥控车02-开篇-封面.jpg
[4g 网络 rc 遥控车03 - 无限距离远程遥控？]: ../asset/4g%E7%BD%91%E7%BB%9C%20RC%20%E9%81%A5%E6%8E%A7%E8%BD%A603%20-%20%E6%97%A0%E9%99%90%E8%B7%9D%E7%A6%BB%E8%BF%9C%E7%A8%8B%E9%81%A5%E6%8E%A7%EF%BC%9F-%20%E5%B0%81%E9%9D%A2.jpg
[4G/5G 网络 RC 遥控车 - 05 摄像头！麦克风！云台！语音对讲！]:https://www.bilibili.com/video/BV14C4y1p7ap/
[网络遥控车互联网控制教程]:../网络遥控车互联网控制教程/