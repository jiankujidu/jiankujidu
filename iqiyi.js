/**
 * 爱奇艺自动签到等任务
 * 作者:小赤佬
 * 定时: 0 0 0 * * * 每天一次即可
 * 需要抓包获取P00001和P00003参数，直接浏览器登录爱奇艺后去应用程序里面找cookie里面的参数就行
 * 网页版签到：https://tools.tyh52.com/iqiyi
 * 网页版可直接提取出可用的ck
 * 添加环境变量:iqiyi_token
 * 变量值 示例: P00001=xxxxx;P00003=xxxxx;name=xxxxx (多个用@或者&或者回车分割)
 * name参数可加可不加，只是为了区分显示
 */
const $ = new Env('爱奇艺任务');
let tokens = $.getdata('iqiyi_token')||process.env['iqiyi_token']||'';
!(async () => {
    if(tokens.indexOf("@")!=-1){
        tokens = tokens.split('@')||[];
    }if(tokens.indexOf("&")!=-1){
        tokens = tokens.split('&')||[];
    }else{
        tokens = tokens.split('\n')||[];
    }
    if(!tokens[0]){
        $.log(`请设置环境变量添加爱奇艺账号`)
        return;
    }
    $.log(`共获取到${tokens.length}个账号`);
    for (let i = 0; i < tokens.length; i++) {
        let token=tokens[i];
        let info=jxUserInfo(token);
        $.log(`开始第${i+1}个账号`+(info.name?':'+info.name:''))
        if(info['P00001']&&info['P00003']){
            let userinfo = new UserInfo(info['P00001'],info['P00003'],info,info.name?info.name:i+1);
            await userinfo.main();
        }else{
            $.log(`第${i+1}个账号:账户信息有误，没有找到P00001和P00003参数`)
        }
    }

})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done());

function jxUserInfo(tokenStr){
    let tokens=tokenStr.split(";")||[];
    let res={};
    tokens.forEach(item=>{
        let items=item.split("=");
        if(items.length>1){
            res[items[0]]=items[1];
        }
    })
    return res;
}


