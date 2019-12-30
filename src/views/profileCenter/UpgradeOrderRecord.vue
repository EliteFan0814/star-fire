<template>
  <div class="up-record">
    <publicHeader :icon="true" name="升级记录"></publicHeader>
    <!-- 审核中的凭证 -->
    <div v-if="list.length > 0">
      <div v-for="item in list" :key="item.id">
        <div class="record-item" v-if="item.status == 0">
          <div class="top-arrow">
            <span class="checking">{{item.level_from_str}}</span>
            <img src="@/assets/personal/checking.png" alt="">
            <span class="checking">{{item.level_to_str}}</span>
          </div>
          <div class="record-common">
            <span>已支付（元）</span>
            <span>{{item.money}}</span>
          </div>
          <div class="record-common">
            <span class="checking">提交时间</span>
            <span class="checking">{{item.create_time}}</span>
          </div>
          <!-- <div class="rcord-btm">
            <div class="left-proof">
              <span>支付凭证</span>
              <img src="@/assets/personal/checking-img.png" alt="">
            </div>
            <div class="right-img">
              <img :src="item.picurl" @click="showImages(item)" alt="">
              <img :src="item.picurl" @click="showImages(item)" alt="">
            </div>
          </div> -->
        </div>
        <!--  审核通过的凭证 -->
        <div class="record-item" v-if="item.status == 1">
          <div class="top-arrow">
            <span class="checked">{{item.level_from_str}}</span>
            <img src="@/assets/personal/checked.png" alt="">
            <span class="checked">{{item.level_to_str}}</span>
          </div>
          <div class="record-common">
            <span>已支付（元）</span>
            <span>{{item.money}}</span>
          </div>
          <div class="record-common">
            <span class="checked">提交时间</span>
            <span class="checked">{{item.create_time}}</span>
          </div>
          <div class="record-common">
            <span class="checked">同意时间</span>
            <span class="checked">{{item.check_time}}</span>
          </div>
          <div class="rcord-btm">
            <div class="left-proof">
              <span>支付凭证</span>
              <img src="@/assets/personal/checked-img.png" alt="">
            </div>
            <div class="right-img">
              <img :src="item.check_voucher1" @click="showImages(item)" alt="">
              <img :src="item.check_voucher2" @click="showImages(item)" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="kong">
      <img src="@/assets/index/none.png" width="100" alt="">
      <div>暂无升级记录</div>
    </div>
    <van-image-preview
      v-model="show"
      :images="images">
    </van-image-preview>
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
      list: [],
      show: false,
      images: []
    }
  },
  created() {
    this.getData();
  },
  methods: { 
    getData() {
      this.$http.get('/member/member_level/lists').then(res => {
        this.list = res.data.lists;
      })
    },
    showImages(item) {
      this.images = [];
      this.images.push(item.check_voucher1,item.check_voucher2);
      this.show = true;
    }
  }
}
</script>
<style lang="scss" scoped>
.kong {
  width: 8.96rem;
  margin-top: 1rem;
  font-size: .28rem;
  color: #999;
  text-align: center;
}
.up-record {
  padding: 0.533333rem;
  padding-top: .013333rem;
  .record-item {
    background-color: #ffffff;
    box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius: 0.213333rem;
    // height: 4rem;
    font-size: 0.4rem;
    line-height: 0.533333rem;
    margin-top: .533333rem;
    padding: 0.4rem;
    padding-top: 0.2rem;
    .top-arrow,
    .record-common {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.333333rem 0;
    }
    .top-arrow {
      img {
        width: 0.746667rem;
        height: 0.306667rem;
      }
    }
    .rcord-btm {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-proof {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 1.373333rem;
          height: 1.093333rem;
        }
      }
      .right-img {
        img {
          width: 1.333333rem;
          height: 1.6rem;
          margin-right: 0.333333rem;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .checking {
      color: #40a3ff;
    }
    .checked {
      color: #03d13e;
    }
    .check-filed {
      color: #ff5f5f;
    }
  }
}
</style>