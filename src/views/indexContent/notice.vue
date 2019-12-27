<template>
<div class="noticeMain">
  <publicHeader :icon="true" name="平台公告"></publicHeader>
  <div class="noticeDiv" v-for="(item, index) in noticeList">
    <van-cell :title="item.title" is-link @click="jumpToPage('noticeDetail')"/>
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
      noticeList: [],
      page: 1,
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    jumpToPage(url) {
      this.$router.push(url)
    },
    getArticleList() {
      this.$http.get('/member/article/lists', {
        params: {
          rows: 10,
          page: this.page,
          cate: 2
        }
      }).then(res => {
        this.noticeList = res.data.list;
      }).catch(() =>{})
    }
  },
}
</script>
<style lang="scss" scoped>
.noticeMain {
  background: #f5f5f5;
}
.noticeDiv {
  margin-bottom: 1px;
}
</style>