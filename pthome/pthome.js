const cookieName = 'pthome'
const cookieKey = 'chavy_cookie_pthome'
const cookieVal = $persistentStore.read(cookieKey)

function sign() {
  let url = {
    url: `https://www.pthome.net/attendance.php`,
    headers: {
      Cookie: cookieVal
    }
  }
  $httpClient.get(url, (error, response, data) => {
    if (data.indexOf('今天已经签到过了') >= 0) {
      let title = `${cookieName}`
      let subTitle = `签到结果: 签到跳过`
      let detail = `今天已经签过了`
      console.log(`${title}, ${subTitle}, ${detail}`)
      $notification.post(title, subTitle, detail)
    } else {
      signMission()//找到点击签到的点击，配合下面的signMission（code）来真正签到
    }
  })
  $done({})
}

function signMission() {
  let url = {
    url: `https://www.pthome.net/attendance.php`,
    headers: { Cookie: cookieVal }
  }
  $httpClient.get(url, (error, response, data) => {
    if (data.indexOf('今天已经签到过了') >= 0) {
      let title = `${cookieName}`
      let subTitle = `签到结果: 签到成功`
      let detail = ``
      console.log(`${title}, ${subTitle}, ${detail}`)
      $notification.post(title, subTitle, detail)
    } else {
      let title = `${cookieName}`
      let subTitle = `签到结果: 签到失败`
      let detail = `详见日志`
      console.log(`签到失败: ${cookieName}, error: ${error}, response: ${response}, data: ${data}`)
      $notification.post(title, subTitle, detail)
    }
  })
}

sign({})
