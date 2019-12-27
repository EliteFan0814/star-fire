import qs from 'qs'

// const wxBaseUrl = 'http://localhost:8080'
const wxApiUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize'
// const wxAppSecret = '0e71b8c395ff717c11815a5d6680b501'

export default class {
  // 换取微信code
  static wxCode () {
    let params = {
      appid: 'wx0e7778296caadc9a',
      redirect_uri: 'http://www.zhimalivip.com/auth',
      response_type: 'code',
      scope: 'snsapi_userinfo',
      state: 'zhimali'
    }
    let gourl = wxApiUrl + '?' + qs.stringify(params) + '#wechat_redirect'
    // console.log(gourl)
    window.location.href = gourl
  }
}

// qs.stringify 序列化url形式      gourl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx47e4a904266b9c84....#wechat_redirect'
//默认导出一个构造方法,只能直接调用,实例对象无此方法