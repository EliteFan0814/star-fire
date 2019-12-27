import router from '../../../zhimali/zhimahua_vue/src/router'
import {
  getCookie
} from '../../../zhimali/zhimahua_vue/src/utils/cookie'
import store from '../../../zhimali/zhimahua_vue/src/store'

// 不重定向   定义白名单
const whiteList = [null, 'index', 'code', 'auth', 'order', 'login','registered', 'mine', 'forgetPwd']

let ua = navigator.userAgent.toLowerCase() //navigator.userAgent转小写
if (ua.indexOf('micromessenger') >= 0) { //通过userAgent是否包含MicroMessenger来判断是否在微信内置浏览器打开网页
  router.beforeEach(async (to, from, next) => { //路由钩子函数   router.beforeEach/在跳转之前执行   router.afterEach/在跳转之前执行
    if (to.name == 'registered') {
      next()
      return
    }
    if (!store.state.openId && to.name !== 'code' && to.name !== 'auth') {
      // 如果刷新页面获取页面和参数直接进入页面
      store.commit('addPage', {
        name: to.name,
        query: to.query
      })
      // this.$store.commit('toShowLoginDialog', true);   同步操作
      // this.$store.dispatch('toShowLoginDialog',false)   含有异步操作
      /** 微信网页授权 *********************/
      // 生成换取微信code连接,并跳转,用户授权后, 有一个接收code的页面
      router.push({
        name: 'code'
      })
    } else {
      if (getCookie('token')) {
        if (!to.name) { //没有目的
          next({
            name: 'index'
          })
        } else {
          next()
        }
      } else {
        if (whiteList.indexOf(to.name) !== -1) { //如果在白名单里  继续执行
          next()
        } else {
          next({
            name: 'login'
          }) //如果不在白名单  跳转登录
        }
      }
    }
  })
} else { //如果不是微信浏览器
  router.beforeEach(async (to, from, next) => {
    // to and from are both route objects. must call `next`.
    if (getCookie('token')) {
      if (!to.name) {
        next({
          name: 'index'
        })
      } else {
        next()
      }
    } else {
      if (whiteList.indexOf(to.name) !== -1) {
        next()
      } else {
        next({
          name: 'login'
        })
      }
    }
  })
}