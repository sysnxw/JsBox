pthome签到脚本


[MITM]
www.pthome.net

[Script]
http-request ^https://www\.pthome\.net/attendance\.php script-path=https://raw.githubusercontent.com/sysnxw/JsBox/master/pthome/pthome.cookie.js

cron "10 0 0 * * *" script-path=https://raw.githubusercontent.com/sysnxw/JsBox/master/pthome/pthome.js
