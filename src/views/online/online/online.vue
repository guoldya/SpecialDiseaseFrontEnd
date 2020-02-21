<!--在线问诊 -->
<template>
  <div class="inquiry-online">
     <Header post-title="我的咨询"> </Header>
    <!-- 用户信息 -->
    <div class="user-describe">
      <div class="describe">
        <p>问题描述：{{frendInfo.questionDes}}</p>
        <p>既往病史：{{frendInfo.anamnesisDes}}</p>
      </div>
      <div class="content">
        <img v-for="(item,index) in frendInfo.post" :key="index" :src="item" alt @click="showViewer('@asset/images/1.png')">
        <!-- <img :src="imgSrc[1]" alt>
        <img :src="imgSrc[2]" alt> -->
      </div>
      <router-link tag="p" to="/allRecord" class="item">
        <span>查看{{frendInfo.patientName}}的所有记录</span>
        <i class="iconfont icon-iconfontjiantou5"></i>
      </router-link>
    </div>
    <!-- 聊天内容区域 -->
    <div class="inquiry-online-content" ref="chatContent" @click="toolType=''">
      <ul class="online-content-warp">
        <li  class="online-content-list right"  >
          <img class="online-content-list-head" src="@/assets/images/head1.png"   alt>
          <div class="online-content-list-text"  >
            <em></em>
            <div ></div>
          </div>
          <div class="online-content-list-text"  >
            <img  alt style="width:100px;" @load="scrollBottom">
          </div>
        </li>
      </ul>
    </div>

    <!-- 聊天工具栏 -->
    <div class="inquiry-online-tool">
      <div class="inquiry-online-tool-voice">
        <span class="yuyiin">
          <i class="iconfont icon-yuyin"></i>
        </span>
        <div contenteditable="true" class="input" @input="changeVal" ref="inputModel"></div>
        <span class="send" @click="send" :class="inputValue ? 'active' : ''">发送</span>
      </div>
      <div class="inquiry-online-tool-detail">
        <span @click="tool('img')">
          <input class="upload-img" ref="uploadImg" type="file" @change="upload" accept="image/*">
          <i class="iconfont icon-tupian"></i>
        </span>
        <span @click="tool('video')">
          <i class="iconfont icon-shipin"></i>
        </span>
        <span @click="tool('drug')">
          <i class="iconfont icon-yaopin"></i>
        </span>
        <span @click="tool('emoji')" :class="toolType == 'emoji' ? 'active' :''">
          <i class="iconfont icon-biaoqing1"></i>
        </span>
        <span @click="tool('more')" :class="toolType == 'more'? 'active' :(toolType == 'reply'? 'active' :'')">
          <i class="iconfont icon-jiahao"></i>
        </span>
      </div>
      <ul class="inquiry-online-tool-add" v-if="toolType == 'more'">
        <li tag="li" @click="tool('reply')">
          <span class="icon-span">
            <i class="iconfont icon-xinxi"></i>
          </span>
          <span>快捷回复</span>
        </li>
        <li @click="endInquiry">
          <span class="icon-span">
            <i class="iconfont icon-icon-test"></i>
          </span>
          <span>结束问诊</span>
        </li>
        <router-link tag="li" to="/diagnosticRecord">
          <span class="icon-span">
            <i class="iconfont icon-xinxi"></i>
          </span>
          <span>诊疗记录</span>
        </router-link>
      </ul>
      <ul class="emoji-list" v-if="toolType == 'emoji'">
        <li v-for="(item,index) in emojiList" :key="index" @click="emojiAdd(item)">{{item}}</li>
      </ul>
      <ul class="reply-list" v-if="toolType == 'reply'">
        <li v-for="(item,index) in replyList" :key="index" @click="replyAdd(item.content)">{{item.content}}</li>
      </ul>
    </div>
    <!-- 编辑弹窗 -->
    <md-dialog :closable="true" layout="column" v-model="dialogOpen">
      <img src="@/assets/images/head.png" alt>
      <div class="edit-dialog-item">
        <p>张丽&nbsp;&nbsp;女&nbsp;&nbsp;30岁</p>
        <div>
          <span>分组</span>
          <span class="edit-dialog-item-content">门诊</span>
          <i class="iconfont icon-iconfontjiantou5"></i>
        </div>
        <div>
          <span>备注</span>
          <span class="edit-dialog-item-content">感冒</span>
          <i class="iconfont icon-iconfontjiantou5"></i>
        </div>
      </div>
    </md-dialog>

    <!-- 图片显示器 -->
    <md-image-viewer v-model="isViewerShow" :list="currentImg" :has-dots="false" :initial-index="0"></md-image-viewer>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Dialog } from "mand-mobile";
