<template>
  <div class="adress">
    <Header post-title="地址管理"></Header>
    <div class="margin55">
      <ul v-if="addressInfo.length!=0" v-show="!loadingtrue">
        <li v-for="(item,index) in addressInfo" :key="index">
          <div class="card">
            <div class="cardText">
              <div @click="selectFun(item)">
                <p class="order-number">
                  <span>{{item.receiver}}</span>
                  <span>{{item.mobile}}</span>
                </p>
                <p class="headdesc">{{item.address}}</p>
              </div>
              <p class="order-bottom">
                <span>
                  <div class="md-agree" @click="onChange(item.id,item.isDefault)">
                    <div :class="{ 'md-agree-icon':true,'checked':item.isDefault==1}">
                      <div class="md-agree-icon-container">
                        <i class="md-icon icon-font md-icon-checked md"></i>
                        <i class="md-icon icon-font md-icon-check md"></i>
                      </div>
                    </div>
                    <div class="md-agree-content">
                      默认地址
                    </div>
                  </div>
                </span>
                <span class="fr">
                  <span @click="adressinfo(item)" class="bbb mui-icon mui-icon-compose">
                    <label class="bianji">编辑</label>
                  </span>
                  <span class="mui-icon" style="font-size: 13px;" @click="dedete(item.id)">
                    <img class="lajitong" src="@/assets/images/lajitong.png"> 删除
                  </span>
                </span>
              </p>
            </div>
          </div>
        </li>

      </ul>
      <Null :loading-true="!loadingtrue&&addressInfo.length==0"></Null>
    </div>
    <Loading v-show="loadingtrue"></Loading>
    <div style="height: 60px"></div>
    <p class="add" @click="addadress()">添加地址</p>
  </div>
</template>
<script type="text/babel">
import { Toast } from 'mand-mobile';
import { Dialog, Button } from 'mand-mobile'
import { mapState } from 'vuex';
let appshippingAddressaddressList = "bizShippingAddress/addressList";
let deleteAddress = "bizShippingAddress/delete";
let isDefault = "bizShippingAddress/insertOrUpdate"
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
      console.log(res)
      if (res.data.code == '200') {
        this.loadingtrue = false;
        this.addressInfo = res.data.rows;
      } else {
        console.log(res.msg);
      }
    }).catch(function (err) {
      console.log(err);
    });
  },

  methods: {
    selectFun(val) {
      if (this.$route.query.checked) {
        this.$store.commit('selectAdressFun', val);
        this.$router.go(-1);
      }

    },
    onChange(data, index) {
      if (index == 1) {
        return
      }
      this.$axios.post(isDefault, {
        id: data, isDefault: 1
      }).then((res) => {
        if (res.data.code == '200') {
          this.$toast.info("设置成功");
          this.$axios.put(appshippingAddressaddressList, {
          }).then((res) => {
            if (res.data.code == '200') {
              this.addressInfo = res.data.rows;
            } else {
              this.$toast.info(res.msg)
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
                  if (this._selectAdress) {
                    if (this._selectAdress.id == data) {
                      if (res.data.rows.length != 0) {
                        this.$store.commit('selectAdressFun', this.addressInfo.filter(item => item.isDefault == 1)[0]);
                      } else {
                        this.$store.commit('selectAdressFun', '');
                      }
                    }
                  } else {
                    this.$store.commit('selectAdressFun', '');
                  }
                } else {
                  this.$toast.info(res.msg)
                  // console.log(res.msg);
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
        query: { id: data.id, isDefault: data.isDefault }
      });
    },
    addadress() {
      this.$router.push({
        name: 'adressinfo',
        query: { addadress: 1 }
      });
    },


  },
  computed: {

  },

};
</script>
 <style scoped>
@import "../adress/adress.css";
</style>