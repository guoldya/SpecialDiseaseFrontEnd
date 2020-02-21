<template>
      <div class="result">
            <Header post-title="搜索"></Header>
            <div class="margin50" style="background-color: #ffffff">
                  <form action="">
                        <div class="g-suggest">
                              <div class="g-suggest--input">
                                    <div class="g-suggest--input-wrap">
                                          <input type="search" id="oc_vala" v-model="searchValue" autofocus="autofocus" placeholder="请输入医生，科室名称">
                                    </div>
                                    <label class="page-search--cancel" @click="SearchVal(searchValue)">搜索</label>
                              </div>
                        </div>
                  </form>
            </div>
            <div class="line"></div>
            <div class="outCarint" style="background-color: #ffffff">
                  <div class="resulthistory" v-show="HistoryList.length!=0">
                        <div class="history">
                              <div class="container fl">
                                    <span class="lf">搜索历史</span>
                                    <span class="clear rt" @click="clear()">
                                          <md-icon name="delete" @click="clearT()"></md-icon>
                                    </span>
                              </div>
                        </div>
                        <div>
                              <ul class="emp">
                                    <li class="history" v-for="(item,index) in HistoryList" :key="index">
                                          <span class="hj" @click="resultT(item)">{{item}}</span>
                                          <span class="delete">
                                                <md-icon name="close" @click="clearT(index)"></md-icon>
                                          </span>
                                    </li>
                                    <p class="noMore">没有更多记录了</p>
                              </ul>
                        </div>
                  </div>
            </div>
      </div>

</template>

<script>
export default {
      data() {
            return {
                  value: '',
                  HistoryList: [],
                  searchValue: ''
            }
      },
      mounted() {
            document.getElementById("oc_vala").focus();
            var aa = window.localStorage;
            if (aa.getItem("HistoryList") != null && aa.getItem("HistoryList") != undefined) {
                  var json = aa.getItem("HistoryList");
                  this.HistoryList = JSON.parse(json);
            }
      },
      methods: {
            resultT: function (value) {
                  this.SearchVal(value);
            },
            clearT: function (value) {
                  this.HistoryList.splice(value, 1);
                  localStorage.setItem('HistoryList', JSON.stringify(this.HistoryList));
            },
            clear: function () {
                  this.HistoryList = [],
                        localStorage.setItem('HistoryList', JSON.stringify(this.HistoryList));
            },
            SearchVal(value) {
                  if (!value) {
                        this.$toast.info("请输入你要搜索的内容")
                        return;
                  }
                  let val = value.trim() // 清除空格
                  if (this.HistoryList.length > 0) { // 有数据的话 判断
                        if (this.HistoryList.indexOf(val) !== -1) { // 有相同的，先删除 再添加 
                              this.HistoryList.splice(this.HistoryList.indexOf(val), 1)
                              this.HistoryList.unshift(val);
                        } else { // 没有相同的 添加
                              this.HistoryList.unshift(val);
                        }
                  } else { // 没有数据 添加
                        this.HistoryList.unshift(val);
                  }
                  if (this.HistoryList.length > 6) { // 保留六个值
                        this.HistoryList.pop();
                  }
                  if (this.$route.query.type) {
                        this.$router.push({
                              name: 'result',
                              query: { val: val, type: this.$route.query.type }
                        });
                  } else {
                        this.$router.push({
                              name: 'result',
                              query: { val: val }
                        });
                  }

                  localStorage.setItem('HistoryList', JSON.stringify(this.HistoryList));
            }

      }
}
</script>

<style scoped>
.g-suggest {
  position: relative;
  height: 92px;
  background-color: #fff;
}
.g-suggest--input {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 0 24px 16px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.g-suggest--input-wrap {
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 1%;
  margin-right: 20px;
}
.g-suggest--input-wrap:before {
  position: absolute;
  z-index: 1;
  content: "";
  width: 28px;
  height: 28px;
  left: 22px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  background: url("~@/assets/images/search.png") no-repeat 50%;
  background-size: cover;
}
.g-suggest--input-wrap input[type="search"] {
  padding: 10px 56px 10px 72px;
  background: #f0f3fa;
  width: 100%;
  height: 80px;
  line-height: 40px;
  font-size: 28px;
  color: var(--primary--content);
  border-radius: 5px;
  border: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
}
.g-search--active .g-search--input-cancel {
  display: block;
  color: var(--primary--content);
  font-size: 28px;
}
</style>

