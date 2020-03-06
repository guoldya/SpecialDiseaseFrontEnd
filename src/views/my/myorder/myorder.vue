 <template>
  <!-- <div class="margin55 outCarint">
    <Header post-title="我的订单"></Header>
    <div class="mycard" v-if="waitPayData.length!=0" v-show="!loadingtrue" v-for="(item, index) in waitPayData" :key="index">
      <div class="mycardtop">
        <div class="cardtopleft">
          <div>
            <img src="@/assets/images/dill13.png" alt="商品图片">
          </div>
          <div>
            <p>订单编号</p>
            <p class="orderno">{{item.orderCode}}</p>
          </div>
        </div>
        <div class="cardtopright" @click="updown(index)">
          <div>
            <p class="button">
              <span>{{item.status|payTypeFilter}}</span>
            </p>
            <p class="money">￥{{item.totalMoney|keepTwoNum}}</p>
          </div>
        </div>
      </div>
      <div>
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
        <span><label v-if="item.status!=3">查看详情</label>
        </span>
        <span>
          <router-link v-if="item.status==3" :to="{ path: '/myorderinfo', query: { id: item.id }}" class="consult">
            <span class="have">确认收货</span>
          </router-link>
          <img v-if="item.status!=3" src="@/assets/images/icon_right.png" alt="">
        </span>
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

  </div> -->
  <div class="margin55 outCarint">
    <Header post-title="我的订单"> </Header>
    <ul class="content" v-show="show && !loadingtrue">
      <div class="mycard" v-if="drugsList.drugs.length!=0" v-for="(item,i) in drugsList.drugs" :key="i">
        <div class="mycardtop">
          <div class="cardtopleft">
            <div>
              <img src="@/assets/images/dill13.png" alt="商品图片">
            </div>
            <div>
              <p>订单编号</p>
              <p class="orderno">{{item.orderCode}}</p>
            </div>
          </div>
          <div class="cardtopright" @click="updown(index)">
            <div>
              <p class="button">
                <span>{{item.status|payTypeFilter}}</span>
              </p>
              <p class="money">￥{{item.totalMoney|keepTwoNum}}</p>
            </div>
          </div>
        </div>
        <div>
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
          <span><label v-if="item.status!=3">查看详情</label>
          </span>
          <span>
            <router-link v-if="item.status==3" :to="{ path: '/myorderinfo', query: { id: item.id }}" class="consult">
              <span class="have">确认收货</span>
            </router-link>
            <img v-if="item.status!=3" src="@/assets/images/icon_right.png" alt="">
          </span>
        </div>
      </div>
      <Null :loading-true="drugsList.drugs.length==0"></Null>
      <md-icon v-if="!loadingtrue && busy" name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
      <div class="nomore" v-if="!loadingtrue && (drugsList.nowPage == pages || pages == 0)">没有更多数据了</div>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
    </ul>
    <Loading v-if="loadingtrue"></Loading>
  </div>
</template>
 <script>
let selectDrugs = 'bizOrder/selectPage'

export default {
  data() {
    return {
      show: true,
      pages: 1,
      loadingtrue: true,
      busy: false,
      current: 1,
      drugsList: {
        nowPage: 1,
        drugs: []
      }
    };
  },
  mounted() {
    this.selectDrugsList();
  },
  methods: {
    updown(data) {
      console.log(data)

      if (this.isSHOW == data) {
        this.isSHOW = 'ssssss'
      } else {
        this.isSHOW = data;
      }
    },
    async selectDrugsList() {
      if (!this.busy) this.loadingtrue = true;

      this.$axios.put(selectDrugs, {
        pageSize: 20,
        pageNumber: this.current,
      }).then((res) => {
        if (res.data.code == '200') {
          res = res.data;
          this.drugsList.drugs = this.current == 1 ? res.rows : this.drugsList.drugs.concat(res.rows);
          this.drugsList.nowPage = res.current;
          this.pages = res.pages;
          if (!this.busy) this.loadingtrue = false;
          this.busy = false;

        } else {
          this.$toast.info(res.data.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });

    },
    loadMore: function () {
      if (this.loadingtrue) return false;
      if (this.drugsList.nowPage == this.pages) return false;
      this.busy = true;
      setTimeout(() => {
        this.current++;
        this.selectDrugsList();
      }, 1000)
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
      .button {
        display: flex;
        justify-content: space-between;
      }
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
  :last-child {
    display: flex;
    justify-content: space-between;
  }
  img {
    width: 12px;
  }
}
.mycard .have {
  font-size: 26px;
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 40px;
  line-height: 40px;
  text-align: center;

  display: block;
  padding: 0 12px;
}
</style>