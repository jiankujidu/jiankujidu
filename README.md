# 青龙脚本

#### 介绍
个人存储的青龙脚本，都是从网上大神那边拉来的，基本不提供维护
多撸易黄，每个脚本不保证时效性。

#### 推荐配置
推荐试用nas、路由器、云服务器、轻量云服务器。
有闲置服务器的可以直接上，新购买的话可以看看收益能否跑得过服务器金额
尽量选择国内服务器，部分任务只有国内才能获取，国外可能跑不动。
基本上就是有网就行，能装docker能跑青龙面板就行。

#### 事前准备
1、安装docker
2、安装青龙面板
以上参考官方
3、打开防火墙对应端口
4、（可选）进入docker，安装依赖。


### 脚本对应项目及其方法


##### 咔咔
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

##### 全球购骑士卡 
一天1毛多吧，小小毛   
恢复了自动领金币的脚本，大概也就5分钱一天  
整点看广告的需要sign暂未取得  

#### 跑路或者黑号/无法提现的
###### 九章头条
看广告，一天3毛左右。屏蔽国外ip。0.3以外容易黑号，建议细水长流  
  部署方案：脚本有写  
 
##### 电视家
现金天天再涨，一天也有个1元毛，  
但是一直不能提现，可能是版本问题，  
脚本已作废   


#### 腾讯自选股
毛越来越少提现需要抢
看脚本内说明，部分号不能做，实名微信只能做一个   

###快手极速版（yml修改版）

变量格式:  ksjsb_data= xxxxx 多个账号用 @分割 或者 换行分割
定时:
```sh
0-59/30 2-15 * * *
```

拉库:
```sh
ql raw https://ghproxy.com/https://raw.githubusercontent.com/jiankujidu/jiankujidu/main/ymlksjsb.js
```

