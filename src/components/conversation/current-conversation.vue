<template>
  <div class="current-conversation-wrapper">
    <div class="content" ref="message-list">
      <div class="message-list" @scroll="this.onScroll">
        <message-item v-for="message in imSdk.messageList" :key="message.ID" :message="message" />
      </div>
      <div v-show="isShowScrollButtomTips" class="newMessageTips" @click="scrollMessageListToButtom">回到最新位置</div>
    </div>
    <div class="footer">
      <message-send-box v-if="isShow" />
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
      isShow: true,
    }
  },
  mounted() {

    this.scrollMessageListToButtom()
    if (this.imSdk.messageList[this.imSdk.messageList.length - 1]) {
      if (JSON.parse(this.imSdk.messageList[this.imSdk.messageList.length - 1].content).close) {
        this.isShow = false;
        
      }
    }

  },
  updated() {

    if (this.imSdk.messageList[this.imSdk.messageList.length - 1]) {
      if (JSON.parse(this.imSdk.messageList[this.imSdk.messageList.length - 1].content).close) {
        this.isShow = false;
        this.$store.commit('feeActiveFun', 1)
      }
    }

    this.onScroll()
    // setTimeout(() => {
    //   this.onScroll()
    // }, 300)
    // 1. 系统会话隐藏右侧资料组件
    // 2. 没有当前会话时，隐藏右侧资料组件。
    //    背景：退出群组/删除会话时，会出现一处空白区域

  },

  methods: {

    onScroll() {
      this.$nextTick(function () {
        var ele = this.$refs['message-list'];
        ele.scrollTop = ele.scrollHeight;
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
