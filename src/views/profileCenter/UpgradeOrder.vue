<template>
  <div class="upgrade-order">
    <publicHeader :icon="true" name="升级订单" right="升级记录" url="/profileCenter/UpgradeOrderRecord"></publicHeader>
    <div class="upgrading">
      <div class="up-top">
        <span class="bold-text">V1区县代理升级</span>
        <span class="up-process">进行中</span>
      </div>
      <div class="up-time">
        <span>订单提交时间</span>
        <span>2019年12月18日 10时20分</span>
      </div>
      <!-- 升级卡片 -->
      <div class="up-card">
        <div class="card-top card-all">
          <span class="bold-text">升级申请</span>
          <span class="red-text">￥10.00</span>
        </div>
        <div class="card-middle card-all">
          <span>订单号：20191225025</span>
        </div>
        <div class="card-btm card-all">
          <span>审核状态：待审核</span>
          <span class="check-text" @click="checkUp">点击查看<span>&nbsp;&gt;</span></span>
        </div>
      </div>
      <div class="up-card">
        <div class="card-top card-all">
          <span class="bold-text">升级确认</span>
          <span class="red-text">￥90.00</span>
        </div>
        <div class="card-middle card-all">
          <span>订单号：20191225025</span>
        </div>
        <div class="card-btm card-all">
          <span>审核状态：待提交</span>
          <span class="check-text" @click="checkUp">点击查看<span>&nbsp;&gt;</span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import publicHeader from '@/components/publicHeader'
export default {
  components: {
    publicHeader
  },
  methods: {
    checkUp() {
      this.$router.push({ name: 'UpgradeOrderApply' })
    }
  }
}
</script>

<style lang="scss" scoped>
.upgrade-order {
  padding-top: 0.213333rem;
  background-color: #f5f5f5;
  font-size: 0.4rem;
  line-height: 0.533333rem;
  color: #333333;
  .bold-text {
    font-weight: bold;
  }
  .upgrading {
    background-color: #fff;
    .up-top {
      padding: 0.266667rem 0.533333rem;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .up-process {
        color: #fff;
        font-size: 0.4rem;
        line-height: 0.666667rem;
        padding: 0 0.333333rem;
        background-color: #03d13e;
        border-radius: 0.106667rem;
      }
    }
    .up-time {
      margin: 0 0.533333rem;
      padding: 0.266667rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
    }
    .up-card {
      margin: 0.533333rem;
      padding: 0.013333rem 0;
      box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.08);
      border-radius: 0.213333rem;
      .card-all {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.4rem;
        .red-text {
          color: #ff5f5f;
        }
        .check-text {
          color: #03d13e;
        }
      }
    }
  }
}
</style>