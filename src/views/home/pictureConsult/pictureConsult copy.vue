<!--图文咨询 -->
<template>
  <div class="picture-consult margin55">
    <Header post-title="问题描述"></Header>
    <!-- 医生信息 -->
    <div class="doctor-info doctor-item b-m">
      <div class="doctor-info-top">
        <div class="doctor-info-header">
          <img src="@/assets/images/3.jpg" alt="" />
        </div>
        <div class="doctor-info-content">
          <p class="name">{{ doctorInfo.drName }}</p>
          <p class="gray">
            <span>{{ doctorInfo.education }}</span>
            <span>{{ doctorInfo.deptName }}</span>
          </p>
        </div>
      </div>
      <div class="doctor-info-bottom">
        <div>
          <p class="gray">问诊量</p>
          <p>0{{ doctorInfo.diagnosisNum }}</p>
        </div>
        <div>
          <p class="gray">评论率</p>
          <p>0{{ doctorInfo.praiseRate }}%</p>
        </div>
        <div>
          <p class="gray">关注</p>
          <p>0{{ doctorInfo.followNum }}</p>
        </div>
      </div>
    </div>
    <!-- <md-cell-item title="为谁咨询" :addon="_patienDetail.patientName" arrow @click="routerTo(1)" /> -->
    <!-- 问题描述 -->
    <div class="picture-consult-problem">
      <p>
        问题描述&nbsp;&nbsp;
        <span>(症状表现、检查/用药和希望获得的帮助)</span>
      </p>
      <textarea maxlength="500" v-model="questionDes"></textarea>
      <!-- <p>
        既往病史&nbsp;&nbsp;
        <span>请填写既往病史</span>
      </p>
      <textarea maxlength="300" v-model="anamnesisDes"></textarea>
      <p>
        过敏史&nbsp;&nbsp;
        <span>请填写过敏史</span>
      </p>
      <textarea maxlength="300" v-model="anamnesisDes"></textarea> -->
      <!-- 上传图片 -->
      <!-- <ul class="image-reader-list">
        <li class="image-reader-item" v-for="(img, index) in imageList" :key="index" :style="{
            backgroundImage: `url(${img})`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }">
          <md-tag class="image-reader-item-del" size="small" shape="quarter" fill-color="#111A34" type="fill" font-color="#fff" @click.native="onDeleteImage(index)">
            <md-icon name="close"></md-icon>
          </md-tag>
        </li>
        <li class="image-reader-item add" v-if="imageList.length<3">
          <md-image-reader name="reader0" @select="onReaderSelect" @complete="onReaderComplete" @error="onReaderError" is-multiple></md-image-reader>
          <md-icon name="camera" size="lg" color="#979797"></md-icon>
          <p>添加图片</p>
        </li>
        <li class="tips" v-if="imageList.length<3">(最多上传3张)</li>
      </ul> -->
    </div>
    <!-- <md-cell-item title="选择报告" arrow @click="routerTo(2)" />
    <md-cell-item title="选择病例" arrow @click="routerTo(3)" /> -->

    <!-- <p class="addbTN" @click="sendInfo">提交问题</p> -->
    <div class="btn" @click="sendInfo">
      <md-button type="primary" round>提交问题</md-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Icon, ImageReader, Tag, Toast } from "mand-mobile";
const onlineDoctorDetailUrl = "/api/sds/sysDoctor/selectDetail";

let uploadImage = "/api/bas/upload/file";
let bizConsultRecordinsertOrUpdate='/api/bas/bizConsultRecord/insertOrUpdate'

