<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data() {
    return {
    }
  },
  created() {

    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      //this.$store.replaceState()替换 store 的根状态
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  }
}
</script>

 <style >
:root {
  /* 主题色 */
  --primary: #48B6FF;
  /* 内容字体颜色 5A5A5A*/
  --primary--content: #8B8B8B;
  --primary--right: #8B8B8B;
  /* 题目字体颜色 */
  --primary--title: #232323;
  /* 线颜色 */
  --primary--line: #ededed;
  /* 背景色 */
  --primary--body: #f8f8f8;
  /*灰色背景*/
  --primary--light: #cccbcb;
}
#app {
  font-family: "PingFang-SC-Medium";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--primary--title);
  font-size: 28px;
  max-width: 777px;
  margin: 0 auto;
}
.noMore {
  text-align: center;
  color: var(--primary--content);
  font-size: 24px;
  line-height: 70px;
}
.margin50 {
  margin-top: 100px;
}
.margin55 {
  margin-top: 110px;
}
.outCarint {
  padding: 0 24px;
}
body {
  background: var(--primary--body);
}
.colo13 {
  font-size: 26px;
  color: var(--primary--content);
}
 .nullDiv {
  text-align: center;
}
.nullDiv img {
  width: 50%;
  margin-top: 150px;
}
.el-popover{
    left:0 !important;
}
 .md-landscape-content {
 width:601px !important;
}
.md-landscape .md-icon.md-landscape-close {
    display: none !important;
}
</style>
