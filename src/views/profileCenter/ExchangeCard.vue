<template>
  <div class="profile-info">
    <publicHeader :icon="true" name="我的兑换券"></publicHeader>
    <div class="bill-list">
      <van-collapse v-model="activeNames">
        <div v-for="(item,index) in exchangeList" :key="index">
          <van-collapse-item :title="item.exchange_level_str" :value="item.status_str">
            <!-- :label="`账户类型：${item.account_type_str} 账单类型：${item.class_str}`"> -->
            创建时间：{{item.create_time}}
          </van-collapse-item>
        </div>
      </van-collapse>
    </div>
    <!-- <infinite-loading @infinite="infiniteHandler">
      <div class="infinite-toast" slot="spinner">小弟拼命加载中...</div>
      <div class="infinite-toast" slot="no-more">已加载完毕!</div>
      <div class="infinite-toast" slot="no-results">暂无数据:(</div>
    </infinite-loading> -->
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
      activeNames: ['1'],
      exchangeList: []
    }
  },
  created() {
    this.getExchangeList()
  },
  methods: {
    getExchangeList() {
      this.$http.get('/member/exchange_member/lists').then(res => {
        if (res.code) {
          this.exchangeList = res.data
        }
      })
    }
    // infiniteHandler($state) {
    //   this.$http
    //     .get('/member/exchange_member/lists')
    //     .then(res => {
    //       if (res.data.length) {
    //         // 异步更新数据
    //         this.exchangeList.push(...res.data)
    //         // 数据全部加载完成
    //         $state.loaded()
    //       } else {
    //         $state.complete()
    //       }
    //     })
    //     .catch(err => {})
    // }
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