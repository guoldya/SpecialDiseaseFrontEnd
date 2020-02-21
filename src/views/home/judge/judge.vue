<template>
      <div>

      </div>
</template>

<script>
let appLoginlogin = '/appLogin/login';
export default {
      mounted() {
            let str = location.href;
            // let str = "http://m.cq2win.com/nanchuan/?code=edd169b85704410aa5219512cb6f1f00&state=1#/"; //取得整个地址栏
            let num = str.indexOf("?");
            str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
            let wechatCode;
            wechatCode = str.split("?")[0].split("&")[0].split("=")[1];
            sessionStorage.setItem('wechatCode', wechatCode);
            this.$axios.get(appLoginlogin + '?wechatCode=' + wechatCode + '&verifyType=' + 1, {
            }).then(res => {
                  if (res.data.code == '406') {
                        sessionStorage.setItem('token7', res.data.data.token);
                        sessionStorage.removeItem('openid');
                        sessionStorage.removeItem('accessToken');
                        this.$router.replace({
                           name: 'home',
                        });
                  } else if (res.data.data.isRegistered == 0) {
                        sessionStorage.removeItem('token7');
                        sessionStorage.setItem('openid', res.data.data.openid);
                        sessionStorage.setItem('accessToken', res.data.data.accessToken);
                        // let argu = { openid: res.data.data.openid, accessToken: res.data.data.accessToken };
                        this.$router.replace({
                              name: 'home',
                              // query: argu,
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
