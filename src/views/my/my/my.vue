<template>
  <div>
    <section class="aui-scrollView">
      <div class="aui-user">
        <div class="aui-user-cell">
          <div class="aui-user-cell-logo">
            <img v-if="$store.state.userInfo.headPic" :src="$store.state.userInfo.headPic">
            <img v-else src="@/assets/images/user.jpg">
          </div>
          <div class="aui-user-cell-title">
            <p>{{this.$store.state.userInfo.nickname}}</p>
            <p class="aui-user-info" @click="acctest()">编辑个人资料 </p>
            <!-- <p> ssss</p>
            <p class="aui-user-info" @click="acctest()">编辑个人资料 </p> -->
          </div>
          <div class="aui-user-row"></div>
        </div>
      </div>
      <div class="my-tool">
        <ul>
          <li @click="mybill">
            <img src="@/assets/images/my1.png" alt="" class="image">
            <p>我的账单</p>
          </li>
          <li @click="outpation()">
            <img src="@/assets/images/my2.png" alt="" class="image">
            <p>我的处方</p>
          </li>
          <li @click="myOrder">
            <img src="@/assets/images/my3.png" alt="" class="image">
            <p>我的订单</p>
          </li>
        </ul>
      </div>

      <div class="aui-list-cell">
       
        <a href="javascript:;" class="aui-list-item" @click="idcardlist">
          <div class="aui-list-item-fl">
            <i class="icon icon-item02"></i>
            就诊人管理
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a>
        <a href="javascript:;" class="aui-list-item" @click="adress">
          <div class="aui-list-item-fl">
            <i class="icon icon-item03"></i>
            地址管理
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a>
        <!-- <a href="javascript:;" class="aui-list-item" @click="valuationList">
          <div class="aui-list-item-fl">
            <i class="icon icon-item04"></i>
            我的档案
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a> -->
        <a href="javascript:;" class="aui-list-item" @click="valuation">
          <div class="aui-list-item-fl">
            <i class="icon icon-item10"></i>
            问卷调查
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a>
        <a href="javascript:;" class="aui-list-item" @click="suggestion">
          <div class="aui-list-item-fl">
            <i class="icon icon-item05"></i>
            提醒设置
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a>
      </div>

    </section>
    <!-- 底部 -->
    <Footer  ></Footer>
  </div>
</template>
<script>
import { mapState } from "vuex";

import pg_positive from "@/assets/images/3.jpg";
export default {
  data() {
    return {
      outInfo: "",
      id: "",
      headURL: ''
    };
  },
  computed: {
    ...mapState({
      _accountinfo: state => state.userinfo,
      // _accountinfo: state => state.my.accountinfo,
      _cardlist: state => state.home.cardList,
    }),
  },
  created() {
    
  },
  async mounted() {
    // await this.$store.dispatch('getAccount');
    // await this.$store.dispatch('getCards');
  },
  methods: {
    // 编辑个人
    acctest() {
      let argu = {};
      this.$router.push({
        name: "acctest",
        query: argu
      });
    },
    mybill() {
      let argu = {};
      this.$router.push({
        name: "mybill",
        query: argu
      });
    },
    outpation() {
      let argu = {};
      this.$router.push({
        name: "outpation",
        query: argu
      });
    },
    myOrder() {
      let argu = {};
      this.$router.push({
        name: "myorder",
        query: argu
      });
    },

    idcardlist() {

      let argu = {};
      this.$router.push({
        name: "idcardlist",
        query: argu
      });
    },
    // 就医评价
    valuationList() {

      let argu = {};
      this.$router.push({
        name: "valuationList",
        query: argu
      });
    },
    valuation() {

      let argu = {};
      this.$router.push({
        name: "valuation",
        query: argu
      });
    },
    
    // 地址
    adress() {

      let argu = {};
      this.$router.push({
        name: "adress",
        query: argu
      });
    },
    //意见收集
    suggestion() {
      
       
    },
  }
};
</script>
<style lang="scss" scoped>
.aui-scrollView {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  position: relative;
  margin-bottom: -1px;
}

.aui-user {
  // background-color: rgba(27, 130, 210, 1);
  background: url("~@/assets/images/bg17.png") 100%;
  background-size: 100%;
  padding: 50px 20px 150px 30px;
}

.aui-user-cell {
  // background-image: url("~@/assets/images/bg17.png");
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.aui-user-cell-logo img {
  width: 130px;
  height: 130px;
  margin-right: 20px;
  display: block;
  border-radius: 8px;
  border: 4px solid #5ea6df;
  border-radius: 50%;
}

.aui-user-cell-title {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}

.aui-user-cell-title p {
  color: #fff;
  font-size: 30px;
}

.aui-user-cell-title .aui-user-info {
  color: #aed3ef;
  font-size: 26px;
  padding-top: 15px;
}

.my-tool {
  width: 95%;
  margin-left: 2.5%;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 79px 30px;
    border-radius: 20px;
    box-shadow: 0 0 18px rgba(20, 19, 51, 0.1);
    background: #ffffff;
    padding-top: 50px;
    margin-top: -100px;
    li {
      text-align: center;
      position: relative;
      .image {
        width: 70px;
        height: 70px;
      }
    }
  }
}

