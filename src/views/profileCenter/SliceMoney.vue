<template>
  <div class="profile-info">
    <publicHeader :icon="true" name="我的分润"></publicHeader>
    <van-cell-group>
      <van-cell title="分润金额" value="100.00" />
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