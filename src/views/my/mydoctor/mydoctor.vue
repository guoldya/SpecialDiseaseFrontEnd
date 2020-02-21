<template>
  <div class="margin55">
    <Header post-title="支付订单"></Header>
    <doctorList  v-for="(item, index) in doctorList" :datas="item" :key="index"></doctorList>
  </div>
</template>
<script>
import doctorList from "../../../components/doctorList";
export default {
  data() {
    return {
    };
  },
  components: {
    doctorList
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang='scss' scoped>
</style>