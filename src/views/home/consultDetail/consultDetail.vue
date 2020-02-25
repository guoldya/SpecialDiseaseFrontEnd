<!-- 医生咨询详情-->
<template>
  <div class="doctor-detail">
    <Header post-title="医生详情"></Header>
    <Loading v-if="isloading"></Loading>
    <div v-else>
      <!-- 医生信息 -->
      <div class="doctor-info">
        <div class="doctor-info-top">
          <div class="doctor-info-header">
            <img src="@/assets/images/3.jpg" alt="" />
          </div>
          <div class="doctor-info-content">
            <p>{{ doctorInfo.drName }}</p>
            <p class="gray">
              <span>{{ doctorInfo.education }}</span>
              <span>{{ doctorInfo.deptName }}</span>
            </p>
          </div>
          <div class="doctor-info-follow" @click="followDoctor">
            <img v-if="!doctorInfo.followStatus" src="@/assets/images/icon_follow.png" alt="" />
            <img v-else src="@/assets/images/icon_follow_pre.png" alt="" />
          </div>
        </div>
        <div class="doctor-info-bottom">
          <div>
            <p>问诊量</p>
            <p>0{{ doctorInfo.diagnosisNum }}</p>
          </div>
          <div>
            <p>评论率</p>
            <p>0{{ doctorInfo.praiseRate }}%</p>
          </div>
          <div>
            <p>关注</p>
            <p>0{{ doctorInfo.followNum }}</p>
          </div>
        </div>
      </div>
      <!-- 沟通方式 -->
      <div class="doctor-way">
        <div class="doctor-way-item video" @click="consult({type:1,status:1})">
          <div class="doctor-way-item-img">
            <img src="@/assets/images/icon_teletext.png" alt="" />
          </div>
          <div class="doctor-way-item-money doctor-way-item-image">
            门特在线
          </div>
        </div>
      </div>
      <!--擅长-->
      <div class="doctor-speciality doctor-item">
        <div class="title">擅长</div>
        <div class="skill">{{ doctorInfo.major }}</div>
      </div>
      <!--简介  -->
      <div class="doctor-abstract doctor-item">
        <div class="title">简介</div>
        <div class="skill">
          {{ doctorInfo.profile }}
        </div>
      </div>

      <!-- 评论 -->
      <div class="doctor-comment doctor-item ">
        <div class="title">评论</div>
      </div>
      <!-- 评论详情 -->
      <div class="doctor-comment-item" infinite-scroll-distance="30" v-for="(item, index) in commonList" :key="index">
        <div class="doctor-comment-item-header">
          <span>{{ item.accountEncrypt }}</span>
          <span class="assess">满意</span>
          <span>{{ item.createTime.substring(0, 10) }}</span>
        </div>
        <div class="doctor-comment-item-content">
          <div class="ellipsis">
            {{ item.comment }}
          </div>

        </div>
        <div v-if="!item.comment">暂无消息</div>
      </div>

      <!-- 咨询弹窗 -->
      <md-dialog :title="basicDialog.title" :closable="true" v-model="basicDialog.open" :btns="basicDialog.btns">

        <p>咨询师-{{ doctorInfo.drName}}</p>
        <div class="ways">
          <p class="info">1、咨询服务可提供相关建议。</p>
          <p class="info">2、仅为复诊患者提供诊疗服务。</p>
          <p class="info">3、为保疫情期间一线减轻，生效不退换。</p>
        </div>

        <md-agree v-model="basicDialog.checked" :disabled="false" size="sm">
          同意
          <a>《重庆市门特在线问诊用户协议》</a>
        </md-agree>
      </md-dialog>

    </div>
    <div class="loadmore" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <md-icon v-if="!isloading&&busy" name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
      <div class="nomore" v-if="pagingParams.num == pagingParams.pages">没有更多了</div>
    </div>
  </div>
