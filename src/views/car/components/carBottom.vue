<template>
<div class="carBottom">
  <div>
    <van-checkbox @click="selectAll" checked-color="#03d13e" v-model="is_all_sel"></van-checkbox>
    <div class="checkMsg">全选</div>
  </div>
  <div>
    <div>共计：</div>
    <div class="totalMoney">￥{{total}}</div>
    <div>
      <van-button round size="small" class="btmBtn" color="#03d13e">去 结 算</van-button>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: ['is_all_sel', 'total'],
  methods: {
    selectAll() {
      this.$emit('selectAll');
    }
  }
}
</script>
<style lang="scss" scoped>
.carBottom {
  position: fixed;
  left: 0;
  bottom: 50px;
  right: 0;
  background: #f5f5f5;
  z-index: 2000;
  height: 50px;
  padding: 0 .533333rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: .32rem;
  > div {
    display: flex;
    align-items: center;
    > .checkMsg {
      margin-left: .3rem;
      color: #999;
    }
    .totalMoney {
      font-size: .4rem;
      color: #ff5f5f;
      margin-left: 0;
    }
    .btmBtn {
      width: 3.066667rem;
      height: .906667rem;
      font-size: .4rem;
      margin-left: .3rem;
    }
  }
}
</style>