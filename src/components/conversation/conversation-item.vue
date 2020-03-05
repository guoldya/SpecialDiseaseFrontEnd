<template>
   
  <div class="con tent22"  >
    <div class="conversationCard">
      <div class="disFlex">
        <span>2020-12-12</span>
        <span class="online" :class="1?'online':'complete'">{{1?'咨询中':'已结束'}}</span>
      </div>
      <div class="card-divider card-divider-horizontal"></div>

      <div class="online-item">
        <div class="header">
          <!-- <avatar :src="avatar" :type="conversation.type" /> -->
          <span
            v-if="showUnreadCount"
          >{{conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}}</span>
        </div>
        <div class="content">
          <div class="row-1">
            <div class="name">
              <div class="text-ellipsis">
                <span
                  :title="conversation.userProfile.nick || conversation.userProfile.userID"
                  v-if="conversation.type ===  TIM.TYPES.CONV_C2C"
                >{{conversation.userProfile.nick || conversation.userProfile.userID}}</span>
                <span v-else-if="conversation.type === TIM.TYPES.CONV_SYSTEM">系统通知</span>
                <!--<span title="冉有钱">冉有钱</span>-->
              </div>
            </div>
            <div class="unread-count">
              <span
                class="badge"
                v-if="showUnreadCount"
              >{{conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}}</span>
              <!--<span class="badge">-->
              <!--6-->
              <!--</span>-->
            </div>
          </div>
          <div class="row-2">
            <div class="summary">
              <div v-if="conversation.lastMessage" class="text-ellipsis">
                <span class="remind" style="color:red;" v-if="hasMessageAtMe">[有人提到我]</span>
                <span
                  class="text"
                  :title="conversation.lastMessage.messageForShow"
                >{{messageForShow}}</span>
              </div>
              <!--<div class="text-ellipsis">-->
              <!--<span class="text" title="你好">-->
              <!--你好-->
              <!--</span>-->
              <!--</div>-->
            </div>
          </div>
        </div>
      </div>
      <div class="dotType">
        <!---->
        <div class="dottextff">
          <img src="@/assets/conversationImg/onlineText.png" />图文问诊
        </div>
       
        
      <p class="consult " :class="1?'online-consult':'complete-consult'">咨询详情</p>
      
      </div>
    </div>

     
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
 

export default {
  name: "conversation-item",
  props: ["conversation"],
  data() {
    return {
       
    };
  },
 
  mounted() {
    
  },
  methods: {
    
  },
  watch: {
    
  }
};
</script>
 <style lang="less" scoped>
 .conversationCard .consult{
  font-size: 0.26rem;
  float: right;
  display: inline-block;
  height: 0.45rem;
  line-height: 0.45rem;
  padding: 0 0.2rem;
  border-radius: 0.3rem;
  margin-left: 0.3rem;
 }
 .online-consult{
  background: var(--primary);
  color: #fff;
  border: 0.01rem solid var(--primary);
 }
 .complete-consult{
  background: var(--primary--line);
  color: var(--primary--content);
  border: 0.01rem solid var(--primary--line);
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
        width: 100%;
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
.row-1 {
    display: flex;
    line-height: 50px;

    .name {
      color: #23212e;
      flex: 1;
      min-width: 0px;
      font-size: 32px;
    }

    .unread-count {
      padding-left: 10px;
      flex-shrink: 0;
      color: #76828c;
      font-size: 14px;

      .badge {
        vertical-align: bottom;
        background-color: #f35f5f;
        border-radius: 15px;
        color: #fff;
        display: inline-block;
        font-size: 30px;
        height: 30px;
        max-width: 30px;
        line-height: 30px;
        padding: 0 6px;
        text-align: center;
        white-space: nowrap;
      }
    }
  }

  .row-2 {
    display: flex;
    font-size: 26px;
    padding-top: 3px;

    .summary {
      flex: 1;
      overflow: hidden;
      min-width: 0;
      color: #555262;
      font-size: 24px;
      .remind {
        color: #f35f5f;
      }
    }

    .date {
      padding-left: 10px;
      flex-shrink: 0;
      text-align: right;
      color: #76828c;
    }
  }
.online-item {
  display: flex;
  // padding-left: 30px;
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
      .text {
        width: 300px;
        line-height: 30px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: block;
      }
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
.online{
  color: var(--primary)
}
.complete{
  color: var(--primary--right)
}

</style>
