 <template>
  <div class="margin55 outCarint">
    <Header post-title="我的处方"></Header>
    <div class="ordercard">
      <div class="ordercard-top">
        <span class="title">
         合计金额
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
          <span>规格：27mg*4片/盒</span>
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
          <span>规格：27mg*4片/盒</span>
          <span>12盒</span>
        </div>
      </div>
    </div>
    <p class="outbTN">
      
      <span   @click="payorder()">提交</span>
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
    payorder() {
      let argu = {};
      this.$router.push({
        name: "payorder",
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
  background: #1da1f3;
  color: #ffffff;
  position: fixed;
  text-align: center;
  padding: 20px 36px;
 
}
</style>