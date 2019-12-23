import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // 部署目录
  base: process.env.NODE_ENV === 'development' ? '/' : '',
  routes: [
    ///////////////            肖云宗              ///////////////////
    // 首页
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index/index')
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },
    // 注册
    {
      path: '/registered',
      name: 'registered',
      component: () => import('@/views/login/registered.vue')
    },


    ///////////////            范培超             ////////////////////////
    //  ---个人中心---

    // 个人中心首页
    {
      path: '/profileCenter/ProfileIndex',
      name: 'ProfileIndex',
      component: () => import('@/views/profileCenter/ProfileIndex')
    },
    //  个人信息
    {
      path: '/profileCenter/ProfileInfo',
      name: 'ProfileInfo',
      component: () => import('@/views/profileCenter/ProfileInfo')
    },
    //  充值
    {
      path: '/profileCenter/Charge',
      name: 'Charge',
      component: () => import('@/views/profileCenter/Charge')
    },
    //  我的订单
    {
      path: '/profileCenter/Order',
      name: 'Order',
      component: () => import('@/views/profileCenter/Order')
    },
    //  我要推广
    {
      path: '/profileCenter/Promote',
      name: 'Promote',
      component: () => import('@/views/profileCenter/Promote')
    },
    //  我要提现
    {
      path: '/profileCenter/Withdraw',
      name: 'Widthdraw',
      component: () => import('@/views/profileCenter/Withdraw')
    },
    //  我的账单
    {
      path: '/profileCenter/Bill',
      name: 'Bill',
      component: () => import('@/views/profileCenter/Bill')
    },
    //  收款账户设置
    {
      path: '/profileCenter/Settings',
      name: 'Settings',
      component: () => import('@/views/profileCenter/Settings')
    },
    //  我要升级
    {
      path: '/profileCenter/Upgrade',
      name: 'Upgrade',
      component: () => import('@/views/profileCenter/Upgrade')
    },
    //  升级记录
    {
      path: '/profileCenter/UpRecord',
      name: 'UpRecord',
      component: () => import('@/views/profileCenter/UpRecord')
    },
    //  我的团队
    {
      path: '/profileCenter/Team',
      name: 'Team',
      component: () => import('@/views/profileCenter/Team')
    },
    //  收货地址
    {
      path: '/profileCenter/Address',
      name: 'Address',
      component: () => import('@/views/profileCenter/Address')
    },
    //  联系客服
    {
      path: '/profileCenter/Service',
      name: 'Service',
      component: () => import('@/views/profileCenter/Service')
    },
    //  平台公告
    {
      path: '/profileCenter/Announce',
      name: 'Announce',
      component: () => import('@/views/profileCenter/Announce')
    },
    


  ]
})