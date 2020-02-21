<template>
  <div class="margin50">
    <Header post-title="医生列表"></Header>
     <Search type="choosedepart" post-placeholder="请输入医生名称"></Search>
    <div  >

      <div class="doctor-list">
        <div class="header"><img src="@/assets/images/3.jpg" /></div>
        <div class="comment-right">
          <p class="introduce">
            <span class="name">名字</span>&nbsp;
            <span>主任医师</span>&nbsp;
            <span>骨科</span>&nbsp;
          </p>
          <p class="colo13">
            <span class="picture">图文</span>&nbsp;

            <span class="reputation">好评率 100%</span>&nbsp;
          </p>
          <p class="content">擅长：占位 </p>
          <p class="colo13">
            <span>咨询数：99</span>&nbsp;
            <span>平均回复时长：60分</span>&nbsp;
          </p>
          <p class="price">
            <router-link :to="{ path: '/consultDetail', }" class="consult">立即咨询</router-link>
          </p>
          <em>已满</em>
        </div>
      </div>
      <!-- <div v-if="hospitaldata.length!=0" v-show="!loadingtrue">
        <md-cell-item v-for="(item,index) in hospitaldata" :key="index+'aa'" @click="intodoctorinfo(item)" :title="item.name" :brief="item.introduce" arrow>
          <span class="holder" slot="left">
            <img v-if="item.sex=='男'" src="@/assets/images/3.jpg" alt="医生头像">
            <img v-else src="@/assets/images/31.jpg" alt="医生头像">
            <img class="holder-tag" src="@/assets/images/zhuanjia.png" v-show="item.level!=1" alt=""></span>
        </md-cell-item>
        <p v-show="nomore" class="noMore">没有更多数据了</p>
      </div>
 
      <Null :loading-true="!loadingtrue&&hospitaldata.length==0"></Null>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
        <span v-if="hospitaldata.length!=0&&!nomore">
          <span class="mu-light-text-color">加载中</span>
          <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
        </span>
      </div>
      <Loading v-show="loadingtrue"></Loading> -->
    </div>
  </div>
</template>
<script type="text/babel">
let bdHospitalOrg = '/api/hos/bdHospitalDoctor/read/selectDoctorPage';
export default {
  data() {
    return {
      hospitaldata: [],
      page: 1,
      pageSize: 10,
      loadingtrue: true,
      busy: true,
      nomore: false,
    };
  },
  mounted() {
    this.orgFun(false);
  },
  methods: {
    intodoctorinfo(data) {
      this.$router.push({
        name: 'doctordetail',
        query: { doctorId: data.id, islist: 1, today: this.$route.query.today }
      });
    },

    orgFun(flag) {
      let deptparams = {};
      deptparams.pageNumber = this.page;
      deptparams.pageSize = this.pageSize;
      deptparams.keyword = this.$route.query.val;

      if (this.$route.query.today) {
        deptparams.orgType = this.$route.query.today == 2 ? 4 : 2

      }
      // deptparams.orgType = this.$route.query.today ? this.$route.query.today * 1 : undefined;
      this.$axios.put(bdHospitalOrg, deptparams).then((res) => {
        if (res.data.rows) {
          this.loadingtrue = false;
          if (flag) {
            this.hospitaldata = this.hospitaldata.concat(res.data.rows);
            //concat数组串联进行合并
            if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
              this.busy = false;
              this.nomore = false;
            } else {
              this.busy = true;
              this.nomore = true;
            };
          } else {
            this.hospitaldata = res.data.rows;
            this.busy = true;
            if (res.data.total <= 10) {
              this.busy = true;
              this.nomore = true;
            } else {
              this.busy = false;
              this.nomore = false;
            }
          }
        } else {
          this.hospitaldata = []
        }
      }).catch(function (err) {
        console.log(err);
      });
    },

    loadMore() {
      this.busy = true;  //将无限滚动给禁用
      setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
        this.page++;  //滚动之后加载第二页
        this.orgFun(true);
      }, 500);
    },

  },


};
</script>
<style scoped lang="scss">
/* .doctor-list {} */
.doctor-list {
  position: relative;
  margin-top: 20px;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
  border-radius: 10px;
  width: 94%;
  padding: 20px;
  margin-left: 3%;
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
  padding: 10px 0px 0 108px;
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

 