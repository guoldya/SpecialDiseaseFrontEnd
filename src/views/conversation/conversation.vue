<template>
  <div class="selectMedicine margin55">
    <Header post-title="咨询记录11" :isBackTo='true'></Header>
    <ul class="content" v-show="show && !loadingtrue">
      <!-- <conversation-item v-if="drugsList.drugs.length!=0" :conversation="item" :index="index" v-for="(item,index) in drugsList.drugs" :key="item.conversationID" @click="into(item)" /> -->

      <div class="con tent22" v-if="drugsList.drugs.length!=0"  :index="index" v-for="(item,index) in drugsList.drugs" :key="item.conversationID" @click="into(item)">
        <div class="conversationCard">
          <div class="disFlex">
            <span>{{item.startTime|lasttime}}</span>
            <span class="online" :class="1?'online':'complete'">{{item.status?'咨询中':'已结束'}}</span>
          </div>
          <div class="card-divider card-divider-horizontal"></div>
          <div class="online-item">
            <div class="header">
              <!-- <avatar :src="avatar" :type="conversation.type" /> -->
              <img src="@/assets/conversationImg/onlineText.png" />
            </div>
            <div class="content">
              <div class="row-1">
                <div class="name">
                  <div class="text-ellipsis">
                    <span>{{item.drName}}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="dotType">
            <!---->
            <div class="dottextff">
              <img src="@/assets/conversationImg/freeText.png" />图文问诊
            </div>
            <p class="consult " :class="1?'online-consult':'complete-consult'">咨询详情</p>
          </div>
        </div>
      </div>
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
<style lang="less" scoped>
.conversationCard .consult {
  font-size: 0.26rem;
  float: right;
  display: inline-block;
  height: 0.45rem;
  line-height: 0.45rem;
  padding: 0 0.2rem;
  border-radius: 0.3rem;
  margin-left: 0.3rem;
}
.online-consult {
  background: var(--primary);
  color: #fff;
  border: 0.01rem solid var(--primary);
}
.complete-consult {
  background: var(--primary--line);
  color: var(--primary--content);
  border: 0.01rem solid var(--primary--line);
}
.row-1 {
  display: flex;
  line-height: 50px;

  .name {
    color: #23212e;
    flex: 1;
    min-width: 0px;
    font-size: 32px;
  }

  .unread-count {
    padding-left: 10px;
    flex-shrink: 0;
    color: #76828c;
    font-size: 14px;

    .badge {
      vertical-align: bottom;
      background-color: #f35f5f;
      border-radius: 15px;
      color: #fff;
      display: inline-block;
      font-size: 30px;
      height: 30px;
      max-width: 30px;
      line-height: 30px;
      padding: 0 6px;
      text-align: center;
      white-space: nowrap;
    }
  }
}
.online-item {
  display: flex;
  // padding-left: 30px;
  background: #ffffff;
  width: 90%;
  .header {
    position: relative;
    width: 90px;
    height: 90px;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    span {
      position: absolute;
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      color: #fff;
      background: red;
      font-size: 24px;
      text-align: center;
      line-height: 28px;
      top: 8px;
      right: -10px;
    }
  }
}
.dotType {
  border-top: 1px solid #fcfcfc;
  height: 80px;
  display: flex;
  align-items: center;
  margin-top: 12px;
  justify-content: space-between;
}
.dotType div {
  width: 33.3333%;
  font-size: 12px;
}
.dottextff {
  color: var(--primary--secondary);
  text-align: left;
}
.dotdhff {
  color: var(--primary--content);
  text-align: center;
}
.dotvideoff {
  color: var(--primary--content);
  text-align: right;
}
.dotType img {
  width: 32px;
  height: 32px;
  position: relative;
  top: 3px;
  margin-right: 5px;
}
.online {
  color: var(--primary);
}
.complete {
  color: var(--primary--right);
}
</style>
