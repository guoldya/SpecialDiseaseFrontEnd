<!-- 医生咨询详情-->
<template>
  <div class="doctor-detail">
    <Header post-title="医生详情"></Header>
    <Loading v-if="isloading"></Loading>
    <div v-else>
      <!-- 医生信息 -->
      <div class="doctor-info">
        <div class="doctor-info-top">
          <div class="doctor-info-header">
            <img src="@/assets/images/3.jpg" alt="" />
          </div>
          <div class="doctor-info-content">
            <p>{{ doctorInfo.drName }} <span class="education">{{ doctorInfo.education }}</span></p>
            <p class="gray">
              <span>{{ doctorInfo.deptName }}</span>
            </p>
          </div>
          <div class="doctor-info-follow">
            <!-- <img v-if="!doctorInfo.followStatus" src="@/assets/images/icon_follow.png" alt="" />
            <img v-else src="@/assets/images/icon_follow_pre.png" alt="" /> -->
          </div>
        </div>
        <div class="doctor-info-bottom">
          <div>
            <p>问诊量</p>
            <p>{{ doctorInfo.consultNum }}</p>
          </div>
          <div>
            <p>好评率</p>
            <p>{{ doctorInfo.praiseRate }}%</p>
          </div>
          <div>
            <p>关注</p>
            <p>0{{ doctorInfo.followNum }}</p>
          </div>
        </div>
      </div>
      <!--擅长-->
      <!--简介  -->
      <div class="good">
        <div class="goodleft">
          <img src="@/assets/images/skill.png" alt="">
          <p>擅长：</p>
        </div>
        <div class="goodRIGHT" :class="down&&doctorInfo.expertField.length>17?'zhankai':''">
          <p>
            {{ doctorInfo.expertField }}
          </p>
        </div>
      </div>
      <div class="good">
        <div class="goodleft">
          <img src="@/assets/images/jianjie.png" alt="">
          <p>简介：</p>
        </div>
        <div class="goodRIGHT" :class="down?'zhankai':''">
          <p>
            {{ doctorInfo.profile }}
          </p>
        </div>
      </div>
      <div class="down" @click="down=!down" :class="down?'':'up'"> <img src="@/assets/images/icon_up@2x.png" alt=""></div>
      <div class="cardMobilea">
        <div class="cardMobile">
          <div class="cardMobileleft">
            <img src="@/assets/images/messge.png" alt="" />
            <div>
              <p>图文咨询<span class="money" v-if="doctorInfo.textChatPrice">￥{{doctorInfo.textChatPrice|keepTwoNum}}</span></p>
            </div>
          </div>
          <div class="cardMobileright" @click="consult({type:1,status:1})">
            <span class="consult">去咨询</span>
          </div>
        </div>
        <div class="cardMobile">
          <div class="cardMobileleft">
            <img src="@/assets/images/source.png" alt="" />
            <div>
              <p>语音问诊</p>
            </div>
          </div>
          <div class="cardMobileright">
            <span class="consult consult1">待上线</span>
          </div>
        </div>
        <div class="cardMobile">
          <div class="cardMobileleft">
            <img src="@/assets/images/video.png" alt="" />
            <div>
              <p>视频问诊</p>
            </div>
          </div>
          <div class="cardMobileright">
            <span class="consult consult1">待上线</span>
          </div>
        </div>
      </div>

      <!-- 咨询弹窗 -->

      <md-dialog :title="basicDialog.title" :closable="true" v-model="basicDialog.open" :btns="basicDialog.btns">
        <p>咨询医师-{{ doctorInfo.drName}} <span class="money">￥{{basicDialog.price|keepTwoNum}}</span></p>
      </md-dialog>

    </div>

  </div>
