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
      <div class="status-box">
        <ul class="status-list">
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
let bizLisReportreaddetail = "bizOrder/read/detail";
let readExpressDelivery = "bizOrder/read/expressDelivery";
import $ from 'jquery'
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
        mobile: 15523759451, //this.reportInfoData.telephone,
        number: 773025677672954 //this.reportInfoData.logisticsNo
      };
      this.$axios
        .put(readExpressDelivery, jogistics, {})
        .then(res => {
          if (res.data.code == "200") {
            this.loadingtrue = false;
            this.LogisticsData = res.data.data.list;
            var deliver1 =
            `<li>
              <span></span>
            <div class="status-content-before">`+ this.LogisticsData[0].status+`</div>
            <div class="status-time-before">`+this.LogisticsData[0].time+`</div>
            <div class="status-line"></div>
          </li>`;
                $(".status-list").html(deliver1); //清空ul并添加最新一条物流信息
                for (var i = 1; i < this.LogisticsData.length; i++) {
                  var deliver =
                    `<li>
              <span></span>

            <div class="status-content-before">`+ this.LogisticsData[i].status+`</div>
            <div class="status-time-before">`+this.LogisticsData[i].time+`</div>
            <div class="status-line"></div>
          </li>`
                  $(".status-list").append(deliver); //添加之前的物流轨迹
                  $(".status-list li").css({
                    borderLeft: '2px solid #0278d8',
                    textAlign: 'left',
                    position:'relative',
                    padding:'0 0 10px 15px'
                  });
                  $(".status-list li:first-child").css({
                    color:'var(--primary)'
                  });
                  $(".status-list li span").css({
                    border: '6px solid var(--primary)',
                    backgroundColor: 'var(--primary)',
                    display: 'inline-block',
                    width: '4px',
                    height: '4px',
                    borderRadius: '10px',
                    marginLeft: '-11px',
                    marginRight: '10px',
                    left: '4px',
                    position:'absolute'
                  });
                }
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
  margin:10px 10px 0,

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
</style>