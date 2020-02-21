 <template>
  <div class="margin55 outCarint">
    <Header post-title="我的订单"></Header>
    <div class="ordercard">
      <div class="ordercard-top">
        <span class="title">
          <img src="@/assets/images/dill13.png" alt="">
          SF1222222222222222222
        </span>
        <span class="money">
          $125.00
        </span>
      </div>
      <div class="orderlistbottom12">
        <div class="orderlistbottom">
          <div class="name">
            <p>药品名药品名药品名药品名药品药品名</p>
          </div>
          <div>
            <p>136元</p>
          </div>
        </div>
        <div class="orderlist2">
          <span>单价：27元/盒</span>
          <span>12盒</span>
        </div>
      </div>
      <div class="orderlistbottom12">
        <div class="orderlistbottom">
          <div class="name">
            <p>药品名药品名药品名药品名药品药品名</p>
          </div>
          <div>
            <p>136元</p>
          </div>
        </div>
        <div class="orderlist2">
          <span>单价：27元/盒</span>
          <span>12盒</span>
        </div>
      </div>
    </div>
    <div style="height:50px"></div>
    <p class="outbTN">
      <span class="outbTN-left">
        <span><img src="@/assets/images/isall.png" alt=""> </span>
        <span>全选</span>
        <span>合计：￥{{123|keepTwoNum}}</span>
      </span>
      <span class="outbTN-right" @click="totalPay()">立即缴费</span>
    </p>
  </div>
</template>
 <script>
export default {
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    totalPay() {
      let argu = {};
      this.$router.push({
        name: "payment",
        query: argu
      });
    }
  }

}
 </script>
 <style lang='scss' scoped>
.ordercard {
  box-shadow: 0 0 18px rgba(20, 19, 51, 0.1);
  background: #fff;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
  .ordercard-top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--primary--line);
    img {
      width: 30px;
      position: relative;
      top: 2px;
    }
    .money {
      color: #ee3a3a;
    }
  }
  .orderlistbottom12 {
    margin: 40px 0;
  }
  .orderlistbottom {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .name {
      flex: 0 0 400px;
      .price {
        color: #979797;
        font-size: 24px;
      }
    }
  }
  .orderlist2 {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
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

    span {
      margin-right: 20px;
    }
    img {
      width: 32px;
      top: 5px;
      position: relative;
    }
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