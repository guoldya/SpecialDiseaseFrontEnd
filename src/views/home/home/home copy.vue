<!-- 在线问诊首页-->
<template>
  <div class="online">
    <div class="onlineheader">
      <p>主页</p>
    </div>
    <div class="margin45 outCarint">
      <Search type="onlines" postPlaceholder="搜索科室或者在线医生"></Search>
      <div class="online-content">
        <div class="tools">
          <div class="nav2">
            <!-- <router-link tag="span" :to="{ path: 'expertpage', query: { id: item.id ,orgName:item.orgName} }" v-for="(item, index) in departmentList" :key="index">
              <img src="@/assets/images/online1.png" alt="" />{{ item.orgName }}
              <img :src="$conf.constant.img_base_url + item.orgPicFileName" alt="" />{{ item.orgName }} -->
            <!-- </router-link> -->
          </div>
          <ul class="tools-ul" :class="{'tools-ul-zhankai':isDown}">
            <router-link tag="li" :to="{ path: 'expertpage', query: { id: item.id ,orgName:item.orgName} }" v-for="(item, index) in departmentList" :key="index">
              <!-- <li v-for="(item, index) in departmentList" :key="index"> -->
              <img src="@/assets/images/online1.png" alt="" />
              <p>{{ item.orgName }}</p>
              <!-- </li> -->
            </router-link>
          </ul>
        </div>
        <div class="more" @click="isDown=!isDown" v-if="departmentList.length > 4  ">
          <span v-show="isDown">收起</span>
          <span v-show="!isDown">展开</span>
          <img src="./xiangxia.png" alt="" :class="{'zhankaitu':isDown}" />
        </div>
        <div class="tabA">
          <router-link to="/followDoctor" tag="div" class="tabAdiv">
            <div class="yellowWarn">关注的医生</div>
            <div class="tabAdivright">
              <img src="@/assets/images/online9.png" alt="" />
            </div>
          </router-link>
          <router-link class="tabAdiv" to="/inquiryRecord" tag="div">
            <div class="yellowWarn">问诊记录</div>
            <div class="tabAdivright">
              <img src="@/assets/images/online10.png" alt="" />
            </div>
          </router-link>
        </div>
        <!-- <md-tab-picker title="请选择科室" :data="Fdata" v-model="show" @change="chooseDepart" /> -->
        <md-selector v-model="isSelectorShow" :data="sortData" @choose="chooseSort" title="选择排序"></md-selector>
        <md-selector v-model="show" :data="departData" @choose="chooseDepart" title="请选择科室"></md-selector>
        <h2>推荐医生</h2>
        <div class="yaobutton">
          <div :class="{ yaoActive: isChecked == 0 }" @click="choose">
            {{ departmentText }}
            <span class="downImg">
              <img v-show="isChecked == 0" src="@/assets/images/top11.png" />
              <img v-show="isChecked != 0" src="@/assets/images/icon_down.png" />
            </span>
          </div>
          <div :class="{ yaoActive: isChecked == 1 }" @click="sort()">
            {{ selectorValue }}
            <span class="downImg">
              <img v-show="isChecked == 1" src="@/assets/images/top11.png" />
              <img v-show="isChecked != 1" src="@/assets/images/icon_down.png" />
            </span>
          </div>
          <div :class="{ yaoActive: isChecked == 2 }" @click="filter">
            筛选
            <span class="downImg">
              <img v-show="isChecked == 2" src="@/assets/images/top11.png" />
              <img v-show="isChecked != 2" src="@/assets/images/icon_down.png" />
            </span>
          </div>
        </div>
        <!-- 医生列表 -->
        <Skeleton v-if="isloading"></Skeleton>
        <doctorList v-else v-for="(item, index) in doctorList" :datas="item" :key="index"></doctorList>
        <div class="loadmore" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <md-icon v-if="!isloading && busy" name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
          <div class="nomore" v-if="doctorParams.current == doctorPages">
            没有更多了
          </div>
        </div>
      </div>
    </div>
    <!-- 筛选弹窗 -->
    <filterPop ref="filterPop" v-on:childByValue="childByValue"></filterPop>
    <!-- 底部 -->
    <Footer :foot-number="$store.state.homeList"></Footer>
  </div>
</template>
<script type="text/babel">
import { Field, FieldItem, TabPicker } from "mand-mobile";
import filterPop from "../component/filterPop";
import doctorList from "../../../components/doctorList";
const departmentUrl = "api/hos/bdHospitalOrg/read/selectClinicListByHospitalArea";
const recommendUrl = "api/hos/bdOnlineDoctor/read/page";

