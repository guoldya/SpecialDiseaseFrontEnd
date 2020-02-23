<template>
  <div class="margin55">
    <Header post-title="我的医生"></Header>
    <div class="doctor-list"  v-if="waitPayData.length!=0" v-show="!loadingtrue" v-for="(item, index) in waitPayData" :datas="item" :key="index">
      <div class="header"><img src="@/assets/images/3.jpg" /></div>
      <div class="comment-right">
        <p class="introduce">
          <span class="name">{{item.doctorName}}</span>&nbsp;
          <span>{{item.education}}</span>&nbsp;
          <span>{{item.deptName}}</span>&nbsp;
        </p>
        <p class="colo13">
          <span class="picture" :class="item.allowType<1||!item.allowType ?'noOpen' :''">图文</span>&nbsp;
          <span class="picture" :class="item.allowType<2||!item.allowType ?'noOpen' :''">门特在线</span>&nbsp;
          <span class="picture" :class="item.allowType<3||!item.allowType ?'noOpen' :''">视频</span>&nbsp;
          <span class="reputation">好评率 {{item.praiseRate||0}}%</span>&nbsp;
        </p>
        <p class="content">擅长：{{item.major}}</p>
        <p class="colo13">
          <span>咨询数：<span class="num">{{item.diagnosisNum||'0'}}</span></span>&nbsp;
          <span>平均回复时长：<span class="num">{{item.replyTime||'0'}}</span> 分</span>&nbsp;
        </p>
      </div>
    </div>
    <Null :loading-true="!loadingtrue&&waitPayData.length==0"></Null>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
      <span v-if="waitPayData.length!=0&&!nomore">
        <span class="mu-light-text-color">加载中</span>
        <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
      </span>
    </div>
    <Loading v-show="loadingtrue"></Loading>
  </div>
</template>
<script>

let pay_list_url = '/api/hos/bizConsultRecord/selectList'
export default {
  data() {
    return {
      waitPayData: [],
      page: 1,
      pageSize: 10,
      type: 0,
      busy: true,
      nomore: false,
      loadingtrue: true,
      title: '',
    };
  },

  mounted() {
    this.WaitPay(false);
  },
  methods: {
    WaitPay(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = this.pageSize;
      params.status = 2;
      this.$axios.put(pay_list_url, params).then((res) => {
        this.loadingtrue = false;
        if (res.data.code == 200) {
          if (res.data.rows) {
            if (flag) {
              this.waitPayData = this.waitPayData.concat(res.data.rows);  //concat数组串联进行合并
              if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
                this.busy = false;
                this.nomore = false;
              } else {
                this.busy = true;
                this.nomore = true;
              }
            } else {
              this.waitPayData = res.data.rows;
              this.busy = true;
              if (res.data.total < 10) {
                this.busy = true;
                this.nomore = true;
              } else {
                this.busy = false;
                this.nomore = false;
              }
            }
          }
          //2、
        } else {
          this.waitPayData = []
        }
      })
    },
    loadMore() {
      this.busy = true;  //将无限滚动给禁用
      setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
        this.page++;  //滚动之后加载第二页
        this.WaitPay(true);
      }, 500);
    },




  },

};
</script>

<style scoped   lang="scss">
.doctor-list {
  position: relative;
  margin-top: 20px;
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

.doctor-list .name {
  font-size: 32px;
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

.noOpen {
  padding: 1px 5px;
  border-radius: 7px;
  color: var(--primary--content);
  color: #fff;
  background: #9ac3ff;
}
.introduce {
  font-size: 24px;
}
.num{
   color: #3A3A3A;
   font-size: 28px;
}
.doctor-list .price {
  color: #f74749;
  font-weight: 500;
  letter-spacing: 1px;
  overflow: hidden;
  margin-top: 10px;
  a {
    font-size: 26px;
    float: right;
    display: inline-block;
    height: 45px;
    line-height: 45px;
    padding: 0 20px;
    border: 1px solid var(--primary);
    border-radius: 30px;
    margin-left: 30px;
    color: var(--primary);
  }
  .consult {
    color: #fff;
    background: var(--primary);
    font-size: 23px;
  }
}

.doctor-list:last-child {
  border: none;
}
</style>
