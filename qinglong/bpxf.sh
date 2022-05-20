#!/bin/bash
set -e

get_step(){
stty erase ^?
echo -e "-----科技玩家-----
\n0.退出\n1.修复白屏问题\n2.还原初始index.html文件\n3.查看index.html文件
\n-----SUIYUE-----"

read -r -p "请输入数字:" input
	case $input in
0)
exit
;;

1)
if [[ ! -s /ql/dist/index.html ]] && [[ ! -s /ql/static/dist/index.html ]]; then
    echo "未检测到index.html文件或未处于青龙环境内部，请使用bash进入青龙容器内部再执行，勿用sh进入"
    exit 1
fi
echo "###1、检测青龙版本开始###"
while [ -z `echo ${QL_BRANCH#*v} | egrep "(([0-9]|([1-9]([0-9]*))).){2}([0-9]|([1-9]([0-9]*)))"` ]
do
  echo "未检测到青龙版本号，请手动指定,输入exit可退出"
  read -r -p "请输入版本号:" QL_BRANCH
  if [ "${QL_BRANCH}" == "exit" ]; then
    exit 1
  fi
done
  echo "当前青龙版本：$QL_BRANCH"

V_NOW=${QL_BRANCH#*v}
V_GREAT=2.11.1
V_LESS=2.9.0
if test "$(echo $V_NOW $V_GREAT | tr " " "\n" | sort -V | head -n 1)" != "$V_NOW" || test "$(echo $V_NOW $V_LESS | tr " " "\n" | sort -rV | head -n 1)" != "$V_NOW"; then
  echo "当前青龙版本不支持修复"
  exit 1
fi

echo "###2、开始修复白屏###"
if [ ! -s /ql/dist/index.html.bak ]; then
  if [ -s /ql/static/dist/index.html ]; then
    echo "检测到当前为高版本青龙，不支持修复"
    exit 1
  else
    cp /ql/dist/index.html /ql/dist/index.html.bak
    echo "####2、1备份index.html文件完成####"
  fi
fi

echo "####2、2开始下载js.tar.gz文件到/ql/dist"
wget https://gitee.com/suiyuehq/ziyong/raw/master/ql_cdn/v2.10.13/js.tar.gz -P /ql/dist

echo "####2、3解压js.tar.gz文件到/ql/dist/js"
tar -zxvf /ql/dist/js.tar.gz -C /ql/dist

echo "###3、修改index.html文件###"

sed -i 's#https://.*/react/16.*/umd/react.production.min.js#/js/react.production.min.js#g' "/ql/dist/index.html"
sed -i 's#https://.*/react-dom/16.*/umd/react-dom.production.min.js#/js/react-dom.production.min.js#g' "/ql/dist/index.html"
sed -i 's#https://.*/darkreader@4.*/darkreader.min.js#/js/darkreader.min.js#g' "/ql/dist/index.html"
sed -i 's#https://.*/codemirror@5.*/lib/codemirror.min.js#/js/codemirror.min.js#g' "/ql/dist/index.html"
sed -i 's#https://.*/codemirror@5.*/mode/shell/shell.js#/js/shell.js#g' "/ql/dist/index.html"
sed -i 's#https://.*/codemirror@5.*/mode/python/python.js#/js/python.js#g' "/ql/dist/index.html"
sed -i 's#https://.*/codemirror@5.*/mode/javascript/javascript.js#/js/javascript.js#g' "/ql/dist/index.html"
sed -i 's#https://.*/sockjs-client@1.*/dist/sockjs.min.js#/js/sockjs.min.js#g' "/ql/dist/index.html"

echo "###4、删除js.tar.gz压缩包###"
rm -vf /ql/dist/js.tar.gz*

echo -e "###恭喜你，白屏修复操作完成###\n"
echo -e "提醒：
目前PC端打开【配置文件、脚本管理】出现白屏的临时解决方法：
（1）浏览器按F12键，打开开发者工具界面后，切换到移动端模式(快捷键：ctrl+shift+M)，刷新一下即可！！！
（2）加载出来后，可以关闭开发者工具，但关闭开发者界面后，每次刷新都需要重复步骤（1）\n"
;;

2)
echo "###开始还原初始index.html文件###"
if [ -s /ql/dist/index.html.bak ]; then
  cp /ql/dist/index.html.bak /ql/dist/index.html
  echo "还原初始文件成功"
else
  echo "未备份index.html文件，无法进行还原"
fi
;;

3)
echo "查看当前index.html内容"
if [ ! -s /ql/dist/index.html ]; then
  if [ ! -s /ql/static/dist/index.html ]; then
    echo "未检测到index.html文件或未处于青龙环境内部，请使用bash进入青龙容器内部再执行，勿用sh进入"
    exit 1
  else
    cat /ql/static/dist/index.html
  fi
else
  cat /ql/dist/index.html
fi
;;

*)
echo "请输入正确"
;;
esac
get_step
}

get_step "$@"