<template>
  <div class="adress">
    <Header post-title="地址管理"></Header>
    <div class="margin55">
      <ul v-if="addressInfo.length!=0" v-show="!loadingtrue">
        <li v-for="(item,index) in addressInfo" :key="index">
          <div class="adress-box">
            <div class="adress-content" @click="selectFun(item)">
              <p>
                <span>{{item.receiver}}</span>&nbsp;
                <span>{{item.mobile}}
                  <span v-show="item.isDefault==1" class="default">
                    默认
                  </span>
                </span>
              </p>
              <p>{{item.address}}</p>
            </div>
            <div class="line"></div>
            <div class="adress-btn">
              <span class="mui-icon" @click="adressinfo(item)">
                <img class="lajitong" src="@/assets/images/icom_write.png"> 编辑
              </span>
              <span class="mui-icon" @click="dedete(item.id)">
                <img class="lajitong" src="@/assets/images/lajitong.png"> 删除
              </span>
            </div>
          </div>
        </li>
      </ul>
      <Null :loading-true="!loadingtrue&&addressInfo.length==0"></Null>
    </div>
    <Loading v-show="loadingtrue"></Loading>
    <p class="outbTN">
      <span @click="addadress">添加地址</span>
    </p>
  </div>
</template>
<script type="text/babel">
import { mapState } from 'vuex';
import { Toast } from 'mand-mobile';
import { Dialog, Button } from 'mand-mobile'
let appshippingAddressaddressList = "/api/hos/shippingAddress/addressList";
let deleteAddress = "/api/hos/shippingAddress/delete";
let isDefault = "/api/hos/shippingAddress/isDefault"
export default {
  data() {
    return {
      num: 7,
      checked: '0a',
      addressInfo: '',
      loadingtrue: true,
    };
  },
  computed: {
    ...mapState({
      _selectAdress: state => state.selectAdress,
    }),
  },
  created() {
    this.$axios.put(appshippingAddressaddressList, {
    }).then((res) => {
      if (res.data.code == '200') {
        this.loadingtrue = false;
        this.addressInfo = res.data.rows;
      } else {
        this.$toast.info(res.msg);
      }
    }).catch(function (err) {
      console.log(err);
    });
  },
  watch: {

  },
  mounted() {

  },
  methods: {
    selectFun(val) {
      if (this.$route.query.checked) {
        this.$store.commit('selectAdressFun', val);
        this.$router.go(-1);
      } else {
        return
      }
    },
    onChange(data, index) {
      if (index == 1) {
        return
      }
      this.$axios.post(isDefault, {
        id: data
      }).then((res) => {
        if (res.data.code == '200') {
          this.$toast.info("设置成功");
          this.$axios.put(appshippingAddressaddressList, {
          }).then((res) => {
            if (res.data.code == '200') {
              this.addressInfo = res.data.rows;
            } else {
              this.$toast.info(res.msg);
            }
          }).catch(function (err) {
            console.log(err);
          });
        } else {
          this.$toast.info(res.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    dedete(data) {


      let params = {}, p_data = {};
      p_data.id = data;

      params.data = p_data;
      Dialog.confirm({
        title: '确认',
        content: '请确认删除该地址吗',
        confirmText: '确定',
        onConfirm: () => {
          this.$axios.delete(deleteAddress, params).then((res) => {

            if (res.data.code == '200') {
              this.$toast.info("删除成功")
              this.$axios.put(appshippingAddressaddressList, {
              }).then((res) => {
                if (res.data.code == '200') {
                  this.addressInfo = res.data.rows;
                  if (this._selectAdress.id == data) {
                    if (res.data.rows.length != 0) {
                      this.$store.commit('selectAdressFun', this.addressInfo.filter(item => item.isDefault == 1)[0]);
                    } else {
                      this.$store.commit('selectAdressFun', '');
                    }
                  }
                } else {
                  this.$toast.info(res.msg);
                }
              }).catch(function (err) {
                console.log(err);
              });
            } else {
              console.log(res.msg);
            }
          }).catch(function (err) {
            console.log(err);
          });
        }
      })
    },
    adressinfo(data) {
      this.$router.push({
        name: 'adressinfo',
        query: { id: data.id, isDefault: data.isDefault, checked: this.$route.query.checked ? 1 : undefined }
      });
    },
    addadress() {
      this.$router.push({
        name: 'adressinfo',
        query: { addadress: 1 }
      });
    },


  },


};
</script>
 <style lang="scss" scoped>
@import "../adress/adress.css";
.adress-box {
  background: #ffffff;
  padding: 24px;
  border-bottom: 2px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .adress-content {
    line-height: 50px;
    flex: 0 0 400px;
    .default {
      font-size: 24px;
      color: var(--primary);
      padding: 0 7px;
      border-radius: 5px;
      background: rgba(29, 161, 243, 0.31);
    }
  }
  .line {
    background: #e5e5e5;
    width: 3px;
    height: 50px;
    margin: 30px;
  }
  .adress-btn {
    // flex: 0 0 200px;
    color: var(--primary--content);
    font-size: 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.outbTN {
  width: 100%;
  line-height: 70px;
  bottom: 0;
  left: 0;
  z-index: 999;
  border-top: 2px solid #e5e5e5;
  background: #1da1f3;
  color: #ffffff;
  position: fixed;
  text-align: center;
  padding: 20px 36px;
 
}
</style>