<template>
  <div class="margin50">
    <Header post-title="医生列表"></Header>
    <Search type="choosedepart" post-placeholder="请输入医生名称"></Search>
     
     <doctorList v-for="(item, index) in hospitaldata" :datas="item" :key="index"></doctorList>
  </div>
</template>
<script type="text/babel">
let bdHospitalOrg = 'sysDoctor/selectDoctorByPatient';
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
     this.orgFun()
  },
  methods: {
    intodoctorinfo(data) {
      this.$router.push({
        name: 'doctordetail',
        query: { doctorId: data.id, islist: 1, today: this.$route.query.today }
      });
    },

    orgFun(flag) {
     
      // deptparams.orgType = this.$route.query.today ? this.$route.query.today * 1 : undefined;
      this.$axios.put(bdHospitalOrg, {  patientId: 2}).then((res) => {
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
  margin-top: 14px;
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

 