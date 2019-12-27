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
      content: ''
    }
  },
  created() {},
  methods: {
    jumpToPage(url) {
      this.$router.push(url)
    }
  },
}
</script>
<style lang="scss" scoped>
.noticeMain {
  padding: .3rem .5rem;
  font-size: .36rem;
}
</style>