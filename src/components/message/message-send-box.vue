<template>
  <!-- <div id="message-send-box-wrapper" :style="focus ? {'backgroundColor': 'white'} : {}">
    <div class="send-header-bar">
      <el-popover placement="top" width="400" trigger="click">
        <div class="emojis">
          <div v-for="item in emojiName" class="emoji" :key="item" @click="chooseEmoji(item)">
            <img :src="emojiUrl + emojiMap[item]" style="width:30px;height:30px" />
          </div>
        </div>
        <i class="iconfont icon-smile" slot="reference" title="发表情"></i>
      </el-popover>
      <i class="iconfont icon-tupian" title="发图片" @click="handleSendImageClick"></i>
      <i class="iconfont icon-wenjian" title="发文件" @click="handleSendFileClick"></i> -->
  <!--<i class="iconfont icon-diaocha" title="小调查" @click="surveyDialogVisible = true"></i>-->
  <!-- <i class="el-icon-video-camera" v-if="currentConversationType === 'C2C'&& toAccount !== userID" title="视频通话" @click="videoCall"></i>
    </div> -->
  <!-- <div class="bottom">
      <textarea ref="text-input" rows="4" resize="false" v-model="messageContent" class="text-input" @focus="focus = true" @blur="focus = false" @keydown.enter.exact.prevent="handleEnter" @keyup.ctrl.enter.prevent.exact="handleLine"> -->
  <!--@keydown.up.stop="handleUp"-->
  <!--@keydown.down.stop="handleDown"-->
  <!-- </textarea>
      <div class="btn-send" @click="sendTextMessage">
        <div class="tim-icon-send"></div>
      </div>
    </div>
    <input type="file" id="imagePicker" ref="imagePicker" accept=".jpg, .jpeg, .png, .gif" @change="sendImage" style="display:none" />
    <input type="file" id="filePicker" ref="filePicker" @change="sendFile" style="display:none" />
  </div> -->

  <!-- 聊天工具栏 -->
  <div class="inquiry-online-tool">
    <div class="inquiry-online-tool-voice">

      <!-- <div contenteditable="true" class="input" ref="inputModel"></div> -->
      <div contenteditable="true" class="input" @input="changeVal" ref="inputModel"></div>
      <!-- <textarea ref="text-input" rows="4" resize="false" v-model="messageContent" class="text-input" @focus="focus = true" @blur="focus = false" @keydown.enter.exact.prevent="handleEnter" @keyup.ctrl.enter.prevent.exact="handleLine"> </textarea> -->
      <span class="send" @click="sendTextMessage" :class="messageContent ? 'active' : ''">发送</span>
    </div>
    <div class="inquiry-online-tool-detail">
      <span>
        <!-- <input class="upload-img" ref="uploadImg" type="file" @change="upload" accept="image/*"> -->
        <input class="upload-img" type="file" id="imagePicker" ref="imagePicker" accept=".jpg, .jpeg, .png, .gif" @change="sendImage" style="display:none" />
        <i class="iconfont icon-tupian"></i>
      </span>
      <span @click="tool('emoji')" :class="toolType == 'emoji' ? 'active' :''">
        <i class="iconfont icon-biaoqing1"></i>
      </span>

      <div class="emoji-list" v-if="toolType == 'emoji'">
        <ul>
          <li v-for="(item,index) in emojiName" :key="index" @click="emojiAdd(item)">
            <img :src="emojiUrl + emojiMap[item]" style="width:30px;height:30px" />
          </li>
        </ul>
      </div>
      <!-- <el-popover placement="top" width="400" trigger="click">
        <div class="emojis">
          <div v-for="item in emojiName" class="emoji" :key="item" @click="chooseEmoji(item)">
            <img :src="emojiUrl + emojiMap[item]" style="width:30px;height:30px" />
          </div>
        </div>
        <i class="iconfont icon-smile" slot="reference" title="发表情"></i>
      </el-popover> -->
      <span>
        <i class="iconfont icon-shipin"></i>
      </span>

    </div>

  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
// import {
//   Form,
//   FormItem,
//   Input,
//   Dialog,
//   Popover,
//   RadioGroup,
//   Radio,
//   Tooltip,
//   Rate
// } from 'element-ui'
import { emojiMap, emojiName, emojiUrl } from '../../utils/emojiMap'

