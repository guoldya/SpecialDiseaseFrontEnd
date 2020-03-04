<template>
  <div class="margin55">
    <div class="navigation"><i class="icon-iconfontjiantou"> </i>
      <div class="navigation-content"> 我的咨询 </div>
      <div class="right"><a @click="$store.dispatch('logout')" slot="right" class="title-right">logout</a> </div>
    </div>
    <!-- <Header post-title="我的咨询"> -->
    <!-- <a @click="$store.dispatch('logout')" slot="right" class="title-right">退出</a> -->
    <!-- </Header> -->
    <conversation-list :imSdk='imSdk' />
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ConversationList from '@/components/conversation/conversation-list'
import { ImSdk } from '@/im_sdk/leo_im_sdk'
// 患者3 医生0
export default {
  name: 'Conversation',
  components: {
    ConversationList
  },
  data() {
    return {
      imSdk: new ImSdk()
    }

  },

  mounted() {
    // this.login();
    // this.initListener()
    // 注册用户
    // this.imSdk.registerUser('p' + this.$store.state.userInfo.patientId, this.$store.state.userInfo.nickname, () => {
    //   //  登录
    //   console.log("登录")
    //   this.imSdk.createUserConnect('p' + this.$store.state.userInfo.patientId, '123456')
    // })
    this.imSdk.createUserConnect('111', '123456')
    console.log(this.imSdk,"我是一个小青龙  我在聊天列表父页面")
  },
  methods: {
    login() {
      this.tim.login({
        userID: 'user' + this.$store.state.userInfo.patientId,// userID 用户ID（必须字母开头）
        userSig: window.genTestUserSig('user' + this.$store.state.userInfo.patientId).userSig
      }).then(() => {
        this.$store.commit('toggleIsLogin', true)//已登录
        this.$store.commit('startComputeCurrent')//启动定时器设定当前时间
        this.$store.commit({//设定当前登录用户信息
          type: 'GET_USER_INFO',
          userID: 'user' + this.$store.state.userInfo.patientId,
          userSig: window.genTestUserSig('user' + this.$store.state.userInfo.patientId).userSig,
          sdkAppID: window.genTestUserSig('').SDKAppID
        })
        // this.$store.commit('showMessage', {
        //   type: 'success',
        //   message: '登录成功'
        // })
      }).catch(error => {
        console.log(error)
        this.$store.commit('showMessage', {
          message: '登录失败：' + error.message,
          type: 'error'
        })
      })
    },
    initListener() {
      // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
      this.tim.on(this.TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this)
      // SDK NOT READT
      this.tim.on(this.TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this)
      // SDK内部出错
      this.tim.on(this.TIM.EVENT.ERROR, this.onError)
      // 收到新消息
      this.tim.on(this.TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage)
      // 会话列表更新
      this.tim.on(this.TIM.EVENT.CONVERSATION_LIST_UPDATED, this.onUpdateConversationList)
    },
    onReceiveMessage({ data: messageList }) {
      this.handleVideoMessage(messageList)
      this.handleAt(messageList)
      this.$store.commit('pushCurrentMessageList', messageList)
    },
    onReadyStateUpdate({ name }) {
      const isSDKReady = name === this.TIM.EVENT.SDK_READY ? true : false
      this.$store.commit('toggleIsSDKReady', isSDKReady)

      if (isSDKReady) {
        this.tim.getMyProfile().then(({ data }) => {
          console.log(data)
          this.$store.commit('updateCurrentUserProfile', data)
        }).catch(error => {
          this.$store.commit('showMessage', {
            type: 'error',
            message: error.message
          })
        })
        // this.$store.dispatch('getBlacklist')
      }
    },
    onError({ data }) {
      if (data.message !== 'Network Error') {
        this.$store.commit('showMessage', {
          message: data.message,
          type: 'error'
        })
      }
    },
    onUpdateConversationList(event) {
      this.$store.commit('updateConversationList', event.data)
    },
    handleAt(messageList) {
      // 筛选有 @ 符号的文本消息
      const atTextMessageList = messageList.filter(
        message =>
          message.type === this.TIM.TYPES.MSG_TEXT &&
          message.payload.text.includes('@')
      )
      for (let i = 0; i < atTextMessageList.length; i++) {
        const message = atTextMessageList[i]
        const matched = message.payload.text.match(/@\w+/g)
        if (!matched) {
          continue
        }
        // @ 我的
        if (matched.includes(`@${this.currentUserProfile.userID}`)) {
          // 当前页面不可见时，调用window.Notification接口，系统级别通知。
          if (this.$store.getters.hidden) {
            this.notifyMe(message)
          }
          Notification({
            title: `有人在群${message.conversationID.slice(5)}提到了你`,
            message: message.payload.text,
            duration: 3000
          })
          this.$bus.$emit('new-messsage-at-me', {
            data: { conversationID: message.conversationID }
          })
        }
      }
    },
    handleVideoMessage(messageList) {
      const videoMessageList = messageList.filter(
        message => message.type === this.TIM.TYPES.MSG_CUSTOM && this.isJsonStr(message.payload.data)
      )
      if (videoMessageList.length === 0) return
      const videoPayload = JSON.parse(videoMessageList[0].payload.data)
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_DIALING) {
        if (this.isBusy) {
          this.$bus.$emit('busy', videoPayload, videoMessageList[0])
          return
        }
        this.$store.commit('GENERATE_VIDEO_ROOM', videoPayload.room_id)
        this.selectConversation(videoMessageList[0].conversationID) // 切换当前会话页
        if (videoMessageList[0].from !== this.userID) {
          this.$bus.$emit('isCalled')
        }
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_SPONSOR_CANCEL) {
        this.$bus.$emit('missCall')
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_REJECT) {
        this.$bus.$emit('isRefused')
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_SPONSOR_TIMEOUT) {
        this.$bus.$emit('missCall')
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_ACCEPTED) {
        this.$bus.$emit('isAccept')
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_HANGUP) {
        this.$bus.$emit('isHungUp')
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_LINE_BUSY) {
        this.$bus.$emit('isRefused')
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_ERROR) {
        this.$bus.$emit('isRefused')
      }
    },

    // handleConfirm() { //点击医生调用此方法，跳转到聊天页面
    //     if (this.userID !== '@TIM#SYSTEM') {
    // 查找医生是否在线
    //         this.$store.dispatch('checkoutConversation', `C2C${this.userID}`)
    //             .then(() => {
    //                 this.showDialog = false
    //             }).catch(() => {
    //             this.$store.commit('showMessage', {
    //                 message: '没有找到该用户',
    //                 type: 'warning'
    //             })
    //         })
    //     } else {
    //         this.$store.commit('showMessage', {
    //             message: '没有找到该用户',
    //             type: 'warning'
    //         })
    //     }
    //     this.userID = ''
    // },
  }
}
</script>
<style>
.title-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 30px;
}
</style>
