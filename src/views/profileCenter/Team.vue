<template>
  <div class="profile-info">
    <publicHeader :icon="true" name="我的团队"></publicHeader>
    <van-cell-group>
      <van-cell title="周星驰" value="内容" />
      <van-cell title="周杰伦" value="内容" />
      <van-cell title="周笔畅" value="内容" />
      <van-cell title="周树人" value="内容" />
    </van-cell-group>
  </div>
</template>

<script>
import publicHeader from '@/components/publicHeader'

export default {
  components: {
    publicHeader
  }
}
</script>

<style lang="scss" scoped>
</style>