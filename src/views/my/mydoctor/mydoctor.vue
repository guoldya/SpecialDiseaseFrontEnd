<template>

  <div class="selectMedicine margin55">
    <Header post-title="我的咨询"></Header>
    <ul class="content" v-show="show && !loadingtrue">
      <span class="aui-navBar-item">
        <div>
          <md-field>
            <md-field-item :content="selectorValue" @click="selectStyle" solid />
          </md-field>
          <md-selector v-model="isSelectorShow" default-value="7" :data="optionsData" max-height="320px" title="选择就诊卡" @choose="onSelectorChoose "></md-selector>
        </div>

      </span>
      <!-- <conversation-item v-if="drugsList.drugs.length!=0" :conversation="item" :index="index" v-for="(item,index) in drugsList.drugs" :key="item.conversationID" /> -->
      <Null :loading-true="drugsList.drugs.length==0"></Null>
      <md-icon v-if="!loadingtrue && busy" name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
      <div class="nomore" v-if="!loadingtrue && (drugsList.nowPage == pages || pages == 0)">没有更多数据了</div>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
    </ul>
    <Loading v-if="loadingtrue"></Loading>

  </div>
</template>
<script>

let bizPatientCard = "sysPatient/read/list";
let selectDrugs = "bizConsultRecord/selectList";
export default {
  data() {
    return {
      isSelectorShow: false,

      selectorValue: '',
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
          this.id = res.data.rows[0].id;
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

    this.selectDrugsList();

  },
  watch: {
    selectorValue: function (val, oldval) {
      this.page = 1;
      this.drugsList = {
        nowPage: 1,
        drugs: []
      };
      this.loadingtrue = true;
      this.selectDrugsList(false);
    },
   
  },
  methods: {
    selectStyle(data) {
      this.isSelectorShow = true
    },
    onSelectorChoose({ text, value, id }) {
      this.selectorValue = text;
      

    },
    async selectDrugsList() {
      if (!this.busy) this.loadingtrue = true;
      this.$axios
        .put(selectDrugs, {
          pageSize: 20,
          status: 2,
          patientId: this.chooseId,
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


          } else {
            this.$toast.info(res.data.msg);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }, loadMore: function () {
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

<style>
</style>
