
btschool 签到脚本


```properties
[MITM]
pt.btschool.club

[Script]
http-request ^https://www\.pthome\.net/attendance\.php script-path=https://raw.githubusercontent.com/sysnxw/JsBox/master/btschool/btschool.cookie.js

cron "10 1 10 * * *" script-path=https://raw.githubusercontent.com/sysnxw/JsBox/master/btschool/btschool.js
```
