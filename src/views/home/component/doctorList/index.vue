<!--医生信息列表组件 -->
<template>
  <div class="doctor-list">
    <div class="header"><img src="@/assets/images/3.jpg" /></div>
    <div class="comment-right">
      <p class="introduce">
        <span class="name">{{datas.name}}</span>&nbsp;
        <span>{{datas.level|level}}</span>&nbsp;
        <span>{{datas.orgName}}</span>&nbsp;
      </p>
      <p class="colo13">
        <span class="picture" :class="datas.allowType<1||!datas.allowType ?'noOpen' :''">图文</span>&nbsp;
        <span class="picture" :class="datas.allowType<2||!datas.allowType ?'noOpen' :''">电话</span>&nbsp;
        <span class="picture" :class="datas.allowType<3||!datas.allowType ?'noOpen' :''">视频</span>&nbsp;
        <span class="reputation">好评率 {{datas.praiseRate||0}}%</span>&nbsp;
      </p>
      <p class="content">擅长：{{datas.skill}}</p>
      <p class="colo13">
        <span>咨询数：{{datas.diagnosisNum||'0'}}</span>&nbsp;
        <span>平均回复时长：{{datas.replyTime||'0'}}分</span>&nbsp;
      </p>
      <p class="price">￥{{datas.minPrice|keepTwoNum}} 起
        <router-link :to="{ path: '/consultDetail', query: { id: datas.id }}" class="consult">立即咨询</router-link>
        <router-link v-show="false" to="/pictureConsult">免费咨询</router-link>
      </p>
      <em>已满</em>
    </div>
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
  props: ['datas']
};
</script>
<style scoped lang="scss">
/* .doctor-list {} */
.doctor-list {
  position: relative;
   margin-top: 20px;
  border-bottom: 1px solid #e0e0e0;
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
  line-height: 50px;
}

.doctor-list .name {
  font-size: 32px;
}
.doctor-list p {
  line-height: 50px;
}

.doctor-list .name {
  font-size: 32px;
}

.picture {
  border: 1px solid var(--primary);
  padding: 1px 10px;
  border-radius: 7px;
  color: var(--primary);
}

.noOpen {
  border: 2px solid var(--primary--content);
  padding: 1px 10px;
  border-radius: 7px;
  color: var(--primary--content);
}

.doctor-list .price {
  color: var(--primary);
  font-weight: 500;
  letter-spacing: 1px;
  overflow: hidden;
  margin-top: 10px;
  a {
    font-size: 26px;
    float: right;
    display: inline-block;
    height: 55px;
    line-height: 55px;
    padding: 0 30px;
    border: 1px solid var(--primary);
    border-radius: 30px;
    margin-left: 30px;
    color: var(--primary);
  }
  .consult {
    color: #fff;
    background: var(--primary);
  }
}

.doctor-list:last-child {
  border: none;
}
</style>

