<template>
  <div class="cardblind">
    <Header post-title="添加门特患者"></Header>

    <div class="margin55">
      <div class="warn">
        <p class="title"> <img src="@/assets/images/warn.png">【温馨提示】</p>
        <p>1.本系统为门特患者提供线上续方功能，仅限线下已完成初诊的门特患者使用;</p>
        <p>2.初次登录请录入预留的姓名、电话及身份证进行绑定；</p>
        <p>3.续方流程：选择医生→在线咨询→医生在线开方→记账→收货；</p>
        <p>4.定期到定点医院报销；</p>
        <p>5.您最多可以绑定5名特病患者。</p>
      </div>
      <md-field>
        <md-input-item align="right" class="outCarint" ref="input13" v-model="name" title="姓名" placeholder="请输入病人姓名" maxlength="10"></md-input-item>
        <md-field-item class="outCarint" title="患与关系" arrow="arrow-right" :addon="selectorValue" @click="showSelector">
        </md-field-item>
        <md-input-item align="right" class="outCarint" ref="input13" v-model="idcard" title="身份证号" maxlength="18" placeholder="请输入身份证号"></md-input-item>
        <md-button @click="tijiao" :inactive="!isTijiao" type="primary" round style="margin-top:16px">提交</md-button>
      </md-field>
      <md-selector v-model="isSelectorShow" :default-value="1" :data="test" max-height="320px" title="选择您与患者的关系" @choose="onSelectorChoose"></md-selector>

    </div>
    <!-- 咨询弹窗 -->
    <md-dialog :title="basicDialog.title" :closable="true" v-model="basicDialog.open" :btns="basicDialog.btns">
      <p>绑定成功，用此账号登录？</p>
    </md-dialog>
  </div>
</template>
<script>



import { InputItem, Field } from 'mand-mobile'
let insertOrUpdatePatient = "sysPatientBinding/insertOrUpdate";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      accountId: '',
      basicDialog: {
        open: false,
        checked: true,
        title: "提示",
        content: '',
        price: '',
        type: null, // 咨询弹窗类型 type 1 图文 2 电话 3视频
        btns: [

          {
            text: "确定",
            handler: this.onConfirm
          }
        ]
      },
      type: 1,
      name: '',
      idcard: '',
      isTijiao: true,
      show: true,
      isSelectorShow: false,
      selectorValue: '自己',
      test: [
        {
          value: '1',
          text: '自己',
        },
        {
          value: '2',
          text: '父母',
        },
        {
          value: '3',
          text: '子女',
        },
        {
          value: '4',
          text: '配偶',
        },
        {
          value: '5',
          text: '朋友',
        },
        {
          value: '6',
          text: '其他亲属',
        },
      ],
    }
  },
  /* DELETE */
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
  },
  computed: {
    ...mapState({
      _cardlist: state => state.home.cardList,
    }),

  },
  methods: {
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorChoose(data) {
      console.log(data.value, "sssssss")
      this.selectorValue = data.text;
      this.type = data.value * 1;
    },
    // 点击申请咨询按钮
    onConfirm() {

      this.basicDialog.open = false;
      this.$router.push({
        path: "/",
        query: { loginAgin: 1, accountId: this.accountId }
      });
    },
    tijiao() {
      this.isTijiao = false;
      if (!this.name || !this.idcard) {
        this.$toast.info('请完善信息')
        this.isTijiao = true;
      } else {

        this.$axios.post(insertOrUpdatePatient, {
          name: this.name,
          bindRelation: this.type,
          idCard: this.idcard
        }).then(res => {
          if (res.data.code == '200') {
            this.$toast.info('添加成功')
            this.isTijiao = true;
            this.accountId = res.data.data.accountId;

            this.$store.dispatch('getCards', { update: true }).then(res => {
              if (this.$route.query.isnews) {
                console.log("111111111绑定选中的")
                this.$store.commit('accountInfoFun', this._cardlist[0])
              }
            });
            if (this.$route.query.isnews) {
              this.basicDialog.open = true;
            } else {
              this.$router.go(-1);
            }
          } else {
            this.$toast.info(res.data.msg)
            this.isTijiao = true;
          }
        }).catch(function (err) {
          console.log(err);
          this.isTijiao = true;
        });



      }
    },



  },
}

</script>
 <style  scoped>
.cardblind .md-button.block {
  width: 94%;
  margin-left: 3%;
}
.cardblind .md-field {
  padding: 0px !important;
}
.warn {
  padding: 22px;
  background: rgba(255, 246, 213, 1);
  color: #e7b91d;
  font-size: 24px;
  line-height: 40px;
  border: 1px solid #e7b91d;
}
.warn p{
  margin-left: 28px;
}
.warn .title{
  margin-left: 0;
}
.title img {
  width: 30px;
  position: relative;
  top:4px
}
</style>