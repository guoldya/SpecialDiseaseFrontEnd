<template>
  <div class="margin55   outpationinfo">
    <Header post-title="订单详情"></Header>

    <div v-show="!loadingtrue">
      <div class="infobottom">
        <div class="adress-box">
          <div class="iconImg">
            <img class="addPic" src="@/assets/images/user_center4.png" alt="">
          </div>
          <div class="adress-content">
            <p>
              您的订单已经准备就绪
            </p>
            <p class="time"> {{reportInfoData.createTime|lasttime}}</p>
          </div>
          <div class="addImg nextImg" @click="acceptAdd()">
            <img src="@/assets/images/icon_more2@2x.png" alt="">
          </div>
        </div>

      </div>
      <div class="infobottom">
        <div class="adress-box">
          <div class="iconImg">
            <img class="addPic" src="@/assets/images/icon_address1.png" alt="">
          </div>
          <div class="adress-content">
            <p>
              <span> {{reportInfoData.receiver}}</span>&nbsp;
              <span> {{reportInfoData.telephone}}
              </span>
            </p>
            <p> {{reportInfoData.address}}</p>
          </div>
          <div class="addImg nextImg"  >
          </div>
        </div>
      </div>

      <div class="infobottom">
        <div class="orderinfo">
          <p>订单信息</p>
          <p>订单编号：{{reportInfoData.orderCode}}</p>
          <p>创建时间：{{reportInfoData.createTime|lasttime}}</p>
          <!-- <p>订单状态：{{reportInfoData.createTime|lasttime}}</p> -->
        </div>
      </div>
      <div class="infobottom">
        <div class="mycardlist" v-for="(item2, index2) in reportInfoData.orderDetailsList" :key="index2">
          <div class="mycardlistleft">
            <div class="img">
              <img src="@/assets/images/1.jpg" alt="">
            </div>
            <div>
              <p>{{item2.drugName}}</p>
              <p class="price">{{item2.factory}} 单价：￥{{item2.price|keepTwoNum}} </p>
            </div>
          </div>
          <div class="mycardlistright">
            <p>订单金额：￥{{item2.total|keepTwoNum}}</p>
            <p class="num">数量：{{item2.num}}</p>
          </div>
        </div>
        <div class="top">
          <p class="moneyorder">付款金额：<span>￥{{reportInfoData.totalMoney|keepTwoNum}}</span></p>
          <p class="moneyorder">配送费：￥{{reportInfoData.dispatchFee|keepTwoNum}}</p>
        </div>
      </div>
    </div>
    <Loading v-show="loadingtrue"></Loading>
  </div>
</template>
<script>
import { mapState } from 'vuex';

let bizLisReportreaddetail = '/api/hos/bizOrder/read/detail'
export default {
  data() {
    return {
      reportInfoData: '',
      loadingtrue: true,
      isTijiao: true,

    };
  },
  computed: {

  },
  created() {

  },
  mounted() {
    this.checkReportDetail();
  },
  methods: {
    checkReportDetail() {
      let checkParams = {};
      checkParams.id = parseInt(this.$route.query.id);
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
  margin: 20px 24px;
  line-height: 50px;
  .orderinfo {
    padding: 24px;
  }
}

.adress-box {
  background: #ffffff;
  padding: 24px;
  display: flex;
  align-items: center;
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .iconImg {
    align-items: center;
    margin-right: 25px;
    img {
      width: 50px;
    }
  }
  .adress-content {
    font-size: 28px;
    line-height: 50px;
    flex: 0 0 500px;
  }
  .addImg {
    img {
      width: 20px;
    }
  }
}
.mycardlist {
  display: flex;
  justify-content: space-between;
  border-radius: 17px;
  margin-bottom: 20px;
  line-height: 50px;
  background: #ffffff;
  padding: 24px;

  .mycardlistright {
    text-align: right;
    font-size: 26px;
    .num {
      font-size: 24px;
      color: #979797;
    }
  }
  .mycardlistleft {
    display: flex;
    justify-content: space-between;
    .img {
      width: 100px;
      height: 100px;
      margin-right: 20px;
      img {
        width: 100%;
      }
    }
    .price {
      font-size: 24px;
      color: #979797;
    }
  }
}
.top {
  border-top: 1px solid #ededed;
  padding: 20px 0;
}
.moneyorder {
  text-align: right;
  padding-right: 24px;
  font-size: 24px;
  span {
    font-size: 36px;
    color: #f74749;
  }
}
.time{
  font-size: 24px;
  color: #979797
}
</style>