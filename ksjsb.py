# 低保版,魔改各路大佬的,已完成每日签到,开宝箱和分享3000币,每日3000币起,测试约为3000-8000币
# 变量名ksjsb_ck 多个用@或换行分割，需要完整cookies，青龙单容器快手完整cookies只能放63个。建议启用60个,否则会报错
# 变量名ksjsb_code为助力码，其他CK均为其提供助力（获取方式-保存二维码-微信二维码转链接机器人-把短链放到浏览器访问转为长链-最后一组数字即为你的助力码）

#青龙面版交流群:641307462

'''
继续魔改版v1.0更新记录：
1、新增资产查询；
2、合并HarbourJ大神的周周赚；
'''

import json
import os
import time
import urllib.parse
import urllib.request
import requests
import urllib3
from datetime import datetime

urllib3.disable_warnings()


# 获取账号信息
def getInformation(can_cookie):
    url = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo"
    headers = {'User-Agent': Agent, 'Accept': '*/*', 'Accept-Language': ' zh-CN,zh;q=0.9', 'Cookie': can_cookie}
    request = urllib.request.Request(url=url, headers=headers)
    response = urllib.request.urlopen(request)
    str_result = response.read().decode('UTF-8')
    arr_json = json.loads(str_result)
    arr_result = {
        'code': -1
    }
    try:
        arr_result = {
            'code': arr_json['result'],
            'data': {
                'nickname': str(arr_json['data']['userData']['nickname']),
                'cah': str(arr_json['data']['totalCash']),
                'coin': str(arr_json['data']['totalCoin'])
            }
        }
    except TypeError as reason:
        print("获取信息出错啦" + str(reason) + str_result)

    return arr_result


# 开宝箱
def openBox(can_cookie, name):
    url = "https://nebula.kuaishou.com/rest/n/nebula/box/explore?isOpen=true&isReadyOfAdPlay=true"
    headers = {'User-Agent': Agent, 'Accept': '*/*', 'Accept-Language': ' zh-CN,zh;q=0.9', 'Cookie': can_cookie}
    request = urllib.request.Request(url=url, headers=headers)
    response = urllib.request.urlopen(request)
    str_result = response.read().decode('UTF-8')
    arr_json01 = json.loads(str_result, strict=False)
    show = arr_json01['data']['show']
    try:
        if show:
            if arr_json01['data']['commonAwardPopup'] is not None:
                print("账号[" + name + "]开宝箱获得" + str(arr_json01['data']['commonAwardPopup']['awardAmount']) + "金币")
            else:
                if arr_json01['data']['openTime'] == -1:
                    print("账号[" + name + "]今日开宝箱次数已用完")
                else:
                    print("账号[" + name + "]开宝箱冷却时间还有" + str(int(arr_json01['data']['openTime'] / 1000)) + "秒")
        else:
            print("账号[" + name + "]账号获取开宝箱失败:疑似cookies格式不完整")
    except TypeError as reason:
        print("开宝箱出错啦" + str(reason) + str_result)


# 查询签到
def querySign(can_cookie, name):
    url = "https://nebula.kuaishou.com/rest/n/nebula/sign/queryPopup"
    headers = {'User-Agent': Agent, 'Accept': '*/*', 'Accept-Language': ' zh-CN,zh;q=0.9', 'Cookie': can_cookie}
    request = urllib.request.Request(url=url, headers=headers)
    response = urllib.request.urlopen(request)
    str_result = response.read().decode('UTF-8')
    json_arr = json.loads(str_result)
    result_code = json_arr['data']['nebulaSignInPopup']['todaySigned']
    try:
        if result_code:
            print("账号[" + name + "]今日已签到" + json_arr['data']['nebulaSignInPopup']['subTitle'] + "," +
                  json_arr['data']['nebulaSignInPopup']['title'])
        else:
            sign(can_cookie, name)
    except TypeError as reason:
        print("查询签到出错啦" + str(reason) + str_result)


# 签到
def sign(can_cookie, name):
    url = "https://nebula.kuaishou.com/rest/n/nebula/sign/sign?source=activity"
    headers = {'User-Agent': Agent, 'Accept': '*/*', 'Accept-Language': ' zh-CN,zh;q=0.9', 'Cookie': can_cookie}
    request = urllib.request.Request(url=url, headers=headers)
    response = urllib.request.urlopen(request)
    str_result = response.read().decode('UTF-8')
    json_arr = json.loads(str_result)
    result_code = json_arr['result']
    try:
        if result_code == 1:
            print("账号[" + name + "]签到成功:" + str(json_arr['data']['toast']))
        else:
            print("账号[" + name + "]签到成功:" + json_arr['error_msg'])
    except TypeError as reason:
        print("查询签到出错啦" + str(reason) + str_result)


