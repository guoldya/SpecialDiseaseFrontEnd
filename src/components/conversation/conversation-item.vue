<template>
  <div class="con tent22" @click="selectConversation">
    <ul class="DoctorList">
      <li>
        <a href="/index.php?s=/Wap/OnlineConsultant/doctordetail/doctorid/9059/hid/1.html">
          <div class="doctorListTitle">
            <div class="doctorListTitleTx">
              <avatar class="doctorAvatar" :src="avatar" :type="conversation.type" />
              <!-- <img src="https://imgcdn.runningdoctor.cn/2016/07/6df53b48_IMG_4954.JPG!normal" /> -->
            </div>
            <div>
              <p
                class="textEllipsis"
                :title="conversation.userProfile.nick || conversation.userProfile.userID?conversation.userProfile.userID:''"
                v-if="conversation.type ===  TIM.TYPES.CONV_C2C"
              >{{conversation.userProfile.nick || conversation.userProfile.userID}}</p>
              <span v-else-if="conversation.type === TIM.TYPES.CONV_SYSTEM">系统通知</span>

              <!-- <p class="doctorListTitleName">闵玲</p> -->
              <p class="doctorListTitleNum">问诊量：29.7k</p>
            </div>
          </div>
          <div class="doctordelit">
            <!-- <div class="delitTitle">
              <div class="delitTitleBq">
                <span class="spanBQ">
                  <img src="@/assets/conversionImg/phonezx.png" />
                </span>
                <span>处方</span>
                <span>检验</span>
              </div>
              <div class="delitTitlePj">
                <span style="margin-right: 5px;">4.9</span>
                <span>
                  <span class="star-item on"></span>
                  <span class="star-item on"></span>
                  <span class="star-item on"></span>
                  <span class="star-item on"></span>
                  <span class="star-item half"></span>
                </span>
              </div>
            </div> -->
            <p class="doctorscCh">副主任医师</p>
            <p class="doctorsc">擅长：妇科常见病、围产期保健、女性生殖内分泌方面的诊治</p>
            <p>平均回复：94分钟</p>
            <!-- <p style="color: rgb(180, 179, 185);">华西第二医院</p> -->
            <div class="dotType">
              <div class="dottextff">
                <img src="@/assets/conversionImg/onlineText.png" />免费
              </div>
              <div class="dotdhff">
                <img src="@/assets/conversionImg/offlineVoice.png" />暂无
              </div>
              <div class="dotvideoff">
                <img src="@/assets/conversionImg/offlineVideo.png" />暂无
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { isToday, getDate, getTime } from "../../utils/date";

