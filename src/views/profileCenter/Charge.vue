<template>
  <div class="charge-money">
    <publicHeader :icon="true" name="充值说明"></publicHeader>
    <div class="charge-text">
      <div v-html="content"></div>
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
      content:''
    }
  },
  created(){
    this.getContent()
  },
  methods: {
    getContent(){
      this.$http.get('/member/article/info?id=4').then(res=>{
        if(res.code){
          this.content = res.data.info.content
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.charge-money {
  .chagre-text {
    padding: 0.133333rem;
  }
}
</style>