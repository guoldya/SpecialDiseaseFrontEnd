<template>
  <div class="listDatatop recordcard-content">
    <!-- 处方记录 -->
    <template  >
      <p class="parElem listData">
        <span class="sonElem">就诊科室
        </span>
        <span>{{content.dept}}</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">就诊医生</span>
        <span>{{content.doctorName}}</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">处方时间</span>
        <span>{{content.recipeDate|lasttime}}</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">临床诊断</span>
        <span class="mu-secondary-text-color">{{content.diag}}</span>
      </p>
    </template>
   
    <!--  -->
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props: ['content', 'type', 'queryType'],
  async mounted() {

  },
  methods: {
    intoDetail(val) {
      let aa = {};
      aa.id = val.id;
      aa.type = val.type;
      aa.evaluateStatus = this.queryType - 1;
      if (this.queryType - 1 == 0) {
        aa.time = val.outTime;
      } else {
        aa.time = val.createTime;
      }
      if (val.type == 1) {
        aa.title = val.area
      } else if (val.type == 2) {
        aa.title = val.dept
      }
      this.$router.push({
        name: 'valuation',
        query: aa,
      });
    },
  }
}
</script>

<style lang="scss" scoped>
 .sonElem {
  color: var(--primary--title);
   
  margin-right: 28px;
}
.listDatatop {
  padding: 24px;
  p {
    line-height: 50px;
  }
}
.recordcard-content {
  padding: 14px 0;
  .listData {
    padding: 7px 24px;
    border-bottom: none;
    span {
      padding: 0;
      max-width: 70%;
    }
    .have {
      font-size: 28px;
      color: #ffffff;
      float: right;
      background: var(--primary);
      border-radius: 40px;
      letter-spacing: 1px;
      width: 134px;
      line-height: 60px;
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
