<template>
  <div class="goods" @click="jumpPage(item.id)">
    <div>
      <img :src="item.picurl || require('@/assets/index/1.png')"
        @error="item.picurl = require('@/assets/index/1.png')" alt="">
    </div>
    <div>
      <div class="name">
        <!-- 迷情刺绣优雅白镂空短
        袖舒适夏季棉质上衣... -->
        {{item.title}}
      </div>
      <div class="price">
        <div>
          ￥{{item.member_price}}
        </div>
        <del class="stepNum">
          原价：￥{{item.price}}
        </del>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {{}}
    }
  },
  data() {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {
    refreshData() {
      this.$emit('refreshData')
    },
    jumpPage(id) {
      this.$router.push({
        name: "goodsDetails",
        query: {id: id}
      })
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.goods {
  overflow: hidden;
  width: 4.35rem;
  border: 0.5px solid #f5f5f5;
  border-radius: .2rem;
  margin-bottom: 0.4rem;
  padding-bottom: .1rem;
  box-sizing: border-box;
  > div {
    &:first-child {
      // border: 1px solid #999;
      // border-bottom: 0;
      height: 4.4rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &:last-child {
      padding: .2rem;
      .name {
        height: 1rem;
        line-height: .5rem;
        font-size: .346667rem;
        text-align: left;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: .2rem;
      }
      .price {
        display: flex;
        justify-content: space-between;
        color: #ee4a4f;
        font-size: .4rem;
        line-height: .5rem;
        .stepNum {
          color: #999999;
          font-size: .266667rem;
        }
      }
    }
  }
}
</style>
<style>
.van-count-down {
  font-size: 1.1rem;
  color: white;
  display: inline-block;
}
</style>