<template>
  <div class="margin55">
    <Header post-title="支付订单"></Header>
    <md-field brief="收件人信息">
      <md-input-item ref="input0" title="收件人" placeholder="收件人姓名" is-amount :maxlength="5"></md-input-item>
      <md-input-item ref="input0" title="手机号码" type="phone"></md-input-item>
      <md-input-item ref="input0" title="收件人地址"></md-input-item>
    </md-field>
    <div class="orderinfo">
      <p>订单编号 78522222222222222</p>
      <p>
        <span>快递费</span>
        <span>0元</span>
      </p>
    </div>
    <p class="outbTN">
      <span class="outbTN-left">
        <span>合计：￥{{123|keepTwoNum}}</span>
      </span>
      <span class="outbTN-right" >立即缴费</span>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {


    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.orderinfo {
  background: #ffffff;
  padding: 20px;
  margin-top: 20px;
  p {
    display: flex;
    justify-content: space-between;
    line-height: 50px;
    span {
      font-size: 26px;
      color: #979797;
    }
  }
}

.outbTN {
  width: 100%;
  line-height: 70px;
  bottom: 0;
  left: 0;
  z-index: 999;
  border-top: 2px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  color: #1da1f3;
  position: fixed;
  text-align: center;
  padding: 20px 36px;

  .outbTN-left {
    // padding-left: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .outbTN-right {
    background: #1da1f3;
    color: #ffffff;
    align-items: center;
    text-align: center;
    font-size: 28px;
    width: 150px;
    height: 60px;
    line-height: 60px;
    border-radius: 60px;
  }
}
</style>