export default {
  name: "action-sheet-demo",
  height: 500,
  data() {
    return {
      isDown: false,
      isloading: true, // 是否正在请求
      busy: false, // 用于请求添加页面
      isChecked: 0,
      show: false,
      isSelectorShow: false,
      address: [],
      departmentText: "科室",
      selectorValue: "排序",
      sortData: [
        {
          value: 1,
          text: "综合排序"
        },
        {
          value: 2,
          text: "问诊量"
        },
        {
          value: "3",
          text: "价格"
        },
        {
          value: "4",
          text: "好评度"
        },
        {
          value: "5",
          text: "回复速度"
        }
      ],

      // Fdata: {
      //   // 唯一键名
      //   name: "科室",
      //   // 面板标签
      //   label: "科室",
      //   // 选项列表
      //   options: [
      //     {
      //       // 选项值
      //       value: "1",
      //       // 选项标签
      //       label: "骨科",
      //       // 级联子面板
      //       children: {
      //         name: "骨头断了",
      //         label: "骨头断了",
      //         options: [
      //           {
      //             value: "骨头断了",
      //             label: "骨头断了"
      //           },
      //         ]
      //       },
      //          children: {
      //         name: "meiyou ",
      //         label: "meiyou ",
      //         options: [
      //           {
      //             value: "meiyou ",
      //             label: "meiyou "
      //           },
      //         ]
      //       },
      //     },
      //     {
      //       // 选项值
      //       value: "2",
      //       // 选项标签
      //       label: "妇科",
      //       // 级联子面板
      //       children: {
      //         name: "妇科",
      //         label: "妇科",
      //         options: [
      //           {
      //             value: "宫颈",
      //             label: "宫颈"
      //           }
      //         ]
      //       }
      //     }
      //   ]
      // },
      departData: [
        {
          value: '',
          text: "全部科室"
        },
      ],
      departmentList: [], // 科室数据
      departmenParams: {
        // 科室分页信息
        num: 1,
        pages: 1,

      },
      doctorPages: null, // 医生总页数
      doctorParams: {
        type: null,
        level: null,
        status: null,
        price: null,
        deptId: null,
        current: 1
      },
      doctorList: []
    };
  },
  async mounted() {
    await this.getDepartment();
    await this.getRecommendDoctor();
    this.isloading = false;
  },
  watch: {

    'doctorParams.type': function (val, oldval) {
      this.doctorParams.pageNumber = 1;
      this.getRecommendDoctor();
    },
    'doctorParams.level': function (vallevel, oldlevel) {
      this.doctorParams.pageNumber = 1;
      this.getRecommendDoctor();
    },
    'doctorParams.deptId': function (valdeptId, olddeptId) {
      this.doctorParams.pageNumber = 1;
      this.getRecommendDoctor();
    },
    // doctorParams: {
    //   handler(newdoctorParams, olddoctorParams) {
    //     this.doctorParams.pageNumber = 1;
    //     this.getRecommendDoctor();
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },


  // levelByValue: function (data) {
  //   this.doctorParams.level = data
  // },
  methods: {
    childByValue: function (data) {
      var aa = [];
      var bb = [];
      for (var i = 0; i < data[0].length; i++) {
        aa.push(parseInt(data[0][i].value))
      }
      for (var i = 0; i < data[1].length; i++) {
        bb.push(parseInt(data[1][i].value))
      }
      if (data[0].length != 0) {
        this.doctorParams.type = aa;
      } else {
        this.doctorParams.type = null;
      }
      if (data[0].length != 0) {
        this.doctorParams.level = bb;
      } else {
        this.doctorParams.level = null;
      }

    },

    // 得到某院区下的所有科室
    async getDepartment() {
      try {
        let res = await this.$axios.put(departmentUrl, {
          // orgId: Number(localStorage.getItem("hospitalId")),
          orgId: 49,
          orgType: 3,
          pageNumber: this.departmenParams.num,
          pageSize:100
        });
        if (res.code != 200) {
          throw Error(res.msg);
        }
        this.departmenParams.pages = res.pages;
        for (let i = 0; i < res.rows.length; i++) {
          let neslist = {
            text: res.rows[i].orgName,
            value: String(res.rows[i].id)
          }
          this.departData.push(neslist);
        }
        this.departmentList = this.departmentList.concat(res.rows);
        // console.log("departmentList",this.departmentList)
      } catch (error) {
        console.log(error);
      }
    },
    // 得到推荐医生
    async getRecommendDoctor() {
      try {
        let res = await this.$axios.put(recommendUrl, this.doctorParams);
        if (res.data.code != 200) {
          throw Error(res.data.msg);
        }
        if (res.data.rows) {
          this.doctorList = this.doctorParams.current == 1 ? res.data.rows : this.doctorList.concat(res.data.rows);
        }
        this.doctorParams.current = res.data.current;
        this.doctorPages = res.data.pages;

      } catch (error) {
        console.log(error.message);
      }
    },

    loadMoredepartment() {
      // 加载更多
      this.departmenParams.num++;
      this.getDepartment();
    },

    loadMore() {
      if (this.isloading) return false;
      if (this.doctorParams.current == this.doctorPages) return false;
      this.busy = true;
      setTimeout(() => {
        this.doctorParams.current++;
        this.getRecommendDoctor();
        this.busy = false;
      }, 1000);
    },
    expertpage() {
      this.$router.push({
        name: "expertpage",
        query: {}
      });
    },
    chooseSort(data) {
      this.selectorValue = data.text.substring(0, 5);

      // this.doctorParams.
    },
    choose() {
      this.show = !this.show;
      this.isChecked = 0;
    },
    sort() {
      this.isChecked = 1;
      this.isSelectorShow = true;
    },
    filter() {
      this.isChecked = 2;
      this.$refs.filterPop.openPop();
    },
    chooseDepart(data) {
      this.address = data;
      this.doctorParams.deptId = data.value ? data.value * 1 : null;
      this.departmentText = data.text.substring(0, 5);
      // this.departmentText = text;
      // this.departmentText = (options[0].label + options[1].label).substring(0, 5);
    }
  },
  components: {
    filterPop,
    doctorList
  }
};
</script>
 <style scoped>
@import url("./online.css");
</style>