</template>
<script>
import { Dialog, Agree, Toast } from "mand-mobile";
const onlineDoctorDetailUrl = "sysDoctor/selectDetail";
const commentUrl = "bizOnlineServiceRecord/read/doctorRecordPage";
const followDoctorUrl = "bizDoctorFollow/followDoctor"
export default {
  data() {
    return {
      down: true,
      money: '',
      isloading: true,
      doctorInfo: {}, // 医生信息
      // 咨询弹窗
      basicDialog: {
        open: false,
        checked: true,
        title: "记账金额",
        content: '',
        price: this.$route.query.money,
        type: null, // 咨询弹窗类型 type 1 图文 2 电话 3视频
        btns: [
          {
            text: "取消",
            handler: this.onBasicCancel
          },
          {
            text: "确定",
            handler: this.onConfirm
          }
        ]
      },
      busy: false,
      chooseId: ''
    };
  },
  mounted() {
    this.init();
    if (typeof (this.$store.state.accountInfo) == 'string') {
      this.chooseId = JSON.parse(this.$store.state.accountInfo).id;
      this.$store.state.accountInfo = JSON.parse(this.$store.state.accountInfo)
    } else {
      this.chooseId = this.$store.state.accountInfo.id;
    }
  },
  methods: {
    // 初始化
    async init() {
      try {
        let id = Number(this.$route.query.id);
        let res = await this.$axios.put(onlineDoctorDetailUrl, { id });
        // await this.queryCommon();
        if (res.data.code != 200) {
          throw Error(res.data.msg);
        }
        this.doctorInfo = res.data.data;
        this.isloading = false;
      } catch (error) {
        this.isloading = false;
        console.log(error.message);
      }
    },


    // 取消按钮
    onCancel() {
      this.basicDialog.open = false;
    },
    // 点击申请咨询按钮
    onConfirm() {
      let data = {};
      data.doctorId = this.doctorInfo.id;
      data.patientId = this.chooseId;
      this.$axios.post('bizPatientBill/payOnlineConsult', data).then((res) => {
        if (res.data.code == '200') {
          this.basicDialog.open = false;
          this.$toast.info("支付成功");
          this.$router.push({
            path: "/pictureConsult",
            query: { name: this.doctorInfo.drName, start: this.$route.query.start, end: this.$route.query.end, id: this.doctorInfo.id, money: this.money, title: this.doctorInfo.title, type: this.basicDialog.type }
          });

        } else {
          this.basicDialog.open = false;
          this.$toast.info(res.data.msg)
        }
      }).catch(function (err) {
        console.log(err);
      });

    },
    // 咨询
    consult(val) {
      // if (val.status == 0) return
      this.$router.push({
        path: "/pictureConsult",
        query: { name: this.doctorInfo.drName, start: this.$route.query.start, end: this.$route.query.end, id: this.doctorInfo.id, money: this.$route.query.money, title: this.doctorInfo.title, type: this.basicDialog.type }
      });
      // if (this.$route.query.money > 0) {
      //   this.basicDialog.open = true;
      // } else {
      //   this.$router.push({
      //     path: "/pictureConsult",
      //     query: { name: this.doctorInfo.drName, start: this.$route.query.start, end: this.$route.query.end, id: this.doctorInfo.id, money: this.money, title: this.doctorInfo.title, type: this.basicDialog.type }
      //   });
      // }


    },
    async followDoctor() {
      try {
        let status = this.doctorInfo.followStatus
        this.doctorInfo.followStatus = this.doctorInfo.followStatus ? 0 : 1;
        let res = await this.$axios.post(followDoctorUrl, {
          doctorId: Number(this.$route.query.id),
          status: this.doctorInfo.followStatus
        })
        if (res.data.code != 200) {
          this.doctorInfo.followStatus = status
          throw Error(res.data.msg);
        }
        Toast.info(status ? '取消收藏成功' : '收藏成功')
      } catch (error) {

      }
    }


  },
  components: {
    Dialog
  }
};
</script>
<style lang="scss" scoped>
.doctor-detail {
  margin-top: 100px;
  background: #ffffff;
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
    // padding: 24px 40px;
  }
  .doctor-info {
    height: 300px;
    background-image: url("~@/assets/images/bg2.png");
    background-size: 100%;
    background-repeat: no-repeat;
    color: #ffffff;
    // padding: 40px 30px;
    // box-shadow: 0 0 0.18rem rgba(20, 19, 51, 0.1);
    // border-radius: 16px;
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
      font-size: 30px;
      line-height: 45px;
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
  .doctor-way {
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: 40px 40px;
    margin-top: 20px;
    .doctor-way-item {
      display: inherit;
      flex-direction: column;
      font-size: 24px;
      align-items: center;
      &.video .doctor-way-item-img {
        background: #e3e3e3;
      }
    }
    .doctor-way-item-img {
      width: 90px;
      height: 90px;
      border-radius: 45px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .doctor-way-item-money {
      margin-top: 20px;
      width: 160px;
      height: 46px;
      line-height: 46px;
      border-radius: 23px;
      text-align: center;
    }
    .doctor-way-item-image {
      border: 1px solid #1da1f2;
      color: #1da1f2;
    }
    .doctor-way-item-phone {
      border: 1px solid #16c2c2;
      color: #16c2c2;
    }
    .doctor-way-item-video {
      border: 1px solid #ffb155;
      color: #ffb155;
    }
    .doctor-way-item-disabled {
      border: 1px solid #d5d5d5;
      color: #d3d3d3;
    }
  }
  .doctor-speciality,
  .doctor-abstract,
  .doctor-comment,
  .doctor-comment-item {
    padding: 0 24px;
    background: #ffffff;
    > div {
      padding: 24px 0;
      margin-top: 20px;
    }
    .skill {
      margin-top: 0;
      padding: 0 0 24px;
    }
  }

  .doctor-comment-item-header {
    span {
      margin-right: 20px;
      &:nth-last-child(1) {
        margin-right: 0;
        float: right;
      }
    }
    .assess {
      color: var(--primary);
      border: 1px solid var(--primary);
      padding: 0px 10px;
      border-radius: 6px;
    }
  }
  .doctor-comment-item-content {
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    .ellipsis {
      overflow: hidden;
      display: -webkit-box;
      /* autoprefixer: ignore next */
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
    }
  }
  .doctor-info-follow {
    img {
      width: 40px;
      height: 40px;
    }
  }
  .loadmore {
    display: flex;
    height: 80px;
    align-items: center;
    justify-content: center;
    .nomore {
      color: #999;
      font-size: 24px;
    }
  }
}
.md-dialog {
  /deep/ .md-dialog-body {
    // padding: 0.52rem 30px 0.2rem;
    p {
      text-align: center;
      color: #000;
      line-height: 50px;
    }

    .ways {
      p {
        color: #999;
        text-align: left;
        text-indent: 30px;
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
}
.money {
  color: #ff9b00;
  font-size: 28px;
}
</style>
<style lang="scss">
.md-dialog {
  .md-dialog-text {
    flex-wrap: wrap;
    .info {
      width: 100%;
    }
  }
}
.education {
  font-size: 26px;
}
.cardMobilea {
  background: #ffffff;
  box-shadow: 0 0 0.18rem rgba(20, 19, 51, 0.1);
  border-radius: 16px;
  margin: 24px;
  .cardMobile {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ededed;
    &:last-child {
      border: none;
    }
    padding: 24px;
    .cardMobileleft {
      font-size: 32px;
      line-height: 80px;
      display: flex;
      justify-content: space-between;
      img {
        width: 81px;
        height: 81px;
        margin-right: 20px;
      }
    }
    .cardMobileright {
      .consult {
        font-size: 26px;
        color: #ffffff;
        background: #61acfa;
        padding: 10px 25px;
        border-radius: 50px;
        display: block;
        margin-top: 20px;
      }
      .consult1 {
        background: #c1c9d1;
      }
    }
  }
}
.good {
  display: flex;
  font-size: 28px;
  color: #8b8b8b;
  padding: 24px;
  line-height: 40px;
  .goodleft {
    display: flex;
    color: #232323;
    font-size: 32px;
    flex: 0 0 190px;
    line-height: 60px;
    text-align: left;
    img {
      width: 67px;
      height: 67px;
      margin-right: 20px;
    }
  }
  .goodRIGHT {
    margin-top: 10px;
    height: auto;
  }

  .zhankai {
    height: 88px;
    overflow: hidden;
  }
}
.down {
  width: 100%;
  text-align: center;
  transform: rotate(180deg);
  img {
    width: 27px;
  }
}
.up {
  transform: rotate(0);
}
</style>


