<template>
  <div class="selectMedicine margin55">
    <Header post-title="处方列表"> </Header>
    <ul class="content" v-show="show && !loadingtrue">
      <Recordcard v-if="drugsList.drugs.length!=0" v-for="(item,i) in drugsList.drugs" :content="item" :type="4" :key="i"></Recordcard>
      <Null :loading-true="drugsList.drugs.length==0"></Null>
      <md-icon v-if="!loadingtrue && busy" name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
      <div class="nomore" v-if="!loadingtrue && (drugsList.nowPage == pages || pages == 0)">没有更多数据了</div>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
    </ul>
    <Loading v-if="loadingtrue"></Loading>
  </div>
</template>
<script>
const selectDrugs = "bizRecipe/selectPageByAccount";

export default {
  data() {
    return {
      show: true,
      pages: 1,
      loadingtrue: true,
      busy: false,
      current: 1,
      drugsList: {
        nowPage: 1,
        drugs: []
      }
    };
  },

  mounted() {
    this.selectDrugsList();

  },
  methods: {

    async selectDrugsList() {
      if (!this.busy) this.loadingtrue = true;

      this.$axios.put(selectDrugs, {
        pageSize: 20,
        pageNumber: this.current,
      }).then((res) => {
        if (res.data.code == '200') {
          res = res.data;
          this.drugsList.drugs = this.current == 1 ? res.rows : this.drugsList.drugs.concat(res.rows);
          this.drugsList.nowPage = res.current;
          this.pages = res.pages;
          if (!this.busy) this.loadingtrue = false;
          this.busy = false;

        } else {
          this.$toast.info(res.data.msg);
        }
      }).catch(function (err) {
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
      }, 1000)
    },


  }
};
</script>

<style lang="scss" scoped>
.loadmore {
  height: 100%;
}
</style>