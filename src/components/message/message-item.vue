<template>
  <div class="online-content-warp">
    <div v-if="aa.type=='text'" class="online-content-list " :class="message.senderId===$imsdk.user.id?'right':''">
      <template v-if="!aa.close">
        <img class="online-content-list-head" :src="this.$store.state.userInfo.headPic" alt>
        <div class="online-content-list-text">
          <em></em>
          <div>
            <span v-html="aa.text"></span>
          </div>
        </div>
      </template>
      <template v-if="aa.close">
        <div class="message-item system-tips-message message-state--8 normal-style">
          <div class="message-datetime show">{{aa.date}}</div>
          <div class="message-inner">
            <div class="system-message-wrapper">
              <div class="system-message-inner">
                <span class="message-content">问诊结束，服药期间如有不适请及时线下医院就诊</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- <div v-if="aa.type=='questionDes'" class="online-content-list " :class="message.senderId===$imsdk.user.id?'right':''">
      <img class="online-content-list-head" src="@/assets/images/head1.png" alt>
      <div class="online-content-list-text">
        <em></em>
        <div>
          <span v-html="aa.text" class="padding-left-2"></span>
        </div>
      </div>
    </div> -->

    <!-- 分割线加文字 -->
    <!-- <div v-if="aa.type=='questionDes'" class="message-item system-normal-message normal-style">
      <div class="message-datetime show">2019-12-10 01:17</div>
      <div class="message-inner">
        <div class="system-message-wrapper">
          <div class="message-wrapper">
            <div class="message-content">
              <span>您好，医生已经收到您的病情描述及用药诉求，正在为您诊断，请稍后，如有补充请这里回复</span>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- 聊天文字提示 -->
    <!-- <div  class="message-item system-tips-message message-state--8 normal-style">
      <div class="message-datetime show">2019-12-11 08:50</div>
      <div class="message-inner">
        <div class="system-message-wrapper">
          <div class="system-message-inner">
            <span class="audit-message-content">审核通过，服药期间如有不适请及时线下医院就诊</span>
          </div>
        </div>
      </div>
    </div> -->
    <!-- 病历详情 -->
    <div v-if="aa.type=='questionDes'" class="medical-right">
      <div class="right-inner">
        <div class="content-wrapper width-100">
          <div class="template-message">
            <span class="triangle"></span>
            <div class="header">
              <a class="link">
                <div class="info">
                  <span class="name">{{this.accountInfo.name}}</span>
                  <span class="sex">{{this.accountInfo.sex|examSex}}</span>
                  <span class="age">{{this.accountInfo.age}}</span>
                </div>
              </a>
              <div class="diag-type">
                <span>购药开方</span>
              </div>
            </div>
            <div class="body">
              <div class="template-message-content">
                <div class="title">病情描述：</div>
                <span>线下确诊疾病为：{{aa.text}}。</span>
              </div>
              <!-- <div class="imgs">
                <ul class="image-list">
                  <li class="image-item image-wrapper">
                    <div class="bg-image" style="background-image: url(&quot;http://img30.360buyimg.com/yiyaoapp/jfs/t1/91788/39/5596/91244/5dee8167Ebbf57a77/c7fa1baf52edc2d8.jpg&quot;); height: 20vw;"></div>
                  </li>
                </ul>
              </div> -->
            </div>
            <div class="footer">
              <div class="privacy-tip">互联网医院保证您隐私，请放心问诊</div>
            </div>
          </div>
          <div class="send-state"></div>
        </div>
      </div>
    </div>

    <!-- 分割线加文字 -->
    <div v-if="aa.type=='questionDes'" class="message-item system-normal-message normal-style">
      <div class="message-datetime show">{{aa.date}}</div>
      <div class="message-inner">
        <div class="system-message-wrapper">
          <div class="message-wrapper">
            <div class="message-content">
              <span>您好，医生已经收到您的病情描述及用药诉求，正在为您诊断，请稍后，如有补充请这里回复</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 聊天文字提示 -->
    <!-- <div  class="message-item system-tips-message message-state--8 normal-style">
      <div class="message-datetime show">2019-12-11 08:50</div>
      <div class="message-inner">
        <div class="system-message-wrapper">
          <div class="system-message-inner">
            <span class="message-content">审核通过，服药期间如有不适请及时线下医院就诊</span>
          </div>
        </div>
      </div>
    </div> -->

    <div v-if="aa.type=='geo'" class="online-content-list outpation">
      <img class="online-content-list-head" src="@/assets/images/head1.png" alt />
      <div class="online-content-list-text">
        <em></em>
        <div class="describe">
          <p>初步诊断：{{aa.description}}</p>
        </div>
        <router-link tag="p" :to="{ path: '/outpationinfo', query: { id: aa.recipeId}}" class="item">
          <span>查看详情</span>
          <i class="iconfont icon-iconfontjiantou5"></i>
        </router-link>
      </div>
    </div>
    <div v-if="aa.type=='image'" class="online-content-list" :class="message.senderId===$imsdk.user.id?'right':''">
      <img class="online-content-list-head" :src="message.senderId!=$imsdk.user.id?require('@/assets/images/head1.png'):this.$store.state.userInfo.headPic" alt />
      <div class="online-content-list-text">
        <em></em>
        <div>
          <img style="width:100px;" :src="'http://192.168.0.11:9999/net-medical/picture/'+aa.text" @click="showViewer('http://192.168.0.11:9999/net-medical/picture/'+aa.text)" alt />
        </div>
      </div>
    </div>
    <!-- 图片显示器 -->
    <md-image-viewer v-model="isViewerShow" :list="currentImg" :has-dots="false" :initial-index="0"></md-image-viewer>
  </div>
