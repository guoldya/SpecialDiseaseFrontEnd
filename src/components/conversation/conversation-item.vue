<template>
  <!-- <div class="conversation-item-container" @click="selectConversation">
    
    <div class="content-cell-body-tool" @click="deleteConversation">
      <span>删除会话{{index}}</span>
    </div>
    <div class="warp">
      <avatar :src="avatar" :type="conversation.type" />
      <div class="content">
        <div class="row-1">
          <div class="name">
            <div class="text-ellipsis">
              <span :title="conversation.userProfile.nick || conversation.userProfile.userID" v-if="conversation.type ===  TIM.TYPES.CONV_C2C">{{conversation.userProfile.nick || conversation.userProfile.userID}}</span>
              <span v-else-if="conversation.type === TIM.TYPES.CONV_SYSTEM">系统通知</span>
            
            </div>
          </div>
          <div class="unread-count">
            <span class="badge" v-if="showUnreadCount">
              {{conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}}
            </span>
           
          </div>
        </div>
        <div class="row-2">
          <div class="summary">
            <div v-if="conversation.lastMessage" class="text-ellipsis">
              <span class="remind" style="color:red;" v-if="hasMessageAtMe">[有人提到我]</span>
              <span class="text" :title="conversation.lastMessage.messageForShow">
                {{messageForShow}}
              </span>
            
          </div>
          <div class="date">
            {{date}}
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="content22" @click="selectConversation">
    <div class="content-cell">
      <div class="content-cell-body" :class="isMove && itemIndex == index ? 'move' : ''" @touchstart="touchStart($event, index)" @touchmove="touchMove($event, index)">
        <div class="content-cell-body-content">

          <div class="online-item">
            <div class="header">
              <avatar :src="avatar" :type="conversation.type" />
              <span v-if="showUnreadCount"> {{conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}}</span>
            </div>
            <div class="content1">
              <p class="doctorname">
                <span :title="conversation.userProfile.nick || conversation.userProfile.userID" v-if="conversation.type ===  TIM.TYPES.CONV_C2C">{{conversation.userProfile.nick || conversation.userProfile.userID}}</span>
                <span v-else-if="conversation.type === TIM.TYPES.CONV_SYSTEM">系统通知</span>
              </p>
              <p class="messge" v-if="conversation.lastMessage">
                <!-- <div v-if="conversation.lastMessage" class="text-ellipsis"> -->
                <span class="remind" style="color:red;" v-if="hasMessageAtMe">[有人提到我]</span>
                <span class="text" :title="conversation.lastMessage.messageForShow">
                  {{messageForShow }}
                </span>
                <!-- </div> -->
              </p>
              <!-- <p v-if="item.msgType == 0" class="message">{{item.content}}</p>
              <p v-if="item.msgType == 2" class="message">{{item.content}}</p>
              <p v-if="item.msgType == 3" class="message">{{item.content}}</p>
              <i class="iconfont icon-tupian" v-if="item.msgType == 1"></i> -->
            </div>
            <div class="primary--content">
              <p>{{date}}</p>
            </div>
          </div>

        </div>
        <div class="content-cell-body-tool" @click="deleteConversation">
          <span>删除</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { isToday, getDate, getTime } from '../../utils/date'