export default {
  name: "conversation-item",
  props: ["conversation", "index"],
  data() {
    return {
      popoverVisible: false,
      hasMessageAtMe: false,
      isMove: false,
      isHidden: false,
      startX: null,
      startY: null,
      itemIndex: null
    };
  },
  computed: {
    showUnreadCount() {
      if (this.$store.getters.hidden) {
        return this.conversation.unreadCount > 0;
      }
      // 是否显示未读计数。当前会话和未读计数为0的会话，不显示。
      return (
        this.currentConversation.conversationID !==
          this.conversation.conversationID && this.conversation.unreadCount > 0
      );
    },
    date() {
      if (
        !this.conversation.lastMessage ||
        !this.conversation.lastMessage.lastTime
      ) {
        return "";
      }
      const date = new Date(this.conversation.lastMessage.lastTime * 1000);
      if (isToday(date)) {
        return getTime(date);
      }
      return getDate(date);
    },
    avatar: function() {
      switch (this.conversation.type) {
        case "GROUP":
          return this.conversation.groupProfile.avatar;
        case "C2C":
          return this.conversation.userProfile.avatar;
        default:
          return "";
      }
    },
    conversationName: function() {
      if (this.conversation.type === this.TIM.TYPES.CONV_C2C) {
        return (
          this.conversation.userProfile.nick ||
          this.conversation.userProfile.userID
        );
      }
      if (this.conversation.type === this.TIM.TYPES.CONV_GROUP) {
        return (
          this.conversation.groupProfile.name ||
          this.conversation.groupProfile.groupID
        );
      }
      if (this.conversation.type === this.TIM.TYPES.CONV_SYSTEM) {
        return "系统通知";
      }
      return "";
    },
    messageForShow() {
      if (this.conversation.lastMessage.isRevoked) {
        if (
          this.conversation.lastMessage.fromAccount ===
          this.currentUserProfile.userID
        ) {
          return "你撤回了一条消息";
        }
        if (this.conversation.type === this.TIM.TYPES.CONV_C2C) {
          return "对方撤回了一条消息";
        }
        return `${this.conversation.lastMessage.fromAccount}撤回了一条消息`;
      }
      return this.conversation.lastMessage.messageForShow;
    },
    ...mapState({
      currentConversation: state => state.conversation.currentConversation,
      currentUserProfile: state => state.user.currentUserProfile
    }),
    ...mapGetters(["toAccount"])
  },
  mounted() {
    this.$bus.$on("new-messsage-at-me", event => {
      if (
        event.data.conversationID === this.conversation.conversationID &&
        this.conversation.conversationID !==
          this.currentConversation.conversationID
      ) {
        this.hasMessageAtMe = true;
      }
    });
  },
  methods: {
    touchStart(e, index) {
<<<<<<< HEAD
      console.log(index, "ssssssssssss");
=======
>>>>>>> 4c633df5a86361c6f56a113a2578e0b4fa5aea69
      //  && this.itemIndex != index
      if (e.touches.length === 1) {
        //表示一只手指在触摸
        if (this.itemIndex != index && this.isHidden) {
          this.isMove = false;
          setTimeout(() => {
            this.isHidden = false;
            return;
          }, 300);
        } else {
          this.itemIndex = index;
          this.startX = e.touches[0].clientX;
          this.startY = e.touches[0].clientY;
        }
      }
    },
    touchMove(e, index) {
      console.log(e, index, "事件冒泡之间");
      if (e.touches.length == 1) {
        if (this.itemIndex != index && this.isHidden) return;
        let startX = e.touches[0].clientX;
        let startY = e.touches[0].clientY;
        if (
          Math.abs(startX - this.startX) - Math.abs(startY - this.startY) >
          0
        ) {
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
      this.imSdk.openSession(this.$store.state.userInfo.nickname, 'd' + conversation.creatorId, conversation.channelName)
 
      console.log(this.imSdk.maxCreateAt, this.imSdk.messageList, this.imSdk)
      // this.$store.commit('selectTestFun',  );

      setTimeout(() => {
        this.$router.push({
          name: 'chatRoom',
          // query: {
          //   questionDes: this.questionDes
          // }
        })
      }, 1000);
      //点击好友与当前好友不相同
      // if (this.conversation.conversationID !== this.currentConversation.conversationID) {
      //     this.$store.dispatch(
      //         'checkoutConversation',//切换会话
      //         this.conversation.conversationID  //点击的好友id
      //     )
      // }
<<<<<<< HEAD
      console.log(this.conversation.conversationID, "我的聊天用户的id");
      this.$router.push({
        name: "chatRoom"
      });
      this.$store.dispatch(
        "checkoutConversation", //切换会话
        this.conversation.conversationID //点击的好友id
      );
=======
      // console.log(this.conversation.conversationID, "我的聊天用户的id")
      // this.$router.push({
      //   name: 'chatRoom'
      // })
      // this.$store.dispatch(
      //   'checkoutConversation',//切换会话
      //   this.conversation.conversationID  //点击的好友id
      // )
>>>>>>> 4c633df5a86361c6f56a113a2578e0b4fa5aea69
    },
    deleteConversation(event) {
      // 停止冒泡，避免和点击会话的事件冲突
      event.stopPropagation();
      this.tim
        .deleteConversation(this.conversation.conversationID)
        .then(() => {
          this.$store.commit("showMessage", {
            message: `会话【${this.conversationName}】删除成功!`,
            type: "success"
          });
          this.popoverVisible = false;
          this.$store.commit("resetCurrentConversation");
        })
        .catch(error => {
          this.$store.commit("showMessage", {
            message: `会话【${this.conversationName}】删除失败!, error=${error.message}`,
            type: "error"
          });
          this.popoverVisible = false;
        });
    }
  },
  watch: {
    currentConversation(next) {
      if (next.conversationID === this.conversation.conversationID) {
        this.hasMessageAtMe = false;
      }
    }
  }
};
</script>
 <style lang="less" scoped>
.conversionCard .consult {
  color: #fff;
  background: var(--primary);
  font-size: 0.26rem;
  float: right;
  display: inline-block;
  height: 0.45rem;
  line-height: 0.45rem;
  padding: 0 0.2rem;
  border: 0.01rem solid var(--primary);
  border-radius: 0.3rem;
  margin-left: 0.3rem;
}
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
.DoctorList li {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.16);
  background-color: white;
  border-radius: 8px;
  list-style-type: none;
  padding: 28px 34px 4px 4px;
  margin: 60px 24px 0;
}
.DoctorList li a {
  display: block;
  width: 100%;
  display: flex;
}
.doctorListTitle {
  flex-grow: 0;
  width: 180px;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  margin-left: 12px;
}
.doctorListTitle div {
  text-align: center;
}
.doctorListTitleTx {
  position: absolute;
  top: -60px;
  left: 50%;
  margin-left: -60px;
  width: 118px;
  height: 118px;
  background-color: white;
  padding: 8px;
  border-radius: 100%;
}
.doctorListTitleTx .doctorAvatar {
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
a img {
  border: 0;
}
.doctorListTitleName {
  color: #23212e;
}
.doctorListTitleName {
  font-size: 16px;
}
.doctorListTitleNum {
  color: #555262;
  font-size: 12px;
}
.doctordelit {
  flex-grow: 1;
  margin-left: 10px;
}
.delitTitle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.delitTitlePj {
  font-size: 24px;
  color: #555262;
  display: flex;
  align-items: center;
}
.delitTitleBq .spanBQ {
  background: none;
  padding: 0;
}
.delitTitleBq .spanBQ img {
  width: 26px;
  height: 36px;
  position: relative;
  top: 8px;
}
.delitTitleBq span {
  display: inline-block;
  font-size: 24px;
  background-color: #eef1fc;
  border-radius: 6px;
  padding: 4px 12px;
  margin-right: 10px;
  color: #6f6c7e;
}
.doctordelit p {
  color: #555262;
  font-size: 24px;
  margin-top: 10px;
}
.doctorscCh {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 400px;
}
.doctorsc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 400px;
}
.dotType {
  border-top: 1px solid #fcfcfc;
  height: 80px;
  display: flex;
  align-items: center;
  margin-top: 12px;
  justify-content: space-between;
}
.dotType div {
  width: 33.3333%;
  font-size: 12px;
}
.dottextff {
  color: var(--primary);
  text-align: left;
}
.dotdhff {
  color: var(--primary--content);
  text-align: center;
}
.dotvideoff {
  color: var(--primary--content);
  text-align: right;
}
.dotType img {
  width: 32px;
  height: 32px;
  position: relative;
  top: 3px;
  margin-right: 5px;
}
.star-item.on {
  background-image: url(../../assets/conversionImg/pjxx.png);
}
.star-item {
  background-size: 100%;
  width: 28px;
  height: 28px;
  margin-left: 4px;
  display: inline-block;
  background-repeat: no-repeat;
  position: relative;
  top: 4px;
}
.star-item.half {
  background-image: url(../../assets/conversionImg/pjxx3.png);
}
.textEllipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 70%;
  margin: 0 auto;
}
</style>
