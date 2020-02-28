<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data() {
    return {
    }
  },
  created() {
    // this.login();
    // this.initListener()
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      //this.$store.replaceState()替换 store 的根状态
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
    
  },
  methods: {
    login() {
      this.tim.login({
        userID: 'user0',// userID 用户ID（必须字母开头）
        userSig: window.genTestUserSig('user0').userSig
      }).then(() => {
        this.$store.commit('toggleIsLogin', true)//已登录
        this.$store.commit('startComputeCurrent')//启动定时器设定当前时间
        this.$store.commit({//设定当前登录用户信息
          type: 'GET_USER_INFO',
          userID: 'user0',
          userSig: window.genTestUserSig('user0').userSig,
          sdkAppID: window.genTestUserSig('').SDKAppID
        })
        this.$store.commit('showMessage', {
          type: 'success',
          message: '登录成功'
        })
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

  }
}
</script>

 <style >
:root {
  /* 主题色 */
  --primary: #48b6ff;
  /* 内容字体颜色 5A5A5A*/
  --primary--content: #8b8b8b;
  --primary--right: #8b8b8b;
  /* 题目字体颜色 */
  --primary--title: #232323;
  /* 线颜色 */
  --primary--line: #ededed;
  /* 背景色 */
  --primary--body: #f8f8f8;
  /*灰色背景*/
  --primary--light: #cccbcb;
}
#app {
  font-family: "PingFang-SC-Medium";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--primary--title);
  font-size: 28px;
  max-width: 777px;
  margin: 0 auto;
}
.noMore {
  text-align: center;
  color: var(--primary--content);
  font-size: 24px;
  line-height: 70px;
}
.margin50 {
  margin-top: 100px;
}
.margin55 {
  margin-top: 110px;
}
.outCarint {
  padding: 0 24px;
}
body {
  background: var(--primary--body);
}
.colo13 {
  font-size: 26px;
  color: var(--primary--content);
}
.nullDiv {
  text-align: center;
}
.nullDiv img {
  width: 50%;
  margin-top: 150px;
}
.el-popover {
  left: 0 !important;
}
.md-landscape-content {
  width: 601px !important;
}
.md-landscape .md-icon.md-landscape-close {
  display: none !important;
}
.nomore {
  height: 80px;
  line-height: 70px;
  font-size: 24px;
  color: var(--primary--content);
  margin-left: 39%;
}
</style>
