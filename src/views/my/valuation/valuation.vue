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
        <!-- <p class="title">{{doctorInfo[0].name}} </p> -->
        <div class="content-card-div" v-for="(item2,index2) in doctorInfo" :key="index2+'1'">
          <p :class="item2.type==4?'title':''">{{item2.name}} <span class="wran" v-if="item2.type==2">(多选)</span></p>

          <template v-if="item2.childNode">
            <!-- <div class="content-card-tag tiwen" v-if="item2.sn==3||item2.sn==8||item2.sn==4||item2.sn==6&&item2.type!=4" :class="item2.childNode[0].name.length>9?'aa100':''"> -->
            <div class="content-card-tag tiwen" v-if="item2.type!=2" :class="item2.childNode[0].name.length>9?'aa100':''">
              <div v-for="(item,index) in item2.childNode" :key="index+'1'" @click="selectService(index,index2,item2.type,item.name)" style="display:flex">
                <!-- <img :src="aa" alt=""> -->

                <label :class="[{'is-checked': item.checked }, 'md-radio']">
                  <div class="md-radio-icon">
                    <i class="md-icon icon-font md-icon-checked checked md"></i>
                  </div>
                </label>
                <span>{{item.name}}</span>
              </div>
            </div>
          </template>
          <div v-if="item2.type==2" class="content-card-tag" :class="item2.childNode[0].name.length>9?'aa100':''">
            <!-- <div v-if="item2.sn!=3&&item2.sn!=4&&item2.sn!=6&&item2.type!=4" class="content-card-tag"> -->
            <div v-for="(item,index) in item2.childNode" :key="index+'1'" @click="selectService(index,index2,item2.type,item.name)" style="display:flex">
              <label :class="[{'is-checked': item.checked }, 'md-radio']">
                <div class="md-radio-icon">
                  <i class="md-icon icon-font md-icon-checked checked md"></i>
                </div>
              </label>
              <span>{{item.name}}</span>
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
            <p>疫情期间，请注意做好个人防护，并戴好口罩，如果体温大于38度,建议立刻发热门诊就诊，并且佩戴好口罩 做好防护。佩戴医用外科口罩或N95， 避免乘坐公共交通工具。</p>
          </div>
          <div>
            <md-button type="primary" size="small" inline round @click="onActConfirm" style="width:100%;margin-top:20px">我知道了</md-button>
          </div>
        </div>
      </div>
    </md-landscape>
    <md-date-picker ref="datePicker" v-model="isDatePickerShow" type="custom" title="请选择开始发热日期" :custom-types="['yyyy', 'MM','dd']" :min-date="minDate" :default-date="currentDate" @confirm="onDatePickerConfirm"></md-date-picker>
  </div>
</template>

<script>



