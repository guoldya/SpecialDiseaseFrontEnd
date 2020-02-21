<style scoped>
@import "home.css";
</style>
<template>
  <div class="home">
    <div class="homeheader">
      <p>医院门特在线</p>
    </div>
    <div class="hometop">
      <!-- <img src="@/assets/images/zhuce.png" alt=""> -->
    </div>
    <div class="homePage">
      <div class="homeCard bindCard  ">
        <span class="bindCardBtn" @click="addpeple">添加就诊人</span>
      </div>
      <div class="cardPositon"> </div>
      <!-- 测试的code：{{code}} -->
    </div>
    <div class="cardhome">
      <div class="left">
        <p>申请病种</p>
        <p>门特周期</p>
        <p>状态</p>
      </div>
      <div class="right">
        <p @click="doctorlist()">高血压>></p>
        <p>2010.01.01-2105.0202</p>
        <p>状态</p>
      </div>
    </div>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>
<script>
import { mapState } from 'vuex';
let bizPatientRegisterselectCount = "/api/hos/bizPatientRegister/selectCount";
export default {
  data() {
    return {
      link2: "12", // 二维码2
      code: 'ss',
      showPic: false,
      showindex: 0,
      cardLoading: false,
      isDown: false,
      chooseId: '',
      picName: '',
      homeList: {
        notPayCount: 0,
        notReadMessageCount: 0,
        notReadPacsReport: 0,
        notSignCount: 0,
      },
      getInfo: '',
    }
  },
  computed: {
    ...mapState({
      // _cardlist: state => state.home.cardList,
      // _accountinfo: state => state.my.accountinfo,
    }),
  },
  created() {

  },
  async mounted() {


    this.getInfo = JSON.parse(sessionStorage.getItem('objInfo'));
    if (this.getInfo) {
      if (this.getInfo.id) {
        this.chooseId = this.getInfo.id;
        this.link2 = this.getInfo.cardNo;
      }
    } else {
      if (this._cardlist.length == 0) {
        return
      }
      this.chooseId = this._cardlist[0].id;
      this.link2 = this._cardlist[0].cardNo;
      let setInfo = JSON.stringify(this._cardlist[0])
      sessionStorage.setItem('objInfo', setInfo)
    }
    this.homeNumber(this.chooseId);
  },
  methods: {
    doctorlist() {
      let argu = {};
      this.$router.push({
        name: 'doctorlist',
        query: argu
      });
    },
    async homeNumber(data) {
      try {
        let res = await this.$axios.put(bizPatientRegisterselectCount, {
          cardId: data ? data : this.getInfo.id
        }, {
          TOKEN: localStorage.getItem("token7")
        });
        if (res.data.code != 200) {
          throw Error(res.data.msg);
        }
        this.homeList = res.data.data;
        this.$store.commit('homeListFun', this.homeList.notPayCount + this.homeList.notReadMessageCount + this.homeList.notReadPacsReport + this.homeList.notSignCount);

      } catch (error) {
        console.log(error);
      }
    },
    testRegist() {
      if (sessionStorage.getItem('openid')) {
        this.$dialog.confirm({
          title: '提示',
          content: '您还没有绑定手机，立即绑定',
          confirmText: '确定',
          cancelText: '取消',
          onConfirm: () => {
            this.$router.push({
              name: 'register',
              query: { openid: sessionStorage.getItem('openid'), accessToken: sessionStorage.getItem('accessToken') }
            });
          },
        });
        return false
      }
      if (!this._accountinfo.idCard) {
        this.$toast.info("请先实名")
        return false
      }
      if (this._cardlist.length == 0) {
        this.$toast.info("请绑定就诊卡")
        return false
      }
      return true

    },
    choosedepart() {
      if (!this.testRegist()) {
        return
      }
      let argu = {};
      this.$router.push({
        name: 'choosedepart',
        query: argu
      });
    },
    showPicFun(data) {
      this.link2 = data.cardNo;
      this.picName = data.patientName;
      this.showPic = true;
    },
    switchCard(index) {
      let current = this._cardlist[index + 1];
      if (!current) {
        current = this._cardlist[0]
      }
      this.homeNumber(this.chooseId);
      this.chooseId = current.id;
      let setInfo = JSON.stringify(current)
      sessionStorage.setItem('objInfo', setInfo)
    },

    addpeple() {
      this.$router.push({
        name: 'addpeple',
        query: {}
      });

    }



  },



}
</script>
<style lang="scss" scoped>
.homeheader {
  height: 100px;
  color: #fff;
  text-align: center;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  line-height: 80px;
}
.hometop {
  width: 100%;
  height: 370px;
  background: url("~@/assets/images/zhuce.png") no-repeat 100%;
  background-size: cover;
  img {
    width: 100%;
    height: 100%;
  }
}
.homePage {
  margin-top: -130px;
}
.bindCard {
  width: 94%;
  margin-left: 3%;
  z-index: 999;
  background: #fff;
  height: 240px;
  text-align: center;
  line-height: 240px;
  border-radius: 20px;
  box-shadow: 0 0 17px rgba(20, 19, 51, 0.1);
}

.bindCard .bindCardBtn {
  padding: 17px 35px;
  background: #2f86f6;
  border-radius: 40px;
  color: #fff;
  letter-spacing: 1px;
  font-size: 30px;
}
.cardhome {
  width: 94%;
  margin-left: 3%;
  border-radius: 20px;
  box-shadow: 0 0 17px rgba(20, 19, 51, 0.1);
  padding: 24px;
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  line-height: 50px;
  background: #fff;
  .left {
    text-align: right;
    margin-right: 20px;
  }
  .right {
    text-align: left;
    flex-grow: 2;
    margin-left: 40px;
  }
}
</style>