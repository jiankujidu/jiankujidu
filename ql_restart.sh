#!/bin/bash

echo -e "重启面板中..."
nginx -s reload 2>/dev/null || nginx -c /etc/nginx/nginx.conf
pm2 l &>/dev/null
pm2 delete panel --source-map-support --time &>/dev/null
pm2 start /ql/build/app.js -n panel --source-map-support --time &>/dev/null
pm2 delete schedule --source-map-support --time &>/dev/null
pm2 start /ql/build/schedule.js -n schedule --source-map-support --time &>/dev/null
echo -e "重启面板完毕"
