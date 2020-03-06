 <template>
  <div class="doctor-detail">
    <Header post-title="医生详情"></Header>
    <div class="doctor-info">
      <div class="doctor-info-top">
        <div class="doctor-info-header">
          <img src="@/assets/images/3.jpg" alt="" />
        </div>
        <div class="doctor-info-content">
          <p>{{ doctorInfo.drName }}</p>
          <p class="gray">
            <span>{{ doctorInfo.education }}</span>
            <span>{{ doctorInfo.deptName }}</span>
          </p>
        </div>
        <div class="doctor-info-follow">
        </div>
      </div>
      <div class="doctor-info-bottom">
        <div>
          <p>问诊量</p>
          <p>0{{ doctorInfo.diagnosisNum }}</p>
        </div>
        <div>
          <p>评论率</p>
          <p>0{{ doctorInfo.praiseRate }}%</p>
        </div>
        <div>
          <p>关注</p>
          <p>0{{ doctorInfo.followNum }}</p>
        </div>
      </div>
    </div>
    <div class="picture-consult-problem">
      <p>
        病情描述&nbsp;&nbsp;
        <span>(症状表现、检查/用药和希望获得的帮助)</span>
      </p>
      <textarea maxlength="500" v-model="questionDes"></textarea>
      <div class="md-dialog">
        <div class="ways">
          <p class="info">1、咨询服务可提供相关建议。</p>
          <p class="info">2、仅为复诊患者提供诊疗服务。</p>
          <p class="info">3、为保疫情期间一线减轻，生效不退换。</p>
        </div>

        <md-agree v-model="agreeConf.checked" :disabled="agreeConf.disabled" :size="agreeConf.size" @change="onChange(agreeConf.name, agreeConf.checked, $event)">
          同意
          <a>《重庆市门特在线问诊用户协议》</a>
        </md-agree>
      </div>
    </div>

    <div style="padding:0.24rem">
      <md-button type="primary" @click="onConfirm( )" :inactive="!isShow" round style="margin-top:16px">提交描述</md-button>
    </div>
    <!-- 咨询弹窗 -->

  </div>
</template>
 <script>
