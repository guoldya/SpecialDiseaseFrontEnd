<template>

  <div class="con tent22">
    <div class="conversationCard">
      <div class="disFlex">
        <span>{{conversation.startTime|lasttime}}</span>
        <span class="online" :class="conversation.status!=2?'online':'complete'">{{conversation.status|filterType }}</span>
      </div>
      <div class="card-divider card-divider-horizontal"></div>
      <div class="online-item">
        <div class="header">
          <!-- <avatar :src="avatar" :type="conversation.type" /> -->
          <img src="@/assets/images/3.jpg" />
        </div>
        <div class="content">
          <div class="row-1">
            <div class="name">
              <div class="text-ellipsis">
                <span>{{conversation.doctorName}}</span>
                <span> {{conversation.deptName}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dotType">
        <!---->
        <div class="dottextff">
          <img src="@/assets/conversationImg/freeText1.png" />
          <span>图文问诊</span>
        </div>
        <p class="consult " @click="into" :class="conversation.status!=2?'online-consult':'complete-consult'">
          咨询详情
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";


export default {
  name: "conversation-item",
  props: ["conversation"],
  data() {
    return {

    };
  },

  mounted() {

  },
  methods: {
    into() {


      this.$router.push({
        name: 'chatRoom',
        query: {
          id: this.conversation.doctorId,
          name: this.conversation.doctorName,
          patientId: this.conversation.patientId,
          status: this.conversation.status,
          start: this.conversation.start,
          end: this.conversation.end
        }
      })
    }
  },
  watch: {

  }
};
</script>
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
  // width: 33.3333%;
  font-size: 26px;
}
.dottextff {
  color: var(--primary--secondary);
  text-align: left;
  display: flex;
  align-items: center;
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
  margin-right: 5px;
  width: 20%;
}
.online {
  color: var(--primary);
}
.complete {
  color: var(--primary--right);
}
</style>
