<template>
  <div class="upgrade-order">
    <publicHeader :icon="true" name="升级订单" right="升级记录" url="/profileCenter/UpgradeOrderRecord"></publicHeader>
    <div class="upgrading">
      <div class="up-top">
        <span class="bold-text">升级为：{{level.level_to_str}}</span>
        <span class="up-process">{{level.status_str}}</span>
      </div>
      <div class="up-time">
        <span>订单提交时间</span>
        <span>{{level.create_time}}</span>
      </div>
      <!-- 升级卡片 -->
      <div class="up-card">
        <div class="card-top card-all">
          <span class="bold-text">{{businessApply.type_str}}升级审核</span>
          <span class="red-text">￥{{businessApply.reward}}</span>
        </div>
        <div class="card-middle card-all">
          <span>订单号：{{businessApply.level_sn}}</span>
        </div>
        <div class="card-btm card-all">
          <span>审核状态：{{businessApply.status_str}}</span>
          <span class="check-text" @click="checkUp(businessApply.type,businessApply.id)">点击查看<span>&nbsp;&gt;</span></span>
        </div>
      </div>
      <div class="up-card">
        <div class="card-top card-all">
          <span class="bold-text">{{memberApply.type_str}}升级审核</span>
          <span class="red-text">￥{{memberApply.reward}}</span>
        </div>
        <div class="card-middle card-all">
          <span>订单号：{{memberApply.level_sn}}</span>
        </div>
        <div class="card-btm card-all">
          <span>审核状态：{{memberApply.status_str}}</span>
          <span class="check-text" @click="checkUp(memberApply.type,memberApply.id)">点击查看<span>&nbsp;&gt;</span></span>
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
  data() {
    return {
      level: {},
      applyList: [{ reward: '' }, { reward: '' }],
      businessApply: {},
      memberApply: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http
        .get('/member/check_level/lst')
        .then(res => {
          if (res.code) {
            this.level = res.data.level
            res.data.list.map(item => {
              if (item.type === 'business') {
                this.businessApply = item
              }
              if (item.type === 'member') {
                this.memberApply = item
              }
            })
          }
        })
        .catch(err => {})
    },
    checkUp(applyType, applyId) {
      this.$router.push({
        name: 'UpgradeOrderApply',
        query: { applyType, applyId }
      })
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