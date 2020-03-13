<template>

  <div class="gp g-items gp-profile">
    <Header post-title="编辑个人资料"> </Header>
    <ul>
      <li class="link avatar">
        <label>头像</label>
        <a href="javascript:;" class="upload-btn" style="overflow: hidden;">
          <!-- <img :src="helpAppUrl"> -->
          <img v-if="$store.state.userInfo.headPic" :src="$store.state.userInfo.headPic">
          <img v-else src="@/assets/images/user.jpg">
          <input v-if="!$route.query.realname" class="file-input" @change="changeIMG($event)" type="file" name="positive" id="positive" accept="image/*" />
        </a>
      </li>
      <!-- <li class="link" v-if="!$route.query.realname">
        <label>昵称</label>
        <span class="right" @click="intoacctsetinfo">
          <img src="@/assets/images/icon_more2@2x.png" alt="">
        </span>
      </li> -->
      <li>
        <label>姓名</label>
        <span class="right">{{ _accountinfo.nickname}}</span>
      </li>
    </ul>
    <ul>
      <li class="link">

        <label>性别</label>
        <span class="right">{{ _accountinfo.sex|examSex}}</span>

      </li>
      <li class="link">

        <label>出生日期</label>
        <span class="right">{{ _accountinfo.birthday|time}}</span>

      </li>
      <li class="link" v-if="$route.query.realname">
        <label>身份证号</label>
        <span class="right">{{ _accountinfo.idCard}}</span>
      </li>
      <li class="link" v-if="$route.query.realname">
        <label>家庭住址</label>
        <span class="right">{{_accountinfo.address}}</span>
      </li>
    </ul>
  </div>
</template>
<script>

let uploadImgimage = "/api/bas/uploadImg/image";
import { mapState } from 'vuex';
import { setTimeout } from 'timers';
let sysAccountupdateAccount = "/app/bizPatientCard/updateAccount"
import pg_hep from '@/assets/images/3.jpg'
export default {
  data() {
    return {
      helpAppUrl: pg_hep,
      files: {
        posFile: null,
      },
      AAA: '',
      title: ''
    };
  },
  computed: {
    ...mapState({
      _accountinfo: state => state.userInfo,
    }),

  },
  mounted() {

    if (this._accountinfo.headUrl) {
      // this.helpAppUrl = this.$conf.constant.img_base_url + this._accountinfo.headPic
      this.helpAppUrl = this._accountinfo.headPic
    } else if (this._accountinfo.sex != 1) {
      this.helpAppUrl = require('@/assets/images/31.jpg')
    }
    if (this.$route.query.realname == 1) {
      this.title = '实名认证'
    } else {
      this.title = '账号设置'
    }
  },
  methods: {
    intoacctsetinfo(e) {
      this.$router.push({
        name: 'acctestinfo',
        query: 'ss'
      });
    },
    changeIMG(e) {
      let param = new FormData(); //创建form对象
      let that = this,
        file = e.target.files[0],
        fileReader = new FileReader();
      this.files.posFile = file;
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        that.helpAppUrl = this.result;
      };
      fileReader.onloadend = function () {
        that.helpAppUrl = this.result;
      };
      this.AAA = e.target.files[0];
      var index1 = this.AAA.name.lastIndexOf(".");
      var index2 = this.AAA.name.length;
      var suffix = this.AAA.name.substring(index1 + 1, index2);//后缀名
      param.append('photo0', this.AAA, "photo0." + suffix);//通过append向form对象添加数据
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };
      // 上传图片文件
      this.$toast.loading("头像上传中...");
      setTimeout(() => {
        this.$toast.hide();
      }, 3000)
      this.$axios.post(uploadImgimage, param, config)
        .then(res => {
          if (res.data.code == '200') {
            let param2 = {};
            param2.fileInfo = res.data.fileInfo
            this.$axios.post(sysAccountupdateAccount, param2).then((res) => {
              if (res.data.code == '200') {
                this.$store.dispatch('getAccount', { update: true });
                this.$toast.hide();
              } else {
                this.$toast.hide();
                this.$toast.info(res.data.msg)

              }
            }).catch(function (err) {

              console.log(err);
            });


          } else {
            this.$toast.info(res.data.msg)
          }
        }).catch(function (err) {
          console.log(err);
        });;



    }


  }

}
</script>

<style lang="scss" scoped>
.gp-profile {
  padding-bottom: 20px;
  padding-top: 88px;
}
.g-items li {
  border-bottom: 1px solid #eee;
  line-height: 60px;
  padding: 20px;
  color: #a6a8b6;
}
.gp-profile .avatar label {
  line-height: 100px;
  margin: 0 10px;
}
.g-items li label {
  color: #666;
  display: inline-block;
  width: 112px;
  font-size: 28px;
}
.gp-profile .avatar a.upload-btn {
  width: 100px;
  height: 100px;
  display: inline-block;
  float: right;
  position: relative;
  padding: 0;
}
.gp-profile .avatar img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
.gp-profile .avatar a .file-input {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.g-items li span.right {
  color: #28354c;
  float: right;
  padding-right: 10px;
  img {
    width: 13px;
    margin-left: 10px;
    top: 4px;
    position: relative;
  }
}
.g-items ul {
  background: #fff;
  margin-bottom: 20px;
}
</style>