export default {
  name: 'conversation-item',
  props: ['conversation', 'index'],
  data() {
    return {
      popoverVisible: false,
      hasMessageAtMe: false,
      isMove: false,
      isHidden: false,
      startX: null,
      startY: null,
      itemIndex: null
    }
  },
  computed: {
    showUnreadCount() {
      if (this.$store.getters.hidden) {
        return this.conversation.unreadCount > 0
      }
      // 是否显示未读计数。当前会话和未读计数为0的会话，不显示。
      return (
        this.currentConversation.conversationID !==
        this.conversation.conversationID && this.conversation.unreadCount > 0
      )
    },
    date() {
      if (
        !this.conversation.lastMessage ||
        !this.conversation.lastMessage.lastTime
      ) {
        return ''
      }
      const date = new Date(this.conversation.lastMessage.lastTime * 1000)
      if (isToday(date)) {
        return getTime(date)
      }
      return getDate(date)
    },
    avatar: function () {
      switch (this.conversation.type) {
        case 'GROUP':
          return this.conversation.groupProfile.avatar
        case 'C2C':
          return this.conversation.userProfile.avatar
        default:
          return ''
      }
    },
    conversationName: function () {
      if (this.conversation.type === this.TIM.TYPES.CONV_C2C) {
        return this.conversation.userProfile.nick || this.conversation.userProfile.userID
      }
      if (this.conversation.type === this.TIM.TYPES.CONV_GROUP) {
        return this.conversation.groupProfile.name || this.conversation.groupProfile.groupID
      }
      if (this.conversation.type === this.TIM.TYPES.CONV_SYSTEM) {
        return '系统通知'
      }
      return ''
    },
    messageForShow() {
      if (this.conversation.lastMessage.isRevoked) {
        if (this.conversation.lastMessage.fromAccount === this.currentUserProfile.userID) {
          return '你撤回了一条消息'
        }
        if (this.conversation.type === this.TIM.TYPES.CONV_C2C) {
          return '对方撤回了一条消息'
        }
        return `${this.conversation.lastMessage.fromAccount}撤回了一条消息`
      }
      return this.conversation.lastMessage.messageForShow
    },
    ...mapState({
      currentConversation: state => state.conversation.currentConversation,
      currentUserProfile: state => state.user.currentUserProfile
    }),
    ...mapGetters(['toAccount'])
  },
  mounted() {
    this.$bus.$on('new-messsage-at-me', event => {
      if (
        event.data.conversationID === this.conversation.conversationID &&
        this.conversation.conversationID !==
        this.currentConversation.conversationID
      ) {
        this.hasMessageAtMe = true
      }
    })
  },
  methods: {
    touchStart(e, index) {
      console.log(index, "ssssssssssss")
      //  && this.itemIndex != index
      if (e.touches.length === 1) {
        //表示一只手指在触摸
        if (this.itemIndex != index && this.isHidden) {
          this.isMove = false;
          setTimeout(() => {
            this.isHidden = false;
            return
          }, 300);
        } else {
          this.itemIndex = index;
          this.startX = e.touches[0].clientX;
          this.startY = e.touches[0].clientY;
        }
      }
    },
    touchMove(e, index) {
      console.log(e, index, "事件冒泡之间")
      if (e.touches.length == 1) {
        if (this.itemIndex != index && this.isHidden) return
        let startX = e.touches[0].clientX;
        let startY = e.touches[0].clientY;
        if (Math.abs(startX - this.startX) - Math.abs(startY - this.startY) > 0) {
          // 阻止事件冒泡
          e.stopPropagation();
          if (this.startX - startX > 0) {
            //左滑
            this.isMove = true;
            this.isHidden = true;
          } else {
            this.isMove = false;
            setTimeout(() => {
              this.isHidden = false;
            }, 300);
          }
        }
      }
    },
    selectConversation() {
      //点击好友与当前好友不相同
      // if (this.conversation.conversationID !== this.currentConversation.conversationID) {
      //     this.$store.dispatch(
      //         'checkoutConversation',//切换会话
      //         this.conversation.conversationID  //点击的好友id
      //     )
      // }
      console.log(this.conversation.conversationID,"我的聊天用户的id")
      this.$router.push({
        name: 'chatRoom'
      })
      this.$store.dispatch(
        'checkoutConversation',//切换会话
        this.conversation.conversationID  //点击的好友id
      )
    },
    deleteConversation(event) {
      // 停止冒泡，避免和点击会话的事件冲突
      event.stopPropagation()
      this.tim.deleteConversation(this.conversation.conversationID)
        .then(() => {
          this.$store.commit('showMessage', {
            message: `会话【${this.conversationName}】删除成功!`,
            type: 'success'
          })
          this.popoverVisible = false
          this.$store.commit('resetCurrentConversation')
        })
        .catch(error => {
          this.$store.commit('showMessage', {
            message: `会话【${this.conversationName}】删除失败!, error=${error.message}`,
            type: 'error'
          })
          this.popoverVisible = false
        })
    },
  },
  watch: {
    currentConversation(next) {
      if (next.conversationID === this.conversation.conversationID) {
        this.hasMessageAtMe = false
      }
    }
  }
}
</script>
 <style lang="less" scoped>
// .conversation-item-container {
//   padding: 15px 20px;
//   cursor: pointer;
//   /*overflow: hidden;*/
//   transition: 0.2s;
//   background: #fff;
//   border-bottom: 1px solid #ededed;
//   &:hover {
//     background: #404953;

//     .close-btn {
//       right: 3px;
//     }
//   }
// }

// .close-btn {
//   position: absolute;
//   right: -25px;
//   top: 103px;
//   color: #76828c;
//   transition: all 0.2s ease;