function UserInfo($P00001 = null, $P00003 = null, $config = [], name = '') {
    let isbreak = false;
    let cookie = '';
    let $dfp = 'a06b9bfd0fde4543268c6251c5c1ccf024ea778800482d4dfd00aa811e9ed56155';//爱奇艺指纹
    let $user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 Edg/95.0.1020.44';
    if ($P00001 && $P00003) {
        cookie = `P00001=${$P00001}; P00003=${$P00003};`;
    }

    this.main = async function () {
        await get_info();
        if (isbreak) {
            return;
        }
        await member_sign();
        await web_sign();
        await lottery();
        await score();
        await vipDailyTask();
        await vipOtherTask();
    }

    function get_info() {
        return new Promise(resolve => {
            let url = 'http://serv.vip.iqiyi.com/vipgrowth/query.action';
            const options = {
                url: url,
                headers: {
                    'Content-Type': 'application/json',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.39',
                    'Cookie': cookie
                }
            }
            $.get(options, async (err, resp, data) => {
                try {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.code == 'A00000') {
                            $.log('登录成功！');
                            isbreak = false;
                        } else {
                            $.log('登录失败！', data.msg);
                            isbreak = true;
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve(data);
                }
            });
        })
    }

    function member_sign() {
        return new Promise(resolve => {
            let url = 'https://community.iqiyi.com/openApi/task/execute?';
            let qyid = md5(strRandom(16));
            let sign_data = {
                "agentType": "1",
                "agentversion": "1.0",
                "appKey": "basic_pcw",
                "authCookie": $P00001,
                "qyid": qyid,
                "task_code": "natural_month_sign",
                "timestamp": time_13(),
                "typeCode": "point",
                "userId": $P00003,
            }
            let body = {
                "agentType": "1",
                "agentversion": "1",
                "authCookie": $P00001,
                "qyid": qyid,
                "taskCode": "iQIYI_mofhr",
                "verticalCode": "iQIYI"
            }
            let sign = splice('|', sign_data, 'UKobMjDMsDoScuWOfp6F');
            const options = {
                url: url + http_build_query(sign_data) + "&sign=" + sign,
                body: JSON.stringify({natural_month_sign: body}),
                headers: {
                    'Content-Type': 'application/json',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.39',
                    'Cookie': cookie
                }
            }
            $.post(options, async (err, resp, data) => {
                try {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.code === 'A00000') {
                            if (data.data.success) {
                                console.log(`手机端签到成功,获得积分${data.data.rewards[0].rewardCount},成长值${data.data.rewards[0].rewardCount},累计签到${data.data.signDays}天`);
                            } else {
                                console.log(`手机端签到失败：${data.data.msg}`);
                            }
                        } else {
                            console.log(`手机端签到失败：${data.msg}`);
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve(data);
                }
            });
        })
    }

    function web_sign() {
        return new Promise(resolve => {
            let url = 'https://community.iqiyi.com/openApi/score/add?';
            let sign_data = {
                "agenttype": "1",
                "agentversion": "0",
                "appKey": "basic_pca",
                "appver": "0",
                "authCookie": $P00001,
                "channelCode": "sign_pcw",
                "scoreType": "1",
                "srcplatform": "1",
                "typeCode": "point",
                "userId": $P00003,
                "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.39",
                "verticalCode": "iQIYI"
            }
            let sign = splice('|', sign_data, 'DO58SzN6ip9nbJ4QkM8H');
            const options = {
                url: url + http_build_query(sign_data) + "&sign=" + sign,
                headers: {
                    'Content-Type': 'application/json',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.39',
                    'Cookie': cookie
                }
            }
            $.post(options, async (err, resp, data) => {
                try {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.code === 'A00000') {
                            if (data.data.code === 'A00000') {
                                console.log(`网页端签到成功,获得积分${data.data[0].score},累计签到${data.data[0].continuousValue}天`);
                            } else {
                                console.log(`网页端签到失败,获得积分${data.data[0].message}`);
                            }
                        } else {
                            console.log(`网页端签到失败：${data.msg}`);
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve(data);
                }
            });
        })
    }

    function lottery() {
        return new Promise(resolve => {
            let url = 'https://iface2.iqiyi.com/aggregate/3.0/lottery_activity';
            let sign_data = {
                "app_k": "0",
                "app_v": "0",
                "platform_id": 10,
                "dev_os": "2.0.0",
                "dev_ua": "COL-AL10",
                "net_sts": 1,
                "qyid": "2655b332a116d2247fac3dd66a5285011102",
                "psp_uid": $P00003,
                "psp_cki": $P00001,
                "psp_status": 3,
                "secure_v": 1,
                "secure_p": "0",
                "lottery_chance": 1,
                "req_sn": time_13()
            }
            const options = {
                url: url + "?" + http_build_query(sign_data),
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.39',
                    'Cookie': cookie
                }
            }
            $.get(options, async (err, resp, data) => {
                try {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.code == 0) {
                            if (data.daysurpluschance == '0') {
                                console.log(`您的抽奖次数已经用完，明日再来吧`);
                            } else {
                                sign_data['lottery_chance'] = 0;
                                for (let i = 0; i < parseInt(data.daysurpluschance); i++) {
                                    await lottery_item(sign_data, i);
                                }
                            }
                        } else {
                            console.log(`网页端签到失败：${data.msg}`);
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve(data);
                }
            });
        })
    }

    function lottery_item(sign_data, count = '') {
        return new Promise(resolve => {
            let url = 'https://iface2.iqiyi.com/aggregate/3.0/lottery_activity';
            const options = {
                url: url + "?" + http_build_query(sign_data),
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.39',
                    'Cookie': cookie
                }
            }
            $.get(options, async (err, resp, data) => {
                try {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.code == 0) {
                            let awardName = data.awardName
                            console.log(`第${count}次抽奖成功：${data.title} -> ${awardName}`);
                        } else {
                            console.log(`第${count}次抽奖失败：${data.msg}`);
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve(data);
                }
            });
        })
    }

    /**
     * 积分中心任务
     */
    async function score() {
        await score_hot();
        await score_video();
        await score_sign();
    }


    /**
     * 积分中心访问热点任务
     */
    function score_hot() {
        $.log(`积分中心访问热点任务:`);
        return new Promise(async (resolve) => {
            try {
                let $data = 'agenttype=1|agentversion=0|appKey=basic_pcw|appver=0|authCookie=' + $P00001 + '|channelCode=paopao_pcw|dfp=' + $dfp + '|scoreType=1|srcplatform=1|typeCode=point|userId=' + $P00003 + '|user_agent=' + $user_agent + '|verticalCode=iQIYI|UKobMjDMsDoScuWOfp6F';
                let $sign = getsgin($data);
                //热点任务
                let $url = 'https://community.iqiyi.com/openApi/task/complete?agenttype=1&agentversion=0&appKey=basic_pcw&appver=0&authCookie=' + $P00001 + '&channelCode=paopao_pcw&dfp=' + $dfp + '&scoreType=1&srcplatform=1&typeCode=point&userId=' + $P00003 + '&user_agent=' + urlencode($user_agent) + '&verticalCode=iQIYI&sign=' + $sign;
                //领取积分
                let $url2 = 'https://community.iqiyi.com/openApi/score/getReward?agenttype=1&agentversion=0&appKey=basic_pcw&appver=0&authCookie=' + $P00001 + '&channelCode=paopao_pcw&dfp=' + $dfp + '&scoreType=1&srcplatform=1&typeCode=point&userId=' + $P00003 + '&user_agent=' + urlencode($user_agent) + '&verticalCode=iQIYI&sign=' + $sign;
                let $res = await http_request($url);
                let $drew = await http_request($url2);
                if ($res.code == "A0002") {
                    $.log(`任务次数已经到达上限`);
                }
                if ($res.code == "A00000") {
                    $.log(`领取${$res.data.score}积分成功`);
                }
                if ($drew.code == "A00000") {
                    $.log(`领取${$drew.data.score}积分成功`);
                }
                $.log(`任务执行成功`);
            } catch (e) {
                $.log(e);
            } finally {
                resolve();
            }
        })
    }

    /**
     * 积分中心观看视频任务
     */
    function score_video() {
        return new Promise(async (resolve) => {
            try {
                $.log(`积分中心观看视频任务:`);
                let $data = 'agenttype=1|agentversion=0|appKey=basic_pcw|appver=0|authCookie=' + $P00001 + '|channelCode=view_pcw|dfp=' + $dfp + '|scoreType=1|srcplatform=1|typeCode=point|userId=' + $P00003 + '|user_agent=' + $user_agent + '|verticalCode=iQIYI|UKobMjDMsDoScuWOfp6F';
                let $sign = getsgin($data);
                let $url = 'https://community.iqiyi.com/openApi/score/add?agenttype=1&agentversion=0&appKey=basic_pcw&appver=0&authCookie=' + $P00001 + '&channelCode=view_pcw&dfp=' + $dfp + '&scoreType=1&srcplatform=1&typeCode=point&userId=' + $P00003 + '&user_agent=' + urlencode($user_agent) + '&verticalCode=iQIYI&sign=' + $sign;
                for (let $i = 0; $i < 3; $i++) {
                    let $res = await http_request($url);
                    $.log(`第${$i + 1}次观看视频:`);
                    if ($res.code == "A00000") {
                        if ($res.data[0].code == "A0002") {
                            $.log(`任务次数已经到达上限`);
                        } else if ($res.data[0].code == "A0000") {
                            $.log(`观看视频成功，获得${$res.data[0].score}积分`);
                        } else {
                            $.log(`${$res.data[0].message}`);
                        }
                    }
                }
                $.log(`任务执行成功`);
            } catch (e) {
                $.log(e);
            } finally {
                resolve();
            }
        })
    }

    /**
     * 积分中心签到
     */
    function score_sign() {
        return new Promise(async (resolve) => {
            try {
                $.log(`积分中心签到:`);
                let $data = 'agenttype=1|agentversion=0|appKey=basic_pca|appver=0|authCookie=' + $P00001 + '|channelCode=sign_pcw|dfp=' + $dfp + '|scoreType=1|srcplatform=1|typeCode=point|userId=' + $P00003 + '|user_agent=' + $user_agent + '|verticalCode=iQIYI|DO58SzN6ip9nbJ4QkM8H';
                let $sgin = getsgin($data);
                let $url = 'https://community.iqiyi.com/openApi/score/add?authCookie=' + $P00001 + '&userId=' + $P00003 + '&channelCode=sign_pcw&agenttype=1&agentversion=0&appKey=basic_pca&appver=0&srcplatform=1&typeCode=point&verticalCode=iQIYI&scoreType=1&user_agent=' + urlencode($user_agent) + '&dfp=' + $dfp + '&sign=' + $sgin;
                let $res = await http_request($url);
                if ($res.code == "A00000") {
                    if ($res.data[0].code == "A0000") {
                        $.log(`签到成功，获得${$res.data[0].score}积分`);
                    } else {
                        $.log(`${$res.data[0].message}`);
                    }
                }
                $.log(`任务执行成功`);
            } catch (e) {
                $.log(e);
            } finally {
                resolve();
            }
        })
    }

    /**
     * VIP日常任务
     */
    async function vipDailyTask() {
        await vip_browse();
        await vip_hit();
        await vip_watch();
        await vip_video();
        $.log(`会员中心日常任务完成`);
    }

    /**
     * VIP任务浏览福利
     */
    async function vip_browse() {
        $.log(`VIP任务浏览福利:`);
        let $taskCode = 'b6e688905d4e7184';
        await start($taskCode);
    }

    /**
     * VIP任务看热播榜
     */
    async function vip_hit() {
        $.log(`VIP任务看热播榜:`);
        let $taskCode = 'a7f02e895ccbf416';
        await start($taskCode);
    }

    /**
     * VIP任务观影30分钟
     */
    async function vip_watch() {
        $.log(`VIP任务观影30分钟:`);
        let $taskCode = 'WatchVideo60mins';
        await start($taskCode);
    }


    /**
     * VIP任务播放批量
     */
    async function vip_video()
    {
        for (let $i=0; $i < 60; $i++) {
            let url=`https://msg.qy.net/b?u=cafd40897ee09c435960272ff3a4e291&pu=${$P00003}&p1=1_10_101&v=5.2.66&ce=52584c09397f85e3c3134bf84fd422fc&de=1629952975.1629952975.1629952975.1&c1=1&ve=5f04795914b9c064b415353de37d4b16&ht=1&pt=2031.264453&isdm=0&duby=0&ra=2&clt=&ps2=DIRECT&ps3=&ps4=&br=mozilla%2F5.0%20(windows%20nt%2010.0%3B%20win64%3B%20x64)%20applewebkit%2F537.36%20(khtml%2C%20like%20gecko)%20chrome%2F95.0.4638.69%20safari%2F537.36&mod=cn_s&purl=https%3A%2F%2Fwww.iqiyi.com%2Fv_2cwmbteaa18.html&tmplt=1&ptid=01010031010000000000&os=window&nu=0&vfm=&coop=&ispre=0&videotp=0&drm=&plyrv=&rfr=https%3A%2F%2Fwww.iqiyi.com%2Fdianying%2F%3Fvfrm%3Dpcw_home%26vfrmblk%3DC%26vfrmrst%3D712211_channel_dianying&fatherid=8681540158522400&stauto=1&algot=connectFailed&vvfrom=&vfrmtp=1&pagev=playpage_adv_xb&engt=2&ldt=1&krv=1.1.85&wtmk=0&duration=5413625&bkt=&e=&stype=&r_area=&r_source=&s4=&s3=&vbr=61548&mft=0&ra1=2&wint=3&s2=&bw=3.1&ntwk=18&dl=49.875&rn=0.34701240615020845&dfp=a1f107016de1864272af07902f04f278ced9f2124e6cc71e0098f948eb5d31e471&stime=1636396937147&r=8681540158522400&hu=1&t=2&tm=120&_=1636396937147`
            const options = {
                url: url,
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.39',
                    'Cookie': cookie
                }
            }
            $.get(options, async (err, resp, data) => {});
        }
    }

    /**
     * VIP其他任务
     */
    async function vipOtherTask()
    {
        await vip_test();
        await vip_baidu();
        await vip_upgrade();
        $.log(`会员中心其他任务完成`);
    }

    /**
     * VIP任务权益答题
     */
    async function vip_test()
    {
        $.log(`VIP任务权益答题:`);
        let $taskCode = 'RightsTest';
        await start($taskCode);
    }

    /**
     * VIP百度借钱
     */
    async function vip_baidu()
    {
        $.log(`VIP百度借钱:`);
        let $taskCode = '1231231231';
        await start($taskCode);
    }

    /**
     * VIP升级权益
     */
    async function vip_upgrade()
    {
        $.log(`VIP升级权益:`);
        let  $taskCode = 'aa9ce6f915bea560';
        await start($taskCode);
    }



    /**
     * @param  $taskCode
     * @return mixed
     */
    async function start($taskCode) {
        return new Promise(async (resolve) => {
            try {
                let $url = [
                    'https://tc.vip.iqiyi.com/taskCenter/task/joinTask?P00001=' + $P00001 + '&taskCode=' + $taskCode + '&platform=bb136ff4276771f3&lang=zh_CN&app_lm=cn&qyid=dc947513aafa9f99283b39ff339a4280110c',       //开启任务接口
                    'https://tc.vip.iqiyi.com/taskCenter/task/notify?taskCode=' + $taskCode + '&P00001=' + $P00001 + '&platform=abaf99397476e27d&lang=cn',      //完成任务接口
                    'https://tc.vip.iqiyi.com/taskCenter/task/getTaskRewards?P00001=' + $P00001 + '&taskCode=' + $taskCode + '&platform=bb136ff4276771f3&lang=zh_CN&app_lm=cn&deviceID=dc947513aafa9f99283b39ff339a4280110c&dfp=&fv=8810d5688ee1a7a6'  //领取奖励接口
                ];
                for (let $i = 0; $i < 3; $i++) {
                    let $return =await http_request($url[$i]);
                    if ($i == 1) {
                        $.time(3000);
                    }
                    if($return.code!='A00000'){
                        $.log(`${$return.msg}`);
                    }else if($i == 2){
                        if($return.code=='A00000'){
                            if($return.dataNew){
                                $return.dataNew.forEach(item=>{
                                    $.log(`获得${item.name}${item.value}`)
                                });
                            }
                        }
                    }
                }
            } catch (e) {
                $.log(e);
            } finally {
                resolve();
            }
        })
    }

    function splice($str, $para, $sign = null) {
        let $arg = "";
        let objs = Object.keys($para);
        objs.forEach(key => {
            $arg = $arg + key + "=" + $para[key] + $str;
        })
        //去掉最后一个字符
        $arg = $arg.length > 0 ? $arg.substr(0, $arg.length - 1) : $arg;
        if ($sign) {
            $arg = $arg + '|' + $sign;
            return md5($arg);
        }
        return $arg;
    }

    function urlencode(data) {
        return encodeURIComponent(data);
    }

    function http_request($url, $data = null) {
        return new Promise(resolve => {
            const options = {
                url: $url,
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.39',
                    'Cookie': cookie
                }
            }
            if ($data != null) {
                options.body = $data;
                $.post(options, async (err, resp, data) => {
                    try {
                        // console.log(data);
                        data = JSON.parse(data);
                    } catch (e) {
                        $.log(e);
                        data = {};
                    } finally {
                        resolve(data);
                    }
                });
            } else {
                $.get(options, async (err, resp, data) => {
                    try {
                        // console.log(data);
                        data = JSON.parse(data);
                    } catch (e) {
                        $.log(e);
                        data = {};
                    } finally {
                        resolve(data);
                    }
                });
            }
        });
    }

    /**
     * 计算sgin
     */
    function getsgin($data) {
        return md5($data);
    }

    function http_build_query(param, key, encode) {
        if (param == null) return '';
        var paramStr = '';
        var t = typeof (param);
        if (t == 'string' || t == 'number' || t == 'boolean') {
            paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
        } else {
            for (var i in param) {
                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                paramStr += http_build_query(param[i], k, encode);
            }
        }
        // if(paramStr){
        //     paramStr=paramStr.substr(1,paramStr.length)
        // }
        return paramStr;
    }

    function md5(data) {
        return $.md5(data);
    }

    function time_13() {
        return new Date().getTime();
    }

    function strRandom($len) {
        let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        let nums = "";
        for (let i = 0; i < $len; i++) {//这里是几位就要在这里不改变
            let id = Math.random() * chars.length;
            nums += chars[id];
        }
        return nums;
    }
}



