<template>
  <div class="profile-info">
    <publicHeader :icon="true" name="提现记录"></publicHeader>
    <div class="bill-list">
      <van-collapse v-model="activeNames">
        <div v-for="(item,index) in withdrawList" :key="index">
          <van-collapse-item :title="item.account" :value="item.apply_amount">
            <!-- :label="`账户类型：${item.account_type_str} 账单类型：${item.class_str}`"> -->
            提现方式：{{item.cash_type_str}} <br />
            提现账户：{{item.type_str}} <br />
            提现状态：{{item.status_str}}<br />
            提现手续费：{{item.taxfee}}<br />
            创建时间：{{item.create_time}}
          </van-collapse-item>
        </div>
      </van-collapse>
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <div class="infinite-toast" slot="spinner">小弟拼命加载中...</div>
      <div class="infinite-toast" slot="no-more">已加载完毕!</div>
      <div class="infinite-toast" slot="no-results">暂无数据:(</div>
    </infinite-loading>
  </div>
</template>

<script>
import publicHeader from '@/components/publicHeader'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  components: {
    publicHeader,
    InfiniteLoading
  },
  data() {
    return {
      activeNames: ['1'],
      distance: 100,
      infiniteId: +new Date(),
      upData: {
        page: 1,
        rows: 10
      },
      totalPage: 0,
      withdrawList: []
    }
  },
  methods: {
    infiniteHandler($state) {
      this.$http
        .get('/member/cash/lists', { params: { ...this.upData } })
        .then(res => {
          if (res.data.list.length) {
            // 异步更新数据
            this.withdrawList.push(...res.data.list)
            // 数据全部加载完成
            this.upData.page++
            $state.loaded()
          } else {
            $state.complete()
          }
        })
        .catch(err => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-info {
  .pagination {
    left: 50%;
    transform: translateX(-50%);
    bottom: 0.133333rem;
    position: absolute;
  }
  .infinite-toast {
    margin: 0.266667rem 0;
    font-size: 0.213333rem;
  }
}
</style>