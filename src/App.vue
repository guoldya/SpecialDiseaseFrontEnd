<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    return {};
  },
  created() {
    
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      //this.$store.replaceState()替换 store 的根状态
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  methods: {
     
  }
};
</script>

 <style >
* {
  font-family: "微软雅黑";
  letter-spacing: 2px;
  font-weight: 400;
}
:root {
  /* 主题色 */
  --primary: #48b6ff;
  --primary--secondary: #30C57E;
  /* 内容字体颜色 5A5A5A*/
  --primary--content: #8b8b8b;
  --primary--right: #8b8b8b;
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
.el-popover {
  left: 0 !important;
}
.md-landscape-content {
  width: 601px !important;
}
.md-landscape .md-icon.md-landscape-close {
  display: none !important;
}
.nomore {
  height: 80px;
  line-height: 70px;
  font-size: 24px;
  color: var(--primary--content);
  margin-left: 39%;
}
.conversationCard {
    margin: 26px 24px 24px;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.16);
    background-color: white;
    border-radius: 8px;
    list-style-type: none;
    padding: 20px 24px 4px;
    
}
.disFlex {
  display: flex;
  justify-content: space-between;
}
/* 分割线加文字 */
.message-item{
  margin: 0 12px;
}
.system-normal-message .content span {
    position: relative;
    display: inline-block;
    background-color: #f8f8f8;
    padding: 0 .1rem;
    left: 50%;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
}
.system-message .content,
.system-normal-message .content {
  display: inline-block;
  position: relative;
  font-size: 0.13rem;
  padding: 0.04rem 0.24rem;
}
.system-normal-message .content {
  position: relative;
  display: block;
}


.system-message .content:after,
.system-message .content:before,
.system-normal-message .content:after,
.system-normal-message .content:before {
  content: "";
  position: absolute;
  top: 0.14rem;
  width: 0.2rem;
  border-top: 0.01rem solid #adb5bd;
}
.system-normal-message .content:before {
  /* top: 0.12rem; */
  width: 100%;
}
.system-message .content:before,
.system-normal-message .content:before {
  left: 0;
}
.system-message, .system-normal-message{
  position: relative;
  margin: 0 24px 16px 24px;
}
.message-item {
    margin-bottom: .15rem;
}
.message-datetime.show {
    display: block;
}
.message-datetime {
    display: none;
    padding: .1rem .15rem;
    color: #999baa;
    text-align: center;
    font-size: .14rem;
}
/* 分割线 */
.card-divider-horizontal {
  display: block;
  clear: both;
  width: 100%;
  min-width: 100%;
  height: 1px;
  margin: 24px 0;
}
.card-divider,
.card-divider-vertical {
  position: relative;
  /* top: -0.06em; */
  display: inline-block;
  width: 1px;
  height: 0.1em;
  vertical-align: middle;
}
.card-divider {
  box-sizing: border-box;
  /* margin: 0; */
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: "tnum";
  background: #e8e8e8;
}

</style>
