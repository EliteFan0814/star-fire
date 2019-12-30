<template>
  <div class="warpper">
    <publicHeader name="升级审核"></publicHeader>
    <div>
      <van-tabs v-model="active" color="#40a3ff" title-active-color="#40a3ff">
        <!-- 待审核 -->
        <van-tab title="待审核" name="3">
          <div v-if="shenheList.length > 0">
            <div class="shDiv"  v-for="(item, index) in shenheList">
              <div class="shCard">
                <div class="shChild">
                  <div>订单号</div>
                  <div>{{item.level_sn}}</div>
                </div>
                <div class="shChild">
                  <div>会员账号</div>
                  <div>{{item.member_account}}</div>
                </div>
                <div class="shChild">
                  <div>所属等级</div>
                  <div>{{item.level_from_str}}</div>
                </div>
                <div class="shChild">
                  <div>已支付（元）</div>
                  <div class="shmoney">{{item.reward}}</div>
                </div>
                <div class="shChild">
                  <div>提交时间</div>
                  <div>{{item.create_time}}</div>
                </div>
                <div class="shChild">
                  <div>支付凭证</div>
                  <img class="levelImg" @click="bigImg(item.voucher_str)" :src="item.voucher_str" alt="">
                </div>
                <div style="text-align: right;margin-top:.8rem;">
                  <van-button @click="disagree(item.id)" plain color="#03d13e" size="mini" class="shBtn">拒绝</van-button>
                  <van-button @click="agree(item.id)" color="#03d13e" size="mini" class="shBtn">同意</van-button>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="kong">
            <img src="@/assets/index/none.png" width="100" alt="">
            <div>暂无待审数据</div>
          </div>
        </van-tab>

        <!-- 已审核 -->
        <van-tab title="已审核" name="4">
          <div v-if="shenheList.length > 0">
            <div class="shDiv"  v-for="(item,index) in shenheList">
              <div class="shCard">
                <div class="shChild">
                  <div>订单号</div>
                  <div>{{item.level_sn}}</div>
                </div>
                <div class="shChild">
                  <div>会员账号</div>
                  <div>{{item.member_account}}</div>
                </div>
                <div class="shChild">
                  <div>已支付（元）</div>
                  <div class="shmoney">{{item.reward}}</div>
                </div>
                <div class="shChild">
                  <div>提交时间</div>
                  <div>{{item.create_time}}</div>
                </div>
                <div class="shChild">
                  <div>同意时间</div>
                  <div>{{item.check_time}}</div>
                </div>
                <div class="shChild">
                  <div>支付凭证</div>
                  <img @click="bigImg(item.voucher_str)" class="levelImg" :src="item.voucher_str" alt="">
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="kong">
            <img src="@/assets/index/none.png" width="100" alt="">
            <div>暂无已审数据</div>
          </div>
        </van-tab>
      </van-tabs>
      
    </div>
    <van-image-preview
      v-model="show"
      :images="images">
    </van-image-preview>
    <tabbar :cardno="cardno"></tabbar>
  </div>
</template>
<script>
import publicHeader from '@/components/publicHeader'
import tabbar from '@/components/tabbar'
export default {
  components: {
    tabbar,
    publicHeader
  },
  data() {
    return {
      cardno: 1,
      active: 3,
      show: false,
      shenheList: [],
      images: [],

      page: 1
    }
  },
  created() {
    this.getData();
  },
  watch: {
    active() {
      this.getData();
    }
  },
  methods: {
    getData() {
      this.$http.get('/member/check_level/lists', {
        params: {
          rows: 50,
          page: this.page,
          state: this.active
        }
      }).then(res => {
        this.shenheList = res.data.list
        console.log(this.shenheList);
        
      }).catch(() => {})
    },
    // 同意审核
    agree(id) {
      this.$dialog.confirm({
        title: '提示',
        message: '确定拒绝该审核?'
      }).then(res => {
        this.$http.post('/member/check_level/agree',{
          id: id
        }).then(res => {
          this.$toast(res.msg);
          this.getData();
        }).catch(() => {})
      }).catch(() => {})
    },
    // 拒绝审核
    disagree(id) {
      this.$dialog.confirm({
        title: '提示',
        message: '确定同意该审核?'
      }).then(res => {
        this.$http.post('/member/check_level/deny',{
          id: id
        }).then(res => {
          this.$toast(res.msg);
          this.getData();
        }).catch(() => {})
      }).catch(() => {})
      
    },
    // 预览大图
    bigImg(img) {
      this.images = [];
      this.images.push(img)
      this.show = true;
    }
  },
}
</script>
<style lang="scss" scoped>
.warpper {
  padding-bottom: 50px;
}
.shmoney {
  color: #ff5f5f;
}
.kong {
  width: 10rem;
  margin-top: 1rem;
  font-size: .32rem;
  color: #999;
  text-align: center;
}
.shDiv {
  padding: .266667rem .533333rem;
  font-size: .4rem;
  .shCard {
    border: 1px solid #f5f5f5;
    padding: .38rem;
    box-shadow: 0 0 10px #f5f5f5;
    border-radius: .213333rem;
    .shChild {
      margin-bottom: .3rem;
      display: flex;
      justify-content: space-between;
      .levelImg {
        width: 1.333333rem;
        height: 1.6rem;
      }
    }
    .shBtn {
      width: 2rem;
      height: .613333rem;
      font-size: .32rem;
      margin-left: .3rem;
    }
  }
}
</style>