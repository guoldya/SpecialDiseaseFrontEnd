<template>
  <div refs='message-list'>
    <Header :post-title="name"></Header>
    <current-conversation />
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import CurrentConversation from '@/components/conversation/current-conversation'
export default {
  name: 'ChatRoom',
  components: {
    CurrentConversation
  },
  mounted() {
    //  this.$nextTick(function () {
    //     var ele = this.$refs['message-list'];

    //   ele.scrollTop = 1000;
    //   console.log(ele.scrollTop, "执行滚动aaaaaaaaaaaaa")
    // });
    console.log(this.currentMessageList, "消息记录chatRoom")
    const message = this.tim.createTextMessage({
      to: this.toAccount,
      conversationType: 'C2C',
      payload: { text: this.$route.query.questionDes },
    })
     
    this.tim.sendMessage(message).catch(error => {
      this.$store.commit('showMessage', {
        type: 'error',
        message: error.message
      })
      console.log(error.message)
    })
    this.$store.commit('pushCurrentMessageList', message)
  },
  computed: {
    ...mapState({
      currentConversation: state => state.conversation.currentConversation,
      currentUnreadCount: state => state.conversation.currentConversation.unreadCount,
      currentMessageList: state => state.conversation.currentMessageList,
      isCompleted: state => state.conversation.isCompleted,
    }),
    ...mapGetters(['toAccount', 'hidden']),
    name() {
      if (this.currentConversation.type === 'C2C') {
        console.log(this.currentConversation)
        return this.currentConversation.userProfile.nick || this.toAccount
      } else if (this.currentConversation.type === 'GROUP') {
        return this.currentConversation.groupProfile.name || this.toAccount
      } else if (this.currentConversation.conversationID === '@TIM#SYSTEM') {
        return '系统通知'
      }
      return this.toAccount
    },
  }
}
</script>
