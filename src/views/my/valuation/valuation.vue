<template>
  <div class="valuation  ">
    <div id="header" class="navigation">
      <div class="icon-iconfontjiantou" @click="$router.go(-1)">
        <img id="back" src="@/assets/images/icon_back_white.png">
      </div>
      <div class="navigation-content">
        在线调查
      </div>
      <div class="right"> </div>
    </div>
    <div class="valuation-top">
      <div class="content">
      </div>

      <div class="content-card">
        <p class="title">症状采集 </p>
        <div class="content-card-div">
          <p>1、是否有以下症状？</p>
          <div class="content-card-tag">
            <div v-for="(item,index) in consultList1" :key="index+'1'" @click="selectService(index)" style="display:flex">
              <!-- <img :src="aa" alt=""> -->

              <label :class="[{'is-checked': item.checked }, 'md-radio']">
                <div class="md-radio-icon">
                  <i class="md-icon icon-font md-icon-checked checked md"></i>
                </div>
              </label>
              <span>{{item.text}}</span>
            </div>
          </div>
        </div>
        <div class="content-card-div">
          <p>2、目前体温是多少？</p>
          <div class="content-card-tag tiwen">
            <div v-for="(item,index) in list1" :key="index+'1'" @click="checkedFun(item,num0+1)">
              <img src="@/assets/images/danxuan1.png" alt="">
              <span>{{item.text}}</span>
            </div>
          </div>
        </div>
        <div class="content-card-div">
          <p>
            3、如超过37.3摄氏度，请填写最高体温和何时开始发热
          </p>
          <div class="content-card-tag wendu">
            <div class="slecettitle">
              <p>请选择最高体温</p>
              <div class="slecet">
                38.9 c <img src="@/assets/images/aa.png" alt="">
              </div>
            </div>
            <div class="slecettitle">
              <p>
                请选择开始发热日期
              </p>
              <div class="slecet">
                38.9 c <img src="@/assets/images/aa.png" alt="">
              </div>
            </div>
          </div>

        </div>
        <div class="content-card-div">
          <p>4、发热时有没有以下情况？</p>
          <div class="content-card-tag tiwen">
            <div style="width:100%" v-for="(item,index) in list2" :key="index+'1'" @click="checkedFun(item,num0+1)">
              <img src="@/assets/images/danxuan1.png" alt="">
              <span>{{item.text}}</span>
            </div>
          </div>
        </div>
        <div class="content-card-div">
          <p>5、吃退热药后的体温情况是？</p>
          <div class="content-card-tag tiwen">
            <div v-for="(item,index) in list3" :key="index+'1'" @click="checkedFun(item,num0+1)">
              <img src="@/assets/images/danxuan1.png" alt="">
              <span>{{item.text}}</span>
            </div>
          </div>
        </div>
        <div class="content-card-div">
          <p>6、有没有咳痰？</p>
          <div class="content-card-tag tiwen">
            <div v-for="(item,index) in list4" :key="index+'1'" @click="checkedFun(item,num0+1)">
              <img src="@/assets/images/danxuan1.png" alt="">
              <span>{{item.text}}</span>
            </div>
          </div>
        </div>

      </div>
      <div class="content-card card2" style="  border-radius: 0 ">
        <p class="title">症状时长 </p>
        <div class="content-card-div">
          <p>7、本次不舒服有多久？</p>
          <div class="content-card-tag tiwen">
            <div v-for="(item,index) in list5" :key="index+'1'" @click="checkedFun(item,num0+1)">
              <img src="@/assets/images/danxuan1.png" alt="">
              <span>{{item.text}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content-card card2" style="  border-radius: 0 0 10px 10px;">
        <p class="title">接触史询问 </p>
        <div class="content-card-div">
          <p>1、是否有以下症状？</p>
          <div class="content-card-tag">
            <div v-for="(item,index) in consultList1" :key="index+'1'" @click="checkedFun(item,num0+1)">
              <img src="@/assets/images/xuan1.png" alt="">
              <span>{{item.text}}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- <p class="addbTN" @click="tijiao">提交</p> -->
    <div style="padding:0.24rem">
      <md-button :inactive="!isTijiao" type="primary" @click="tijiao" round style="margin-top:16px">提交</md-button>
    </div>
    <md-landscape :mask-closable="true" :closable="false" layout="column" v-model="actDialog.open" :btns="actDialog.btns">
      <div class="blind-card">
        <div class="blind-card-one">
           
        </div>
        <div class="blind-card-two">
          <div class="blind">
            <p>建议立刻发热门诊就诊，并且佩戴好口罩 做好防护。佩戴医用外科口罩或N95， 避免乘坐公共交通工具。</p>
          </div>
          <div>
            <md-button type="primary" size="small" inline round @click="onActConfirm" style="width:100%;margin-top:20px">我知道了</md-button>
          </div>
        </div>
      </div>
    </md-landscape>
  </div>
</template>

<script>



import data from './data.js'
let updateByList = "/api/hos/bizPatientEvaluate/updateByList";
let detailurl = "/api/hos/bizPatientEvaluate/read/detail";
export default {

  data() {
    return {
      isTijiao: true,
      isshow: false,
      recordDetai: '',
      title: '',
      suggest: '',
      num0: 0,
      count: 1,
      actDialog: {
        open: true,
        btns: [
          {
            text: '取消',
            type: 'danger',
            handler: this.onActConfirm,
          },

        ],
      },
      img1: require('@/assets/images/xuan1.png'),
      img2: require('@/assets/images/xuan2.png'),
      list1: [
        {
          value: 1,
          text: '＜37.3',
        },
        {
          value: 2,
          text: '＞37.3',
        },

      ],
      // 门诊
      list2: [
        {
          value: 1,
          text: '发热时体温持续不退、体温一直大于38℃',
        },
        {
          value: 2,
          text: '都没有',
        },

      ],
      // 体检
      list3: [
        {
          value: 1,
          text: '体温下降',
        },
        {
          value: 2,
          text: '体温下降又升高',
        },
        {
          value: 3,
          text: '体温没有下降',
        },
      ],
      // 体检
      list4: [
        {
          value: 1,
          text: '没有咳痰(干咳)',
        },
        {
          value: 2,
          text: '有咳痰',
        },

      ],
      list5: [
        {
          value: 1,
          text: '14天以内',
        },
        {
          value: 2,
          text: '14天以上',
        },

      ],
      list6: [
        {
          value: 1,
          text: '1.有武汉（湖北）等疫区旅游史或居住史',
        },
        {
          value: 2,
          text: '2.有接触过武汉（湖北）等疫区的人员',
        },
        {
          value: 1,
          text: '3.有接触过疑似或确诊新冠状病毒感染者',
        },
        {
          value: 2,
          text: '4.身边有多人出现发热、乏力、咳嗽、咽痛等',
        },
        {
          value: 5,
          text: '5.都没有',
        },
      ],
      consultList1: data,

    }
  },

  computed: {
    list() {
      return this.count && this[`list${1}`]
    }

  },
  created() {
    this.suggest = '';

    this.consultList1.forEach(item => item.checked = false);

    window.onscroll = function () {
      var h = document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(h * 2.5);      //控制台查看监听滚动  
      var headerTop = document.getElementById("header");
      if (h >= 40) {       //header的高度是40px;     
        headerTop.style.background = "#fff";
        headerTop.style.color = "#232323";
        document.getElementById("back").src = require('@/assets/images/icon_back.png')
      } else {
        if (h < 10) {
          //40*2.5=100;这样透明度就可以由0渐变到100%；
          headerTop.style.background = "rgba(255,255,255,0.0" + h * 2.5 + ")";
          headerTop.style.color = "#fff";
          document.getElementById("back").src = require('@/assets/images/icon_back_white.png')

        } else if (h > 10 && h <= 40) {
          headerTop.style.background = "rgba(255,255,255,0." + h * 2.5 + ")";
          headerTop.style.color = "rgba(66,66,66,0." + h * 2.5 + ")";

        }

      }
    };
  },
  methods: {
    onActConfirm() {
      // Toast({
      //    content: '你点击了确认',
      // })
      this.actDialog.open = false
    },
    selectService(index) {

      if (index == 10) {

        const serviceresult = this.consultList1.filter(item => item.value != 99);
        console.log(serviceresult, "这里")
        serviceresult.forEach(item => item.checked = false)
        this.consultList1[index].checked = !this.consultList1[index].checked;
      } else {
        const serviceresult2 = this.consultList1.filter(item => item.value == 99);
        serviceresult2.forEach(item => item.checked = false)
        this.consultList1[index].checked = !this.consultList1[index].checked;
      }
    },
    // 住院评价
    checkedFun: function (val, i) {

      this.list[i].evaluation = val.value
    },

    tijiao() {
      this.$toast.loading("提交中...")
      this.list[0].suggest = this.suggest;
      this.$axios.post(updateByList, {
        list: this.list
      }).then(res => {
        if (res.data.code == '200') {
          this.$store.dispatch('getMessage', { update1: true });
          this.$toast.info("评价成功")
          this.$router.go(-1)
        } else {
          this.$toast.hide()
          this.$toast.info(res.data.msg)
        }
      }).catch(function (err) {
        this.$toast.hide()
        console.log(err);
      });

    },

  }
}
</script>

<style lang="scss" scoped>
.valuation {
  margin-bottom: 150px;
}
.valuation .navigation {
  position: fixed;
  width: 100%;
  height: 100px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  // background: -webkit-linear-gradient(left, #1e78fe 15%, #5684fc);
  // /* Safari 5.1 - 6.0 */
  // background: -o-linear-gradient(right, #1e78fe 15%, #5684fc);
  // /* Opera 11.1 - 12.0 */
  // background: -moz-linear-gradient(right, #1e78fe 15%, #5684fc);
  // /* Firefox 3.6 - 15 */
  // background: linear-gradient(to right, #1e78fe 15%, #5684fc);

  background: transparent;
  color: #ffffff;
  z-index: 99;
  img {
    width: 20px;
    height: 35px;
  }
  .navigation-content {
    font-size: 32px;
    text-align: center;
    p {
      font-size: 28px;
    }
  }
  .icon-iconfontjiantou {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 24px;
    width: 100px;
  }
  .icon-iconfontjiantou img {
    width: 20px;
    height: 35px;
  }
  .right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 30px;
  }
}
.valuation-top {
  min-height: 360px;
  background-image: url("~@/assets/images/bg7.png");
  background-size: 100%;
  background-repeat: no-repeat;

  .content {
    padding-top: 100px;
  }
  .content-card {
    background: #ffffff;
    border-radius: 10px 10px 0 0;
    margin: 220px 24px 0;
    .title {
      color: #209fff;
      position: relative;
      padding-left: 45px;
      line-height: 80px;
      border-bottom: 1px solid #ededed;
      font-size: 30px;
    }
    .title:before {
      position: absolute;
      content: "";
      width: 4px;
      height: 25px;
      background: #1f9bff;
      top: 30px;
      left: 25px;
      transform: translateX(-50%);
    }
    .content-card-div {
      margin: 35px 24px;
      border-bottom: 1px solid #ededed;
      p {
        line-height: 35px;
      }

      .content-card-tag {
        margin: 30px 0 10px;
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        .md-radio {
          margin-top: -20px;
          margin-right: 10px;
          .is-checked .md-radio-icon {
            color: var(--primary) !important;
          }
        }

        div {
          width: 25%;
          text-align: left;
          img {
            width: 22px;
            height: 22px;
            margin-right: 10px;
          }
          span {
            font-size: 26px;
            color: #8b8b8b;
            line-height: 40px;
            display: inline-block;
            text-align: center;
            margin-bottom: 30px;
            &:nth-child(3) {
              margin-right: 0;
            }
          }
        }
        .active {
          span {
            background: #1da1f3;
            color: #ffffff;
            border: 2px solid #1da1f3;
          }
        }
      }
      .tiwen {
        div {
          width: 50%;
        }
        img {
          position: relative;
          top: 4px;
        }
      }

      .wendu {
        .slecettitle {
          width: 70%;
          display: flex;
          justify-content: space-between;
          font-size: 26px;
          color: #8b8b8b;
          padding-bottom: 20px;
          .slecet {
            width: 152px;
            height: 38px;
            line-height: 38px;
            border: 1px solid #c9c9c9;
            border-radius: 4px;
            font-size: 22px;
            display: flex;
            justify-content: space-between;
            padding-left: 20px;
            img {
              width: 14px;
              height: 9px;
              margin-top: 15px;
            }
          }
        }
      }
    }
  }
  .card2 {
    margin-top: -35px;
  }
  .content-bottom {
    background: #ffffff;
    border-radius: 10px;
    margin: 24px;
    textarea {
      width: 100%;
      height: 200px;
      margin-top: 20px;
      box-sizing: border-box;
      resize: none;
      padding: 10px;
      background: #ffffff;
    }
    p {
      line-height: 100px;
      border-bottom: 1px solid #dedede;
      text-indent: 24px;
    }
    div {
      padding: 20px;
      height: 250px;
      background: #ffffff;
    }
  }
}
.blind-card {
  background: #ffffff;
  border-radius: 20px;
  width: 601px;
  .blind-card-one {
    background-image: url("~@/assets/images/bg22.png");
    background-size: 100%;
    background-repeat: no-repeat;
    border-radius: 20px 20px 0 0;
    text-align: center;
    height: 349px;
    .title {
      font-size: 30px;
      line-height: 70px;
      color: #ffffff;
    }
  }
  .blind-card-two {
    .blind {
      width: 509px;
      height: 247px;
      background: #ffffff;
      border-radius: 10px;
      margin-top: -180px;
      box-shadow: 0 0 0.18rem rgba(20, 19, 51, 0.1);
    }
    padding: 40px 24px;
    p {
      line-height: 50px;
      font-size: 26px;
      color: #8b8b8b;
      padding: 35px;
    }
    div {
      margin: 20px;
    }
  }
}

</style>
 