// prettier-ignore
!function (n) {
    "use strict";

    function t(n, t) {
        var r = (65535 & n) + (65535 & t);
        return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r
    }

    function r(n, t) {
        return n << t | n >>> 32 - t
    }

    function e(n, e, o, u, c, f) {
        return t(r(t(t(e, n), t(u, f)), c), o)
    }

    function o(n, t, r, o, u, c, f) {
        return e(t & r | ~t & o, n, t, u, c, f)
    }

    function u(n, t, r, o, u, c, f) {
        return e(t & o | r & ~o, n, t, u, c, f)
    }

    function c(n, t, r, o, u, c, f) {
        return e(t ^ r ^ o, n, t, u, c, f)
    }

    function f(n, t, r, o, u, c, f) {
        return e(r ^ (t | ~o), n, t, u, c, f)
    }

    function i(n, r) {
        n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r;
        var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878;
        for (e = 0; e < n.length; e += 16) i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h);
        return [l, g, v, m]
    }

    function a(n) {
        var t, r = "", e = 32 * n.length;
        for (t = 0; t < e; t += 8) r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);
        return r
    }

    function d(n) {
        var t, r = [];
        for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1) r[t] = 0;
        var e = 8 * n.length;
        for (t = 0; t < e; t += 8) r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
        return r
    }

    function h(n) {
        return a(i(d(n), 8 * n.length))
    }

    function l(n, t) {
        var r, e, o = d(n), u = [], c = [];
        for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1) u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r];
        return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640))
    }

    function g(n) {
        var t, r, e = "";
        for (r = 0; r < n.length; r += 1) t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t);
        return e
    }

    function v(n) {
        return unescape(encodeURIComponent(n))
    }

    function m(n) {
        return h(v(n))
    }

    function p(n) {
        return g(m(n))
    }

    function s(n, t) {
        return l(v(n), v(t))
    }

    function C(n, t) {
        return g(s(n, t))
    }

    function A(n, t, r) {
        return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n)
    }

    $.md5 = A
}(this);

function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {url: t} : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({url: t}, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {script_text: t, mock_type: "cron", timeout: r},
                    headers: {"X-Key": o, Accept: "*/*"}
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => {
                const {message: s, response: i} = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t)); else if (this.isNode()) {
                this.initGotEnv(t);
                const {url: s, ...i} = t;
                this.got.post(s, i).then(t => {
                    const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                    e(null, {status: s, statusCode: i, headers: r, body: o}, o)
                }, t => {
                    const {message: s, response: i} = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {"open-url": t} : this.isSurge() ? {url: t} : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
                        return {openUrl: e, mediaUrl: s}
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
                        return {"open-url": e, "media-url": s}
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {url: e}
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}