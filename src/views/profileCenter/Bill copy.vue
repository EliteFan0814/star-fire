<template>
  <div class="profile-info">
    <publicHeader :icon="true" name="我的账单"></publicHeader>
    <div class="filter-menu">
      <van-dropdown-menu>
        <van-dropdown-item v-model="upData.type" :options="filter_account" />
        <van-dropdown-item v-model="upData.class" :options="filter_class" />
      </van-dropdown-menu>
    </div>
    <div class="bill-list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getBills">
        <van-collapse v-model="activeNames">
          <div v-for="(item,index) in billList" :key="index">
            <van-collapse-item :title="item.remark" :value="item.amount">
              <!-- :label="`账户类型：${item.account_type_str} 账单类型：${item.class_str}`"> -->
              账户类型：{{item.account_type_str}} <br />
              账单类型：{{item.class_str}} <br />
              创建时间：{{item.create_time}}
            </van-collapse-item>
          </div>
        </van-collapse>

      </van-list>
    </div>
    <infinite-loading :distance="distance" @infinite="infiniteHandler">
      <div slot="spinner">小弟拼命加载中...</div>//加载中的文字
      <div slot="no-more">已加载完毕!</div>//加载完毕的文字
      <div slot="no-results">暂无数据:(</div>//没有数据的文字
    </infinite-loading>
  </div>
</template>

<script>
import publicHeader from '@/components/publicHeader'
import InfiniteLoading from 'vue-infinite-loading'

import { log } from 'util'

export default {
  components: {
    publicHeader,
    InfiniteLoading
  },
  data() {
    return {
      activeNames: ['1'],
      upData: {
        page: 1,
        rows: 10,
        type: '',
        class: ''
      },
      totalPage: 0,
      account_screen: [],
      class_screen: [],
      billList: [],
      loading: false,
      finished: false
    }
  },
  computed: {
    filter_account() {
      return this.filterClass(this.account_screen, '所有账户')
    },
    filter_class() {
      return this.filterClass(this.class_screen, '所有账单')
    },
    upDataType() {
      return this.upData.type
    },
    upDataClass() {
      return this.upData.class
    }
  },
  watch: {
    upDataType() {
      this.billList = []
      this.upData.page = 1
      console.log('this.upData', this.upData)
      this.getBills()
    },
    upDataClass() {
      this.billList = []
      this.upData.page = 1
      console.log('this.upData', this.upData)
      this.getBills()
    }
  },
  created() {
    // this.getBills()
    if (this.$route.query.accountClass) {
      this.upData.type = this.$route.query.accountClass
    }
    console.log(this.$route)
  },
  methods: {
    getBills() {
      console.log('触发load了')

      this.$http
        .get('/member/bill/lists', { params: { ...this.upData } })
        .then(res => {
          this.loading = false
          this.totalPage = res.data.page_total
          this.account_screen = res.data.account_screen
          this.class_screen = res.data.class_screen
          // 异步更新数据
          this.pushBillListItem(res.data.list)
          console.log('this.billList', this.billList)
          // 数据全部加载完成
          this.upData.page++
          if (this.upData.page > this.totalPage) {
            this.finished = true
          }
        })
    },
    filterClass(inData, className) {
      let res = [{ text: className, value: '' }]
      inData.map(item => {
        let obj = {}
        obj.text = item.label
        obj.value = item.value
        res.push(obj)
      })
      return res
    },
    pushBillListItem(list) {
      list.map(item => {
        this.billList.push(item)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-info {
  // position: relative;
  .pagination {
    // border: 1px solid red;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0.133333rem;
    // margin: 0 auto;
    position: absolute;
  }
}
</style>