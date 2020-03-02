 
<template>
  <div class="margin55 outCarint">
    <Header post-title="我的咨询"> </Header>
    <div class="doctor-list" v-for="(item, index) in waitPayData">
      <div class="discrib">
        <!-- <p class="history">患者描述：{{item.question}}{{item.sex|examSex}} {{item.age}} </p> -->
        <p class="top">
          <span>{{item.patientName}}  <label> {{item.startTime|lasttime}}</label> </span>
          <span class="aut" v-if="item.status==0">{{item.status|examStatus}}</span>
          <span class="aut finish" v-if="item.status==1">{{item.status|examStatus}}</span>
          <span class="aut ing" v-if="item.status==2">{{item.status|examStatus}}</span>
        </p>
      </div>
      <div class="doctor" v-if="item.status!=0">
        <div class="header"><img src="@/assets/images/3.jpg" /></div>
        <div class="comment-right">
          <p class="introduce">
            <span>{{item.dept}}</span>&nbsp;
            <span class="name"> {{item.doctorName}} </span>&nbsp;
            <span>医师 </span>&nbsp;

          </p>
          <p class="colo13">
            医生正在了解你的病情
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="doctor-list">
      <div class="discrib">
        <p class="history">患者描述：全身把啦啦啦啦啦啦啦啦啦啦，既往史：啦能力，过敏史：灌灌灌灌帆帆帆帆</p>
        <p class="top">
          <span>男 40岁 <label> 2020-02-23 17:23</label> </span>
          <span class="aut">解答中</span>
        </p>
      </div>
    </div> -->
    <p v-show="nomore" class="noMore">没有更多数据了</p>
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



let pay_list_url = 'bizConsultRecord/selectList'

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
<style scoped lang="scss">
.doctor-list {
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 18px rgba(20, 19, 51, 0.1);

  .discrib {
    .top {
      margin: 10px 0 0s;
      display: flex;
      justify-content: space-between;
      label {
        font-size: 12px;
        color: var(--primary--content);
      }
    }
    .aut {
      border: 1px solid red;
      border-radius: 30px;
      padding: 5px 12px;
      color: red;
      font-size: 12px;
      
    }
    .ing {
      border: 1px solid #9ac3ff;
      color: #9ac3ff;
    }
    .finish {
      border: 1px solid #82e0c3;
      color: #82e0c3;
    }
    .history {
      line-height: 40px;
    }
  }
  .doctor {
    border-top: 1px solid var(--primary--line);
    margin-top: 20px;
  }
  .header {
    width: 98px;
    position: absolute;
    margin-top: 10px;
  }
  .header img {
    width: 100%;
    border-radius: 50%;
    padding: 5px;
  }
  .comment-right {
    padding: 20px 0px 0px 108px;
    p {
      line-height: 40px;
    }
  }
}
</style>