# 准备分享得金币任务
def setShare(can_cookie, name):
    url = "https://nebula.kuaishou.com/rest/n/nebula/account/withdraw/setShare"
    headers = {'User-Agent': Agent, 'Accept': '*/*', 'Accept-Language': ' zh-CN,zh;q=0.9', 'Cookie': can_cookie}
    data_can = ""
    data = urllib.parse.urlencode(data_can).encode('utf-8')
    request = urllib.request.Request(url=url, data=data, headers=headers)
    response = urllib.request.urlopen(request)
    str_result = response.read().decode('UTF-8')
    json_arr = json.loads(str_result)
    try:
        if json_arr['result'] == 1:
            print("账号[" + name + "]" + "准备分享任务成功,正在执行分享...")
            url = "https://nebula.kuaishou.com/rest/n/nebula/daily/report?taskId=122"
            request = urllib.request.Request(url=url, headers=headers)
            response = urllib.request.urlopen(request)
            str_result = response.read().decode('UTF-8')
            json_arr = json.loads(str_result)
            if json_arr['result'] == 1:
                print("账号[" + name + "]" + "分享任务成功:" + json_arr['data']['msg'] + str(json_arr['data']['amount']))
            else:
                print("账号[" + name + "]" + "分享任务执行失败:疑似今日已分享." + json_arr['error_msg'])
        else:
            print("账号[" + name + "]" + "准备分享任务失败:" + json_arr['error_msg'])
    except TypeError as reason:
        print("账号[" + name + "]执行任务出错啦" + str(reason) + str_result)


# 依次执行任务
def taskStat():
    i = 0
    for cookie in Cookies:
        i = i + 1
        if 'did=' in cookie:
            print("\n========开始序号[" + str(i) + "]任务========\n")
            cookie = cookie.replace("@", "").replace("\n", "")
            json_str = getInformation(cookie)
            code = json_str['code']
            if code == 1:
                name = json_str['data']['nickname']
                # 查询签到
                querySign(cookie, name)
                # 分享任务
                setShare(cookie, name)
                # 开宝箱
                openBox(cookie, name)
                assets[name] = (getInformation(cookie)['data'])
            else:
                print("序号[" + str(i) + "]获取信息失败,请检查cookies是否正确！=")
            time.sleep(1)
        else:
            print("序号[" + str(i) + "]的cookies不完整，请重新抓取！")
    assetQuery()


# 资产查询
def assetQuery():
    print("\n===========资产信息===========\n")
    for asset in assets:
        print('用户：%s, 账户余额：%s元 ,金币：%s枚' % (asset, str(assets[asset]['cah']), str(assets[asset]['coin'])))