</template>
<script>
import { mapState } from "vuex";
import emoji from "@/utils/emoji.js";

export default {
  name: "MessageItem",
  props: ["message"],

  data() {
    return {
      accountInfo: '',
      emojiName: emoji.obj,
      imSdk: this.$imsdk,
      renderDom: [],
      currentImg: [], // 当前图片
      isViewerShow: false, // 是否大图显示
      clickViewer: false, // 是否点击的是图片，true点击，用于不让滚动条滚动到指定位置
      aa: ""
    };
  },
  mounted() {
    this.aa = JSON.parse(this.message.content);
    if (typeof (this.$store.state.accountInfo) == 'string') {
      this.accountInfo = JSON.parse(this.$store.state.accountInfo);
    } else {
      this.accountInfo = this.$store.state.accountInfo;
    }
  },
  computed: {},
  methods: {
    showViewer(index) {
      this.isViewerShow = true;
      this.clickViewer = true;
      this.currentImg = [index];
    }
  }
};
</script>
 <style lang="scss" scoped>
.online-content-warp {
  padding: 10px 24px 20px;
}
.describe {
  padding: 20px 30px 10px;
  border-bottom: 1px solid #f4f4f4;
  line-height: 70px;
  background: #48b6ff;
  color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.content {
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  img {
    width: 180px;
    height: 126px;
  }
}
.item {
  padding: 20px 30px 20px;
  i {
    float: right;
    color: #1da1f3;
  }
}
.online-content-list {
  display: flex;
  margin-bottom: 30px;
  // position: relative;
  .online-content-list-head {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
}
.online-content-list-text {
  padding: 8px 10px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #e3e5e9;
  margin: 0 22px;
  max-width: 500px;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
  line-height: 44px;
  // margin: auto 22px auto;
  em {
    position: relative;
    float: left;
    margin-left: -30px;
    display: block;
    width: 0;
    height: 0;
    // border-width: 20px 20px 20px 0;
    border-style: solid;
    border-color: transparent transparent transparent transparent; /*透明 灰 透明 透明 */

    &:before {
      content: "";
      position: absolute;
      font-size: 0;
      top: 22px;
      right: -22px;
      width: 16px;
      height: 16px;
      border-top: 2px solid #e3e5e9;
      border-right: 2px solid #e3e5e9;
      background-color: #fff;
      transform: rotate(-135deg);
      -moz-transform: rotate(-135deg);
      -webkit-transform: rotate(-135deg);
      -o-transform: rotate(-135deg);
      -ms-transform: rotate(-135deg);
    }
  }
}

.online-content-warp .right {
  flex-direction: row-reverse;
  .online-content-list-text {
    background: #d8e8ff;
    border: 1px solid #9eceff;
    // color: #fff;
    em {
      float: right;
      top: 30px;
      margin-right: -16px;
      content: "";
      font-size: 0;
      width: 16px;
      height: 16px;
      border-top: 2px solid #9eceff;
      border-right: 2px solid #9eceff;
      background-color: #d8e8ff;
      transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      &:before {
        background-color: transparent;
      }
    }
  }
}

.online-content-warp .outpation {
  .online-content-list-text {
    padding: 0;
    width: 60%;
  }
  em {
    // margin-left: -20px;
    top: 20px;
    background-color: transparent;

    // border-width: 20px 20px 20px 0;
    // border-color: transparent transparent transparent transparent;
    &:before {
      content: "";
      // border-color: transparent #48b6ff transparent transparent;
    }
  }
}
// 病历详情
.medical-right {
  .user-template-message--right .right-inner {
    color: #fff;
  }
  .user-template-message--right .content-wrapper.width-100 {
    width: 100%;
  }
  .template-message {
    border-radius: 13px 0 13px 13px;
    overflow: hidden;
    box-shadow: 0 2px 2px 0 rgba(202, 210, 218, 0.6);
  }
  .template-message .header {
    position: relative;
    background-color: var(--primary);
  }

  a:not([href]):not([tabindex]),
  a:not([href]):not([tabindex]):focus {
    color: inherit;
    text-decoration: none;
  }
  .template-message .header .info {
    font-size: 28px;
  }
  .template-message .header a {
    display: -webkit-box;
    display: flex;
    padding: 10px;
    line-height: 44px;
    color: #fff;
  }
  .template-message .header .info span:not(:last-child):after {
    position: relative;
    top: 4px;
    left: 4px;
    display: inline-block;
    content: "";
    height: 24px;
    width: 2px;
    background-color: #fff;
    margin: 0 14px;
  }
  .template-message .header .diag-type {
    position: absolute;
    right: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.2);
    font-size: 24px;
    padding: 4px 8px;
    border-bottom-left-radius: 8px;
    color: #fff;
  }
  .diag-type {
    position: absolute;
    right: 0;
    top: 0;
  }
  .template-message .body {
    background-color: #fff;
    color: #3d3f52;
    padding: 10px;
  }
  .medical-right .template-message .template-message-content {
    color: #3d3f52;
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
  }
  .template-message .template-message-content .title {
    color: #999baa;
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 8px;
  }
  .template-message .image-list {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-flow: row wrap;
    margin: 0 -2px;
  }
  .template-message .image-list .image-item {
    overflow: hidden;
    width: 33.33333%;
    -webkit-box-flex: 1;
    flex-grow: 1;
  }
  .template-message .image-list .image-item .bg-image {
    margin: 8px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: 0;
  }
  .template-message .footer {
    background-color: #f2f8ff;
    padding: 10px;
    font-size: 24px;
    line-height: 35px;
  }
  .template-message .footer .privacy-tip {
    color: #606270;
    position: relative;
    padding-left: 28px;
  }
  .template-message .footer .privacy-tip:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 46px;
    height: 32px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAAAyCAYAAAAOX8ZtAAAABGdBT…m+3AyWkwN26h9jKstn/z0r80ygUDs9BiUI46UzDZZNpzr5HxC1eknN6orkAAAAAElFTkSuQmCC)
      no-repeat 0 0;
    background-size: contain;
  }
}
.padding-left-2 {
  padding-left: 4px;
}
</style>