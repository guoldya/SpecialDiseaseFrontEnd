<template>

  <div class="  margin55">
    <Header post-title="我的账单"></Header>
    <div class="samll  ">
      <span class="btn" @click="selectStyle">{{selectorValue}}
        <img src="@/assets/images/down.png" alt="down">
      </span>
      <span>余额：{{totalMoney|keepTwoNum}}</span>
    </div>
    <div class="content" v-show="show && !loadingtrue">
      <!-- <div class="content"> -->
      <!-- <conversation-item v-if="drugsList.drugs.length!=0" :conversation="item" :index="index" v-for="(item,index) in drugsList.drugs" :key="item.conversationID" /> -->
      <div class="bance" v-if="drugsList.drugs.length!=0" v-for="(item,index) in drugsList.drugs" :key="index">
        <div class="header">
          <img :src="3|filterTypeIMG" alt="">
        </div>
        <div class="banceRight">
          <div class="banceRightleft">
            <p class="kind">{{item.billTitle}}</p>
            <p><span>{{item.type|payStatusText}}</span> </p>
            <p class="time"> {{item.createTime|lasttime}}</p>
          </div>
          <div class="banceRightleft2">
            <p :class="item.money<0?'':'orange'">{{item.money|keepTwoNum}} </p>
          </div>
        </div>
      </div>
      <Null :loading-true="drugsList.drugs.length==0"></Null>
      <md-icon v-if="!loadingtrue && busy" name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
      <div class="nomore" v-if="!loadingtrue && (drugsList.nowPage == pages || pages == 0)">没有更多数据了</div>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
    </div>
    <Loading v-if="loadingtrue"></Loading>
    <md-selector v-model="isSelectorShow" default-value="7" :data="optionsData" max-height="320px" title="选择就诊卡" @choose="onSelectorChoose "></md-selector>
  </div>
</template>
<script>

let bizPatientCard = "sysPatient/read/list";
let selectDrugs = "bizPatientBill/read/page";
export default {
  data() {
    return {
      totalMoney: 0,
      isSelectorShow: false,
      selectorValue: '',
      patientId: '',
      optionsData: [],
      show: true,
      pages: 1,
      loadingtrue: true,
      busy: false,
      current: 1,
      drugsList: {
        nowPage: 1,
        drugs: []
      }
    }
  },
  mounted() {
    this.$axios.put(bizPatientCard, {
    }).then(res => {
      if (res.data.code == '200') {
        for (let i = 0; i < res.data.rows.length; i++) {
          this.selectorValue = res.data.rows[0].name;
          this.patientId = res.data.rows[0].id;
          let neslist = {
            text: res.data.rows[i].name,
            value: res.data.rows[i].id,
            aaa: res.data.rows[i].createTime,
          }
          this.optionsData.push(neslist);
        }

      } else if (res.data.code == '800') {

      }
    }).catch(function (err) {
      console.log(err);
    });

    // this.selectDrugsList();

  },
  watch: {
    patientId: function (val, oldval) {
      this.page = 1;
      this.drugsList = {
        nowPage: 1,
        drugs: []
      };
      this.loadingtrue = true;
      this.selectDrugsList();
    },

  },
  methods: {
    selectStyle(data) {
      this.isSelectorShow = true
    },
    onSelectorChoose({ text, value, id }) {
      this.selectorValue = text;
      this.patientId = value

    },
    async selectDrugsList() {
      if (!this.busy) this.loadingtrue = true;
      this.$axios
        .put(selectDrugs, {
          pageSize: 20,
          patientId: this.patientId,
          // patientId: 13,
          pageNumber: this.current,
        })
        .then(res => {
          if (res.data.code == "200") {
            res = res.data;
            this.drugsList.drugs =
              this.current == 1
                ? res.rows
                : this.drugsList.drugs.concat(res.rows);
            this.drugsList.nowPage = res.current;
            this.pages = res.pages;
            if (!this.busy) this.loadingtrue = false;
            this.busy = false;
            this.totalMoney = this.drugsList.drugs[0].totalMoney

          } else {
            this.$toast.info(res.data.msg);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    loadMore: function () {
      if (this.loadingtrue) return false;
      if (this.drugsList.nowPage == this.pages) return false;
      this.busy = true;
      setTimeout(() => {
        this.current++;
        this.selectDrugsList();
      }, 1000);
    },
  }
}
</script>

<style lang="scss" scoped>
.samll {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #717477;
  font-size: 32px;

  padding: 20px 24px 25px;
  .btn {
    width: 152px;
    line-height: 60px;
    background: #ffffff;
    border-radius: 30px;
    text-align: center;
    font-size: 30px;
    color: #464646;
    img {
      width: 18px;
      height: 12px;
      top: -7px;
      position: relative;
    }
  }
}

.bance {
  background: #fff;
  display: flex;
  align-items: center;
  .header {
    flex: 0 0 90px;
    padding-left: 36px;
    img {
      width: 64px;
      height: 64px;
      margin-top: -87px;
    }
  }
  .banceRight {
    justify-content: space-between;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ededed;
    margin-top: 10px;
    line-height: 47px;
    margin-left: 24px;
    .banceRightleft {
      padding: 24px 0;
      .kind {
        font-size: 32px;
      }
      span {
        color: #464646;
        font-size: 24px;
      }
      .time {
        color: #a9a9a9;
        font-size: 24px;
      }
    }
    .banceRightleft2 {
      margin-right: 24px;
      font-size: 32px;
    }
    .orange {
      color: #ff5925;
    }
  }
}
</style>