export default {
  data() {
    return {
      imgPost: [],
      imageList: [],
      doctorInfo: '',
      questionDes: '',
      anamnesisDes: '',
      _patienDetail: {
        id: 1,
      }
    };
  },

  computed: {
    // ...mapState(["chat", "userInfo"])
    ...mapState({
      // chat: state => state.chat,
      // _patienDetail: state => state.chat.patienDetail,
      userInfo: state => state.userInfo
    }),
  },
  mounted() {
    this.init();
    // // this.getAge(this.$store.state.chat.patienDetail.birthday);
    // if (typeof (this.chat.websocket.url) == "undefined")
    //   websocketConfig();
    // this.getInfo = JSON.parse(sessionStorage.getItem('objInfo'));
  },
  methods: {
    ...mapActions(["chat/setPatienDetail", "chat/setHistoryNews", 'updateUser', "chat/setFriendId"]),
    sendInfo() {
      // this.questionDes = this.questionDes.trim()
      // if (!this._patienDetail.id) {
      //   this.$toast.info("请选择就诊人")
      //   return
      // }
      // if (!this.questionDes) {
      //   this.$toast.info("问题描述不能为空")
      //   return
      // }
      // var data = this._patienDetail;
      // data.questionDes = this.questionDes;
      // data.anamnesisDes = this.anamnesisDes.trim();
      // this["chat/setPatienDetail"](data);
      // // 发送消息
      // let createTime = new Date().getTime();
      // let msg = {
      //   // 发送消息传的数据
      //   from: this.userInfo.id,
      //   to: this.$route.query.id,
      //   cmd: 11,
      //   createTime: createTime,
      //   msgType: 7,
      //   chatType: 2,
      //   content: data,
      // };
      // // 把当前发送的消息添加到历史消息去
      // let arr = JSON.parse(JSON.stringify(this.$store.state.chat.historyNews))
      // arr.push(msg)
      // this['chat/setHistoryNews'](arr)
      // this['chat/setFriendId'](this.$route.query.id)
      // this.chat.websocket.send(JSON.stringify(msg));
      this.$router.push({
        name: 'online',
        query: {
           id: this.doctorInfo.id, orderId: this.doctorInfo.orderId, name: this.doctorInfo.drName
        }
      });
      // console.log("_patienDetail:"+JSON.stringify(this.$refs))
    },

    // 初始化
    async init() {
      try {
        let id = Number(this.$route.query.id);
        let res = await this.$axios.put(onlineDoctorDetailUrl, { id });
        if (res.data.code != 200) {
          throw Error(res.data.msg);
        }
        this.doctorInfo = res.data.data;
      } catch (error) {
        console.log(error.message);
      }
    },
    // 路由跳转 type 1 为谁咨询 2  选择报告 3选择病例
    routerTo(type) {
      let url = ''
      if (type === 1) {
        url = '/selectPeople'
      } else if (type === 2) {

      } else if (type === 3) {

      }
      this.$router.push({ path: url })
    },
    onReaderSelect(name, { files }) {
      var data = this._patienDetail;
      // console.log("_patienDetail:"+JSON.stringify(this._patienDetail))
      // data.post = new Array();
      // this["chat/setPatienDetail"](data);
      // console.log("_patienDetail:"+JSON.stringify(this._patienDetail))
      // files.forEach(file => {
      //   console.log(
      //     "[Mand Mobile] ImageReader Selected:",
      //     "File Name " + file.name
      //   );
      // });
      Toast.loading("图片读取中...");
      var formData = new FormData();
      // var file = this.$refs.uploadImg.files[0];
      console.log(files, "file");
      // var file = files;
      formData.append("file", files[0]);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };  //添加请求头
      this.$axios.post(uploadImage, formData, config).then(res => {
        if (res.data.code == '200') {
          console.log("img:" + this.imageList.length)
          this.imgPost[this.imageList.length - 1] = this.$conf.constant.img_base_url + res.data.fileInfo[0].fileName
          data.post = this.imgPost;

          this["chat/setPatienDetail"](data);
        } else {
          this.$toast.info(res.data.msg)
        }
      }).catch(function (err) {
        console.log(err);
      })
    },
    onReaderComplete(name, { dataUrl, file }) {
      Toast.hide();
      setTimeout(() => {
        this.imageList.push(dataUrl)
      }, 100);
    },
    onReaderError(name, { msg }) {
      Toast.failed(msg);
    },
    onDeleteImage(index) {
      this.imageList.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
$border: 1px solid var(--primary--line);
.picture-consult {
  background: #ffffff;
  .b-m {
    border-bottom: 1px solid #f1f3f1;
  }
  .doctor-item {
    padding: 24px 40px;
  }
  .doctor-info-top {
    display: flex;
    justify-content: space-between;
    align-items: center;z
    .doctor-info-header {
      margin-right: 20px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
      }
    }
    .doctor-info-content {
      .name {
        font-size: 32px;
      }
      flex: 1;
      .gray span {
        margin-right: 20px;
      }
    }
  }
  .doctor-info-bottom {
    display: flex;

    margin-top: 20px;
    > div {
      flex: 1;
      border-right: 1px solid #f1f3f1;
      &:last-child {
        border-right: none;
      }
      p {
        text-align: center;
        font-size: 24px;
      }
    }
  }
  .md-cell-item /deep/.md-cell-item-body {
    padding: 0 20px;
  }
  .btn {
    position: relative;
    width: 90%;
    margin: auto;
    margin-top: 40px;
  }
  .picture-consult-problem {
    padding: 40px;
    overflow: hidden;
    border-bottom: $border;
    background: #ffffff;
    p span {
      color: var(--primary--content);
      font-size: 24px;
    }
    textarea {
      width: 100%;
      height: 300px;
      margin-top: 20px;
      box-sizing: border-box;
      resize: none;
      border: $border;
      padding: 10px;
    }
  }
  .image-reader-list {
    display: flex;
    position: relative;
    overflow: hidden;
    margin-top: 10px;
    .md-tag .md-icon.icon-font {
      transform: scale(0.7);
      line-height: 4;
      top: 50px;
    }
    .image-reader-item {
      width: 156px;
      height: 156px;
    }
    .md-image-reader {
      // border: $border;
      .md-image-reader-file {
        opacity: 0;
        width: 156px !important;
        height: 156px !important;
      }
    }
    .add {
      border: 1px solid var(--primary--line);
      line-height: 2;
      text-align: center;
      p {
        // position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        margin-top: 15px;
        font-size: 22px;
        color: var(--primary--content);
        text-align: center;
      }
      .md-icon {
        // position: absolute;
        margin-top: 50px;
      }
    }
    .tips {
      font-size: 24px;
      vertical-align: bottom;
      color: #999;
      float: left;
      margin-top: 120px;
    }
  }
}
</style>
