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
    // 升级审核
    {
      path: '/levelUp',
      name: 'levelUp',
      component: () => import('@/views/levelUp/levelUp')
    },
    // 购物车
    {
      path: '/car',
      name: 'car',
      component: () => import('@/views/car/car')
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
    // 找回密码
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: () => import('@/views/login/forgetPwd.vue')
    },
    // 搜索商品列表
    {
      path: '/searchList',
      name: 'searchList',
      component: () => import('@/views/goods/searchList')
    },
    // 购物商城
    {
      path: '/mall',
      name: 'mall',
      component: () => import('@/views/goods/mall')
    },
    // 商品详情
    {
      path: '/goodsDetails',
      name: 'goodsDetails',
      component: () => import('@/views/goods/goodsDetails')
    },
    // 确认订单
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: () => import('@/views/order/confirmOrder')
    },
    // 兑换专区
    {
      path: '/exchange',
      name: 'exchange',
      component: () => import('@/views/goods/exchange')
    },
    // 兑换商品详情
    {
      path: '/goodsDetailsDh',
      name: 'goodsDetailsDh',
      component: () => import('@/views/goods/goodsDetailsDh')
    },
    // 兑换确认订单
    {
      path: '/confirmOrderDh',
      name: 'confirmOrderDh',
      component: () => import('@/views/order/confirmOrderDh')
    },
    // 首页公告
    {
      path: '/notice',
      name: 'notice',
      component: () => import('@/views/indexContent/notice')
    },
    // 搜索
    {
      path: '/searchPage',
      name: 'searchPage',
      component: () => import('@/views/indexContent/searchPage')
    },
    // 公告详情
    {
      path: '/noticeDetail',
      name: 'noticeDetail',
      component: () => import('@/views/indexContent/noticeDetail')
    },
    
    //  我要推广
    {
      path: '/profileCenter/Promote',
      name: 'Promote',
      component: () => import('@/views/profileCenter/Promote')
    },
    //  收货地址
    {
      path: '/profileCenter/Address',
      name: 'Address',
      component: () => import('@/views/profileCenter/Address')
    },
    //  收货地址添加
    {
      path: '/profileCenter/AddressAdd',
      name: 'AddressAdd',
      component: () => import('@/views/profileCenter/AddressAdd')
    },
    
    //  平台公告
    {
      path: '/profileCenter/Announce',
      name: 'Announce',
      component: () => import('@/views/profileCenter/Announce')
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
    //  个人信息 > 修改密码
    {
      path: '/profileCenter/ProfileInfoPwd',
      name: 'ProfileInfoPwd',
      component: () => import('@/views/profileCenter/ProfileInfoPwd')
    },
    //  个人信息 > 修改手机
    {
      path: '/profileCenter/ProfileInfoPhone',
      name: 'ProfileInfoPhone',
      component: () => import('@/views/profileCenter/ProfileInfoPhone')
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
    //  我的团队
    {
      path: '/profileCenter/Team',
      name: 'Team',
      component: () => import('@/views/profileCenter/Team')
    },
    //  我的分润
    {
      path: '/profileCenter/SliceMoney',
      name: 'SliceMoney',
      component: () => import('@/views/profileCenter/SliceMoney')
    },
    //  我要提现
    {
      path: '/profileCenter/Withdraw',
      name: 'Withdraw',
      component: () => import('@/views/profileCenter/Withdraw')
    },
    //  我要提现 > 提现记录
    {
      path: '/profileCenter/WithdrawRecord',
      name: 'WithdrawRecord',
      component: () => import('@/views/profileCenter/WithdrawRecord')
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
    //  收款账户设置 > 修改账户
    {
      path: '/profileCenter/SettingsChange',
      name: 'SettingsChange',
      component: () => import('@/views/profileCenter/SettingsChange')
    },
    //  我要升级
    {
      path: '/profileCenter/Upgrade',
      name: 'Upgrade',
      component: () => import('@/views/profileCenter/Upgrade')
    },
    //  我要升级 > 升级订单
    {
      path: '/profileCenter/UpgradeOrder',
      name: 'UpgradeOrder',
      component: () => import('@/views/profileCenter/UpgradeOrder')
    },
    //  我要升级 > 升级订单 > 升级记录
    {
      path: '/profileCenter/UpgradeOrderRecord',
      name: 'UpgradeOrderRecord',
      component: () => import('@/views/profileCenter/UpgradeOrderRecord')
    },
    //  我要升级 > 升级订单 > 升级申请
    {
      path: '/profileCenter/UpgradeOrderApply',
      name: 'UpgradeOrderApply',
      component: () => import('@/views/profileCenter/UpgradeOrderApply')
    },
    // 升级订单 
    // {
    //   path: '/profileCenter/UpgradeOrder',
    //   name: 'UpgradeOrder',
    //   component: () => import('@/views/profileCenter/UpgradeOrder')
    // },
    //  联系客服
    {
      path: '/profileCenter/Service',
      name: 'Service',
      component: () => import('@/views/profileCenter/Service')
    },
    


  ]
})