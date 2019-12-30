<template>
  <div class="my-upgrade">
    <publicHeader :icon="true" name="代理升级"></publicHeader>
    <div class="top-bg">
      <div class="level-text">当前等级</div>
      <div class="now-level">{{level}}</div>
    </div>
    <div class="riband">
      <span>代理等级与权益</span>
    </div>
    <div class="agency-text">
      <div class="agency-slogan"><span class="agency-level">V1</span>区县代理（一级会员）</div>
      <div class="agency-content">
        <p>1.普通会员升级V1会员升级需要打款，共计100元，平台10元，匹配打款90元</p>
        <p>2.送V1代金券1张</p>
        <p>3.可以匹配拿5个一代V1升级90元</p>
        <p>4.享受购物商城7折折扣</p>
        <p>5.分润一代购物利润10%</p>
      </div>
    </div>
    <div class="agency-text">
      <div class="agency-slogan"><span class="agency-level">V2</span>市级代理（二级会员）</div>
      <div class="agency-content">
        <p>1.V1会员升级V2会员需要打款，共计200元，平台20元，匹配打款180元</p>
        <p>2.送V2代金券1张</p>
        <p>3.可以匹配拿3个二代V2升级180元</p>
        <p>4.拿无限个一代V1升级款</p>
        <p>5.享受商城购物6折折扣%</p>
        <p>6.分润一代购物利润10%</p>
        <p>7.分润二代购物利润20%</p>
      </div>
    </div>
    <div class="agency-text">
      <div class="agency-slogan"><span class="agency-level">V3</span>省级代理（三级会员）</div>
      <div class="agency-content">
        <p>1.V2会员升级V3会员需要打款，共计300元，平台30元，匹配打款270元</p>
        <p>2.送V3代金券1张</p>
        <p>3.V1、V2、V3拿无限个</p>
        <p>4.享受商城购物5折折扣</p>
        <p>5.分润一代购物利润10%</p>
        <p>6.分润二代购物利润20%</p>
        <p>7.分润三代购物利润30%</p>
      </div>
    </div>
    <div class="btom-btn">
      <van-button type="primary" size="large" @click="nowUp">立即升级</van-button>
    </div>
  </div>
</template>

<script>
import publicHeader from '@/components/publicHeader'
export default {
  components: {
    publicHeader
  },
  data(){
    return{
      level:''
    }
  },
  created(){
    this.getLevel()
  },
  methods:{
    getLevel(){
      this.$http.get('/member/member/info').then(res=>{
        if(res.code){
          console.log(res.data.info.level_str)
          this.level = res.data.info.level_str
        }
      })
    },
    nowUp(){
      this.$http.post('/member/member_level/apply').then(res=>{
        if(res.code){
          this.$toast.success('升级申请成功！')
        }
      })
      this.$router.push({name:'UpgradeOrder'})
    }
  }
}
</script>

<style lang="scss" scoped>
.my-upgrade{
  margin-bottom: .5rem;
}
.top-bg {
  height: 5.733333rem;
  background: url(../../assets/personal/upbg.png);
  background-repeat: no-repeat;
  background-color: #fff;
  background-size: cover;
  background-clip: border-box;
  background-position: center;
  background-origin: border-box;
  text-align: center;
  font-size: 0.48rem;
  line-height: 0.533333rem;
  color: #ffffff;
  .level-text {
    padding-top: 0.70333rem;
  }
  .now-level {
    color: #40a3ff;
    margin-top: 1.933333rem;
  }
}
.riband {
  background: url(../../assets/personal/riband.png);
  background-repeat: no-repeat;
  background-color: #fff;
  background-size: cover;
  background-clip: border-box;
  background-position: center;
  background-origin: border-box;
  text-align: center;
  line-height: 1.08rem;
  margin: 0.666667rem 0.626667rem;
  font-size: 0.48rem;
  color: #ffffff;
}
.agency-text {
  margin: 0.6rem 0.533333rem;
  font-size: 0.453333rem;
  line-height: 0.533333rem;
  color: #40a3ff;
  .agency-slogan {
    padding-left: 0.32rem;
    border-left: 0.053333rem solid #40a3ff;
    .agency-level {
      font-size: 0.533333rem;
    }
  }
  .agency-content {
    margin-top: 0.426667rem;
    background-color: #d9edff;
    padding: 0.226667rem 0.266667rem;
    p {
      margin: 0;
      font-size: 0.32rem;
      line-height: 0.533333rem;
      color: #666666;
    }
  }
}
.btom-btn {
  text-align: center;
  // margin-bottom: 2rem;
  button {
    width: 6.853333rem;
    height: 1.066667rem;
    background-color: #03d13e;
    border-radius: 0.533333rem;
    font-size: 0.4rem;
    line-height: 0.533333rem;
    letter-spacing: 0.048rem;
    color: #fefefe;
  }
}
</style>