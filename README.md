# 青龙脚本
    
<img width="150" src="https://z3.ax1x.com/2021/11/18/I7MpAe.png" alt="Img">


* # 介绍
个人存储的青龙脚本，都是从网上大神那边拉来的，基本不提供维护
多撸易黄，每个脚本不保证时效性。

* 推荐配置
推荐试用nas、路由器、云服务器、轻量云服务器。
有闲置服务器的可以直接上，新购买的话可以看看收益能否跑得过服务器金额
尽量选择国内服务器，部分任务只有国内才能获取，国外可能跑不动。
基本上就是有网就行，能装docker能跑青龙面板就行。

* # 事前准备
1、安装docker

2、安装青龙面板

以上参考官方

3、打开防火墙对应端口

4、（可选）进入docker，安装依赖。

* # 关于小号

建议：玩毛不要用自己常用手机，不然垃圾短信一堆

* 移动：和多号app（5元/月）
* 联通：沃小号app（5元/月）
* 联通&腾讯：微小号（小程序 10元/月）
* 联通&阿里：阿里小号app（已下线，续期的可以继续用）
* 电信：天翼小号app（已下线）


* # 在线请求头转JSON

我把我已知的都列举出来了，也欢迎投更好用的


* [uutool](https://uutool.cn/header2json/)

* [wejson](https://wejson.cn/header2json/)


* # 疑问及交流

使用中仍会遇到些小的问题，请有疑问的同学在QQ群上问吧，尽力帮你们答疑

个人QQ群:[641307462](https://qm.qq.com/cgi-bin/qm/qr?k=B5meSMnKmXOIACK9VyWTYjIxdLWpSbRm&authKey=EMQROjU6NjgLUwmHnYJF052JFdpfBq7mB+nNuC5JRxk5JZyFbbFzgT1fSzAq4vHB&noverify=0)


欢迎交流学习，反正我还是菜鸡
# 拉库
```sh
ql repo https://ghproxy.com/https://github.com/jiankujidu/jiankujidu.git "" "" "sendNotify" ""

```

* # 脚本对应项目及其方法


* ##### 咔咔
日常任务，先连续5天1块，一天大概0.1左右（没人头），一个人头5元（一天只能到账1元）。   
全部都是到1元自动提现

下载：https://h5.imkaka.com/fep/fun-kaka/invitation.html?code=bmuplqo

邀请码：bmuplqo

填写邀请码自动获得5元，每天提现1元到支付宝，提现需要实名认证+人脸
脚本自动提现和投票，投票次数每天送一次，发2条动态额外送2次(需要手动)
把任意api.imkaka.com捉包头里的Cookie(viewchat_access_token=xxxxxxxxx 这个)填到kakaCookie里，多账户@隔开

拉库:
```sh
ql raw https://ghproxy.com/https://raw.githubusercontent.com/jiankujidu/jiankujidu/main/kaka.js
```
定时:
```sh
0 0 12 * * ?  * * *
```

* ##### 全球购骑士卡 
一天1毛多吧，小小毛   
恢复了自动领金币的脚本，大概也就5分钱一天  
整点看广告的需要sign暂未取得  


* ###### 九章头条
看广告，一天3毛左右。屏蔽国外ip。0.3以外容易黑号，建议细水长流  
  部署方案：脚本有写  
 
* ##### 电视家
现金天天再涨，一天也有个1元毛，  



* #### 腾讯自选股
毛越来越少提现需要抢
看脚本内说明，部分号不能做，实名微信只能做一个   

* #### 快手极速版（yml修改版）

变量格式:  ksjsb_data= xxxxx 多个账号用 @分割 或者 换行分割
定时:
```sh
0-59/30 2-15 * * *
```

拉库:
```sh
ql raw https://ghproxy.com/https://raw.githubusercontent.com/jiankujidu/jiankujidu/main/ymlksjsb.js
```

* #### ksjsb乞丐版
魔改各路大佬的,已完成每日签到,开宝箱和分享3000币,每日3000币起,测试约为3000-8000币
变量名ksjsb_ck 多个用@分割，需要完整cookies，青龙单容器快手完整cookies只能放63个。建议启用60个,否则会报错
整合了周周助力
拉库:
```sh
ql raw https://ghproxy.com/https://raw.githubusercontent.com/jiankujidu/jiankujidu/main/ksjsb.py
```
