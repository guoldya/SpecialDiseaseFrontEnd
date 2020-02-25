<template>
  <div class="cardblind">
    <Header post-title="添加门特患者"></Header>
    <div class="margin55">
      <md-field>
        <md-input-item class="outCarint" ref="input13" v-model="name" title="姓名" placeholder="请输入病人姓名" maxlength="10"></md-input-item>
        <md-field-item class="outCarint" title="患与关系" arrow="arrow-right" :addon="selectorValue" @click="showSelector">
        </md-field-item>
        <md-input-item class="outCarint" ref="input13" v-model="idcard" title="身份证号" maxlength="18" placeholder="请输入身份证号"></md-input-item>
        <md-button @click="tijiao" :inactive="!isTijiao" type="primary" round style="margin-top:16px">提交</md-button>
      </md-field>
      <md-selector v-model="isSelectorShow" :default-value="1" :data="test" max-height="320px" title="选择您与患者的关系" @choose="onSelectorChoose"></md-selector>
      <p class="warnTip">温馨提示：您可以累计添加五个患者！</p>
    </div>
  </div>
</template>
<script>
import { InputItem, Field } from 'mand-mobile'
let insertOrUpdatePatient = "/api/sds/sysPatientBinding/insertOrUpdate";
export default {
  data() {
    return {
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

  methods: {
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorChoose(data) {
      console.log(data.value, "sssssss")
      this.selectorValue = data.text;
      this.type = data.value * 1;
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
            if (this.$route.query.isnews) {
              this.$router.replace({
                name: 'home',
              });
            }else{
              this.$router.go(-1);
            }
          } else {
            this.$toast.info(res.data.msg)
          }
        }).catch(function (err) {
          console.log(err);
        });



      }
    },



  },
}

</script>
 <style scoped>
.cardblind .md-button.block {
  width: 94%;
  margin-left: 3%;
}
.cardblind .md-field {
  padding: 0px !important;
}
.cardblind .warnTip {
  text-align: left;
  color: red;
  padding: 24px;
}
</style>