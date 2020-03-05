<template>

  <div class="online-content-warp">
    <div v-if="aa.type=='text'" class="online-content-list " :class="message.senderId===$imsdk.user.id?'right':''">
      <template v-if="!aa.close">
        <img class="online-content-list-head" src="@/assets/images/head1.png" alt>
        <div class="online-content-list-text">
          <em></em>
          <div>
            <span v-html="aa.text"></span>
          </div>
        </div>
      </template>
      <template v-else>
        <img class="online-content-list-head" src="@/assets/images/head1.png" alt>
        <div class="online-content-list-text">
          <span>聊天结束</span>
        </div>
      </template>
    </div>

    <div v-if="aa.type=='questionDes'" class="online-content-list " :class="message.senderId===$imsdk.user.id?'right':''">
      <img class="online-content-list-head" src="@/assets/images/head1.png" alt>
      <div class="online-content-list-text">
        <em></em>
        <div>
          <span v-html="aa.text"></span>
        </div>
      </div>

    </div>

    <div v-if="aa.type=='geo'" class="online-content-list outpation">
      <img class="online-content-list-head" src="@/assets/images/head1.png" alt>
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
    <div v-if="aa.type=='image'" class="online-content-list " :class="message.senderId===$imsdk.user.id?'right':''">
      <img class="online-content-list-head" src="@/assets/images/head1.png" alt>
      <div class="online-content-list-text">
        <em></em>
        <div>
          <img style="width:100px;" :src="'http://192.168.0.11:9999/net-medical/picture/'+aa.text" @click="showViewer('http://192.168.0.11:9999/net-medical/picture/'+aa.text)" alt>
        </div>
      </div>
    </div>

    <!-- 图片显示器 -->
    <md-image-viewer v-model="isViewerShow" :list="currentImg" :has-dots="false" :initial-index="0"></md-image-viewer>
  </div>

</template>
<script>
import { mapState } from 'vuex'
import emoji from '@/utils/emoji.js'

export default {
  name: 'MessageItem',
  props: ['message'],


  data() {
    return {
      emojiName: emoji.obj,
      imSdk: this.$imsdk,
      renderDom: [],
      currentImg: [], // 当前图片
      isViewerShow: false, // 是否大图显示
      clickViewer: false, // 是否点击的是图片，true点击，用于不让滚动条滚动到指定位置

      aa: ''
    }
  },
  mounted() {
    this.aa = JSON.parse(this.message.content);

  },
  computed: {


  },
  methods: {


    showViewer(index) {
      this.isViewerShow = true;
      this.clickViewer = true;
      this.currentImg = [index];
    },

  }
}
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
  padding: 20px 10px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #e4e4e4;
  margin: 0 40px;
  max-width: 500px;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
  line-height: 46px;
  em {
    position: relative;
    float: left;
    // margin-left: -30px;
    margin-left: -20px;
    margin-top: 2px;

    display: block;
    width: 0;
    height: 0;
    border-width: 20px 20px 20px 0;
    border-style: solid;
    border-color: transparent #e4e4e4 transparent transparent; /*透明 灰 透明 透明 */

    &:before {
      position: absolute;
      content: "";
      display: block;
      width: 0;
      height: 0;
      border-width: 18px 18px 18px 0;
      border-style: solid;
      border-color: transparent #fff transparent transparent; /*透明 灰 透明 透明 */
      top: -18px;
      left: 4px;
    }
  }
}

.online-content-warp .right {
  flex-direction: row-reverse;
  .online-content-list-text {
    background: #48b6ff;
    border: 1px solid #48b6ff;
    color: #fff;
    em {
      float: right;
      margin-right: -30px;
      border-width: 20px 0 20px 20px;
      border-color: transparent transparent transparent #48b6ff;
      &:before {
        left: -22px;
        border-width: 18px 0 18px 18px;
        border-color: transparent transparent transparent #48b6ff;
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
    border-width: 20px 20px 20px 0;
    border-color: transparent #48b6ff transparent transparent;
    &:before {
      border-color: transparent #48b6ff transparent transparent;
    }
  }
}
</style>

 
 