/* .aui-user-row:after { */
/* background-image: ; */
/* width: 32px;
  height:32x;
  background-size: 32px;
  display: block;
  color: #c9c9c9;
  content: " >";
} */

.aui-list-cell {
  background-color: #fff;
  z-index: 1;
  width: 95%;
  border-radius: 20px;
  box-shadow: 0 0 18px rgba(20, 19, 51, 0.1);
  margin-left: 2.5%;
  padding: 11px;
  margin-top: 20px;
}

.aui-list-item {
  display: flex;
  position: relative;
  padding-left: 24px;
  padding-right: 12px;
  overflow: hidden;
  background-color: #fff;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-decoration: none;
  color: inherit;
}

.aui-list-item:active {
  background: #d9d9d9;
}

.aui-list-item:after {
  margin-left: 24px;
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  border-bottom: 2px solid #f0f0f0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
}

.aui-list-item-fl {
  color: #303030;
  font-size: 28px;
  white-space: nowrap;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.aui-list-item-fr {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 100%;
  min-height: 100px;
  color: #9c9c9c;
  text-align: right;
  font-size: 26px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}

.aui-list-item-fr:after {
  width: 40px;
  height: 40px;
  background-size: 40px;
  display: block;
  color: #c9c9c9;
  content: " ";
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAADQUlEQVRoQ+3ZTWsTQRgH8OfZTVIagrZg8VBQUIoHD2lsmt1ml7YRpEgPRfCsCHoV+k168aYQP4GK+AbWtMZdQxptqLSXHCoePKQU0qBt0zQ7sthAs32hJfNGuoFcws7O/Ob/ZHZ2F+GMffCMecEHd3rifsJ+wh02A35Jd1igBzh+wn7Cp5gBy8oPAmAGEXoAYCaZHJ4+RXMuh1ItacvKFxEx2hw5ISRtGIkHXCQn7IQyeOElIkzt71s2NGVwfhAR5wDgvBcdDgenY7FY5YRBMDuMKtgdpfs/PgJdDIeDKdFo6mDZ0UzAMqOZgZtoAEjvX7nd3wkhwsqbKdjFLS4u9mxu1udkQTMHy4bmApYJzQ18HBqA/CQE7hhGosjsArx3Yq7g45OGCgBJsUZzB4tGCwGLRAsDN9FbW/UZALzfuvdmV95CwU2kbefTvNBSgF14K5oAALo7Mvf70DS1Z7RWb2nA/9ELzwHgnufWsmoYiZbbzXbw0oAzmUwgFIq4DxAmPaBqMjncWeBCoRCs1ciLQ7DgOM4j09SetpPq/rbCEy6VSl3lcuU1ItzyrNQ1RDKZTCZmaWHd8wgFu9i1tcp7ABhvRZEtx1EnTHMoSxMrFGzbdjdA8O0h2KqiqBO6PpSjjRUGXl5ejmxsbH4AgKR3w6GqypiuDy2xwAoB53K5c46jfATAYU8ZrytKYFTXb6ywwnIHu9hGQ5lHxEHPtbasqkFT12Mllliu4Gx2qVdRtj8dxMLvQMAxNU1bZY3lBi4UChdqNcd9rnXdU8arjqOMm2b8Fw8sF3Au9+Nio7E9jwjXPNgSIV2mYUTLvLDMwXtYGxGueLArqkpGNU1b54llCrbtYj8h9c8HsbDU3R0YE/XKhclOy7K+XwZouNhLngS/KUrjpq7rVd7JNvujDnaxiLsWAPZ7Lj3ZSKTrdjQa/SsKS72kLatwFdGZ92IByGxfX+/kwMBATSSWOti2F74AgOFBvQuFcCoej9dFY6mDLSv/FRH1JowQeLWz8+duKpXalQHLAjwKgG8QIQIAT0ZG4o8R0ZEFSx0sE+yosVBfpWVH+2DZE2p3fH7C7c6g7O39hGVPqN3x+Qm3O4Oytz9zCf8DYh50TPjMNLAAAAAASUVORK5CYII=");
}

.icon {
  width: 70px;
  height: 50px;
  background-size: 42px;
  display: block;
  background-repeat: no-repeat;
}
.icon-item01 {
  background-image: url("~@/assets/images/my4.png");
}

.icon-item02 {
  background-image: url("~@/assets/images/my5.png");
}
.icon-item03 {
  background-image: url("~@/assets/images/my6.png");
}

.icon-item04 {
  background-image: url("~@/assets/images/my7.png");
}

.icon-item05 {
  background-image: url("~@/assets/images/my8.png");
}

.icon-item06 {
  background-image: url("~@/assets/images/7nn6.png");
}

 

.icon-item10 {
  background-image: url("~@/assets/images/7nn10.png");
}

 
</style>