# 周周赚
def ksjsbFriendAssist(can_cookie, help_code):
    url = "https://nebula.kuaishou.com/rest/zt/encourage/assistance/friendAssist"
    payload = "{\"assistanceId\":\"" + help_code + "\"}"
    _headers = {
        'Host': 'nebula.kuaishou.com',
        'Origin': 'https://nebula.kuaishou.com',
        'Content-Type': 'application/json',
        'Cookie': can_cookie,
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Accept': '*/*',
        'User-Agent': Agent,
        'Content-Length': '35',
        'Referer': 'https://nebula.kuaishou.com/nebula/daily-invite',
        'Accept-Language': 'zh-cn'
    }
    response = requests.request("POST", url, headers=_headers, data=payload, verify=False).json()
    print("助力结果：%s" % response.get('msg'))
    time.sleep(1.8)


if __name__ == '__main__':

    # 获取环境变量
    try:
        _Cookie = os.environ["ksjsb_ck"]
    except:
        _Cookie = ''
    try:
        help_code = os.environ['ksjsb_code']
    except :
        help_code = '2773229948248703'
    assets = {}
    # _Cookie = '\kpn=NEBULA; kpf=ANDROID_PHONE; userId=273777498; c=VIVO; language=zh-cn; countryCode=CN; sys=ANDROID_12; mod=vivo%28V1986A%29; deviceName=vivo%28V1986A%29; ud=273777498; did_tag=7; thermal=10000; app=0; bottom_navigation=true; oDid=TEST_ANDROID_c4b9160573eab621; android_os=0; boardPlatform=mt6885; androidApiLevel=31; newOc=VIVO; slh=0; country_code=cn; nbh=126; hotfix_ver=; did_gt=1650862598007; max_memory=256; oc=VIVO; sh=2408; ddpi=480; deviceBit=0; browseType=3; socName=MediaTek+MT6889Z%2FCZA; sw=1080; ftt=; apptype=22; abi=arm64; userRecoBit=0; device_abi=arm64; totalMemory=7534; grant_browse_type=AUTHORIZED; iuid=; rdid=ANDROID_e3b07ad14782a7fa; sbh=108; darkMode=false; client_key=2ac2a76d; clientid=3; did=ANDROID_c4b9160573eab621; app_status=3; isp=CTCC; is_background=0; egid=DFP8DD98FE3F40600886949BDE936A9ABB96A3470B5309A08DC264A159175E05; ver=10.4; appver=10.4.10.3430; cl=0; ll_client_time=1653317148054; kuaishou.api_st=Cg9rdWFpc2hvdS5hcGkuc3QSoAH3_-g-GHBOjY4VDfK0AU3Z03GGWOSY8AcoVR2XulIu4ACBLsImNSUTcoDIzVAOk7tNvFuhCXqwxEvZQT-Uoe18wHFIAP3F97CsiOEny70JMvURIoZ3M4eY6YqgMuTWg7KjzvHwRutxlwWVZCRj2CJRqGWuKIMlrFKKNddeN-atkTxT4jHf-3j7U1mKdpCUL6yh7a7oqZ3176jyYwPW4bs4GhKJIerh6pdEZprW36ARdua-0DsiIBH4psle3NXJCWdA9MgT3LRhem8KHxMNE33-l01rIL49KAUwAQ; token=Cg9rdWFpc2hvdS5hcGkuc3QSoAH3_-g-GHBOjY4VDfK0AU3Z03GGWOSY8AcoVR2XulIu4ACBLsImNSUTcoDIzVAOk7tNvFuhCXqwxEvZQT-Uoe18wHFIAP3F97CsiOEny70JMvURIoZ3M4eY6YqgMuTWg7KjzvHwRutxlwWVZCRj2CJRqGWuKIMlrFKKNddeN-atkTxT4jHf-3j7U1mKdpCUL6yh7a7oqZ3176jyYwPW4bs4GhKJIerh6pdEZprW36ARdua-0DsiIBH4psle3NXJCWdA9MgT3LRhem8KHxMNE33-l01rIL49KAUwAQ; kuaishou.h5_st=Cg5rdWFpc2hvdS5oNS5zdBKQAbWoHbC3CfWFc19nKLNlqN58TD1dUtnTx_TdFrv4nj0eFRh0m7YHYbAB_DN3LW-ISvz-icnSEziemvHUjiFdMrt44pbVRdq__sIHZ9ZRgGeLlZqQ5AUvC8UzSoH318nKVuvbwqogijN9mLZ2ixIsVEuc184E5digM2MGDk9LyCy-Mft5aZqvNiv07zs7jNHBjBoSpYCprippcZwv5Eqcrp5JRBjyIiDL9D1JaOup51OxWtSnbJf1ooc3yGIL5a-PcZZJdFx5USgFMAE; keyconfig_state=2; kcv=1462; power_mode=1; net=5G; cold_launch_time_ms=1653568467165; sid=a7691f88-5d4c-444c-a238-a2e2a55c13ea; __NSWJ=UsmHrzx%2FieE2Asmg4tnTxE5D%2BEVBaGps%2FKUEZIzSpDzebimgkxE0vpifHdy9b7%2FrAAAAJw%3D%3D'
    # 分割环境变量
    if _Cookie != '':
        if "@" in _Cookie:
            Cookies = _Cookie.split("@")
        elif "&" in _Cookie:
            Cookies = _Cookie.split('&')
        else:
            Cookies = _Cookie.split('\n')

        # 协议头
        Agent = "Mozilla/5.0 (Linux; Android 11; Redmi K20 Pro Premium Edition Build/RKQ1.200826.002; wv) AppleWebKit/537.36 " \
                "(KHTML, like Gecko) Version/4.0 Chrome/90.0.4430.226 KsWebView/1.8.90.488 (rel;r) Mobile Safari/537.36 " \
                "Yoda/2.8.3-rc1 ksNebula/10.3.41.3359 OS_PRO_BIT/64 MAX_PHY_MEM/7500 AZPREFIX/yz ICFO/0 StatusHT/34 " \
                "TitleHT/44 NetType/WIFI ISLP/0 ISDM/0 ISLB/0 locale/zh-cn evaSupported/false CT/0 "

        num = len(Cookies)
        print("共找到" + str(num) + "个快手CK,开始执行任务...\n")
        taskStat()

        # 判断是否执行周周赚
        if help_code != '':
            if datetime.today().isoweekday() == 4 and datetime.now().hour == 14 and datetime.now().minute <= 16:
                print("\n===========周周赚助力===========\n")
                for cookie in Cookies:
                    if 'did=' in cookie:
                        ksjsbFriendAssist(cookie.replace("@", "").replace("\n", ""), help_code)
                    else:
                        print("助力失败，快手CK不完整，请重新抓取！")
            else:
                print("周周赚助力未开始，助力时间为每周六上午六点零分至六分！")
    else:
        print("未找到快手CK,请检查变量名是否为ksjsb_ck！")
