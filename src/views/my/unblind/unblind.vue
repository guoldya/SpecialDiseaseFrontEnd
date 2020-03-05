<template>
  <div class="unblind margin55">
    <Header post-title="就诊卡详情"></Header>
     
    <div class="flatCard" style="margin-top:10px">
      <div class="cardText login-box">
        <div class="content">
          <div class="login-box">
            <div class="login-box-div">
              <span class="flexF">姓名</span>
              <input class="flexF" type="text" name="username" placeholder="姓名" :value="patientName" maxlength="10">
            </div>
            <div class="login-box-div">
              <span class="flexF">电子就诊卡号</span>
              <input class="flexF" type="text" name="cardNo" placeholder="电子就诊卡号" :value="cardNo">
            </div>
          </div>
        </div>
      </div>
    </div>
    

    <md-button type="primary" round class="margin16" @click="unBlind">解除绑定</md-button>

  </div>
</template>
<script type="text/babel">
import { mapState } from 'vuex';
let appbizPatientCarduntie = "/api/hos/bizPatientCard/untie";
let cardDetail = "/api/hos/bizPatientCard/read/detail";
export default {
  data() {
    return {
      patientName: '',
      cardNo: '',
      registerNo: '',
      idCard: '',
      createTime: '',
      mobile: '',
      cardinfo: '',
    };
  },
  computed: {

    ...mapState({
      _cardlist: state => state.home.cardList,
    }),

  },
  created() {

    this.$axios.put(cardDetail, {
      id: this.$route.query.id * 1,
    }).then(res => {
      if (res.data.code == '200') {
        this.cardinfo = res.data.data;
        this.patientName = res.data.data.patientName;
        this.cardNo = res.data.data.cardNo;
        this.mobile = res.data.data.mobile;
        this.idCard = res.data.data.idCard;
        this.createTime = res.data.data.createTime;
      }
    }).catch(function (err) {
      console.log(err);
    });


  },
  mounted() {
    this.$store.dispatch('getCards', { update: true });
  },
  methods: {
    unBlind() {
      this.$dialog.confirm({
        title: '提示',
        content: '确定解除绑定吗!',
        confirmText: '确定',
        cancelText: '取消',
        onConfirm: () => {
          this.$axios.post(appbizPatientCarduntie, {
            id: this.$route.query.id * 1,
            patientName: this.patientName,
            cardNo: this.cardNo,
            mobile: this.mobile,
            idCard: this.idCard,
            createTime: this.createTime,
          }).then(res => {
            if (res.data.code == '200') {

              this.$store.dispatch('getCards', { update: true }).then(res => {
                if (this.$route.query.id * 1 == JSON.parse(sessionStorage.getItem('objInfo')).id) {
                  let setInfo = JSON.stringify(this._cardlist[0])
                  sessionStorage.setItem('objInfo', setInfo)
                }
              }

              );
              this.$router.go(-1);
            } else {
              this.$toast.info(res.data.msg)
            }
          }).catch(function (err) {
            console.log(err);
          });

        },
      });
    },

  },

};
</script>
 <style scoped>
 
</style>