import Vue from 'vue'
import store from '@/store'
import axios from 'axios'
import Qs from 'qs'
import router from '@/router/router'
import {
  Toast
} from "vant"
import {
  getCookie
} from './cookie.js'


// Toast.allowMultiple();
const request = axios.create({
  // 仅在开发环境走代理
  baseURL: process.env.NODE_ENV === 'development' ? '' : '',
  // http://freelife.old.dx623.com/
  timeout: 5000
})

request.interceptors.request.use(
  config => {
    const toast = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner',
      message: '加载中...'
    });
    if (config.method == "post") {
      if (!(config.data instanceof FormData)) {
        config.data = Qs.stringify(config.data)
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      }
    }
    config.headers = {
      Authorization: 'Bearer ' + getCookie('token'),
      ...config.headers
    }
    // 登录后所有请求附带token
    if (store.state.isLogin && store.state.token) {
      config.headers = {
        Authorization: 'Bearer ' + getCookie('token'),
        ...config.headers
      }
    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  res => {
    Toast.clear();
    if (res.data.success || res.data.code === 0) {
      // successcess
      if (res.data.msg && res.data.msg != "ok" && res.data.msg != "操作成功") Toast.success(res.data.msg)
    }
    if (res.data.code === 0) {
      Toast.fail(res.data.msg)
    }
    if (res.data.success || res.data.code === 1) return res.data
    return Promise.reject(res.data)
  },
  err => {
    Toast.clear();
    // token 失效
    if (err.response) {
      if (err.response.status === 900) {
        Toast.fail('请重新登陆')
        store.commit('LOG_OUT')
        router.replace('/login')
      }
      // if (err.response.status === 403) {
      //   Toast.fail('没有操作权限')
      // }
      if (err.response.status === 400) {
        if (err.response.data && err.response.data.msg)
          Toast.fail(err.response.data.msg)
        else {
          Toast.fail(JSON.stringify(err.response.data))
        }
      }
    } else {
      Toast.clear();
      Toast.fail('网络错误，请重试')
    }
    return Promise.reject(err)
  }
)

Vue.prototype.$http = request

export default request