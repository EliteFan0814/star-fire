<template>
  <div>
    <div class="nav">
      <span class="left" v-if="!icon"></span>
      <span v-else class="left">
        <van-icon @click="backPage" name="arrow-left" size="0.48rem" />
      </span>
      <span class="center">{{name}}</span>
      <span class="right">
        <router-link :to="url">{{right}}</router-link>
        <span v-if="rightMethod" @click="clickRight">{{rightMethod}}</span>
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
      default: ''
    },
    icon: {
      type: Boolean,
      default: () => false
    },
    jump: {
      type: String,
      default: ''
    },
    right: {
      type: String,
      default: () => ''
    },
    url: {
      type: String,
      default: () => ''
    },
    rightMethod: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {}
  },
  methods: {
    backPage() {
      if(this.jump) {
        this.$router.push(this.jump)
      } else {
        this.$router.go(-1)
      }
    },
    clickRight() {
      this.$emit('clickRight')
    }
  }
}
</script>
<style lang="scss" scoped>
div.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  color: #fff;
  background-color: #40a3ff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  font-size: 18px;
  .left {
    width: 75px;
  }
  .center {
    flex: 1;
    text-align: center;
  }
  .right {
    width: 60px;
    margin-right: 15px;    
    text-align: right;
    a {
      font-size: 15px;
      line-height: 20px;
      color: #ffffff;
    }
    span {
      font-size: 14px;
      color: rgb(253, 69, 69);
    }
  }
}
.van-icon{
  margin-left: .2rem;
  padding: 6px;
}
</style>