</template>
<script>
import { Dialog, Agree, Toast } from "mand-mobile";
const onlineDoctorDetailUrl = "sysDoctor/selectDetail";
const commentUrl = "bizOnlineServiceRecord/read/doctorRecordPage";
const followDoctorUrl = "bizDoctorFollow/followDoctor"
export default {
  data() {
    return {
      money: '',
      isloading: true, // 是否显示loading
      doctorInfo: {}, // 医生信息
      // 咨询弹窗
      basicDialog: {
        open: false,
        checked: true,
        title: "",
        content: '',
        price: '',
        type: null, // 咨询弹窗类型 type 1 图文 2 电话 3视频
        btns: [
          {
            text: "取消申请",
            handler: this.onBasicCancel
          },
          {
            text: "申请咨询",
            handler: this.onConfirm
          }
        ]
      },
      pagingParams: {
        // 科室分页信息
        num: 1,
        pages: null
      },
      commonList: [],
      busy: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    async init() {
      try {
        let id = Number(this.$route.query.id);
        let res = await this.$axios.put(onlineDoctorDetailUrl, { id });
        // await this.queryCommon();
        if (res.data.code != 200) {
          throw Error(res.data.msg);
        }
        this.doctorInfo = res.data.data;
        this.isloading = false;
      } catch (error) {
        this.isloading = false;
        console.log(error.message);
      }
    },
    async queryCommon(val) {
      // 查询评论
      try {
        let res = await this.$axios.put(commentUrl, {
          id: Number(this.$route.query.id),
          pageNumber: this.pagingParams.num
        });
        if (res.data.code != 200) {
          throw Error(res.data.msg);
        }
        if (res.data.rows) {
          this.commonList = val ? this.commonList.concat(res.data.rows) : res.data.rows
        }
        this.pagingParams.num = res.data.current
        this.pagingParams.pages = res.data.pages
      } catch (error) {
        console.log(error.message);
      }
    },
    loadMore: function () {
      if (this.isloading) return false;
      if (this.pagingParams.num == this.pagingParams.pages) return false
      this.busy = true;
      setTimeout(() => {
        this.pagingParams.num++
        // this.queryCommon(true)
        this.busy = false;
      }, 1000);
    },
    // 取消按钮
    onCancel() {
      this.basicDialog.open = false;
    },
    // 点击申请咨询按钮
    onConfirm() {
      if (!this.basicDialog.checked) {
        Toast.info("请同意用户协议");
        return false;
      }
      this.basicDialog.open = false;
      this.$router.push({
        path: "/pictureConsult",
        query: { name: this.doctorInfo.name, id: this.doctorInfo.id, money: this.money, title: this.doctorInfo.title, type: this.basicDialog.type }
      });
    },
    // 咨询
    consult(val) {
      if (val.status == 0) return
      this.basicDialog.open = true;



    },
    async followDoctor() {
      try {
        let status = this.doctorInfo.followStatus
        this.doctorInfo.followStatus = this.doctorInfo.followStatus ? 0 : 1;
        let res = await this.$axios.post(followDoctorUrl, {
          doctorId: Number(this.$route.query.id),
          status: this.doctorInfo.followStatus
        })
        if (res.data.code != 200) {
          this.doctorInfo.followStatus = status
          throw Error(res.data.msg);
        }
        Toast.info(status ? '取消收藏成功' : '收藏成功')
      } catch (error) {

      }
    }
  },
  components: {
    Dialog
  }
};
</script>
<style lang="scss" scoped>
.doctor-detail {
  overflow-y: auto;
  // height: 100vh;
  box-sizing: border-box;
  margin-top: 70px;
  .gray {
    color: #999;
  }

  .doctor-item {
    padding: 0 24px;
    background: #ffffff;
    margin-bottom: 20px;
    .title {
      color: #000;
      font-weight: bold;
      font-size: 30px;
    }
    // padding: 24px 40px;
  }
  .doctor-info {
    padding: 34px 24px;
    background: #ffffff;
    margin-top: 40px;
    // padding: 40px 30px;
    // box-shadow: 0 0 0.18rem rgba(20, 19, 51, 0.1);
    // border-radius: 16px;
  }
  .doctor-info-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .doctor-info-header {
      margin-right: 20px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
      }
    }
    .doctor-info-content {
      flex: 1;
      .gray span {
        margin-right: 20px;
      }
    }
  }
  .doctor-info-bottom {
    display: flex;
    margin-top: 20px;
    > div {
      flex: 1;
      border-right: 1px solid #f1f3f1;
      &:last-child {
        border-right: none;
      }
      p {
        text-align: center;
        font-size: 24px;
      }
    }
  }
  .doctor-way {
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: 40px 40px;
    margin-top: 20px;
    .doctor-way-item {
      display: inherit;
      flex-direction: column;
      font-size: 24px;
      align-items: center;
      &.video .doctor-way-item-img {
        background: #e3e3e3;
      }
    }
    .doctor-way-item-img {
      width: 90px;
      height: 90px;
      border-radius: 45px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .doctor-way-item-money {
      margin-top: 20px;
      width: 160px;
      height: 46px;
      line-height: 46px;
      border-radius: 23px;
      text-align: center;
    }
    .doctor-way-item-image {
      border: 1px solid #1da1f2;
      color: #1da1f2;
    }
    .doctor-way-item-phone {
      border: 1px solid #16c2c2;
      color: #16c2c2;
    }
    .doctor-way-item-video {
      border: 1px solid #ffb155;
      color: #ffb155;
    }
    .doctor-way-item-disabled {
      border: 1px solid #d5d5d5;
      color: #d3d3d3;
    }
  }
  .doctor-speciality,
  .doctor-abstract,
  .doctor-comment,
  .doctor-comment-item {
    padding: 0 24px;
    background: #ffffff;
    > div {
      padding: 24px 0;
      margin-top: 20px;
    }
    .skill {
      margin-top: 0;
      padding: 0 0 24px;
    }
  }

  .doctor-comment-item-header {
    span {
      margin-right: 20px;
      &:nth-last-child(1) {
        margin-right: 0;
        float: right;
      }
    }
    .assess {
      color: var(--primary);
      border: 1px solid var(--primary);
      padding: 0px 10px;
      border-radius: 6px;
    }
  }
  .doctor-comment-item-content {
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    .ellipsis {
      overflow: hidden;
      display: -webkit-box;
      /* autoprefixer: ignore next */
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
    }
  }
  .doctor-info-follow {
    img {
      width: 40px;
      height: 40px;
    }
  }
  .loadmore {
    display: flex;
    height: 80px;
    align-items: center;
    justify-content: center;
    .nomore {
      color: #999;
      font-size: 24px;
    }
  }
}
.md-dialog {
  /deep/ .md-dialog-body {
    padding: 0.52rem 30px 0.2rem;
    p {
      text-align: center;
      color: #000;
      line-height: 50px;
    }
    .money {
      color: #ff9b00;
    }
    .ways {
      p {
        color: #999;
        text-align: left;
        text-indent: 30px;
        font-size: 24px;
      }
    }
    .md-agree {
      /deep/ .md-agree-content {
        color: #999;
        font-size: 24px;
      }
    }
  }
}
</style>
<style lang="scss">
.md-dialog {
  .md-dialog-text {
    flex-wrap: wrap;
    .info {
      width: 100%;
    }
  }
}
</style>


