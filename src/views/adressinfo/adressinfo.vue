<template>
  <div class="adressinfo">
    <Header  :post-title="this.post"></Header>
    
    <!-- <Navigation type="title" :title="post">
      <span v-show="$route.query.id" class="mu-secondary-text-color" @click="dedete">删除</span>
    </Navigation> -->
    <div class="margin55 ">
      <md-field>
        <md-input-item ref="input13" v-model="receiver" title="姓名" placeholder="姓名" maxlength="10"></md-input-item>
        <md-input-item type="phone" v-model="mobile" title="手机号码" placeholder="xxx xxxx xxxx" clearable></md-input-item>
        <md-input-item ref="input13" v-model="zipCode" maxlength="6" title="邮政编码" placeholder="邮政编码"></md-input-item>
        <Address ref="openAdress" v-if="isOK" :default-value="pickerDefaultValue" v-on:adressByValue="adressByValue"></Address>
        <md-input-item ref="input13" v-model="address" title="详细地址" placeholder="详细地址" maxlength="100"></md-input-item>
        <div class="md-agree margin7" @click="isDefault=!isDefault">
          <div :class="{ 'md-agree-icon':true,'checked':isDefault}">
            <div class="md-agree-icon-container">
              <i class="md-icon icon-font md-icon-checked md"></i>
              <i class="md-icon icon-font md-icon-check md"></i>
            </div>
          </div>
          <div class="md-agree-content">
            默认地址
          </div>
        </div>
        <div style="padding:0.24rem">
          <md-button :inactive="!isTijiao" type="primary" @click="tijiao" round style="margin-top:16px">保存</md-button>
        </div>
      </md-field>
      <!-- <Loading v-show="loadingtrue"></Loading> -->
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { InputItem, Field } from 'mand-mobile'
let addressDetails = "/bizShippingAddress/addressDetails";
let addOrUpdate = "/bizShippingAddress/insertOrUpdate";
let deleteAddress = "/bizShippingAddress/delete";
let appshippingAddressaddressList = "/bizShippingAddress/addressList";
export default {
  name: 'input-item-demo',

  data() {
    return {
      isTijiao: true,
      loadingtrue: true,
      isDefault: false,
      receiver: '',
      mobile: '',
      address: '',
      areaId: '',
      zipCode: '',
      post: "编辑地址",
      pickerDefaultValue: [],
      isOK: false,
    }
  },
  /* DELETE */
  components: {
    [InputItem.name]: InputItem,
    [Field.name]: Field,
  },
  created() {
    if (this.$route.query.id) {
      this.post = '编辑地址';
      this.$axios.put(addressDetails, {
        id: this.$route.query.id * 1,
      }).then(res => {
        if (res.data.code == '200') {
          this.loadingtrue = false;
          this.receiver = res.data.data.receiver;
          this.mobile = res.data.data.mobile;
          this.address = res.data.data.address;
          this.areaId = res.data.data.areaId;
          this.pickerDefaultValue = [parseInt(this.areaId / 1000) * 1000, parseInt(this.areaId / 100) * 100, this.areaId]
          this.isOK = true;
          this.zipCode = res.data.data.zipCode;
        }
      }).catch(function (err) {
        console.log(err);
      });
    } else {
      this.post = '新增地址';
      this.isOK = true;
    }
  },
  computed: {
    ...mapState({
      _selectAdress: state => state.selectAdress,
    }),
  },
  mounted() {
    if (this.$route.query.isDefault * 1 == 1) {
      this.isDefault = true
    } else {
      this.isDefault - false
    }
  },
  methods: {
    dedete() {
      let params = {}, p_data = {};
      p_data.id = this.$route.query.id;
      params.data = p_data;
      this.$dialog.confirm({
        title: '确认',
        content: '请确认删除该地址吗',
        confirmText: '确定',
        onConfirm: () => {
          this.$axios.delete(deleteAddress, params).then((res) => {
            if (res.data.code == '200') {
              if (this.$route.query.checked) {
                this.$toast.loading("删除中...")
                setTimeout(() => {
                  this.$axios.put(appshippingAddressaddressList, {}).then((res) => {
                    if (res.data.code == '200') {
                      this.$toast.info("删除成功")
                      if (this._selectAdress.id == this.$route.query.id) {
                        if (res.data.rows.length != 0) {
                          this.$store.commit('selectAdressFun', res.data.rows.filter(item => item.isDefault == 1)[0]);
                        } else {
                          this.$store.commit('selectAdressFun', '');
                        }
                      }
                      this.$router.go(-1);

                    } else {
                      this.$toast.info(res.msg);
                    }
                  }).catch(function (err) {
                    console.log(err);
                  });
                }, 1000)

              } else {
                this.$toast.info("删除成功")
                this.$router.go(-1);
              }


            } else {
              this.$toast.info(res.msg);
            }
          }).catch(function (err) {
            console.log(err);
          });
        }
      })
    },
    adressByValue: function (childValue) {
      // console.log(childValue, "childValuechildValue")
      this.areaId = childValue
    },
    tijiao() {
      this.isTijiao = false;
     if (!this.receiver || !this.mobile || !this.address || !this.areaId) {
       // if (!this.receiver || !this.mobile) {
        this.$toast.info("请完善信息")
        this.isTijiao = true;
      } else {
        if (!(/^1[34578]\d{9}$/.test(this.mobile))) {
          this.$toast.info("手机号码有误，请重填");
          this.isTijiao = true;
          return false;
        }
        let aa = {};
        aa.id = this.$route.query.id * 1;
        aa.receiver = this.receiver;
        aa.mobile = this.mobile;
        aa.address = this.address;
        aa.areaId = this.areaId;
        aa.zipCode = this.zipCode;
        aa.isDefault = this.isDefault ? 1 : 0;
        this.$axios.post(addOrUpdate, aa).then(res => {
          if (res.data.code == '200') {
            if (this.$route.query.checked) {
              setTimeout(() => {
                if (this._selectAdress.id == this.$route.query.id) {
                  this.$axios.put(appshippingAddressaddressList, {}).then((res) => {
                    if (res.data.code == '200') {
                      this.$store.commit('selectAdressFun', res.data.rows.filter(item => item.id == this._selectAdress.id)[0]);
                      this.$router.go(-1);
                      this.isTijiao = true;
                    } else {
                      this.$toast.info(res.msg);
                    }
                  }).catch(function (err) {
                    console.log(err);
                  });
                }
                this.$router.go(-1);
              }, 1000)

            } else {
              this.isTijiao = true;
              this.$router.go(-1);
            }
          } else {
            this.$toast.info(res.data.msg);
            this.isTijiao = true;
          }
        }).catch(function (err) {
          console.log(err);
        });
      }

    },

  },
}

</script>
<style lang="scss" scoped>
.adressinfo .md-field-item-title {
  margin-right: 40px;
}
.adressinfo .md-field {
  padding: 0px !important;
}
.adressinfo /deep/.md-field-item-content {
  padding: 0 24px;
}
.adressinfo {
  .md-agree-content {
    color: #999;
    font-size: 24px;
  }
}

.adressinfo .md-agree {
  padding: 0 16px;
}
.md-input-item-fake,
.md-input-item-input {
  color: #8d8d8d !important;
}
</style>
