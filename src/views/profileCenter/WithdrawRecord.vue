<template>
  <div class="profile-info">
    <publicHeader :icon="true" name="提现记录"></publicHeader>
    <van-cell-group>
      <van-cell title="提现金额" value="100.00" label="提现时间：201912261023" />
      <van-cell title="提现金额" value="100.00" label="提现时间：201912261023" />
      <van-cell title="提现金额" value="100.00" label="提现时间：201912261023" />
      <van-cell title="提现金额" value="100.00" label="提现时间：201912261023" />
      <van-cell title="提现金额" value="100.00" label="提现时间：201912261023" />
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