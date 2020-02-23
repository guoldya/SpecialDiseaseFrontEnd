<template>
  <div class="appTabCarint margin45">
    <div class="appTab">
      <span v-for="(item, index) in tabTitle" v-if="item.orgName" :key="'time' + index" @click="switchTo(item)" :class="active1 === item.id ? 'appTabAcitive' : '' ">
        {{item.title}}
      </span>
      <span v-for="(item, index) in tabTitle" v-if="item.type" :key="'time' + index" @click="switchTo(item)" :class="active1 === item.type ? 'appTabAcitive' : '' ">
        {{item.title}}
        <label v-if="item.unReadTotal">未读({{item.unReadTotal}})</label>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active1: 1,
    }
  },
  props: ['tabTitle', 'depart'],
  mounted() {
    if (sessionStorage.getItem('feeActiveFun')) {
      this.active1 = sessionStorage.getItem('feeActiveFun') * 1
    }
    this.$nextTick(() => {
      if (this.depart == 1) {
        this.active1 = this.tabTitle[0].id
        //this.active1 = 315
      }
    })

  },
  methods: {
    switchTo(item) {
      if (this.active1 === item.type || this.active1 === item.id || this.tabTitle[0].loading) return;

      if (item.orgName) {
        this.active1 = item.id;
      } else {
        this.active1 = item.type;
      }
      this.$emit('childByValue', item);
    },
    
  },
}
</script>

<style scoped>
/**tab样式*/
.appTabCarint {
  text-align: center;
  width: 100%;
}

.appTab {
  display: flex;
  justify-content: space-around;
  padding: 14px 100px;
}
.appTab span {
  font-size: 30px;
  position: relative;
  line-height: 50px;
}
.appTab label {
  font-size: 26px;
}
.appTab .appTabAcitive {
  color: var(--primary);
  border-bottom: 4px solid var(--primary);
  z-index: 2;
}
</style>
