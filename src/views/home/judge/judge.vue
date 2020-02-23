<template>
  <div>

  </div>
</template>

<script>
let appLoginlogin = '/api/hos/wechat/receiveCode';
export default {
  mounted() {
    //   let str = location.href;
    let str = "http://m.cq2win.com/nanchuan/?code=edd169b85704410aa5219512cb6f1f00&state=1#/"; //取得整个地址栏
    let num = str.indexOf("?");
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
    let wechatCode;
    wechatCode = str.split("?")[0].split("&")[0].split("=")[1];
    sessionStorage.setItem('wechatCode', wechatCode);
    this.$axios.get(appLoginlogin + '?wechatCode=' + 'code', {
    }).then(res => {
      if (res.data.code == '200') {
        //   sessionStorage.setItem('token7', res.data.data.token);
        //   sessionStorage.removeItem('openid');
        //   sessionStorage.removeItem('accessToken');
        console.log(res.data.data)
        this.$store.commit('SET_USERINFO', res.data.data)
        console.log(this.$store.state.userInfo,"sssssssssssssss")
        this.$router.replace({
          name: 'home',
        });
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
}
</script>

<style>
</style>
