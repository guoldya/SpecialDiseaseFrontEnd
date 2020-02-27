<template>
  <div>

  </div>
</template>

<script>
let appLoginlogin = 'wechat/receiveCode';
// 传递    roleMark   角色标志 1、患者 2、医生
// 返回   bindStatus  绑定状态  0未绑定  1正常绑定  2医生绑定(已停用)

export default {
  mounted() {
    //   let str = location.href;
    let str = "http://m.cq2win.com/nanchuan/?code=edd169b85704410aa5219512cb6f1f00&state=1#/"; //取得整个地址栏
    let num = str.indexOf("?");
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
    let wechatCode;
    wechatCode = str.split("?")[0].split("&")[0].split("=")[1];
    sessionStorage.setItem('wechatCode', wechatCode);


    let url = appLoginlogin + '?wechatCode=' + 'code' + '&roleMark=' + '1';
    if (this.$route.query.loginAgin) {
      url = appLoginlogin + '?accountId=' + this.$route.query.accountId;
    }
    this.$axios.get(url, {
    }).then(res => {
      if (res.data.code == '200') {
        //   sessionStorage.setItem('token7', res.data.data.token);
        //   sessionStorage.removeItem('openid');
        //   sessionStorage.removeItem('accessToken');
        console.log(res.data.data)

        if (res.data.data.bindStatus == 1) {
          this.$store.commit('SET_USERINFO', res.data.data)
          this.login();
          this.initListener()
          this.$router.replace({
            name: 'home',
          });

        } else if (res.data.data.bindStatus == 0) {
          this.$router.replace({
            name: 'addpeple',
            query: { isnews: 1 }
          });
        } else {
          this.$toast.info("错误信息")
        }
        // this.$router.replace({
        //   name: 'home',
        // });
      } else {
        sessionStorage.removeItem('token7');
        // this.$router.replace({
        //    name: 'register',
        //    query: argu,
        // });
      }
    }).catch(function (err) {
      console.log(err);
    });;
    //     console.log(wechatCode, "我是页面渲染前")
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

<style>
</style>
