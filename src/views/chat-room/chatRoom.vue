<template>
  <div refs='message-list'>
    <Header :post-title="$route.query.name"></Header>
    <current-conversation :content="$store.state.test" />
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import CurrentConversation from '@/components/conversation/current-conversation'
export default {
  data() {
    return {
      imSdk: this.$imsdk,
    }  },
  name: 'ChatRoom',
  components: {
    CurrentConversation
  },
  mounted() {
    console.log(this.imSdk,"this.imSdk")
    this.imSdk.createUserConnect('p' + 2, '123456', {
      userConnectCallback: () => {
        // 拿到消息列表之后的回调
        this.imSdk.openSession(
          this.$store.state.userInfo.nickname,
          'd' + this.$route.query.id,
          this.$route.query.name,
          {
            getMessageCallback: () => {
              // 拿到消息列表之后的回调
               
            }
          }
        )

      }
    })

     
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
