---
title: iOS 的 Scriptable app 的 Twitter fo数统计 Widget
date: 2021-11-17 00:00:00
categories:
	- 技术
	- iOS 开发
tags:
	- iOS
	- Scriptable
	- Widget
	- Javascript
---


Scriptable 是一个免费的 iOS 应用程序，可以在 iOS 上用 Javascript 来创建 Home Screen 的 Widget。

<img src="https://scriptable.app/assets/appicon.png" width="128px"/>

<!-- more -->

## 什么是 Scriptable

商店地址： [Scriptable](https://apps.apple.com/us/app/scriptable/id1405459188)

## Twitter Followers Count Widget Script

我尝试写了第一个脚本，用来在 Home Screen 创建一个 Widget 显示 Twitter 的 Followers Count。

![twitter followers count widget](/asset/twitter-followers-count-ios-scriptable-widget.jpeg)

## 使用方法

1. 安装 Scriptable
2. 在 Scriptable 中添加 Script
3. 把代码拷贝到 Scriptable 中

   [Github 地址](https://github.com/itiwll/scriptable-widget)
   脚本: 
   ```javascript
    // 作者： @eson000
    // Scriptable twitter followers count

    const userName = "eson000",

    // 到 https://developer.twitter.com/en/portal/dashboard 获取token
    bearerToken = "xxxxx";

    let widget

    try {
      let result = await load();
      let info = result.data;
      let avatar = await loadAvatar(info.profile_image_url.replace("_normal", "_bigger"));

      widget = await createWidget(info, avatar)
    } catch (e) {
      console.error(e)
      widget = await createLogWidget(e.message);
    }

    if (config.runsInWidget) {
      Script.setWidget(widget);
    } else {
      widget.presentMedium();
    }

    // This can speed up the execution, in particular when running the script from Shortcuts or using Siri.
    Script.complete();

    async function createLogWidget(logObj) {
      let widget = new ListWidget();

      let descriptionElement = widget.addText(JSON.stringify(logObj));·
      descriptionElement.minimumScaleFactor = 0.5;
      descriptionElement.textColor = Color.red();
      descriptionElement.font = Font.systemFont(18);

      return widget;
    }

    async function createWidget(info, avatar) {
      let widget = new ListWidget();

      widget.backgroundColor = Color.white();



      // Show avatar
      let avatarStack = widget.addStack();
      let avatarElement = avatarStack.addImage(avatar);
      avatarElement.imageSize = new Size(64, 64);
      avatarElement.cornerRadius = 4;
      avatarStack.centerAlignContent();

      widget.addSpacer(4);

      // Show user name
      let userNameStack = widget.addText(userName);
      userNameStack.textColor = Color.black();
      userNameStack.textOpacity = 0.8;
      userNameStack.font = Font.mediumSystemFont(13);

      widget.addSpacer(12);

      // Show followers count
      let followersCountStack = widget.addStack();
      let descriptionElement = followersCountStack.addText(`${info.public_metrics.followers_count}`);
      descriptionElement.minimumScaleFactor = 0.5;
      descriptionElement.textColor = Color.black();
      descriptionElement.font = Font.systemFont(18);
      followersCountStack.addSpacer(4);
      let followersText = followersCountStack.addText("Followers");
      followersText.minimumScaleFactor = 0.5;
      followersText.textColor = Color.black();
      followersText.textOpacity = 0.5;

      // UI presented in Siri ans Shortcuta is non-interactive, so we only show the footer when not running the script from Siri.
      if (!config.runsWithSiri) {

        widget.addSpacer(8);

      }
      return widget;
    }

    async function load() {
      let url = `https://api.twitter.com/2/users/by/username/${userName}?user.fields=public_metrics,profile_image_url`;
      let req = new Request(url);
      req.headers = {
        Authorization: `Bearer ${bearerToken}`,
      };
      return await req.loadJSON();
    }

    // 加载头像
    async function loadAvatar(url) {
      let req = new Request(url);
      return req.loadImage();
    }
   ```

4. 替换脚本中的 userName 和 bearerToken

   > bearerToken 需要在 <https://developer.twitter.com/en/portal/dashboard> 申请

5. 在 Home Screen 中添加 Widget
6. 设置 Widget，选择第 5 步之前添加的脚本

## 参考资料

- [Scriptable](https://scriptable.app)