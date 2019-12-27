<template>
  <div class="up-record">
    <publicHeader :icon="true" name="升级记录"></publicHeader>
    <!-- 审核中的凭证 -->
    <div class="record-item">
      <div class="top-arrow">
        <span class="checking">一级区县代理</span>
        <img src="@/assets/personal/checking.png" alt="">
        <span class="checking">二级市级代理</span>
      </div>
      <div class="record-common">
        <span>会员账号</span>
        <span>15287458996</span>
      </div>
      <div class="record-common">
        <span>已支付（元）</span>
        <span>100.00</span>
      </div>
      <div class="record-common">
        <span class="checking">提交时间</span>
        <span class="checking">2019年12月19日 14时22分</span>
      </div>
      <div class="rcord-btm">
        <div class="left-proof">
          <span>支付凭证</span>
          <img src="@/assets/personal/checking-img.png" alt="">
        </div>
        <div class="right-img">
          <img src="@/assets/personal/check-def.png" alt="">
          <img src="@/assets/personal/check-def.png" alt="">
        </div>
      </div>
    </div>
    <!--  审核通过的凭证 -->
    <div class="record-item">
      <div class="top-arrow">
        <span class="checked">一级区县代理</span>
        <img src="@/assets/personal/checked.png" alt="">
        <span class="checked">二级市级代理</span>
      </div>
      <div class="record-common">
        <span>会员账号</span>
        <span>15287458996</span>
      </div>
      <div class="record-common">
        <span>已支付（元）</span>
        <span>100.00</span>
      </div>
      <div class="record-common">
        <span class="checked">提交时间</span>
        <span class="checked">2019年12月19日 14时22分</span>
      </div>
      <div class="record-common">
        <span class="checked">同意时间</span>
        <span class="checked">2019年12月19日 14时28分</span>
      </div>
      <div class="rcord-btm">
        <div class="left-proof">
          <span>支付凭证</span>
          <img src="@/assets/personal/checked-img.png" alt="">
        </div>
        <div class="right-img">
          <img src="@/assets/personal/check-def.png" alt="">
          <img src="@/assets/personal/check-def.png" alt="">
        </div>
      </div>
    </div>
    <!-- 审核失败的凭证 -->
    <div class="record-item">
      <div class="top-arrow">
        <span class="check-filed">一级区县代理</span>
        <img src="@/assets/personal/checkfiled.png" alt="">
        <span class="check-filed">二级市级代理</span>
      </div>
      <div class="record-common">
        <span>会员账号</span>
        <span>15287458996</span>
      </div>
      <div class="record-common">
        <span>已支付（元）</span>
        <span>100.00</span>
      </div>
      <div class="record-common">
        <span class="check-filed">提交时间</span>
        <span class="check-filed">2019年12月19日 14时22分</span>
      </div>
      <div class="record-common">
        <span class="check-filed">拒绝时间</span>
        <span class="check-filed">2019年12月19日 14时28分</span>
      </div>
      <div class="rcord-btm">
        <div class="left-proof">
          <span>支付凭证</span>
          <img src="@/assets/personal/checkfiled-img.png" alt="">
        </div>
        <div class="right-img">
          <img src="@/assets/personal/check-def.png" alt="">
          <img src="@/assets/personal/check-def.png" alt="">
        </div>
      </div>
    </div>
    <tabbar></tabbar>
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
.up-record {
  padding: 0.533333rem;
  padding-top: .013333rem;
  .record-item {
    background-color: #ffffff;
    box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius: 0.213333rem;
    // height: 4rem;
    font-size: 0.4rem;
    line-height: 0.533333rem;
    margin-top: .533333rem;
    padding: 0.4rem;
    padding-top: 0.2rem;
    .top-arrow,
    .record-common {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.333333rem 0;
    }
    .top-arrow {
      img {
        width: 0.746667rem;
        height: 0.306667rem;
      }
    }
    .rcord-btm {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-proof {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 1.373333rem;
          height: 1.093333rem;
        }
      }
      .right-img {
        img {
          width: 1.333333rem;
          height: 1.6rem;
          margin-right: 0.333333rem;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .checking {
      color: #40a3ff;
    }
    .checked {
      color: #03d13e;
    }
    .check-filed {
      color: #ff5f5f;
    }
  }
}
</style>