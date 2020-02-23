<template>
  <div class="listData">
    <span class="title"><img src="@/assets/images/record1.png" alt=""> {{content.patientName}}</span>
    <span class="titleright">{{content.status|outpationStatus}}</span>
  </div>
</template>
<script>
export default {
  filters: {
    payTypeIMG(value) {
      // 挂号记录
      if (value == 1) {
        return require('@/assets/images/mse(4).png')
        // 处方记录
      } else if (value == 4) {
        return require('@/assets/images/record1.png')
        // 病案记录
      } else if (value == 3) {
        return require('@/assets/images/mse(1).png')
      }

    }
  },
  data() {
    return {
      nowDate: "",
    };
  },
  mounted() {
    let myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    let day = myDate.getDate();
    month = month <= 9 ? "0" + month : month;
    day = day <= 9 ? "0" + day : day;
    this.nowDate = year + "-" + month + "-" + day;
  },
  props: ['content', 'type'],
}
</script>

 <style lang="scss"  scoped>
.recordcard .listData {
  padding: 24px 24px 6px;
  border-bottom: 1px solid #e5e5e5;
  .title {
    position: relative;
    top: -10px;
    img {
      width: 40px;
      margin-right: 5px;
      position: relative;
      top: 10px;
    }
  }
  .jiuyi img {
    width: 45px;
  }
}
.listData {
  font-size: 28px;
  display: flex;
  justify-content: space-between;
}
</style>
