<style scoped>
@import "home.css";
</style>
<template>
  <div class="home">
    <!-- <div class="homeheader">
      <p>医院门特在线</p>
    </div> -->
    <div class="hometop">
    </div>
    <div class="homePage" v-if=" _cardlist.length==0">
      <div class="homeCard bindCard  ">
        <span class="bindCardBtn" @click="addpeple">添加门特患者</span>
      </div>
      <div class="cardPositon"> </div>
      <!-- 测试的code：{{code}} -->
    </div>
    <!-- <div class="homePage" v-if=" _cardlist.length!=0"> -->
    <div class="homePage" v-if=" _cardlist.length!=0">
      <div class="cardhome" v-for="(item, index) in  _cardlist" v-if="item.id==chooseId" :key="'cardlist' + index">
        <p class="name">{{item.name}}
          <span class="code">{{item.code}}</span>
        </p>

        <p class="dise">{{item.diseaseName}}</p>
        <p class="dise">{{item.idCard}}</p>
        <img class="qiehuan" @click="switchCard(index)" src="@/assets/images/qiehuan.png">
      </div>
    </div>
    <p class="doctorlisttitle">
      <span>医生列表</span>
      <!-- <span @click="$router.push({name:'doctorlist'})">更多<img src="@/assets/images/more.png" alt=""></span> -->
    </p>
    <div class="bg3">
      <img src="@/assets/images/bg3.png" alt="">
    </div>
    <doctorList v-for="(item, index) in listdata" :datas="item" :key="index"></doctorList>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>
<script>
import { mapState } from 'vuex';


let doctorlistURL = 'sysDoctor/selectDoctorByPatient'
export default {
  data() {
    return {

      code: 'ss',
      showPic: false,
      showindex: 0,
      cardLoading: false,
      isDown: false,
      chooseId: '',
      picName: '',
      listdata: '',
      getInfo: '',
    }
  },
  computed: {
    ...mapState({
      _cardlist: state => state.home.cardList,
      // _departList: state => state.home.departList,
      // _accountinfo: state => state.my.accountinfo,
    }),
  },

  async mounted() {
    // await this.$store.dispatch('getCards', { update: true });
    await this.$store.dispatch('getCards', { update: true });
    // await this.$store.dispatch('getDepart', { update: true });

    console.log(typeof (this.$store.state.accountInfo), this.$store.state.accountInfo.id, "ssssssssss")

    if (this.$store.state.accountInfo) {
      if (typeof (this.$store.state.accountInfo) == 'string') {
        this.chooseId = JSON.parse(this.$store.state.accountInfo).id;
      } else {
        this.chooseId = this.$store.state.accountInfo.id;
      }

    } else {
      if (this._cardlist.length == 0) {
        return
      }
      this.chooseId = this._cardlist[0].id;
      // let setInfo = JSON.stringify(this._cardlist[0])
      // sessionStorage.setItem('objInfo', JSON.parse(setInfo))

      this.$store.commit('accountInfoFun', this._cardlist[0])//已登录
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
      console.log("ddddddddddddd")
      try {
        let res = await this.$axios.put(doctorlistURL, {

          patientId: data ? data : this.chooseId
        });
        if (res.data.code != 200) {
          throw Error(res.data.msg);
        }
        this.listdata = res.data.rows;

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

    switchCard(index) {
      let current = this._cardlist[index + 1];
      if (!current) {
        current = this._cardlist[0]
      }

      this.chooseId = current.id;
      this.homeNumber(this.chooseId);
      // let setInfo = JSON.stringify(current)
      // sessionStorage.setItem('objInfo', setInfo)
      this.$store.commit('accountInfoFun', current)//已登录
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
  background: url("~@/assets/images/bg.png") no-repeat 100%;
  background-size: cover;
  img {
    width: 100%;
    height: 100%;
  }
}
.homePage {
  margin-top: -90px;
  height: 196px;
}
.bindCard {
  width: 94%;
  margin-left: 3%;
  z-index: 999;
  background: #fff;
  height: 240px;
  text-align: center;
  line-height: 240px;
  border-radius: 10px;
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
  position: relative;
  width: 94%;
  margin-left: 3%;
  border-radius: 10px;
  box-shadow: 0 0 17px rgba(20, 19, 51, 0.1);
  padding: 24px;
  // display: flex;
  // justify-content: flex-start;
  margin-top: 20px;
  line-height: 40px;
  background: #fff;
  height: 196px;
  .name {
    font-size: 35px;
    font-weight: bold;
    color: rgba(37, 44, 58, 1);
    line-height: 55px;
  }
  .dise {
    font-size: 26px;
    color: rgba(138, 138, 138, 1);
    line-height: 45px;
  }
  .qiehuan {
    width: 146px;
    height: 39px;
    position: absolute;
    right: 0;
    top: 20px;
  }
  .code {
    padding: 3px 15px;
    background: #9ac3ff;
    border-radius: 5px;
    font-size: 17px;
    color: #fff;
  }
}
.doctorlisttitle {
  margin: 24px;
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  :first-child {
    position: relative;
    padding-left: 15px;
  }
  :first-child::before {
    position: absolute;
    z-index: 1;
    content: "";
    width: 6px;
    height: 30px;
    top: 3px;
    left: 0px;
    background: url("~@/assets/images/shuxian.png") no-repeat 100%;
    background-size: cover;
  }
  :last-child {
    color: #979797;
    font-size: 28px;
    position: relative;
    img {
      width: 30px;
    }
  }
}
.bg3 {
  img {
    width: 100%;
    padding: 24px;
    margin-top: -70px;
  }
}
</style>