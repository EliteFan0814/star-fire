<template>
  <div>
  </div>
</template>

<script>
import rsWxApi from '@/WxCode/wxapi'

export default {
  name: 'WxCode',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  beforeCreate () {
    rsWxApi.wxCode()   //微信appid换取微信code
  },
  created () {
    // this.$vux.loading.show({ text: '加载中' })
    // rsWxApi.wxCode()
  }
}
</script>
