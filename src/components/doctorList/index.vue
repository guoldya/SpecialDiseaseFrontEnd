<!--医生信息列表组件 -->
<template>
  <div class="doctor-list">
    <router-link :to="{ path: datas.status==2?'/consultDetail':'/chatRoom', query: { id: datas.id ,name:datas.drName}}" class="consult">
      <div class="header">
        <img src="@/assets/images/3.jpg" />
      </div>
      <div class="comment-right">
        <p class="introduce">
          <span class="name">{{datas.drName}}</span>&nbsp;
          <span class="education">{{datas.education}}</span>&nbsp;
          <span class="education">{{datas.deptName}}</span>&nbsp;
        </p>
        <p class="colo3">
          <span class="picture" :class="datas.allowType<1||!datas.allowType ?'noOpen' :''">图文</span>&nbsp;
          <span class="picture picture1" :class="datas.allowType<2||!datas.allowType ?'noOpen' :''">门特在线</span>&nbsp;
          <span class="picture picture2" :class="datas.allowType<3||!datas.allowType ?'noOpen' :''">视频</span>&nbsp;
        </p>
        <p class="content lineHeight17">擅长：{{datas.expertField}}</p>
        <p class="colo3">
          <span style=" margin-right: 20px;">
            咨询数：
            <span class="num">{{datas.diagnosisNum||'12'}}</span>
          </span>&nbsp;
          <span>
            平均回复时长：
            <span class="num">{{datas.replyTime||'0'}}</span> 分
          </span>&nbsp;
        </p>

        <div class="price">
          <div class="dotType">
            <div class="dottextff">
              <router-link v-if="datas.status==2" :to="{ path: '/consultDetail', query: { id: datas.id ,status:datas.status}}">
                <img src="@/assets/conversationImg/freeText.png" />
                <span class="fontSize12">免费</span>
              </router-link>
              <router-link v-else :to="{ path: '/chatRoom', query: { id: datas.id ,name:datas.drName}}">
                <img src="@/assets/conversationImg/freeText.png" />
                <span class="fontSize12">咨询中</span>
              </router-link>
            </div>
            <div class="dotdhff">
              <img src="@/assets/conversationImg/offlineVoice.png" />
              <span class="fontSize12">暂无</span>
            </div>
            <div class="dotvideoff">
              <img src="@/assets/conversationImg/offlineVideo.png" />
              <span class="fontSize12">暂无</span>
            </div>
          </div>
          <!-- ￥{{datas.minPrice|keepTwoNum}} -->
          <!-- <router-link :to="{ path: '/consultDetail', query: { id: datas.id }}" class="consult">立即咨询</router-link>
          <router-link v-show="false" to="/pictureConsult">免费咨询</router-link>-->
        </div>
        <!-- <em>搜查</em> -->
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  // filters:{
  //   level(val) {
  //     let msg = ''
  //     switch(val) {
  //       case 1:
  //       msg = '普通';
  //       break;
  //       case 2:
  //       msg = '主治医生';
  //       break;
  //        case 3:
  //       msg = '副教授';
  //       break;
  //       case 4:
  //       msg = '五级专家';
  //       break;
  //          case 5:
  //       msg = '四级专家';
  //       break;
  //          case 6:
  //       msg = '三级专家';
  //       break;
  //          case 7:
  //       msg = '二级专家';
  //       break;
  //         case 8:
  //       msg = '一级专家';
  //       break;
  //         case 9:
  //       msg = '特需';
  //       break;
  //     }
  //     return msg;
  //   }
  // },
  props: ["datas"]
};
</script>
<style scoped lang="scss">
/* .doctor-list {} */
.doctor-list {
  position: relative;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
  width: 94%;
  margin-left: 3%;
  border-radius: 20px;
  padding: 10px;
}

.doctor-list .header {
  width: 98px;
  position: absolute;
}

.doctor-list .header img {
  width: 100%;
  border-radius: 50%;
  padding: 5px;
}

.doctor-list .comment-right {
  padding: 10px 0px 30px 108px;
}
/* #e2e4ea */
.doctor-list em {
  position: absolute;
  top: 0;
  right: 0;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  font-size: 28px;
  font-style: normal;
  color: #fff;
  background: var(--primary--content);
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
}
.doctor-list p {
  line-height: 40px;
}
.colo3 {
  font-size: 17px;
  font-weight: 400;
  color: #626262;
}
.doctor-list .name {
  font-size: 32px;
}
.doctor-list .education {
  font-size: 20px;
  color: #626262;
}
.content {
  font-size: 24px;
  color: #878787;
  line-height: 30px;
}

.picture {
  padding: 1px 5px;
  border-radius: 7px;
  color: #fff;
  background: #9ac3ff;
  font-size: 22px;
}
.picture1 {
  background: #a5dbff;
}
.picture2 {
  background: #82e0c3;
}
.noOpen {
  padding: 1px 5px;
  border-radius: 7px;
  color: var(--primary--content);
  color: #fff;
}
.introduce {
  font-size: 24px;
}
.num {
  color: #3a3a3a;
  font-size: 28px;
}
.doctor-list .price {
  color: #f74749;
  font-weight: 500;
  letter-spacing: 1px;
  overflow: hidden;
  margin-top: 10px;
}

.doctor-list:last-child {
  border: none;
}
.dotType {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dotType div {
  // width: 33.3333%;
  font-size: 26px;
}
.dotType .dottextff a {
  display: flex;
  align-items: center;
  span {
    color: var(--primary--secondary);
    // text-align: left;
  }
}
.dotdhff,
.dotvideoff {
  color: var(--primary--content);
  display: flex;
  align-items: center;
}
.dotType img {
  margin-right: 5px;
}
.lineHeight17 {
  line-height: 34px !important;
}
</style>

