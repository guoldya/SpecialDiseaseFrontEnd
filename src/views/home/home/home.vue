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
        <!-- <p>{{item.code}}</p> -->
        <p class="dise">{{item.diseaseName}}</p>
        <p class="dise">{{item.idCard}}</p>
        <!-- <p @click="switchCard(index)">切换门特患者</p> -->
        <img class="qiehuan" src="@/assets/images/qiehuan.png">
      </div>
    </div>
    <doctorList v-for="(item, index) in listdata" :datas="item" :key="index"></doctorList>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import doctorList from "../../../components/doctorList";
let bizPatientRegisterselectCount = "/bizPatientRegister/selectCount";
let doctorlistURL = '/sysDoctor/selectDoctorByPatient'
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
      listdata: '',
      getInfo: '',
    }
  },
  computed: {
    ...mapState({
      _cardlist: state => state.home.cardList,
      _departList: state => state.home.departList,
      // _accountinfo: state => state.my.accountinfo,
    }),
  },
  created() {
    console.log(this._cardlist, "sssssssssssssss", this._cardlist.length)
  },
  async mounted() {
    // await this.$store.dispatch('getCards', { update: true });
    await this.$store.dispatch('getCards', { update: true });
    // await this.$store.dispatch('getDepart', { update: true });
    this.getInfo = JSON.parse(sessionStorage.getItem('objInfo'));
    if (this.getInfo) {
      if (this.getInfo.id) {
        this.chooseId = this.getInfo.id;
      }
    } else {
      if (this._cardlist.length == 0) {
        return
      }
      this.chooseId = this._cardlist[0].id;
      let setInfo = JSON.stringify(this._cardlist[0])
      sessionStorage.setItem('objInfo', setInfo)
    }
    // this.homeNumber(2);
    this.homeNumber(this.chooseId);
  },
  components: {
    doctorList
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
        let res = await this.$axios.put(doctorlistURL, {
          patientId: data
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
  background: url("~@/assets/images/bg.png") no-repeat 100%;
  background-size: cover;
  img {
    width: 100%;
    height: 100%;
  }
}
.homePage {
  margin-top: -90px;
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
    line-height: 55px;
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
    color:#fff;
  }
}
</style>