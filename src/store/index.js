import Vue from 'vue'
import Vuex from 'vuex'
import {
  getCookie,
  setCookie,
  delCookie,
} from '../utils/cookie'
Vue.use(Vuex)

let token = getCookie('token')
let userId = getCookie('userId')
let openId= getCookie('openId')
let isLogin = token ? true : false

export default new Vuex.Store({
  state: {
    openId:openId||"",
    token: token,
    userId: userId,
    isLogin: isLogin,
    addressItem: {},
    page:{},
  },
  mutations: {
    changeEye(state,val) {
      state.isShow = val
    },
    addPage(state,val){     //页面重定向
      state.page = val
    },
    // 拿取wxopenid方法
    takeOpenId (state, { openId }) {
      state.openId = openId
      setCookie('openId', openId, 10)
    },
    
    LOG_IN(state, {
      token = '',
      userId = ''
    }) {
      state.isLogin = true
      state.token = token
      state.userId = userId
      setCookie('token', token)
      setCookie('userId', userId)
    },

    LOG_OUT(state) {
      state.isLogin = false
      state.token = ''
      state.userId = ''
      delCookie('token')
      delCookie('userId')
    },

    SAVE_ADDRESS(state, item) {
      state.addressItem = item
    },
    
  },
})