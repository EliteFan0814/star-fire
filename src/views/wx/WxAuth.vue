<template>
  <div></div>
</template>

<script>
import { Toast } from 'vant'
import { mapMutations } from 'vuex'

export default {
  name: 'WxAuth',
  components: {},
  data () {
    return {
      pageParams: {}
    }
  },
  computed: {},
  mounted () {
    this.getData()
  },
  methods: {
    ...mapMutations(['takeOpenId']),
    goJump () {
      // let jump = Lockr.get("wxCodeJump");

      if (this.$store.state.page.name) {
        this.$router.push({
          name: this.$store.state.page.name,
          // params: jump.params,
          query: this.$store.state.page.query
        })
      } else {
        this.$router.push({ name: 'index' })
      }
    },
    getData () {
      // const self = this;
      Toast.loading({
        mask: false,
        message: '加载中...'
      })
      let jscode = this.$route.query.code
      if (jscode) {
        this.$http.get('/api/Wx/AuthUserInfo?code=' + jscode).then(res => {
          if (res.success) {
            Toast.clear()
            // this.$store.commit('', res.openid)
            this.takeOpenId({
              openId: res.openid
            })
            this.goJump() // 成功,跳转回去
          }
        })
      } else {
        Toast.fail('微信授权失败')
      }
    }
  }
}
</script>

<!-- 添加 "scoped" 属性, 只作用于当前文件内的样式 -->
<style lang="less" scoped>
</style>
