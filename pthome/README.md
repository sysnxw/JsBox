pthome签到脚本


```properties
[MITM]
www.pthome.net

[Script]
http-request ^https://www\.pthome\.net/attendance\.php script-path=https://raw.githubusercontent.com/sysnxw/JsBox/master/pthome/pthome.cookie.js, requires-body=true

cron "10 0 0 * * *" script-path=https://raw.githubusercontent.com/sysnxw/JsBox/master/pthome/pthome.js
```
