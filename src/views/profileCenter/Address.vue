<template>
  <div class="wrapper">
    <publicHeader name="收货地址"
      :icon="true"></publicHeader>
    <div class="body">
      <van-radio-group class="group"
        v-model="radio">
        <div class="table"
          v-for="(item, index) in addressList"
          :key="index"
          @click="toChose(item)">
          <div class="infeed">
            <div>{{item.linkman}}</div>
            <div>{{item.contact}}</div>
          </div>
          <div class="address">{{item.address_detail}}</div>
          <div class="infeed">
            <div class="choice"
              @click.stop="radioChange(item)">
              <van-radio :name="item.is_default"
                checked-color="#40a3ff">默认地址</van-radio>
            </div>
            <div class="icon">
              <van-icon name='edit'
                size='.48rem'
                color='#40a3ff'
                @click.stop="open(item)" />
              <van-icon name='delete'
                size='.48rem'
                color='#40a3ff'
                @click.stop="del(item.id,item.contact)" />
            </div>
          </div>
        </div>
      </van-radio-group>
      <div class="button"
        @click="open()">添加收货地址</div>
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
      radio: 1,
      addressList: [],
    }
  },
  mounted() {
    this.getAddressList();
  },
  methods: {
    // 获取地址列表
    getAddressList() {
      this.$http.get('/member/address/lists').then(res => {
        this.addressList = res.data.list;
        this.radio = 1;
      }).catch(() => {})
    },
    open(item) {      
      this.$router.push({
        name: 'AddressAdd',
        query: {item: item}
      })
    },
    
    // 选择收货地址
    toChose(item) {
      if(this.$route.query.chooseAddress) {
        this.$store.commit('SAVE_ADDRESS',item)      
        this.$router.go(-1)
      }
    },
    // 设置默认地址
    radioChange(value) {
      if(!value) {
        return api.toast({
          msg: '未找到地址信息'
        })
      }
      this.$http.post('/member/address/setDef', {
        id: value.id
      })
      .then(res => {
        this.getAddressList()
      })
      .catch(err => {})
    },
    // 删除地址
    async del(id,contact) {
      this.$dialog
        .confirm({
          title: '确定要删除该收货地址吗'
        })
        .then(() => {
          this.$http.post('/member/address/del', {
            id: id
          }).then(res => {
            this.getAddressList();
            setTimeout(() => {
              this.$toast('地址已删除')
            },500)
          }).catch(err =>{})
        })
        .catch(() => {
          // on cancel
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  min-height: 500px;
  background: white;
}
.body {
  display: flex;
  flex-direction: column;
  overflow: scroll;
}
.table {
  border-bottom: 5px solid #f5f5f5;
  background-color: white;
  padding: .4rem .533333rem;
}
.address {
  padding: 0.2rem 0;
  font-size: .32rem;
  color: #acacac;
  // padding-bottom: 20rpx;
  border-bottom: #f5f5f5 1px solid;
  > span {
    margin-left: 0.15rem;
  }
}
.icon {
  :last-child {
    margin-left: .2rem;
  }
}
.infeed {
  display: flex;
  font-size: .36rem;
  justify-content: space-between;
  margin-top: 0.15rem;
  .choice {
    display: flex;
    align-items: center;
    font-size: .3rem;
    > text {
      margin-left: 0.1rem;
    }
  }
}

.button {
  position: fixed;
  background-color: #03d13e;
  color: white;
  font-size: .42rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1.5rem;
  width: 7rem;
  height: 1.1rem;
  border-radius: .6rem;
  bottom: .5rem;
}
</style>
<style>