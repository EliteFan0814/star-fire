<template>
  <div class="warpper">
    <publicHeader name="购物车" rightMethod="删除选中" @clickRight="doDelGood"></publicHeader>
    <div class="carBody" v-if="carGoods.length > 0">
      <div v-for="(item,index) in carGoods" :key="index" @click="jumpPage(item)" class="carGoods">
        <div @click="checkOne(item)">
          <van-checkbox v-model="item.is_sel" 
           checked-color="#03d13e">
          </van-checkbox>
        </div>
        <div>
          <img class="carBigImg" :src="item.goods_info.picurl" alt="暂无图片">
        </div>
        <div class="carMsg">
          <div>{{item.goods_info.title}}</div>
          <div style="display: flex; justify-content: space-between;">
            <div>单价：<span>￥{{item.goods_info.price}}</span></div>
          </div>
          <div @click="stopEvent" >
            <van-stepper v-model="item.goods_num" button-size="16" 
              @plus="changeNum(item.goods_id,1)" 
              @minus="changeNum(item.goods_id,-1)"/>
            <!-- <div @click="doDelGood">删除</div> -->
            <div>总价：<span class="money">￥{{item.xiaoji}}</span></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="kong">
      <img src="@/assets/index/none.png" width="100" alt="">
      <div>购物车空空如也</div>
    </div>
    <carBottom 
      :is_all_sel="is_all_sel"  
      :total="total" 
      :is_other_sel="is_other_sel"
      @selectAll="selectAll">
    </carBottom>
    <tabbar :cardno="cardno"></tabbar>
  </div>
</template>
<script>
import publicHeader from '@/components/publicHeader'
import tabbar from '@/components/tabbar'
import carBottom from './components/carBottom'
export default {
  components: {
    publicHeader,
    carBottom,
    tabbar
  },
  data() {
    return {
      cardno: 2,
      value: 0,
      box: true,
      carGoods: {},
      is_all_sel: 0,
      total: 0,
      is_other_sel: 0
    }
  },
  mounted() {
    this.getCarGoods();
  },
  methods: {
    // 获取商品列表
    getCarGoods() {
      this.$http.get('/member/carts/lists').then(res => {
        this.carGoods = res.data.myCart.list;  
        this.is_all_sel = res.data.myCart.is_all_sel;
        this.total = res.data.myCart.total; 
        this.is_other_sel = res.data.myCart.is_other_sel;  
      }).catch(() =>{})
    },
    // 停止事件路由
    stopEvent(e) {
      e.stopPropagation();
    },
    // 选中与否
    checkOne(item) {
      window.event.stopPropagation();
      this.$http.get('/member/carts/selgoods',{
        params: {
          goods_id: item.goods_id,
          newdata: item.is_sel == 0 ? 1 : 0
        }
      }).then(res => {
        this.getCarGoods();      
      }).catch(() =>{})
    },
    // 改变商品数量
    changeNum(id, num) {
      this.$http.get('/member/carts/edit',{
        params: {
          goods_id: id,
          num: num
        }
      }).then(res => {
        this.getCarGoods();
      }).catch(() =>{})
    },
    // 删除商品
    doDelGood() {
      if(this.is_other_sel == 0) {
        return this.$toast('未选中任何商品 , 不能删除 !')
      }
      this.$dialog.confirm({
        title: '提示',
        message: '确定要删除选中商品?'
      }).then(() => {
        this.$http.get('/member/carts/delSel').then(res => {
          this.getCarGoods();
          setTimeout(() => {
            this.$toast('选中商品已删除')
          },500)
        }).catch(() =>{})
      }).catch(() => {
        this.$toast('已取消删除')
      })
    },
    // 跳转商品详情
    jumpPage() {
      this.$router.push('goodsDetails')
    },
    // 全选
    selectAll() {
      this.$http.get('/member/carts/allsel',{
        params: {
          allsel: this.is_all_sel == 1 ? 0 : 1
        }
      }).then(res => {
        this.getCarGoods();
      }).catch(() =>{})
    }
  },
}
</script>
<style lang="scss" scoped>
.warpper {
  font-size: 0.32rem;
  padding: 0 .533333rem;
  padding-bottom: 100px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;
}
.money {
  font-size: .4rem;
  color: #ff5f5f;
}
.kong {
  width: 8.96rem;
  margin-top: 1rem;
  color: #999;
  text-align: center;
}
.carBody {
  .carGoods {
    display: flex;
    align-items: center;
    width: 8.93rem;
    height: 3.066667rem;
    text-align: left;
    border-bottom: 1px solid #f5f5f5;
    > div {
      height: 2.2rem;
    }
    .carBigImg {
      width: 2.2rem; 
      height: 2.2rem;
      margin: 0 .3rem;
      border-radius: .15rem;
    }
    .carMsg {
      flex: 1;
      font-size: .4rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > :first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        
      }
      > :nth-child(2) {
        font-size: .32rem;
      }
      > :last-child {
        font-size: .32rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
    }
  }

}
</style>