//   &:hover {
//     color: #f35f5f;
//   }
// }

// .warp {
//   display: flex;
// }

// .avatar {
//   width: 100px;
//   height: 100px;
//   margin-right: 20px;
//   border-radius: 50%;
//   flex-shrink: 0;
// }

// .content22 {
//   flex: 1;
//   height: 155px;
//   /*overflow: hidden;*/
//   border-bottom: 1px solid red;
//   .row-1 {
//     display: flex;
//     line-height: 50px;

//     .name {
//       color: #76828c;
//       flex: 1;
//       min-width: 0px;
//       font-size: 40px;
//     }

//     .unread-count {
//       padding-left: 10px;
//       flex-shrink: 0;
//       color: #76828c;
//       font-size: 14px;

//       .badge {
//         vertical-align: bottom;
//         background-color: #f35f5f;
//         border-radius: 15px;
//         color: #fff;
//         display: inline-block;
//         font-size: 30px;
//         height: 30px;
//         max-width: 30px;
//         line-height: 30px;
//         padding: 0 6px;
//         text-align: center;
//         white-space: nowrap;
//       }
//     }
//   }

//   .row-2 {
//     display: flex;
//     font-size: 26px;
//     padding-top: 3px;

//     .summary {
//       flex: 1;
//       overflow: hidden;
//       min-width: 0;
//       color: #a5b5c1;

//       .remind {
//         color: #f35f5f;
//       }
//     }

//     .date {
//       padding-left: 10px;
//       flex-shrink: 0;
//       text-align: right;
//       color: #76828c;
//     }
//   }
// }

// .choose {
//   background-color: #404953;
// }

// .context-menu-button {
//   padding: 10px;
//   border: 2px solid #2d8cf0;
//   border-radius: 8px;
// }
// .move .content-cell-body-tool {
//   width: 150px;
//   background: red;
//   color: #fff;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
 </style>
<style lang="scss" scoped>
.content22 {
  height: 140px;
  overflow-x: hidden;
  overflow-y: scroll;
   border-bottom: 1px solid #ededed;
  &.hidden {
    overflow-y: hidden;
  }
  .content-cell {
    
    .content-cell-body {
      height: 133px;
      width: 120%;
      background: #ffffff;
      display: flex;
      transition: transform 0.25s;
      &.move {
        transform: translateX(-16.67%);
      }
      img {
        width: 78px;
        height: 78px;
        margin: 29px 27px 26px 0;
      }
      .content-cell-body-content {
        width:100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
      }
      .content-cell-body-tool {
        width: 150px;
        background: red;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.online-item {
  display: flex;
  padding-left: 30px;
  background: #ffffff;
  width: 90%;
  .header {
    position: relative;
    width: 90px;
    height: 90px;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    span {
      position: absolute;
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      color: #fff;
      background: red;
      font-size: 24px;
      text-align: center;
      line-height: 28px;
      top: 8px;
      right: -10px;
    }
  }
  .content1 {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    line-height: 30px;
    p {
      width: 100%;
    }
    .doctorname {
      font-size: 32px;
    }
    .messge {
      color: #979797;
    }
    .content-info {
      height: 36px;
      overflow: hidden;
      width: 500px;
      text-overflow: ellipsis; /*文字隐藏后添加省略号*/
      white-space: nowrap; /*强制不换行*/
    }
    .tips {
      display: inline-block;
      height: 36px;
      line-height: 38px;
      border-radius: 8px;
      padding: 0 10px;
      margin-left: 20px;
    }
    .blue {
      border: 1px solid #1da1f3;
      color: #1da1f3;
    }
    .green {
      border: 1px solid #53c272;
      color: #53c272;
    }
    .cyan-blue {
      border: 1px solid #31c3c2;
      color: #31c3c2;
    }
    .yellow {
      border: 1px solid #fdae5d;
      color: #fdae5d;
    }
    .message {
      color: #979797;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 480px;
    }
  }
  .primary--content {
    // flex: 1;
    width: 200px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: flex-end;
    span {
      width: 90px;
      height: 36px;
      line-height: 38px;
      font-size: 24px;
      text-align: center;
      background: #ffb155;
      color: #ffffff;
      border-top-right-radius: 16px;
      border-bottom-left-radius: 16px;
      &.active {
        background: #149cf1;
      }
      &.active1 {
        background: #979797;
      }
    }
  }
}
</style>
