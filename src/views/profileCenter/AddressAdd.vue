<template>
  <div class="wrapper">
    <publicHeader :name="name" :icon="true"></publicHeader>
    <div class="body">
      <van-field v-model="item.contact"
      clearable
      label="姓名"
      input-align="right"
      placeholder="请输入收货人姓名" />
    <van-field v-model="item.phone"
      clearable
      label="联系电话"
      input-align="right"
      placeholder="请输入手机号码" />
    <van-field v-model="item.area"
      clearable
      label="收货地址"
      input-align="right"
      disabled
      placeholder="选择收货地址" 
      @click="onChange"/>
    <van-field v-model="item.address"
      clearable
      label="详细地址"
      input-align="right"
      placeholder="输入您的详细地址" />
      </div>

      <div class="button" @click="preserve">保存收货地址</div>
      
      <van-popup v-model="state" position="bottom" @close="close">
        <van-area :area-list="province_list" :value="adressNum" @cancel='close' @confirm="confirm"/>
      </van-popup>
    </div>
  </div>
</template>

<script>
import publicHeader from "@/components/publicHeader";
import province_list from '@/utils/address'
export default {
  components: {
    publicHeader
  },
  data() {
    return {
      province_list,
      name: '',
      adressNum: '',
      state: false,
      item: {
        contact: '',
        phone: '',
        area: '',
        address: '',
      }
    }
  },
  mounted() {    
    if(this.$route.query.id) {
      this.name = '修改收货地址';
      this.getAddress();
    } else {
      this.name = '添加收货地址'
    }
  },
  methods: {
    getAddress() {

    },
    onChange() {      
      this.state = true
    },
    close() {
      this.state = false;
    },
    // 选择省市区
    confirm(scoped) {
      this.item.area = "";
      this.adressNum = "";
      scoped.map(res => { this.item.area += res.name + " "; });
      this.adressNum = scoped[scoped.length - 1].code;
      console.log(JSON.stringify(scoped[scoped.length - 1]));
      this.close();
    },
    preserve() {
      if (this.item.contact && this.item.phone && this.item.area && this.item.address) {
        if (/^1\d{10}$/.test(this.item.phone)) {
          this.$http.post("/api/MemberAddress/Add",this.item).then(res => {
            this.$toast("地址新增成功");
            this.$router.go(-1);
          }).catch(err => {})
        } else {
          //提示输入正确手机号
          this.$toast('请输入正确的手机号')
        }
      } else {
        // 提示完善信息
        this.$toast('请完善信息')
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  min-height: 500px;
  background: #fff;
  // padding: 0 .533333rem;
}
.table {
  margin-top: 0.15rem;
  background-color: white;
}
// .input {
//   display: flex;
//   flex: 1;
//   align-items: center;
//   box-sizing: border-box;
//   background-color: white;
//   padding: .3rem 0;
//   font-size: .42rem;
//   border-bottom: #f5f5f5 1px solid;
//   > span {
//     width: 2.4rem;
//   }
//   > input {
//     width: 100%;
//     text-align: right;
//     color: #333;
//     border: none;
//   }
// }
.button {
  position: fixed;
  background-color: #03d13e;
  color: white;
  font-size: .42rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1.6rem;
  width: 6.853333rem;
  height: 1.2rem;
  border-radius: 2.3rem;
  bottom: .5rem;
}
.button:active {
  background-color: #ccc;
  color: #03d13e;
}
</style>
