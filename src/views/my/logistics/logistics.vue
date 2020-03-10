<template>
  <div class="margin55">
    <Header post-title="物流详情"></Header>
    <div class="infobottom">
      <p>
        <span>收货名</span>
        <span>{{reportInfoData.receiver}}</span>
      </p>
      <p>
        <span>联系电话</span>
        <span>{{reportInfoData.telephone}}</span>
      </p>

      <p>
        <span>收件地址</span>
        <span>{{reportInfoData.address}}</span>
      </p>
    </div>

    <div class="package-status">
      <div class="status-box" v-if="LogisticsData.length>0">
        <ul class="status-list"></ul>
      </div>
      <div class="noDataDiv" v-else>
        <img class="notfound" src="@/assets/images/notfound.png" alt />
        <div class="nomore">暂无物流信息</div>
      </div>
    </div>
  </div>
</template>
<script>
let bizLisReportreaddetail = "bizOrder/read/detail";
let readExpressDelivery = "bizOrder/read/expressDelivery";
import $ from "jquery";
export default {
  data() {
    return {
      reportInfoData: "",
      LogisticsData: []
    };
  },
  mounted() {
    this.checkReportDetail();
  },
  methods: {
    checkReportDetail() {
      let checkParams = {};
      checkParams.id = parseInt(this.$route.query.id);
      this.$axios
        .put(bizLisReportreaddetail, checkParams, {})
        .then(res => {
          if (res.data.code == "200") {
            this.loadingtrue = false;
            this.reportInfoData = res.data.data;
            this.getLogistics();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getLogistics() {
      let jogistics = {
        mobile: this.reportInfoData.telephone, //15523759451,
        number: this.reportInfoData.logisticsNo //773025677672954 ,
      };
      this.$axios
        .put(readExpressDelivery, jogistics, {})
        .then(res => {
          if (res.data.code == "200") {
            this.loadingtrue = false;
            this.LogisticsData = res.data.data.list;
            const telReg = /((?:0[1-9][0-9]{1,2}- )?[2-8][0-9]{6,7}$)|(1[3-9][0-9]{9}$)/g; //固话加手机正则
            let current = ""; //匹配项
            this.LogisticsData.map((item, index) => {
              if (telReg.test(item.status))
                current = item.status.match(telReg)[0];
              item.status = item.status.replace(
                current,
                `<a href=" tel :${current}" style="color :#0A7DE6 ">` +
                  current +
                  `</a>`
              );
            });
            var deliver1 =
              `<li>
            <div class="status-time-before">` +
              this.LogisticsData[0].time +
              `<span></span></div>
            <div class="status-content-before">` +
              this.LogisticsData[0].status +
              `</div>
            <div class="status-line"></div>
          </li>`;
            $(".status-list").html(deliver1); //清空ul并添加最新一条物流信息
            for (var i = 1; i < this.LogisticsData.length; i++) {
              var deliver =
                `<li>
                <div class="status-time-before">
                  <div>` +
                this.LogisticsData[i].time +
                `</div> <span></span></div>
                  <div class="status-content-before">` +
                this.LogisticsData[i].status +
                `</div>
                  <div class="status-line"></div>
                </li>`;
              //添加之前的物流轨迹
              $(".status-list").append(deliver);
            }
            // 样式
            $(".status-list li div").css({
              display: "inline-block"
            });
            $(".status-list li").css({
              display: "flex"
            });
            $(".status-list li .status-time-before").css({
              borderRight: "2px solid var(--primary--light)",
              textAlign: "center",
              position: "relative",
              width: "29%",
              paddingRight: "8px",
              paddingBottom: "10px"
            });
            $(".status-list li .status-content-before").css({
              width: "70%",
              paddingLeft: "10px",
              paddingBottom: "10px"
            });
            $(".status-list li:first-child").css({
              color: "var(--primary)"
            });
            $(".status-list li:not(:first-child)").css({
              color: "var(--primary--content)"
            });
            $(".status-list li span").css({
              border: "6px solid var(--primary)",
              backgroundColor: "var(--primary)",
              display: "inline-block",
              borderRadius: "10px",
              right: "-7px",
              top: "0",
              position: "absolute"
            });
            $(".status-list li span:not(:first-child)").css({
              border: "6px solid var(--primary--light)"
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
ul li {
  list-style: none;
}

.package-status {
  padding: 30px 12px;
  margin: 24px;
  background: #ffffff;
  border-radius: 20px;
}

.package-status .status-list {
  margin: 0;
  padding: 0;
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
  top: -5px;
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
li:before {
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
  top: -5px;
}
.noDataDiv {
  text-align: center;
  .notfound {
    width: 50%;
    margin-top: 150px;
  }
  .nomore {
    margin-left: 0;
  }
}
</style>