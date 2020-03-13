<template>
  <div class="footer">
    <div style="height:50px"></div>
    <div class="aui-footer">
      <a href="javascript:;" class="aui-tabBar-item" @click="switchTo('/home')">
        <span class="aui-tabBar-item-icon">
          <img :src=" '/home' === $route.path ? tabBarImgArr[0].selected : tabBarImgArr[0].normal" alt="首页">
        </span>
        <span :class="{on: '/home' === $route.path}">主页</span>
        <!-- <span v-if="footNumber!=0" class="footNumber"></span> -->
      </a>
      <a href="javascript:;" class="aui-tabBar-item " @click="switchTo('/conversation')">
        <span class="aui-tabBar-item-icon">
          <img :src="'/conversation' === $route.path ? tabBarImgArr[1].selected : tabBarImgArr[1].normal" alt="消息中心">
        </span>
        <span :class="{on: '/conversation' === $route.path}">咨询历史</span>
      </a>
      <a href="javascript:;" class="aui-tabBar-item aui-tabBar-item-active" @click="switchTo('/my')">
        <span class="aui-tabBar-item-icon">
          <img :src="'/my' === $route.path ? tabBarImgArr[2].selected : tabBarImgArr[2].normal" alt="我的">
        </span>
        <span :class="{on: '/my' === $route.path}">我的</span>
      </a>
    </div>
  </div>
</template>
<script>
 
export default {
  data() {
    return {
      selectedLabelSlots: 0,
      tabBarImgArr: [   //图片切换
        { normal: require('@/assets/images/icon_treatment.png'), selected: require('@/assets/images/icon_treatment_pre.png') },
        { normal: require('@/assets/images/icon_online.png'), selected: require('@/assets/images/icon_online_pre.png') },
        { normal: require('@/assets/images/icon_personal.png'), selected: require('@/assets/images/icon_personal_pre.png') },
      ]
    }
  },
  props: ['footNumber'],
  mounted() {

  },
  methods: {
    switchTo(path) {
      if(!this.$store.state.accountInfo  ) return
     
      this.$router.replace(path)
    },

  }
}
</script>

<style>
.aui-footer {
  width: 100%;
  z-index: 100;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 14px 10px 14px 10px;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
}

.aui-footer:after {
  content: "";
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  border-top: 2px solid #e9e9e9;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}

.aui-tabBar-item {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  color: var(--primary--content);
}

.aui-tabBar-item span {
  display: inline-block;
  font-size: 24px;
  color: #707070;
  padding-top: 2px;
}
.aui-tabBar-item .on {
  color: #24a5f1;
}
.icon {
  width: 46px;
  height: 46px;
  background-size: 46px;
  display: block;
  background-repeat: no-repeat;
}
.footer .aui-tabBar-item-icon img {
  width: 46px;
  height: 46px;
  background-size: 46px;
  display: block;
  background-repeat: no-repeat;
}
.aui-tabBar-item .footNumber {
  position: absolute;
  top: 14px;
  left: 147px;
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background: #ff513a;
  text-align: center;
  line-height: 32px;
  font-size: 24px;
  color: #fff;
}
</style>
