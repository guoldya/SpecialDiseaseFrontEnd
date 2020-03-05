<template>
  <div class="current-conversation-wrapper">

    <div class="content" ref="message-list">
      <div class="message-list" @scroll="this.onScroll">
        <message-item v-for="message in imSdk.messageList" :key="message.ID" :message="message" />
      </div>
      <div v-show="isShowScrollButtomTips" class="newMessageTips" @click="scrollMessageListToButtom">回到最新位置</div>
    </div>
    <div class="footer">
      <message-send-box />
    </div>

  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import MessageItem from '../message/message-item'
import MessageSendBox from '../message/message-send-box'
 
export default {
  name: 'CurrentConversation',
  components: {
    MessageSendBox,
    MessageItem,
  },
  props: ['content'],
  data() {
    return {
      imSdk: this.$imsdk,
      isShowScrollButtomTips: false,
      preScrollHeight: 0,
      showConversationProfile: false,
      timeout: '',
    }
  },
  mounted() {
     
    this.scrollMessageListToButtom()
    setTimeout(() => {
      this.onScroll()
    }, 2000)
    this.onScroll()

  },


  methods: {

    renderTxt(txt = "") {
      let rnTxt = [];
      let match = null;
      const regex = /(\[.*?\])/g;
      let start = 0;
      let index = 0;
      while ((match = regex.exec(txt))) {
        index = match.index;
        if (index > start) {
          rnTxt.push(txt.substring(start, index));
          rnTxt.push({
            name: 'text',
            text: txt.substring(start, index)
          });
        }
        if (match[1] in emoji.obj) {
          const v = emoji.obj[match[1]];
          // rnTxt.push(this.customEmoji(v));
          rnTxt.push({
            name: 'img',
            text: v
          });
        } else {
          // rnTxt.push(match[1]);
          rnTxt.push({
            name: 'text',
            text: match[1]
          });
        }
        start = index + match[1].length;
      }
      // rnTxt.push(txt.substring(start, txt.length));
      rnTxt.push({
        name: 'text',
        text: txt.substring(start, txt.length)
      });
      // return rnTxt.toString().replace(/,/g, "");
      console.log(rnTxt)
      return rnTxt
    },

    onScroll() {
      // console.log('执行滚动')
      // let messageListNode = this.$refs['message-list']
      // if (!messageListNode) {
      //   return
      // }
      // if (this.preScrollHeight - messageListNode.clientHeight - scrollTop < 20) {
      //   this.isShowScrollButtomTips = false
      // }
      // var scrollDom = document.getElementById('ID');
      //     scrollDom.scrollTop = scrollDom.scrollHeight
      this.$nextTick(function () {
        var ele = this.$refs['message-list'];
        // var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //   var scrollTop = documentElement.scrollTop || document.body.scrollTop
        ele.scrollTop = 1000;
      });
    },
    // 如果滚到底部就保持在底部，否则提示是否要滚到底部
    // 直接滚到底部
    scrollMessageListToButtom() {

      this.$nextTick(function () {
        let messageListNode = this.$refs['message-list']
        if (!messageListNode) {
          return
        }
        messageListNode.scrollTop = messageListNode.scrollHeight
        this.preScrollHeight = messageListNode.scrollHeight
        this.isShowScrollButtomTips = false
      });



    },
    showMore() {
      this.showConversationProfile = !this.showConversationProfile
    },

  }
}
</script>
<style lang="less" scoped>
.current-conversation-wrapper {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
  color: #1c2438;
  box-sizing: border-box;
  padding-top: 100px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
  .more {
    .md-button-content {
      font-size: 20px !important;
    }
    font-size: 20px;
    display: flex;
    justify-content: center;
  }
  .no-more {
    display: flex;
    justify-content: center;
    color: #a5b5c1;
    font-size: 12px;
    padding: 10px 10px;
  }
  .current-conversation {
    // display: flex;
    // flex-direction: column;
    // width: 100%;
    // height: 100vh;
  }
}
.content {
  // display: flex;
  // flex: 1;
  // flex-direction: column;
  // height: 100%;
  // overflow: hidden;
  // position: relative;
  flex: 1;
  overflow: auto;
  background: #ededed;
  .message-list {
    width: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
    padding: 0 20px;
  }
  .newMessageTips {
    position: absolute;
    cursor: pointer;
    padding: 5px;
    width: 120px;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 5px;
    font-size: 12px;
    text-align: center;
    border-radius: 10px;
    border: #e9eaec 1px solid;
    background-color: #fff;
    color: #2b85e4;
  }
}
.footer {
  border-top: 1px solid #e7e7e7;
}
</style>
