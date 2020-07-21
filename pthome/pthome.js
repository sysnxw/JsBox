const cookieName = 'pthome'
const signurlKey = 'senku_signurl_pthome'
const signheaderKey = 'senku_signheader_pthome'
const signbodyKey = 'senku_signbody_pthome'
const senku = init()
const signurlVal = senku.getdata(signurlKey)
const signheaderVal = senku.getdata(signheaderKey)
const signBodyVal = senku.getdata(signbodyKey)

sign()

function sign() {
  const url = { url: signurlVal, headers: JSON.parse(signheaderVal), /*body: signBodyVal*/ }
  senku.get(url, (error, response, data) => {
    const result = JSON.parse(data)
    console.log(result) 
    //const total = result.data['task.revisionSignInGetAward'].total
    //const ret = result.data['task.revisionSignInGetAward'].ret
    let subTitle = `执行了但是不知道是否正常`
    let detail = `不知道哦`
    /*if (total != 0) {
      const num = result.data['task.revisionSignInGetAward'].awards[0].num
      subTitle = `签到结果: 成功`
      detail = `获得鲜花: ${num}朵,已连续签到:${total}天`
    } else if (ret == -11532) {
      subTitle = `签到结果: 成功 (重复签到)`
    } else {
      subTitle = `签到结果: 失败`
    }*/
    senku.msg(cookieName, subTitle, detail)
    senku.done()
  })
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
