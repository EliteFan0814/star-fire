<template>
  <div class="wrapper_header">
    <div class="isHeader"
      :style="'background: rgba(255,255,255,' +headerOpacity+ ')'">
      <div class="leftIco">
        <van-icon name="arrow-left"
          @click="goBack"></van-icon>
      </div>
      <span v-if="headerOpacity >0.2">{{name}}</span>
      <!-- <div class="right" @click="fenxiang">
        <van-icon name="ellipsis" />
      </div> -->
      <div class="right"></div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    name: {
      type: String,
      default: () => {
        ''
      }
    }
  },
  data() {
    return {
      scrollTopDistance: 0,
      headerOpacity: 0
    }
  },
  watch: {},
  computed: {},
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    scrollListen() {
      window.addEventListener('scroll', () => {
        this.scrollTopDistance =
          document.documentElement.scrollTop || document.body.scrollTop
        this.headerOpacity = this.scrollTopDistance / 100
      })
    },
    fenxiang() {
      this.$emit("fenxiang")
    }
  },
  created() {},
  mounted() {
    this.scrollListen()
  }
}
</script>
<style lang="scss" scoped>
.isHeader {
  z-index: 2019;
  height: 50px;
  font-size: 18px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  > span {
    flex: 1;
  }
}
.leftIco {
  display: inline-block;
  width: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  .van-icon {
    background: rgba($color: #fff, $alpha: 0.6);
    padding: 6px;
    border-radius: 50%;
  }
}
.right {
  width: 40px;
  background: rgba($color: #999, $alpha: 0.9);
}
</style>