const onlineDoctorDetailUrl = "sysDoctor/selectDetail";
const insertOrUpdate = 'bizConsultRecord/addRecord'
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      imSdk: this.$imsdk,
      doctorInfo: '',
      chooseId: '',
      isloading: true, // 是否显示loading
      questionDes: '',
      isShow: true,
      // 咨询弹窗
      agreeConf: {
        checked: true,
        name: 'agree0',
        size: 'md',
        disabled: false,
        introduction: '选中状态',
      },
    };
  },
  computed: {


    ...mapGetters(['toAccount', 'currentConversationType']),
    ...mapState({
      // memberList: state => state.group.currentMemberList,
      currentMessageList: state => state.conversation.currentMessageList,
      userID: state => state.user.userID
    })
  },
  mounted() {
    this.init();
    if (typeof (this.$store.state.accountInfo) == 'string') {
      this.chooseId = JSON.parse(this.$store.state.accountInfo).id;
    } else {
      this.chooseId = this.$store.state.accountInfo.id;
    }
    // 注册用户
    this.imSdk.registerUser('p' + this.chooseId, this.$store.state.accountInfo.name, () => {
      this.imSdk.createUserConnect('p' + this.chooseId, '123456', {
        userConnectCallback: () => {
          // 拿到消息列表之后的回调
          this.imSdk.openSession(
            this.$store.state.accountInfo.name,
            'd' + this.$route.query.id,
            this.$route.query.name,
            {
              getMessageCallback: () => {
                this.$store.commit('selectTestFun', this.imSdk.messageList);
              }
            }
          )

        }
      })
    })

  },

  methods: {
    onChange(name, checked) {
      console.log(`agree name = ${name} is ${checked ? 'checked' : 'unchecked'}`)
    },
    // 取消按钮
    onCancel() {
      this.basicDialog.open = false;
    },
    // 点击申请咨询按钮
    onConfirm() {
      this.isShow = false;
      if (this.questionDes.replace(/\s*/g, '').length == 0) {
        this.$toast.info("请输入问题")
        this.isShow = true;
        return
      }
      if (!this.agreeConf.checked) {
        this.$toast.info("请勾选协议")
        this.isShow = true;
        return
      }

      let data = {};
      data.doctorId = Number(this.$route.query.id);
      data.question = this.questionDes;
      data.patientId = this.chooseId;
      data.status = 0;
      this.$axios.post(insertOrUpdate, data).then((res) => {
        if (res.data.code == '200') {
          this.$toast.info("提交成功");
          this.isShow = false;
        } else {
          this.isShow = true;
          this.$toast.info(res.data.msg)
        }
      }).catch(function (err) {
        console.log(err);
      });
      var myDate = new Date;
      var year = myDate.getFullYear(); //获取当前年
      var mon = myDate.getMonth() + 1; //获取当前月
      var date = myDate.getDate(); //获取当前日
      var h = myDate.getHours();//获取当前小时数(0-23)
      var m = myDate.getMinutes();//获取当前分钟数(0-59)
      //  var s = myDate.getSeconds();//获取当前秒
      // var ms = myDate.getMilliseconds();//获取当前毫秒
      let msg = {
        type: 'questionDes',
        text: this.questionDes,
        userInfo: this.$store.state.accountInfo,
        date: year + '-' + mon + '-' + date + '-' + h + '-' + m,
      }
      this.isShow = false;
      this.imSdk.send(msg)

      // this.$store.commit('selectTestFun',  );

      setTimeout(() => {
        this.$router.push({
          name: 'chatRoom',
          query: {
            id: this.$route.query.id,
            name: this.$route.query.name
          }
        })
      }, 1000);
      this.isShow = true;


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

    handleConfirm(val) { //点击医生调用此方法，跳转到聊天页面
      if (this.questionDes.replace(/\s*/g, '').length == 0) {
        this.$toast.info("请输入问题")
        return
      }
      this.basicDialog.open = true;
      // this.userID = ''
    },



  }
}
 </script>
 <style lang='scss' scoped>
.doctor-detail {
  margin-top: 100px;
  .picture-consult-problem {
    padding: 40px;
    overflow: hidden;
    border-bottom: 1px solid #ededed;
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
      border: 1px solid #ededed;
      padding: 10px;
    }
  }
  .gray {
    font-size: 26px;
    line-height: 55px;
  }
  .doctor-item {
    padding: 0 24px;
    background: #ffffff;
    margin-bottom: 20px;
    .title {
      color: #000;
      font-weight: bold;
      font-size: 30px;
    }
  }
  .doctor-info {
    height: 300px;
    background-image: url("~@/assets/images/bg2.png");
    background-size: 100%;
    background-repeat: no-repeat;
    color: #ffffff;
  }
  .doctor-info-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 40px;
    padding-left: 35px;
    .doctor-info-header {
      margin-right: 20px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
        border: 3px solid #ffffff;
      }
    }
    .doctor-info-content {
      font-size: 32px;
      line-height: 50px;
      flex: 1;
      .gray span {
        margin-right: 20px;
      }
    }
  }
  .doctor-info-bottom {
    display: flex;
    margin-top: 30px;
    > div {
      flex: 1;
      color: #fffcfc;
      &:last-child {
        border-right: none;
      }
      p {
        text-align: center;
        font-size: 24px;
        color: #fffcfc;
        line-height: 45px;
      }
    }
  }
}
.md-dialog {
  .md-dialog-text {
    flex-wrap: wrap;
    .info {
      width: 100%;
    }
  }
}
.md-dialog {
  p {
    text-align: center;
    color: #000;
    line-height: 50px;
  }
  .money {
    color: #ff9b00;
  }
  .ways {
    p {
      color: #999;
      text-align: left;
      font-size: 24px;
    }
  }
  .md-agree {
    /deep/ .md-agree-content {
      color: #999;
      font-size: 24px;
    }
  }
}
</style>