<template>
  <!-- <div>
    <conversation-item
      :conversation="item"
      :index="index"
      v-for="(item,index) in conversationList"
      :key="item.conversationID"
    />
  </div>-->

  <div class="selectMedicine margin55">
    <Header post-title="咨询记录"></Header>

    <ul class="content" v-show="show && !loadingtrue">
      <!-- <Recordcard v-for="(item,i) in drugsList.drugs" :content="item" :type="4" :key="i"></Recordcard> -->
      <conversation-item
        :conversation="item"
        :index="index"
        v-for="(item,index) in drugsList.drugs"
        :key="item.conversationID"
      />
      <md-icon
        v-if="!loadingtrue && busy"
        name="spinner"
        size="lg"
        style="-webkit-filter:invert(1)"
      ></md-icon>
      <div class="nomore" v-if="!loadingtrue && (drugsList.nowPage == pages || pages == 0)">没有更多数据了</div>
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
      ></div>
    </ul>
    <Loading v-if="loadingtrue"></Loading>
  </div>
</template>
<script>
import ConversationItem from "@/components/conversation/conversation-item";

import { mapState } from "vuex";
let selectDrugs = "bizConsultRecord/selectList";
export default {
  name: "ConversationList",
  components: { ConversationItem },
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

      this.$axios
        .put(selectDrugs, {
          pageSize: 20,
          status: 2,
          pageNumber: this.current
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

            console.log(this.drugsList.drugs, " this.drugsList.drugs");
          } else {
            this.$toast.info(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    loadMore: function() {
      if (this.loadingtrue) return false;
      if (this.drugsList.nowPage == this.pages) return false;
      this.busy = true;
      setTimeout(() => {
        this.current++;
        this.selectDrugsList();
      }, 1000);
    }
  }
};
</script>
<style scoped>
.list-container {
  height: 100%;
  width: 100%;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
}
.scroll-container {
  /*overflow-y: scroll;*/
  flex: 1;
}
</style>