let uploadImage = "/bas/appLogin/uploadImage";
const doctorReplyReadPage = "/hos/hosDoctorReply/read/page";
export default {
  data() {
    return {
      imgSrc: [],
      frendInfo: "",
      toolType: "", // 底部工具栏类型 img 图片 video 视频 drug 开药 emoji 表情 more 更多
      inputValue: "",
      socket: "",
      height: null,
      currentImg: [], // 当前图片
      dialogOpen: false,
      isViewerShow: false, // 是否大图显示
      clickViewer: false, // 是否点击的是图片，true点击，用于不让滚动条滚动到指定位置
      replyList: [],//快捷回复列表
      emojiList: ['😀', '😁', '😂', '😃', '😄', '😅', '😆', '😉', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '😇', '😐', '😑', '😶', '😏', '😣', '😥', '😮', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '😒', '😓', '😔', '😕', '😲', '😷', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😬', '😰', '😱', '😳', '😵', '😡', '😠']
    };
  },
  computed: {
    ...mapState(["chat", "userInfo"])
  },
  async mounted() {
    // 让滚动条滚动到指定位置
    this.scrollBottom();
    this.doctorReply();
     
  },
  updated: function () {
     
    this.scrollBottom();
  },
  methods: {
 
    scrollBottom() {
     
    },
    showViewer(index) {
      this.isViewerShow = true;
      this.clickViewer = true;
      this.currentImg = [index];
    },
    changeVal(val) {
      this.inputValue = this.$refs.inputModel.innerHTML;
    },
    endInquiry() {
      // 结束问诊
     
    },
    tool(val) {
      // 重复点击相同的则视为取消选择
      if (this.toolType == val) {
        this.toolType = "";
        return false;
      }
      this.toolType = val
      if (val === 'drug') {
        this.$router.push({
          path: `/prescribe`
        });
      }
    },
    async doctorReply() {
      
    },
    async upload() {
    
    },
    // 发送消息
    send() {
     
      // console.log("conf:"+this.$conf.constant.img_base_url)
    },

    // 添加消息
    emojiAdd(val) {
      this.$refs.inputModel.innerHTML = this.inputValue + val;
      this.inputValue = this.inputValue + val;
    },
    replyAdd(val) {
      this.$refs.inputModel.innerHTML = val;
      this.inputValue = val;
    }
  },
  
};
</script>
<style lang="scss" scoped>
.inquiry-online {
  box-sizing: border-box;
  padding-top: 100px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
  .user-describe {
    position: fixed;
    z-index: 4;
    width: 670px;
    background: #fff;
    left: 40px;
    top: 120px;
    border-radius: 10px;
    box-shadow: 0 0 18px rgba(131, 179, 208, 0.3);
    box-sizing: border-box;

    .describe {
      padding: 20px 30px 10px;
      border-bottom: 1px solid #f4f4f4;
      line-height: 36px;
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
      padding: 0 30px 20px;
      i {
        float: right;
        color: #1da1f3;
      }
    }
  }
  .inquiry-online-tool {
    border-top: 1px solid #d2d2d2;
    background: #f2f2f2;
  }
  .inquiry-online-tool-voice {
    display: flex;
    align-items: flex-end;
    padding: 16px 0;
    .icon-yuyin {
      font-size: 48px;
      color: #000;
    }
    .yuyiin,
    .send {
      margin: 0 20px;
      height: 52px;
    }
    .send {
      line-height: 52px;
      border-radius: 8px;
      padding: 0 27px;
      background: #ccc;
      color: #fff;
      &.active {
        background: #1da1f3;
      }
    }
    .input {
      flex: 1;
      outline: none;
      padding: 10px;
      background: #fff;
      border-radius: 8px;
      // height: 32px;
      overflow: auto;
      max-height: 152px;
    }
  }
  .inquiry-online-tool-detail {
    display: flex;
    border-bottom: 1px solid #d2d2d2;
    > span {
      flex: 1;
      text-align: center;
      padding: 10px 0;
      position: relative;
      &:active i {
        color: #1da1f3;
      }
      &.active i {
        color: #1da1f3;
      }
    }
    .iconfont {
      font-size: 48px;
      color: #8a8a8a;
    }
    .upload-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0;
    }
  }
  .inquiry-online-tool-add {
    padding: 40px 0;
    display: flex;
    justify-content: space-around;
    .iconfont {
      font-size: 56px;
    }
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .icon-span {
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      background: #fff;
      border-radius: 20px;
      margin-bottom: 20px;
    }
  }
  .emoji-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    li {
      margin: 10px;
    }
  }
  .reply-list {
    padding: 0 20px 20px;
    height: 300px;
    overflow: scroll;
    li {
      padding: 10px 0;
      min-height: 60px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
    }
  }
  .inquiry-online-content {
    // box-sizing: border-box;
    flex: 1;
    overflow: auto;
    background: #ededed;
    .online-content-warp {
      padding: 400px 40px 40px;
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
        margin-left: -30px;
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
      // .item {
      //   display:flex;
      //   justify-content: space-between;
      //   height: 70px;
      //   align-items: center;
      //   &:nth-of-type(1){
      //    border-bottom:1px solid #f4f4f4;
      //   }
      //   i{
      //     color:#1da1f3;
      //   }
      // }
    }
    .online-content-list-report {
      padding-bottom: 0;
    }
    .online-content-list.right {
      flex-direction: row-reverse;
      .online-content-list-text {
        em {
          float: right;
          margin-right: -30px;
          border-width: 20px 0 20px 20px;
          border-color: transparent transparent transparent #e4e4e4;
          &:before {
            left: -22px;
            border-width: 18px 0 18px 18px;
            border-color: transparent transparent transparent #fff;
          }
        }
      }
    }
  }
}
.md-dialog {
  /deep/ .md-dialog-body {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      margin-right: 40px;
    }
    .edit-dialog-item {
      flex: 1;
      p {
        font-size: 32px;
        margin-bottom: 40px;
      }
      > div {
        position: relative;
        width: 100%;
        padding-right: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        height: 60px;
        border-bottom: 1px solid #f4f4f4;
        .edit-dialog-item-content {
          max-width: 200px;
          text-align: right;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      i {
        position: absolute;
        top: 10px;
        right: 4px;
      }
    }
  }
}
</style>
