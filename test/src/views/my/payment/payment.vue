<template>
  <div class="margin55    ">
    <Header post-title="收银台"></Header>
    <md-field  brief="订单信息">
      <md-field-item solid title="就诊人" content="试试"   />
      <md-field-item solid title="收款人" content="重庆人民医院"   />
      <md-field-item solid title="订单描述" content="线上支付订单"   />
      <md-field-item solid title="订单金额" content="￥369.00元"   />
      <md-field-item solid title="医保报销" arrow addon="￥369.00元" />
      <div class="md-field-item is-solid">
        <div class="md-field-item-content"><label class="md-field-item-title">还需支付</label>
          <div class="md-field-item-control" style="color:red">￥369.00元</div>
        </div>
      </div>
    </md-field>
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