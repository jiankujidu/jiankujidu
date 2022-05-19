#�ͱ���,ħ�ĸ�·���е�,�����ÿ��ǩ��,������ͷ���3000��,ÿ��3000����,����ԼΪ3000-8000��
# ������ksjsbCookie �����&�ָ��Ҫ����cookies��������������������cookiesֻ�ܷ�63������������60��,����ᱨ��

import json
import os
import time
import urllib.parse
import urllib.request

env_dist = os.environ
# ��ȡ��������
_Cookie = env_dist.get("ksjsbCookie")
# �ָ������
Cookies = _Cookie.split("&")
# Э��ͷ


Agent = "Mozilla/5.0 (Linux; Android 11; Redmi K20 Pro Premium Edition Build/RKQ1.200826.002; wv) AppleWebKit/537.36 " \
        "(KHTML, like Gecko) Version/4.0 Chrome/90.0.4430.226 KsWebView/1.8.90.488 (rel;r) Mobile Safari/537.36 " \
        "Yoda/2.8.3-rc1 ksNebula/10.3.41.3359 OS_PRO_BIT/64 MAX_PHY_MEM/7500 AZPREFIX/yz ICFO/0 StatusHT/34 " \
        "TitleHT/44 NetType/WIFI ISLP/0 ISDM/0 ISLB/0 locale/zh-cn evaSupported/false CT/0 "


# ��ȡ�˺���Ϣ


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
        print("��ȡ��Ϣ������" + str(reason) + str_result)

    return arr_result


# ������
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
                print("�˺�[" + name + "]��������" + str(arr_json01['data']['commonAwardPopup']['awardAmount']) + "���")
            else:
                if arr_json01['data']['openTime'] == -1:
                    print("�˺�[" + name + "]���տ��������������")
                else:
                    print("�˺�[" + name + "]��������ȴʱ�仹��" + str(int(arr_json01['data']['openTime'] / 1000)) + "��")
        else:
            print("�˺�[" + name + "]�˺Ż�ȡ������ʧ��:����cookies��ʽ������")
    except TypeError as reason:
        print("�����������" + str(reason) + str_result)


# ��ѯǩ��
def querySign(can_cookie,name):
    url = "https://nebula.kuaishou.com/rest/n/nebula/sign/queryPopup"
    headers = {'User-Agent': Agent, 'Accept': '*/*', 'Accept-Language': ' zh-CN,zh;q=0.9', 'Cookie': can_cookie}
    request = urllib.request.Request(url=url, headers=headers)
    response = urllib.request.urlopen(request)
    str_result = response.read().decode('UTF-8')
    json_arr = json.loads(str_result)
    result_code = json_arr['data']['nebulaSignInPopup']['todaySigned']
    try:
        if result_code:
            print("�˺�[" + name + "]ǩ������:������ǩ��")
        else:
            sign(can_cookie,name)
    except TypeError as reason:
        print("��ѯǩ��������" + str(reason) + str_result)


# ǩ��
def sign(can_cookie,name):
    url = "https://nebula.kuaishou.com/rest/n/nebula/sign/sign?source=activity"
    headers = {'User-Agent': Agent, 'Accept': '*/*', 'Accept-Language': ' zh-CN,zh;q=0.9', 'Cookie': can_cookie}
    request = urllib.request.Request(url=url, headers=headers)
    response = urllib.request.urlopen(request)
    str_result = response.read().decode('UTF-8')
    json_arr = json.loads(str_result)
    result_code = json_arr['result']
    try:
        if result_code==1:
            print("�˺�[" + name + "]ǩ������:" + str(json_arr['data']['toast']))
        else:
            print("�˺�[" + name + "]ǩ������:" + json_arr['error_msg'])
    except TypeError as reason:
        print("��ѯǩ��������" + str(reason) + str_result)

# �ʲ���Ϣ
def zccx(can_cookie,name):
    url = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo"
    headers = {'User-Agent': Agent, 'Accept': '*/*', 'Accept-Language': ' zh-CN,zh;q=0.9', 'Cookie': can_cookie}
    request = urllib.request.Request(url=url, headers=headers)
    response = urllib.request.urlopen(request)
    str_result = response.read().decode('UTF-8')
    json_arr = json.loads(str_result)
    result_code = json_arr['result']
    try:
        if result_code==1:
            print("�˺�[" + name + "]�ʲ���ѯ:���:" + json_arr['data']['totalCash'] + ",���:" + json_arr['data']['totalCoin'])
        else:
            print("�˺�[" + name + "]�ʲ���ѯ:��ѯʧ��")
    except TypeError as reason:
        print("��ѯǩ��������" + str(reason) + str_result)



# ׼������ý������
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
            #print("�˺�[" + name + "]" + "׼����������ɹ�,����ִ�з���...")
            url = "https://nebula.kuaishou.com/rest/n/nebula/daily/report?taskId=122"
            request = urllib.request.Request(url=url, headers=headers)
            response = urllib.request.urlopen(request)
            str_result = response.read().decode('UTF-8')
            json_arr = json.loads(str_result)
            if json_arr['result'] == 1:
                print("�˺�[" + name + "]" + "��������:" + str(json_arr['data']['amount']))
            else:
                print("�˺�[" + name + "]" + "��������:�����ѷ���")
        else:
            print("�˺�[" + name + "]" + "׼����������ʧ��:" + json_arr['error_msg'])
    except TypeError as reason:
        print("�˺�[" + name + "]ִ�����������" + str(reason) + str_result)


# ����ִ������
def taskStat():
    i = 0
    for cookie in Cookies:
        i = i + 1
        print("========��ʼ���[" + str(i) + "]����========")
        cookie = cookie.replace("@", "")
        json_str = getInformation(cookie)
        code = json_str['code']
        if code == 1:
            name = json_str['data']['nickname']
            # ��ѯ�ʲ�
            zccx(cookie, name)
            # ��ѯǩ��
            querySign(cookie, name)
            # ��������
            setShare(cookie, name)
            # ������
            openBox(cookie, name)
        else:
            print("========���[" + i + "]��ȡ��Ϣʧ��,����cookies�Ƿ���ȷ========")

        time.sleep(1)



num = len(Cookies)

if num > 0:
    print("���ҵ�" + str(num) + "�����ֱ���,��ʼִ������...")
    taskStat()
else:
    print("δ���ҵ�������ֱ���,�������ı������Ƿ�ΪksjsbCookie,�Ҷ���˺���&�ָ�")
