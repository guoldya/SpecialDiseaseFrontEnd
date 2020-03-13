<template>
  <div class="margin55">
    <Header post-title="管理门特患者"></Header>
    <div>
      <div v-if="cardlist.length!=0">
        <div class="mentecard" v-for="(item,index) in cardlist" :key="index" @click="unblind(item)">
          <div class="mentecardtitlt">
            <p>
              <span class="name">{{item.name}}</span>
              <span>{{item.sex|examSex}}</span>
              <span>{{item.age}}</span>
            </p>
          </div>
          <div class="mentecardcontent">
            <p>就诊卡：{{item.code}}</p>
            <p>病种：{{item.diseaseName}}</p>
          </div>
        </div>
      </div>
      <div v-else class="blindcardBtn">
        <div class="nullDiv">
          <img src="@/assets/images/znanwu (1).png">
          <p class="nullTEXT">暂无门特患者</p>
        </div>
      </div>

      <Loading v-show="loadingtrue"></Loading>

      <div class="bindcardwarn">
        <p>
          温馨提示：您累计可添加5个门特患者
        </p>
      </div>
    </div>
    <div v-show="cardlist.length==0||cardlist.length<5">
      <div style="height: 50px"></div>
      <p @click="addpeple" class="addbTN">添加门特患者</p>
    </div>

  </div>
</template>
<script type="text/babel">
// let wechatbizPatientCardreadpage = "/app/bizPatientCard/read/list";
import { Dialog, Button, Toast } from 'mand-mobile'
import { mapState } from 'vuex';
let appbizPatientCarduntie = "sysPatientBinding/unBind";
export default {
  data() {
    return {
      link2: " ", // 二维码2
      loadingtrue: true,
      showPic: false,
      picName: '',

    };
  },
  computed: {
    ...mapState({
      cardlist: state => state.home.cardList,
    }),

  },
  async created() {
    await this.$store.dispatch('getCards'/* , { update: true } */);
    this.loadingtrue = false;
  },

  mounted() {


  },
  methods: {
    unblind(data) {
      // this.$router.push({
      //   name: 'unblind',
      //   query: { id: data.id }
      // });
      this.$dialog.confirm({
        title: '提示',
        content: '确定解除绑定吗!',
        confirmText: '确定',
        cancelText: '取消',
        onConfirm: () => {
          this.$axios.post(appbizPatientCarduntie, {
            patientId: data.id,

          }).then(res => {
            if (res.data.code == '200') {
              // isEmpty     0不为空 不跳转     1为空跳转绑定页
              console.log("ww选中wwwww", this.$route.query.id, this.chooseId)
              if (res.data.data.isEmpty == 0) {

                this.$store.dispatch('getCards', { update: true }).then(res => {
                  this.$store.commit('accountInfoFun', '')
                  if (this._cardlist) {
                    if (this.$route.query.id * 1 == this.chooseId) {
                      this.$store.commit('accountInfoFun', this._cardlist[0])
                    }
                  }

                });

                this.$toast.info("解绑成功")
                // setTimeout(() => {
                //   this.$router.go(-1);
                // }, 1000);

              } else if (res.data.data.isEmpty == 1) {

                this.$store.dispatch('getCards', { update: true }).then(res => {
                  this.$store.commit('accountInfoFun', '')
                });
                this.$router.replace({
                  name: 'addpeple',
                  query: { isnews: 1 }
                });
              }


            } else {
              this.$toast.info(res.data.msg)
            }
          }).catch(function (err) {
            console.log(err);
          });

        },
      });
    },
    addpeple() {
      this.$router.push({
        name: 'addpeple',
        query: {}
      });

    }
  },

};
</script>
 <style lang="scss"  scoped>
.mentecard {
  background: #fff;
  box-shadow: 0px 3px 4px 0px rgba(65, 150, 250, 0.07);
  border-radius: 5px;
  width: 94%;
  margin-left: 3%;
  margin-top: 20px;
  .mentecardtitlt {
    background: #eef5ff;
    padding: 12px 24px;
    p {
      line-height: 40px;
    }
    span {
      font-size: 28px;
      color: #656f8b;
      margin-right: 30px;
    }
    .name {
      font-size: 32px;
      color: #333333;
    }
  }
  .mentecardcontent {
    height: 130px;
    p {
      line-height: 40px;
      font-size: 28px;
      margin-top: 20px;
      text-indent: 24px;
    }
    background: url("~@/assets/images/mente.png") no-repeat 10%;
    background-size: 142px 120px;
    background-position: right;
  }
}
.bindcardwarn {
  color: #f99c2e;
  bottom: 0;
  padding-top: 40px;
  margin-bottom: 40px;
  font-size: 24px;
  margin-left: 34px;
}

.addbTN {
  background-color: var(--primary);
  width: 100%;
  text-align: center;
  color: #ffffff;
  position: fixed;
  left: 0;
  line-height: 100px;
  bottom: 0;
  z-index: 999;
}
</style>