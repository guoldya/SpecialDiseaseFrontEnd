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
        问题描述&nbsp;&nbsp;
        <span>(症状表现、检查/用药和希望获得的帮助)</span>
      </p>
      <textarea maxlength="500" v-model="questionDes"></textarea>
    </div>
    <div style="padding:0.24rem">
      <md-button type="primary" @click="handleConfirm" round style="margin-top:16px">提交问题</md-button>
    </div>
  </div>
</template>
 <script>
const onlineDoctorDetailUrl = "sysDoctor/selectDetail";
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      doctorInfo: '',
      isloading: true, // 是否显示loading
      questionDes: '',
    };
  },
  computed: {
    ...mapGetters(['toAccount', 'currentConversationType']),
    ...mapState({
      // memberList: state => state.group.currentMemberList,
      userID: state => state.user.userID
    })
  },
  mounted() {
    this.init();
  },

  methods: {
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

    handleConfirm() { //点击医生调用此方法，跳转到聊天页面
      if (this.userID !== '@TIM#SYSTEM') {
        // 查找医生是否在线
        // this.$store.dispatch('checkoutConversation', `C2C${this.userID}`)
        const message = this.tim.createTextMessage({
          to: this.toAccount,
          conversationType: 'TIMTextElem',
          payload: { text: this.questionDes },
        })
        this.$store.dispatch('checkoutConversation', `C2Cuser3`).then(() => {
          console.log("执行这里面")
          this.showDialog = false
          this.$store.commit('pushCurrentMessageList', message)
          this.tim.sendMessage(message).catch(error => {
            this.$store.commit('showMessage', {
              type: 'error',
              message: 'ssssss'
            })
          })
          this.$router.push({
            name: 'chatRoom'
          })
        }).catch(() => {
          this.$store.commit('showMessage', {
            message: '没有找到该用户',
            type: 'warning'
          })
        })
      } else {
        this.$store.commit('showMessage', {
          message: '没有找到该用户',
          type: 'warning'
        })
      }
      this.userID = ''
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
</style>