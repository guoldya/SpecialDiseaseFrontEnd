<template>
  <div class="recipeRecord">
    <Header post-title="处方列表"> </Header>
    <div>
      <div v-if="recordData.length!=0" v-show="!loadingtrue">
        <Recordcard v-for="(item,i) in recordData" :content="item" :type="4" :key="i"></Recordcard>
        <p v-show="nomore" class="noMore">没有更多数据了</p>
      </div>
      <Null :loading-true="!loadingtrue&&recordData.length==0"></Null>
      <Loading v-show="loadingtrue"></Loading>
    </div>
  </div>
</template>
<script type="text/babel">
import { mapState } from 'vuex';
import { Toast } from "mand-mobile"
let recipe_getList_url = "/api/sds/bizRecipe/read/page";
export default {
  data() {
    return {
      isActive: false,
      recordData: [],
      selectStatus: false,
      busy: true,
      nomore: false,
      loadingtrue: true,
      page: 1,
      pageSize: 10,
    };
  },
  computed: {
    ...mapState({
      _accountinfo: state => state.my.accountinfo,
    }),
  },
  mounted() {
    this.recipeFun(false);
  },
  methods: {

    recipeFun(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = this.pageSize;
      this.$axios.put(recipe_getList_url, params).then((res) => {
        if (res.data.code == '200') {
          this.loadingtrue = false;
          this.recordData = res.data.rows
          this.nomore=true;
        } else {
          this.$toast.info(res.data.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },


    recordDetail(par) {
      let argu = { id: par };
      this.$router.push({
        name: 'recordDetail',
        query: argu
      });
    },



  },


};
</script>
<style   scoped>
.recipeRecord {
  margin-top: 130px;
}
.rightflatCardBtn {
  position: fixed;
  z-index: 99;
  background: #f8f8f8;
  position: fixed;
  width: 100%;
  top: 100px;
  padding: 24px;
}
.rightflatCardBtnDiv {
  height: 40px;
}
.rightflatCardBtn {
  display: flex;
  justify-content: flex-end;
  line-height: 0.46rem;
}
</style>