export default {
  name: 'message-send-box',
  props: ['scrollMessageListToButtom'],
  components: {
    // ElInput: Input,
    // ElForm: Form,
    // ElFormItem: FormItem,
    // ElDialog: Dialog,
    // ElPopover: Popover,
    // ElRadioGroup: RadioGroup,
    // ElRadio: Radio,
    // ElTooltip: Tooltip,
    // ElRate: Rate
  },
  data() {
    return {
      toolType: '',
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      messageContent: '',
      isSendCustomMessage: false,
      // sendCustomDialogVisible: false,
      surveyDialogVisible: false,
      form: {
        data: '',
        description: '',
        extension: ''
      },
      rate: 5, // 评分
      suggestion: '', // 建议
      file: '',
      emojiMap: emojiMap,
      emojiName: emojiName,
      emojiUrl: emojiUrl,
      showAtGroupMember: false,
      atUserID: '',
      focus: false,
      btns: [
        {
          text: '取消',
          handler: () => {
            this.surveyDialogVisible = false
          },
        },
        {
          text: '确定',
          handler: this.sendSurvey,
        },
      ],
      isPopupShow: false
    }
  },
  computed: {
    ...mapGetters(['toAccount', 'currentConversationType']),
    ...mapState({
      // memberList: state => state.group.currentMemberList,
      userID: state => state.user.userID
    })
  },
  mounted() {
    this.$refs['text-input'].addEventListener('paste', this.handlePaste)
    this.$bus.$on('reEditMessage', this.reEditMessage)
  },
  beforeDestroy() {
    this.$refs['text-input'].removeEventListener('paste', this.handlePaste)
  },
  methods: {
    // 添加消息
    emojiAdd(val) {
      this.$refs.inputModel.innerHTML = this.inputValue + val;
      this.inputValue = this.inputValue + val;
    },
    tool(val) {
      // 重复点击相同的则视为取消选择
      if (this.toolType == val) {
        this.toolType = "";
        return false;
      }
      this.toolType = val

    },
    showPopUp() {
      this.isPopupShow = true
    },
    reEditMessage(payload) {
      this.messageContent = payload
    },
    handleSelectAtUser() {
      this.messageContent += this.atUserID + ' '
      this.showAtGroupMember = false
    },
    // handleUp() {
    //   const index = this.memberList.findIndex(
    //     member => member.userID === this.atUserID
    //   )
    //   if (index - 1 < 0) {
    //     return
    //   }
    //   this.atUserID = this.memberList[index - 1].userID
    // },
    // handleDown() {
    //   const index = this.memberList.findIndex(
    //     member => member.userID === this.atUserID
    //   )
    //   if (index + 1 >= this.memberList.length) {
    //     return
    //   }
    //   this.atUserID = this.memberList[index + 1].userID
    // },
    handleEnter() {
      if (this.showAtGroupMember) {
        this.handleSelectAtUser()
      } else {
        this.sendTextMessage()
      }
    },
    handleLine() {
      this.messageContent += '\n'
    },
    handlePaste(e) {
      let clipboardData = e.clipboardData
      let file
      if (
        clipboardData &&
        clipboardData.files &&
        clipboardData.files.length > 0
      ) {
        file = clipboardData.files[0]
      }

      if (typeof file === 'undefined') {
        return
      }
      // 1. 创建消息实例，接口返回的实例可以上屏
      let message = this.tim.createImageMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: {
          file: file
        },
        onProgress: percent => {
          this.$set(message, 'progress', percent) // 手动给message 实例加个响应式属性: progress
        }
      })
      this.$store.commit('pushCurrentMessageList', message)

      // 2. 发送消息
      let promise = this.tim.sendMessage(message)
      promise.catch(error => {
        this.$store.commit('showMessage', {
          type: 'error',
          message: error.message
        })
      })
    },
    changeVal(val) {
      this.messageContent = this.$refs.inputModel.innerHTML;
    },
    sendTextMessage() {

      if (
        this.messageContent === '' ||
        this.messageContent.trim().length === 0
      ) {
        this.messageContent = ''
        this.$store.commit('showMessage', {
          message: '不能发送空消息哦！',
          type: 'info'
        })
        return
      }
      const message = this.tim.createTextMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: { text: this.messageContent }
      })
      this.$store.commit('pushCurrentMessageList', message)
      this.$bus.$emit('scroll-bottom')
      this.tim.sendMessage(message).catch(error => {
        this.$store.commit('showMessage', {
          type: 'error',
          message: error.message
        })
      })
      this.messageContent = ''
      this.$refs.inputModel.innerHTML = ''
    },
    // sendCustomMessage() {
    //   if (
    //     this.form.data.length === 0 &&
    //     this.form.description.length === 0 &&
    //     this.form.extension.length === 0
    //   ) {
    //     this.$store.commit('showMessage', {
    //       message: '不能发送空消息',
    //       type: 'info'
    //     })
    //     return
    //   }
    //   const message = this.tim.createCustomMessage({
    //     to: this.toAccount,
    //     conversationType: this.currentConversationType,
    //     payload: {
    //       data: this.form.data,
    //       description: this.form.description,
    //       extension: this.form.extension
    //     }
    //   })
    //   this.$store.commit('pushCurrentMessageList', message)
    //   this.tim.sendMessage(message).catch(error => {
    //     this.$store.commit('showMessage', {
    //       type: 'error',
    //       message: error.message
    //     })
    //   })
    //   Object.assign(this.form, {
    //     data: '',
    //     description: '',
    //     extension: ''
    //   })
    //   this.sendCustomDialogVisible = false
    // },
    random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    sendSurvey() {
      const message = this.tim.createCustomMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: {
          data: 'survey',
          description: String(this.rate),
          extension: this.suggestion
        }
      })
      this.$store.commit('pushCurrentMessageList', message)
      Object.assign(this.form, {
        data: '',
        description: '',
        extension: ''
      })
      this.tim
        .sendMessage(message)
        .then(() => {
          Object.assign(this, {
            rate: 5,
            suggestion: ''
          })
        })
        .catch(error => {
          this.$store.commit('showMessage', {
            type: 'error',
            message: error.message
          })
        })
      this.surveyDialogVisible = false
    },
    chooseEmoji(item) {
      this.messageContent += item;
      this.isPopupShow = false
    },
    handleSendImageClick() {
      this.$refs.imagePicker.click()
    },
    handleSendFileClick() {
      this.$refs.filePicker.click()
    },
    videoCall() {
      this.$bus.$emit('video-call')
    },
    sendImage() {
      const message = this.tim.createImageMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: {
          file: document.getElementById('imagePicker') // 或者用event.target
        },
        onProgress: percent => {
          this.$set(message, 'progress', percent) // 手动给message 实例加个响应式属性: progress
        }
      })
      this.$store.commit('pushCurrentMessageList', message)
      this.tim.sendMessage(message).then(() => {
          this.$refs.imagePicker.value = null
        }).catch(imError => {
          this.$store.commit('showMessage', {
            message: imError.message,
            type: 'error'
          })
        })
    },
    sendFile() {
      const message = this.tim.createFileMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: {
          file: document.getElementById('filePicker') // 或者用event.target
        },
        onProgress: percent => {
          this.$set(message, 'progress', percent) // 手动给message 实例加个响应式属性: progress
        }
      })
      this.$store.commit('pushCurrentMessageList', message)
      this.tim.sendMessage(message).then(() => {
          this.$refs.imagePicker.value = null
        }).catch(imError => {
          this.$store.commit('showMessage', {
            message: imError.message,
            type: 'error'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
#message-send-box-wrapper {
  box-sizing: border-box;
  overflow: hidden;
  padding: 3px 20px 20px 20px;
}

.emojis {
  height: 300px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: scroll;
}

.emoji {
  height: 60px;
  width: 60px;
  box-sizing: border-box;
}

.send-header-bar {
  box-sizing: border-box;
  padding: 3px 0 0 0;
}

.send-header-bar i {
  cursor: pointer;
  font-size: 24px;
  color: gray;
  margin: 0 12px 0 0;
}

.send-header-bar i:hover {
  color: black;
}

textarea {
  resize: none;
}

.text-input {
  font-size: 16px;
  width: 90%;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  padding: 3px;
}

.block {
  padding: 10px 0;
  display: flex;
  align-items: center;
}

.bottom {
  padding-top: 10px;
  position: relative;

  .btn-send {
    width: 10%;
    text-align: center;
    cursor: pointer;
    position: absolute;
    color: #fff; //#2b85e4
    font-size: 50px;
    right: 0;
    bottom: -5px;
    padding: 6px 6px 4px 4px;
    /*border-radius: 50%;*/
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #2b84f1;
  }
}
</style>
<style lang="scss" scoped>
.inquiry-online-tool {
  border-top: 1px solid #d2d2d2;
  background: #f2f2f2;
}
.inquiry-online-tool-voice {
  display: flex;
  align-items: flex-end;
  padding: 16px 0;
  .icon-yuyin {
    font-size: 48px;
    color: #000;
  }
  .yuyiin,
  .send {
    margin: 0 20px;
    height: 52px;
  }
  .send {
    line-height: 52px;
    border-radius: 8px;
    padding: 0 27px;
    background: #ccc;
    color: #fff;
    width: 110px;
    &.active {
      background: #1da1f3;
    }
  }
  .input {
    flex: 1;
    outline: none;
    padding: 10px;
    background: #fff;
    border-radius: 8px;
    // height: 32px;
    overflow: auto;
    max-height: 152px;
    margin-left: 24px;
  }
}
.inquiry-online-tool-detail {
  display: flex;
  border-bottom: 1px solid #d2d2d2;
  > span {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    position: relative;
    &:active i {
      color: #1da1f3;
    }
    &.active i {
      color: #1da1f3;
    }
  }
  .iconfont {
    font-size: 48px;
    color: #8a8a8a;
  }
  .upload-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
  }
}
.inquiry-online-tool-add {
  padding: 40px 0;
  display: flex;
  justify-content: space-around;
  .iconfont {
    font-size: 56px;
  }
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon-span {
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    background: #fff;
    border-radius: 20px;
    margin-bottom: 20px;
  }
}
// textarea {
//   font-size: 28px !important;
//   border: 1px solid #8b8b8b !important;
//   padding: 20px !important;
//   margin-left: 24px;
// }
.emoji-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background: #fff;
  width: 100%;
  padding: 20px;
  overflow-y: scroll;
  height: 300px;
  li {
    margin: 10px;
  }
}
</style>