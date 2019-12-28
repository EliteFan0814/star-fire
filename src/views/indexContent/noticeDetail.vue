<template>
<div class="noticeMain">
  <publicHeader :icon="true" name="公告详情"></publicHeader>
  <div v-html="content"></div>
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
      id: '',
      content: ''
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get('/member/article/info?id=' + this.id).then(res => {
        this.content = res.data.info.content;
      }).catch(() =>{})
    },
    jumpToPage(url) {
      this.$router.push(url)
    }
  },
}
</script>
<style lang="scss">
.noticeMain {
  font-size: .36rem;
  > div {
    img {
      width: 10rem;
      height: auto;
    }
  }
  
}
</style>