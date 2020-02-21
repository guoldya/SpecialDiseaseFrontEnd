<template>
   <div class="margin55">
      <Header post-title="修改昵称"> </Header>
      <div class="flatCard outCarint ">
         <md-field>
            <md-input-item ref="input0" title="昵称" v-model="nickname" placeholder="请输入你要修改的昵称" is-amount :maxlength="20"></md-input-item>
         </md-field>
      </div>
      <div class="outCarint margin55">
         <md-button type="primary" round @click="tijiao">确定修改</md-button>
      </div>
   </div>
</template>
<script>
import { mapState } from 'vuex';
let sysAccountupdateAccount = "/app/bizPatientCard/updateAccount";
export default {
   data() {
      return {
         nickname: this.$route.query.name,
      };
   },
   methods: {
      tijiao() {
         if (!this.nickname || this.nickname.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
            this.$toast.info("请输入你要修改的昵称");
            return
         }
         this.$axios.post(sysAccountupdateAccount, { nickname: this.nickname }).then((res) => {
            if (res.data.code == '200') {
               this.$store.dispatch('getAccount', { update: true });
               this.$toast.info("修改成功");
               this.$router.go(-1);
            } else {
               this.$toast.info(res.data.msg)
            }
         }).catch(function (err) {
            console.log(err);
         });


      },
   }}
</script>
 