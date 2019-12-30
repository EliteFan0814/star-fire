<template>
  <div class="profile-info">
    <publicHeader :icon="true" :name="topBarText"></publicHeader>
    <!-- <div class="filter-menu">
      <van-dropdown-menu>
        <van-dropdown-item v-model="upData.type" :options="filter_account" />
        <van-dropdown-item v-model="upData.class" :options="filter_class" />
      </van-dropdown-menu>
    </div> -->
    <div class="bill-list">
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

    </div>
    <infinite-loading :distance="distance" :identifier="infiniteId" @infinite="infiniteHandler">
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
        rows: 10,
        type: '',
        class: ''
      },
      totalPage: 0,
      account_screen: [],
      class_screen: [],
      billList: []
    }
  },
  computed: {
    topBarText() {
      if (this.$route.query.accountText) {
        if (this.$route.query.classText) {
          return '我的推广总收益'
        }
        return '我的' + this.$route.query.accountText
      }
      return '我的账单'
    },
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
      // this.getBills()
      this.infiniteId += 1
    },
    upDataClass() {
      this.billList = []
      this.upData.page = 1
      console.log('this.upData', this.upData)
      // this.getBills()
      this.infiniteId += 1
    }
  },
  created() {
    // this.getBills()
    if (this.$route.query.accountClass) {
      this.upData.type = this.$route.query.accountClass
    }
    if (this.$route.query.classClass) {
      this.upData.class = this.$route.query.classClass
    }
    // console.log(this.$route)
  },
  methods: {
    infiniteHandler($state) {
      this.$http
        .get('/member/bill/lists', { params: { ...this.upData } })
        .then(res => {
          this.totalPage = res.data.page_total
          this.account_screen = res.data.account_screen
          this.class_screen = res.data.class_screen
          if (res.data.list.length) {
            // 异步更新数据
            this.billList.push(...res.data.list)
            // this.pushBillListItem(res.data.list)
            // 数据全部加载完成
            this.upData.page++
            $state.loaded()
          } else {
            $state.complete()
          }
        })
        .catch(err => {})
    },
    filterClass(inData, className) {
      let res = [{ text: className, value: '' }]
      // res.push(...inData)
      inData.map(item => {
        let obj = {}
        obj.text = item.label
        obj.value = item.value
        res.push(obj)
      })
      return res
    },
    pushBillListItem(list) {
      this.billList.push(...list)
      // list.map(item => {
      //   this.billList.push(item)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-info {
  .infinite-toast {
    margin: 0.266667rem 0;
    font-size: 0.213333rem;
  }
}
</style>