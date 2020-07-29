const cookieName = 'btschool'
const cookieKey = 'chavy_cookie_btschool'
const cookieVal = $prefs.valueForKey(cookieKey)

function sign() {
  let url = {
    url: `https://pt.btschool.club/index.php`,
    method: 'GET',
    headers: {
      Cookie: cookieVal
    }
  }
  $task.fetch(url).then((response) => {
    let data = response.body
    if (data.indexOf('每日签到') <= 0) {
      let title = `${cookieName}`
      let subTitle = `签到结果: 签到跳过`
      let detail = `今天已经签过了`
      console.log(`${title}, ${subTitle}, ${detail}`)
      $notify(title, subTitle, detail)
    } else {
      signMission()
    }
  })
}

function signMission(code) {
  let url = {
    url: `https://pt.btschool.club/index.php?action=addbonus`,
    method: 'GET',
    headers: { Cookie: cookieVal }
  }
  $task.fetch(url).then((response) => {
    let data = response.body
    if (data.indexOf('每日签到') <= 0) {
      let title = `${cookieName}`
      let subTitle = `签到结果: 签到成功`
      let detail = ``
      console.log(`${title}, ${subTitle}, ${detail}`)
      $notify(title, subTitle, detail)
    } else {
      let title = `${cookieName}`
      let subTitle = `签到结果: 签到失败`
      let detail = `详见日志`
      console.log(`签到失败: ${cookieName}, data: ${data}`)
      $notify(title, subTitle, detail)
    }
  })
}

sign({})
