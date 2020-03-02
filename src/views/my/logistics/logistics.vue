<template>
  <div class="margin55">
    <Header post-title="物流详情"></Header>
    <div class="infobottom">

      <p>
        <span>收货名</span>
        <span> {{reportInfoData.receiver}}</span>

      </p>
      <p>
        <span>联系电话</span>
        <span> {{reportInfoData.telephone}} </span>
      </p>

      <p>
        <span>收件地址</span>
        <span>{{reportInfoData.address}}</span>
      </p>

    </div>

    <div class="package-status">
      <div class="status-box">
        <ul class="status-list">
          <li>
            <div class="status-content-before">您的订单开始处理</div>
            <div class="status-time-before">2017-08-17 23:31 周四</div>
            <div class="status-line"></div>
          </li>
          <li>
            <div class="status-content-before">卖家发货</div>
            <div class="status-time-before">2017-08-18 09:11 周五</div>
            <div class="status-line"></div>
          </li>
          <li>
            <div class="status-content-before">发往深圳中转站</div>
            <div class="status-time-before">2017-08-19 01:21 周六</div>
            <div class="status-line"></div>
          </li>
          <li>
            <div class="status-content-before">到达深圳</div>
            <div class="status-time-before">2017-08-19 06:21 周六</div>
            <div class="status-line"></div>
          </li>
          <li>
            <div class="status-content-before">发往潮汕中心</div>
            <div class="status-time-before">2017-08-19 09:21 周六</div>
            <div class="status-line"></div>
          </li>
          <li class="latest">
            <div class="status-content-latest">快件到达 潮汕中心</div>
            <div class="status-time-latest">2017-08-20 14:16 周日</div>
            <div class="status-line"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>
<script>
let bizLisReportreaddetail = 'bizOrder/read/detail'
export default {
  data() {
    return {
      reportInfoData: '',
    };
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
<style lang="scss" scoped>
ul li {
  list-style: none;
}

.package-status {
  padding: 30px 24px;
  margin: 24px;
  background: #ffffff;
  border-radius: 20px;
}

.package-status .status-list {
  margin: 0;
  padding: 0;
  margin-top: -5px;
  padding-left: 8px;
  list-style: none;
}

.package-status .status-list > li {
  border-left: 2px solid #0278d8;
  text-align: left;
}

.package-status .status-list > li:before {
  /* 流程点的样式 */
  content: "";
  border: 8px solid var(--primary);
  background-color: var(--primary);
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 10px;
  margin-left: -11px;
  margin-right: 10px;
  top:-5px;
}

.package-status .status-box {
  overflow: hidden;
}

.package-status .status-list > li {
  height: 110px;
  width: 95%;
  
}

.package-status .status-list {
  margin-top: -8px;
}

.package-status .status-box {
  position: relative;
}

.package-status .status-box:before {
  content: " ";
  background-color: #f3f3f3;
  display: block;
  position: absolute;
  top: -8px;
  left: 20px;
  width: 10px;
  height: 4px;
}

.package-status .status-list {
  margin-top: 0px;
}

.status-list > li:not(:first-child) {
  padding-top: 10px;
}

.status-content-before {
  text-align: left;
  margin-left: 25px;
  margin-top: -20px;
}

.status-content-latest {
  text-align: left;
  margin-left: 25px;
  color: #0278d8;
  margin-top: -20px;
}

.status-time-before {
  text-align: left;
  margin-left: 25px;
  font-size: 10px;
  margin-top: 5px;
}

.status-time-latest {
  text-align: left;
  margin-left: 25px;
  color: #0278d8;
  font-size: 10px;
  margin-top: 5px;
}

.status-line {
 
  margin-left: 25px;
  margin-top: 10px;
}

.list {
  padding: 0 20px;
  margin: 10px 0 0 25px;
  border: 1px solid #ebebeb;
}

.list li {
  line-height: 30px;
  color: #616161;
}
.infobottom {
  background: #fff;
  padding: 30px 24px;
  border-radius: 17px;
  margin: 20px 24px;
  line-height: 50px;
  p {
    display: flex;
    word-break: break-all;
    :first-child {
      flex: 0 0 170px;
    }
  }
}
</style>