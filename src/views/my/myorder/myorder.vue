 <template>
  <div class="margin55 outCarint">
    <Header post-title="我的订单"></Header>
    <div class="mycard" v-if="waitPayData.length!=0" v-show="!loadingtrue" v-for="(item, index) in waitPayData">
      <div class="mycardtop">
        <div class="cardtopleft">
          <div>
            <img src="@/assets/images/dill13.png" alt="">
          </div>
          <div>
            <p>订单编号</p>
            <p class="orderno">{{item.orderCode}}</p>
          </div>
        </div>
        <div class="cardtopright" @click="updown(index)">
          <div>
            <p>订单总额</p>
            <p class="money">￥{{item.totalMoney|keepTwoNum}}</p>
          </div>
          <div>
            <img v-if="isSHOW==index" src="@/assets/images/icon_down.png" alt="">
            <img v-if="isSHOW!=index" src="@/assets/images/icon_up@2x.png" alt="">
          </div>
        </div>
      </div>
      <div v-show="isSHOW==index">
        <div class="mycardlist" v-for="(item2, index2) in item.orderDetailsList" :key="index2">
          <div class="mycardlistleft">
            <div class="img">
              <img src="@/assets/images/1.jpg" alt="">
            </div>
            <div>
              <p>{{item2.drugName}}</p>
              <p class="price">单价：￥{{item2.price|keepTwoNum}}</p>
            </div>
          </div>
          <div class="mycardlistright">
            <p>订单金额：￥{{item2.total|keepTwoNum}}</p>
            <p class="num">数量：{{item2.num}}</p>
          </div>
        </div>

      </div>
      <div class="lookmore" @click="orderinfo(item)">
        <span>查看详情</span>
        <span><img src="@/assets/images/icon_right.png" alt=""></span>
      </div>
    </div>
    <Null :loading-true="!loadingtrue&&waitPayData.length==0"></Null>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
      <span v-if="waitPayData.length!=0&&!nomore">
        <span class="mu-light-text-color">加载中</span>
        <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
      </span>
    </div>
    <Loading v-show="loadingtrue"></Loading>

  </div>
</template>
 <script>
let pay_list_url = '/api/hos/bizOrder/selectPage'
export default {
  data() {
    return {
      isSHOW: 0,
      waitPayData: [],
      page: 1,
      pageSize: 10,
      busy: true,
      nomore: false,
      loadingtrue: true,

    };
  },
  mounted() {
    this.WaitPay(false);
  },
  methods: {
    updown(data) {
      console.log(data)
      
      if(this.isSHOW == data){
        this.isSHOW='ssssss'
      }else{
         this.isSHOW = data;
      }
    },
    WaitPay(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = this.pageSize;
      this.$axios.put(pay_list_url, params).then((res) => {
        this.loadingtrue = false;
        if (res.data.code == 200) {
          if (res.data.rows) {
            if (flag) {
              this.waitPayData = this.waitPayData.concat(res.data.rows);  //concat数组串联进行合并
              if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
                this.busy = false;
                this.nomore = false;
              } else {
                this.busy = true;
                this.nomore = true;
              }
            } else {
              this.waitPayData = res.data.rows;
              this.busy = true;
              if (res.data.total < 10) {
                this.busy = true;
                this.nomore = true;
              } else {
                this.busy = false;
                this.nomore = false;
              }
            }
          }
          //2、
        } else {
          this.waitPayData = []
        }
      })
    },
    loadMore() {
      this.busy = true;  //将无限滚动给禁用
      setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
        this.page++;  //滚动之后加载第二页
        this.WaitPay(true);
      }, 500);
    },
    orderinfo(data) {
      let argu = { id: data.id };
      this.$router.push({
        name: "myorderinfo",
        query: argu
      });
    },

  }

}
 </script>
 <style lang='scss' scoped>
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

.mycard {
  box-shadow: 0 0 18px rgba(20, 19, 51, 0.1);
  background: #fff;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
  .mycardtop {
    display: flex;
    justify-content: space-between;
    p {
      line-height: 50px;
    }
    .cardtopright,
    .cardtopleft {
      display: flex;
      justify-content: space-between;
    }
    .cardtopleft {
      img {
        width: 30px;
        margin-top: 10px;
        margin-right: 10px;
      }
      .orderno {
        color: #979797;
        font-size: 24px;
      }
    }
    .cardtopright {
      text-align: right;
      img {
        width: 20px;
        margin-left: 20px;
      }
      .money {
        color: #ee3a3a;
      }
    }
  }

  .mycardlist {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 20px;
    line-height: 50px;
    .mycardlistright {
      text-align: right;
      font-size: 26px;
      .num {
        font-size: 24px;
        color: #979797;
      }
    }
    .mycardlistleft {
      display: flex;
      justify-content: space-between;
      .img {
        width: 100px;
        height: 100px;
        margin-right: 20px;
        img {
          width: 100%;
        }
      }
      .price {
        font-size: 24px;
        color: #979797;
      }
    }
  }
}
.lookmore {
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 26px;
  color: var(--primary--content);
  border-top: 1px solid #e5e5e5;

  img {
    width: 12px;
  }
}
</style>