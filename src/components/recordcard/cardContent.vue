<template>
  <div class="listDatatop  ">
    <!-- 处方记录 -->
    <p>
      <span class="sonElem">就诊科室
      </span>
      <span>{{content.dept}}</span>
    </p>
    <p>
      <span class="sonElem">就诊医生</span>
      <span>{{content.doctorName}}</span>
    </p>
    <p>
      <span class="sonElem">处方时间</span>
      <span>{{content.recipeDate|lasttime}}</span>
    </p>
    <p>
      <span class="sonElem">临床诊断</span>
      <span class="mu-secondary-text-color">{{content.diag}}</span>
    </p>

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
.listDatatop {
  padding: 24px;
  p {
    border-bottom: none;
    line-height: 60px;
    display: flex;
    :first-child {
      flex: 0 0 130px;
      color: var(--primary--title);
    }
    span {
      color: var(--primary--content);
      margin-right: 28px;
    }
    
  }
}
</style>