let updateByList = "/api/hos/bizPatientEvaluate/updateByList";
let detailurl = "bizSurvey/read/queryById";
let saveResult = 'bizSurvey/read/saveResult'
export default {
  data() {
    return {
      isDatePickerShow: false,
      datePickerValue: '',
      minDate: new Date('2019/12/1'),
      currentDate: new Date(),
      isTijiao: true,

      recordDetai: '',
      title: '',
      num0: 0,
      count: 1,
      actDialog: {
        open: false,
        btns: [
          {
            text: '取消',
            type: 'danger',
            handler: this.onActConfirm,
          },

        ],
      },
      parm: {
        accountId: 0,
        list: [
          {
            result: "string",
            resultId: 0
          }
        ],
        surveyId: 0
      },

      doctorInfo: [{ id: 1, name: "症状采集", sn: 1, surveyId: 1, type: 4 }, { id: 1, name: "症状采集", sn: 1, surveyId: 1, type: 4 }],
    }
  },

  computed: {
    list() {
      return this.count && this[`list${1}`]
    }

  },
  created() {
    this.init();


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

    // 初始化
    async init() {
      try {

        let res = await this.$axios.put(detailurl, { id: 1 });
        //   res.data.rows.forEach(item => item.checked = false);
        //   this.waitPayData = this.waitPayData.concat(res.data.rows);
        if (res.data.code != 200) {
          throw Error(res.data.msg);
        }

        res.data.data.list.map(x => {
          if (x.childNode) {
            x.childNode.forEach(item => item.checked = false);
            x.childNode[0].checked = true;
          }

        })
        this.parm.surveyId = res.data.data.id;
        // res.data.data.list[1].childNode.forEach(item => item.checked = false);

        this.doctorInfo = res.data.data.list;


        this.isloading = false;
      } catch (error) {
        this.isloading = false;
      }
    },
    onDatePickerConfirm() {
      this.datePickerValue = this.$refs.datePicker.getFormatDate('yyyy-MM-dd')
    },
    onActConfirm() {
      // Toast({
      //    content: '你点击了确认',
      // })
      this.actDialog.open = false

      this.$router.go(-1)
    },
    selectService(index, index2, data, name) {

      if (data == 2) {
        if (name.search("都没有") != -1) {


          //  const serviceresult = this.doctorInfo[index2].childNode.filter(item => item.id != 13);
          // const serviceresult = this.doctorInfo[index2].childNode.filter(item => item.name != '都没有');
          const serviceresult = this.doctorInfo[index2].childNode.filter(item => item.name.search("都没有") == -1);
          if (this.doctorInfo[index2].childNode.filter(item => item.name.search("都没有") != -1)[0].checked) {
            return
          }
          // this.doctorInfo[index2].childNode
          serviceresult.forEach(item => item.checked = false)
          this.doctorInfo[index2].childNode[index].checked = !this.doctorInfo[index2].childNode[index].checked;
        } else {

          const serviceresult2 = this.doctorInfo[index2].childNode.filter(item => item.name.search("都没有") != -1);
          const serviceresult3 = this.doctorInfo[index2].childNode.filter(item => item.name.search("都没有") == -1);
          const serviceresult4 = serviceresult3.filter(item => item.checked == true);
          // const serviceresult2 = this.doctorInfo[index2].childNode.filter(item => item.id != 13);
          if (serviceresult4.length == 1) {
            if (this.doctorInfo[index2].childNode[index].checked) return
          }
          serviceresult2.forEach(item => item.checked = false)
          this.doctorInfo[index2].childNode[index].checked = !this.doctorInfo[index2].childNode[index].checked;
        }
      } else {

        // this.doctorInfo[index2].childNode[index].checked = !this.doctorInfo[index2].childNode[index].checked;
        if (this.doctorInfo[index2].childNode[index].checked) {
          return
        } else {
          this.doctorInfo[index2].childNode.forEach(item => item.checked = false)
          this.doctorInfo[index2].childNode[index].checked = true;

        }
      }


    },
    // 住院评价
    checkedFun: function (val, i) {

      this.list[i].evaluation = val.value
    },

    tijiao() {


      // this.doctorInfo.forEach(item => item.checked = true);

      // this.parm.list.push = this.doctorInfo.map(x => {
      var aaa = [];
      this.doctorInfo.map(x => {
        if (x.childNode) {
          x.childNode.map(a => {
            console.log(a)
            if (a.checked) {
              console.log(a.id, a.name, "提交中")
              aaa.push({ resultId: a.id, result: a.name });
              return { id: a.id, result: a.name }
            }
          })

        }
        // return { id: x.id, feeType: x.name, }
      })
      this.parm.list = aaa;
      this.$toast.loading("提交中...")
      this.isTijiao = false;
      this.$axios.put(saveResult, this.parm).then(res => {
        if (res.data.code == '200') {
          this.$toast.hide()
          this.isTijiao = true;
          this.actDialog.open = true;


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
      line-height: 80px !important;
      // border-bottom: 1px solid #ededed;
      font-size: 30px;
      margin: 0 25px !important;
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
      // margin: 35px 24px;
      border-bottom: 1px solid #ededed;
      p {
        line-height: 35px;
        margin: 35px 24px;
      }
      .wran {
        font-size: 22px;
        color: #ffac1b;
      }
      .content-card-tag {
        margin: 30px 25px 10px;
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
          width: 80%;
          display: flex;
          justify-content: space-between;
          font-size: 26px;
          color: #8b8b8b;
          padding-bottom: 20px;
          .slecet {
            width: 202px;
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
      height: 307px;
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
.valuation-top .content-card .content-card-div .aa100 div {
  width: 100%;
}
</style>
 
