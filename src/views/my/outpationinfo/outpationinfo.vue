<template>
  <div class="margin55   outpationinfo">
    <Header post-title="处方详情"></Header>
    <div class="outpationcard">
      <div class="outpationcard-top">
        <p>
          <span>姓名：{{reportInfoData.patientName}} </span>
          <span>性别：{{reportInfoData.sex}}</span>
          <span>年龄：{{reportInfoData.age}}</span>
        </p>
        <p>
          <span>科室：{{reportInfoData.dept}}</span>
          <span>费别：{{reportInfoData.feeType}}</span>

        </p>
        <p>
          <span>处方号：{{reportInfoData.code}}</span>
          <span>门诊号：{{reportInfoData.clinicNo}}</span>
        </p>
        <p>
          <span>临床诊断：{{reportInfoData.diag}}</span>
        </p>
      </div>

      <div>
        <p class="name">RP:</p>
        <div class="mycardlist" v-for="(item,index) in reportInfoData.recipeDetails" :key="index">
          <div class="mycardlistleft">
            <div>
              <p>{{item.name}}</p>
              <p class="num">用法：{{item.spec}} {{item.usage}} {{item.freq}}</p>
            </div>
          </div>
          <div class="mycardlistright">
            <p>规格：{{item.spec}}</p>
            <p class="num">数量：{{item.total}}{{item.unit}}</p>
          </div>

        </div>

        <p class="totalmoney">合计：<span>{{reportInfoData.totalMoney|keepTwoNum}}元</span> </p>
        <div class="bottom">
          <p>
            <span>医师：{{reportInfoData.doctorName}}</span>
            <span>药师：{{reportInfoData.druggistName}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="infobottom" v-show="this.$route.query.status==0">
      <!-- <p>请完善收件人信息</p> -->
      <div class="submitUser" v-if="_selectAdress.receiver">
        <div class="adress-box">
          <div class="iconImg">
            <img class="addPic" src="@/assets/images/icon_address1.png" alt="">
          </div>
          <div class="adress-content">
            <p>
              <span>{{_selectAdress.receiver}}</span>&nbsp;
              <span>{{_selectAdress.mobile}}
                <span v-show="_selectAdress.isDefault==1" class="default">
                  默认
                </span>
              </span>
            </p>
            <p>{{_selectAdress.address}}</p>
          </div>
          <div class="addImg nextImg" @click="acceptAdd()">
            <img src="@/assets/images/icon_more2@2x.png" alt="">
          </div>
        </div>
      </div>
      <div class="submitUser" v-else>
        <div class="adress-box" @click="toAddress()">
          <div class="iconImg">
            <img class="addPic" src="@/assets/images/icon_address1.png" alt="">
          </div>
          <div class="adress-content">
            <p>
              添加收货地址
            </p>
          </div>
          <div class="addImg nextImg">
            <img src="@/assets/images/icon_more2@2x.png" alt="">
          </div>
        </div>
      </div>

    </div>
    <md-dialog title="提示" :closable="false" v-model="actDialog.open" :btns="actDialog.btns">
      是否确定记账
    </md-dialog>
    <div style="padding:0.24rem"  v-show="this.$route.query.status==0">>
      <md-button type="primary" @click="tijiao" round style="margin-top:16px">处方确认记账</md-button>
    </div>
    <Loading v-show="loadingtrue"></Loading>
  </div>
</template>
<script>
import { mapState } from 'vuex';
let bizLisReportreaddetail = '/api/sds/bizRecipeDetails/selectDrugListByRecipeId';
let appshippingAddressaddressList = "/api/sds/bizShippingAddress/addressList";
let recipeAccounting = '/api/sds/bizRecipe/recipeAccounting'
export default {
  data() {
    return {
      reportInfoData: '',
      loadingtrue: true,
      isTijiao: true,
      actDialog: {
        open: false,
        btns: [
          {
            text: '取消',
          },
          {
            text: '确定',
            // warning: true,
            handler: this.onActConfirm3,
          },
        ],
      }



    };
  },
  computed: {
    ...mapState({
      _selectAdress: state => state.selectAdress,
    }),
  },
  created() {
    console.log(this._selectAdress, "ssssssssssss")
    if (!this._selectAdress.receiver) {
      this.$axios.put(appshippingAddressaddressList, {}).then((res) => {
        this.loadingtrue = false;
        if (res.data.code == '200') {
          if (res.data.rows.length != 0) {
            this.addressInfo = res.data.rows;
            this.$store.commit('selectAdressFun', this.addressInfo.filter(item => item.isDefault == 1)[0]);
            //this.$store.commit('selectAdressFun', res.data.rows[0]);
          }
        } else {
          console.log(res.msg);
        }


      }).catch(function (err) {
        console.log(err);
      });
    }
  },
  mounted() {
    this.checkReportDetail();
  },
  methods: {
    tijiao() {
      this.actDialog.open = true;
    },


    acceptAdd() {
      let argu = { checked: 1 };
      this.$router.push({
        name: 'adress',
        query: argu
      });
    },
    toAddress() {
      let argu = { addadress: 1 };
      this.$router.push({
        name: 'adressinfo',
        query: argu
      });
    },
    checkReportDetail() {

      let checkParams = {};
      checkParams.recipeId = parseInt(this.$route.query.id);
      this.$axios.put(bizLisReportreaddetail, checkParams, {
      }).then((res) => {
        if (res.data.code == '200') {
          this.loadingtrue = false;
          this.reportInfoData = res.data.data;
        }
      }).catch(function (err) {
        console.log(err);
      });

    },

    onActConfirm3() {
      this.isTijiao = false;
      this.actDialog.open = false;
      if (!this._selectAdress.receiver) {
        this.$toast.info("请完善信息")
        this.isTijiao = true;
      } else {
        let params = {};
        params.recipeId = parseInt(this.$route.query.id);
        params.id = parseInt(this._selectAdress.id);
        this.$axios.post(recipeAccounting, params).then(res => {
          if (res.data.code == '200') {
            this.$router.go(-1);
            this.isTijiao = true;
            this.$toast.info('记账成功');
          } else {
            this.$toast.info(res.data.msg);
          }

        }).catch(function (err) {
          console.log(err);
        });
      }


    }
  }
}
</script>
<style  lang="scss"  scoped>
.outpationcard {
  background: #fff;
  border-radius: 17px;
  margin: 24px;
  padding: 30px 24px;
  line-height: 50px;
  .name {
    font-size: 36px;
    margin-top: 40px;
  }
  .outpationcard-top {
    p {
      display: flex;
      justify-content: space-between;
    }
  }
}
.mycardlist {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  line-height: 50px;
  .num {
    font-size: 24px;
    color: #979797;
  }
  .mycardlistright {
    text-align: right;
    font-size: 26px;
  }
}
.bottom {
  border-top: 1px solid #979797;
  p {
    line-height: 70px;
    display: flex;
    justify-content: space-between;
  }
}
.totalmoney {
  margin-bottom: 20px;
  text-align: right;
  span {
    font-size: 36px;
    color: #f74749;
  }
}
.infobottom {
  background: #fff;
  // padding: 30px 24px;
  border-radius: 17px;
  margin: 10px 24px;
  line-height: 50px;
}

.adress-box {
  background: #ffffff;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 17px;
  .iconImg {
    align-items: center;
    img {
      width: 50px;
    }
  }
  .adress-content {
    font-size: 28px;
    line-height: 50px;
    flex: 0 0 500px;
    .default {
      font-size: 24px;
      color: var(--primary);
      padding: 0 7px;
      border-radius: 5px;
      background: rgba(29, 161, 243, 0.31);
    }
  }
  .addImg {
    img {
      width: 20px;
    }
  }
}
</style>