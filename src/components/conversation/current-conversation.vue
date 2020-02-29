<template>
  <div class="current-conversation-wrapper">

    <div class="content" ref="message-list">
      <div class="message-list" @scroll="this.onScroll">
        <div class="more" v-if="!isCompleted">
          <md-button type="link" @click="$store.dispatch('getMessageList', currentConversation.conversationID)">查看更多</md-button>
        </div>
        <div class="no-more" v-else>没有更多了</div>
        <message-item v-for="message in currentMessageList" :key="message.ID" :message="message" />
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
    // ConversationProfile
  },
  data() {
    return {
      isShowScrollButtomTips: false,
      preScrollHeight: 0,
      showConversationProfile: false,
      timeout: '',
      // currentMessageList: [
      //     {
      //         ID: "C2Cuser3-1320380002-22481251-1",
      //         clientSequence: 1320380002,
      //         conversationID: "C2Cuser3",
      //         conversationSubType: undefined,
      //         conversationType: "C2C",
      //         flow: "out",
      //         from: "'user0'",
      //         geo: {},
      //         isPlaceMessage: 0,
      //         isRead:true,
      //         isResend: false,
      //         isRevoked: false,
      //         isSystemMessage: false,
      //         payload:{text: "[抓狂][抓狂]"},
      //         priority: "Normal",
      //         protocol: "JSON",
      //         random: 22481251,
      //         sequence: 1320380002,
      //         status: "success",
      //         time: 1582179462,
      //         to: "user3",
      //         type: "TIMTextElem",
      //     },
      //     {
      //         ID: "C2Cuser3-1144200001-83834278-0",
      //         clientSequence: 1144200001,
      //         conversationID: "C2Cuser3",
      //         conversationSubType: undefined,
      //         conversationType: "C2C",
      //         flow: "in",
      //         from: "user3",
      //         geo: {},
      //         isPlaceMessage: 0,
      //         isRead: true,
      //         isResend: false,
      //         isRevoked: false,
      //         isSystemMessage: false,
      //         payload: {text: "fdg "},
      //         priority: "Normal",
      //         protocol: "JSON",
      //         random: 83834278,
      //         sequence: 1144200001,
      //         status: "success",
      //         time: 1582688664,
      //         to: "'user0'",
      //         type: "TIMTextElem"
      //     }
      // ]
    }
  },
  computed: {
    ...mapState({
      currentConversation: state => state.conversation.currentConversation,
      currentUnreadCount: state => state.conversation.currentConversation.unreadCount,
      currentMessageList: state => state.conversation.currentMessageList,
      isCompleted: state => state.conversation.isCompleted
    }),

    ...mapGetters(['toAccount', 'hidden']),
    // 是否显示当前会话组件
    showCurrentConversation() {
      return !!this.currentConversation.conversationID
    },
    name() {
      console.log(this.currentMessageList)
      if (this.currentConversation.type === 'C2C') {
        return this.currentConversation.userProfile.nick || this.toAccount
      } else if (this.currentConversation.type === 'GROUP') {
        return this.currentConversation.groupProfile.name || this.toAccount
      } else if (this.currentConversation.conversationID === '@TIM#SYSTEM') {
        return '系统通知'
      }
      return this.toAccount
    },
    showMessageSendBox() {
      return this.currentConversation.type !== this.TIM.TYPES.CONV_SYSTEM
    }
  },
  mounted() {
     console.log(this.currentMessageList,"消息记录")
    this.scrollMessageListToButtom()
    this.onScroll()
    // this.$bus.$on('image-loaded', this.onImageLoaded)
    // this.$bus.$on('scroll-bottom', this.scrollMessageListToButtom)
    // if (this.currentConversation.conversationID === '@TIM#SYSTEM') {
    //   return false
    // }
  },
  updated() {
    this.keepMessageListOnButtom()
    // 1. 系统会话隐藏右侧资料组件
    // 2. 没有当前会话时，隐藏右侧资料组件。
    //    背景：退出群组/删除会话时，会出现一处空白区域
    if (this.currentConversation.conversationID === '@TIM#SYSTEM' ||
      typeof this.currentConversation.conversationID === 'undefined') {
      this.showConversationProfile = false
    }
  },
  watch: {
    currentUnreadCount(next) {
      if (!this.hidden && next > 0) {
        this.tim.setMessageRead({ conversationID: this.currentConversation.conversationID })
      }
    },
    hidden(next) {
      if (!next && this.currentUnreadCount > 0) {
        this.tim.setMessageRead({ conversationID: this.currentConversation.conversationID })
      }
    }
  },
  methods: {

    


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
        console.log(ele.scrollHeight, "内容的高度")
        // var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //   var scrollTop = documentElement.scrollTop || document.body.scrollTop
        ele.scrollTop = 1000;
        console.log(ele.scrollTop, "执行滚动")
      });
    },
    // 如果滚到底部就保持在底部，否则提示是否要滚到底部
    keepMessageListOnButtom() {
      let messageListNode = this.$refs['message-list']
      if (!messageListNode) {
        return
      }
      // 距离底部20px内强制滚到底部,否则提示有新消息
      if (this.preScrollHeight - messageListNode.clientHeight - messageListNode.scrollTop < 20) {
        this.$nextTick(() => {
          messageListNode.scrollTop = messageListNode.scrollHeight
        })
        this.isShowScrollButtomTips = false
      } else {
        this.isShowScrollButtomTips = true
      }
      this.preScrollHeight = messageListNode.scrollHeight
    },
    // 直接滚到底部
    scrollMessageListToButtom() {

      this.$nextTick(function () {
        let messageListNode = this.$refs['message-list']
        if (!messageListNode) {
          return
        }
        messageListNode.scrollTop = messageListNode.scrollHeight
        console.log(messageListNode.scrollHeight, "直接的滚动")
        this.preScrollHeight = messageListNode.scrollHeight
        this.isShowScrollButtomTips = false
      });



    },
    showMore() {
      this.showConversationProfile = !this.showConversationProfile
    },
    onImageLoaded() {
      this.keepMessageListOnButtom()
    }
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
