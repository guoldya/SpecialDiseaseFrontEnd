<template>
  <div>

  </div>
</template>

<script>
let appLoginlogin = 'wechat/receiveCode';
// 传递    roleMark   角色标志 1、患者 2、医生
// 返回   bindStatus  绑定状态  0未绑定  1正常绑定  2医生绑定(已停用)

export default {
  mounted() {
    let str = location.href;
    //   let str = "http://m.cq2win.com/nanchuan/?code=edd169b85704410aa5219512cb6f1f00&state=1#/"; //取得整个地址栏
    let num = str.indexOf("?");
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
    let wechatCode;
    wechatCode = str.split("?")[0].split("&")[0].split("=")[1];
    sessionStorage.setItem('wechatCode', wechatCode);


    let url = appLoginlogin + '?wechatCode=' +wechatCode + '&roleMark=' + '1';
    if (this.$route.query.loginAgin) {
      url = appLoginlogin + '?accountId=' + this.$route.query.accountId;
    }
    this.$axios.get(url, {
    }).then(res => {
      if (res.data.code == '200') {

        sessionStorage.setItem('token7', res.data.data.authorization);
        //   sessionStorage.removeItem('openid');
        //   sessionStorage.removeItem('accessToken');
        

        if (res.data.data.bindStatus == 1) {
          this.$store.commit('SET_USERINFO', res.data.data)
          this.$router.replace({
            name: 'home',
          });

        } else if (res.data.data.bindStatus == 0) {
          this.$router.replace({
            name: 'addpeple',
            query: { isnews: 1 }
          });
        } else {
          this.$toast.info("错误信息")
        }
        // this.$router.replace({
        //   name: 'home',
        // });
      } else {
        sessionStorage.removeItem('token7');
        // this.$router.replace({
        //    name: 'register',
        //    query: argu,
        // });
      }
    }).catch(function (err) {
      console.log(err);
    });;
    //     console.log(wechatCode, "我是页面渲染前")
  },
  methods: {

     

  }
}
</script>

<style>
</style>
