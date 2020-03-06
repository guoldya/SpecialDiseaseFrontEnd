<template>
  <!-- 聊天工具栏 -->
  <div class="inquiry-online-tool">
    <div class="inquiry-online-tool-voice">
      <div contenteditable="true" class="input" @input="changeVal" ref="inputModel"></div>
      <span class="send" @click="sendTextMessage" :class="aaa ? 'active' : ''">发送</span>
    </div>
    <div class="inquiry-online-tool-detail">
      <span @click="tool('emoji')" :class="toolType == 'emoji' ? 'active' :''">
        <i class="iconfont icon-biaoqing1"></i>
      </span>
      <span @click="tool('img')">
        <input class="upload-img" ref="uploadImg" type="file" @change="upload" accept="image/*">
        <i class="iconfont icon-tupian"></i>
      </span>
      <span>
        <i class="iconfont icon-shipin"></i>
      </span>
    </div>
    <div class="emoji-list" v-if="toolType == 'emoji'">
      <ul>
        <li v-for="(item,index) in emojiName" :key="index" @click="getPos(item)">
          <img :src="require(`@/static/faces/${item}`)" />
          <!-- <img :src="emojiUrl + emojiMap[item]" style="width:30px;height:30px" /> -->
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import emoji from '@/utils/emoji.js'


export default {
  name: 'message-send-box',
  props: ['scrollMessageListToButtom'],
  components: {

  },
  data() {
    return {
      imSdk: this.$imsdk,

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
      aaa: false,
      emojiName: emoji.obj,
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
    ...mapState({
      currentMessageList: state => state.conversation.currentMessageList,
    }),
    ...mapGetters(['toAccount', 'currentConversationType']),
    ...mapState({
      // memberList: state => state.group.currentMemberList,
      userID: state => state.user.userID
    })
  },

  updated() {



  },
  mounted() {
    this.$refs.inputModel.focus()

  },
  beforeDestroy() {
    // this.$refs['text-input'].removeEventListener('paste', this.handlePaste)
  },
  methods: {

    async upload() {

      try {
        var formData = new FormData();
        var file = this.$refs.uploadImg.files[0];
        formData.append("file", file);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        let res = await this.$axios.post('upload/file', formData,config);
        if (res.data.code != 200) {
          throw Error(res.data.msg);
        }
        let msg = {
          type: 'image',
          headerurl: this.$store.state.userInfo.headPic,
          text: res.data.rows[0].fileName
        }
        return this.imSdk.send(msg)
      } catch (error) {
        console.log(error.message);
      }
    },

    tool(val) {
      this.$refs.inputModel.focus()
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

    handleEnter() {
      if (this.showAtGroupMember) {
        this.handleSelectAtUser()
      } else {
        this.sendTextMessage()
      }
    },

    changeVal(val) {
      this.messageContent = this.$refs.inputModel.innerHTML;
      if (this.messageContent) { this.aaa = true } else {
        this.aaa = false
      }
    },
    sendTextMessage() {
      console.log(this.$refs.inputModel.innerHTML, "ssssssssss")
      // if (
      //   this.messageContent === '' ||
      //   this.messageContent.trim().length === 0
      // ) {
      //   this.messageContent = ''
      //   this.$store.commit('showMessage', {
      //     message: '不能发送空消息哦！',
      //     type: 'info'
      //   })
      //   return
      // }

      if (
        this.$refs.inputModel.innerHTML === '' ||
        this.$refs.inputModel.innerHTML.trim().length === 0
      ) {
        this.$refs.inputModel.innerHTML = ''
        this.$store.commit('showMessage', {
          message: '不能发送空消息哦！',
          type: 'info'
        })
        return
      }
      let msg = {
        type: 'text',
        headerurl: this.$store.state.userInfo.headPic,
        text: this.$refs.inputModel.innerHTML
      }
      this.imSdk.send(msg)
      this.messageContent = ''
      this.$refs.inputModel.innerHTML = ''
      this.aaa = false;
      this.toolType = false;
      this.$refs.inputModel.focus()
      setTimeout(() => {
        this.$emit('fatherMethod');
      }, 300)

    },
    // 添加消息
    emojiAdd(val) {
      this.$refs.inputModel.innerHTML = this.messageContent + val;
      this.messageContent = this.messageContent + val;
    },

    getPos(v) {
      let sel = window.getSelection()
      if (sel.rangeCount > 0) {
        let range = sel.getRangeAt(0);//找到焦点位置
        var img = new Image();
        img.src = require('@/static/faces/' + v);
        img.style = 'width:24px;height:24px;position: relative; top: 5px;'
        let frag = document.createDocumentFragment();//创建一个空白的文档片段，便于之后插入dom树
        let lastNode = frag.appendChild(img);
        range.insertNode(frag);//设置选择范围的内容为插入的内容
        let contentRange = range.cloneRange();//克隆选区
        contentRange.setStartAfter(lastNode);//设置光标位置为插入内容的末尾
        contentRange.collapse(true);//移动光标位置到末尾
        sel.removeAllRanges();//移出所有选区
        sel.addRange(contentRange);//添加修改后的选区
        this.isPopupShow = false;
      }

      if (this.$refs.inputModel.innerHTML) {
        this.aaa = true
      } else {
        this.aaa = false
      }
    },

    sendImage() {
      // const message = this.tim.createImageMessage({
      //   to: this.toAccount,
      //   conversationType: this.currentConversationType,
      //   payload: {
      //     file: document.getElementById('imagePicker') // 或者用event.target
      //   },
      //   onProgress: percent => {
      //     this.$set(message, 'progress', percent) // 手动给message 实例加个响应式属性: progress
      //   }
      // })
      // this.$store.commit('pushCurrentMessageList', message)
      // this.tim.sendMessage(message).then(() => {
      //   this.$refs.imagePicker.value = null
      // }).catch(imError => {
      //   this.$store.commit('showMessage', {
      //     message: imError.message,
      //     type: 'error'
      //   })
      // })

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
      this.tim.sendMessage(message).then(() => {
        Object.assign(this, {
          rate: 5,
          suggestion: ''
        })
      }).catch(error => {
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
    width: 115px;
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
  flex-wrap: wrap;
  padding: 12px;
  overflow-y: scroll;
  height: 300px;
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    margin: 10px;
    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>