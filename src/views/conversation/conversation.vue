<template>
  <div class="selectMedicine margin55">
    <Header post-title="咨询记录11" :isBackTo='true'></Header>
    <ul class="content" v-show="show && !loadingtrue">
      <conversation-item v-if="drugsList.drugs.length!=0" :conversation="item" :index="index" v-for="(item,index) in drugsList.drugs" :key="item.conversationID"   />
      
      <Null :loading-true="drugsList.drugs.length==0"></Null>
      <md-icon v-if="!loadingtrue && busy" name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
      <div class="nomore" v-if="!loadingtrue && (drugsList.nowPage == pages || pages == 0)">没有更多数据了</div>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
    </ul>
    <Loading v-if="loadingtrue"></Loading>
    <Footer></Footer>
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
      chooseId: '',
      imSdk: this.$imsdk,
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


    if (typeof (this.$store.state.accountInfo) == 'string') {
      this.chooseId = JSON.parse(this.$store.state.accountInfo).id;
    } else {
      this.chooseId = this.$store.state.accountInfo.id;
    }
    this.imSdk.createUserConnect(
      "p" + this.chooseId,
      "123456",
      {
        userConnectCallback: () => {
          // 拿到消息列表之后的回调
          // this.imSdk.openSession(
          //   this.$store.state.userInfo.nickname,
          //   "d" + this.$route.query.id,
          //   this.$route.query.name,
          //   {
          //     getMessageCallback: () => {
          //       // 拿到消息列表之后的回调
          //     }
          //   }
          // );
        }
      }
    );
    console.log(this.chooseId, "imSdkimSdk")
    this.selectDrugsList();
  },

  methods: {
    async selectDrugsList() {
      if (!this.busy) this.loadingtrue = true;
      this.$axios
        .put(selectDrugs, {
          pageSize: 20,

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
    },
    into(data) {

      this.$router.push({
        name: 'chatRoom',
        query: {
          id: data.id,
          name: data.drName
        }
      })


    },
    loadMore: function () {
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
 