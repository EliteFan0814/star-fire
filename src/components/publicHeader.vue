<template>
  <div>
    <div class="nav">
      <span class="left" v-if="!icon"></span>
      <span v-else class="left">
        <van-icon @click="backPage" name="arrow-left" size="2rem" />
      </span>
      <span class="center">{{name}}</span>
      <span class="right">
        <router-link :to="url">{{right}}</router-link>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  // name: "backtrack ",
  props: {
    name: {
      type: String,
      default: () => ({})
    },
    icon: {
      type: Boolean,
      default: () => false
    },
    right: {
      type: String,
      default: () => ""
    },
    url: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {};
  },
  methods: {
    backPage() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
div.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  width: 100vw;
  color: #fff;
  background-color: #40a3ff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  .left {
    width: 4rem;
  }
  .center {
    flex: 1;
    text-align: center;
    font-size: 1.6rem;
  }
  .right {
    width: 4rem;
    font-size: 1.6rem;
  }
}
.van-icon{
  padding: 5px;
}
</style>
