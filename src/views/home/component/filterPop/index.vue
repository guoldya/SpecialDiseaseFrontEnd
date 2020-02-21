<!--筛选弹窗 -->
<template>
  <div class="filter-pop">
    <transition name="fade">
      <div class="md-popup-mask" @click="testshow=false" v-show="testshow"></div>
    </transition>
    <transition name="fade1">
      <div class="md-popup1" v-show="testshow">
        <div class="md-popup-box md-slide-up">
          <div class="md-action-sheet-content">
            <!--筛选框-->
            <div class="g-filter-ssr--content">
              <div class="md-popup-title-bar">
                <div class="title-bar-left md-popup-cancel" @click="testshow=false">
                  <i class="md-icon icon-font md-icon-close close lg"></i>
                </div>
                <div class="title-bar-title">
                  <p class="title">筛选</p>
                </div>
              </div>
              <section class="components-screenbox">
                <ul>
                  <li class="components-screenbox--item">
                    <h3>
                      <label>服务类型</label>
                      <div>
                      </div>
                    </h3>
                    <div class="components-screenbox--other">
                      <div>
                        <span v-for="(item, index) in consultList" :key="index" @click="selectService(index)" :class="[{ 'chosen-condition': item.checked }, 'tag']">{{item.text}}</span>
                      </div>
                    </div>
                  </li>
                  <li class="components-screenbox--item">
                    <h3>
                      <label>医生职称</label>
                      <div>
                      </div>
                    </h3>
                    <div class="components-screenbox--other">
                      <div>
                        <span v-for="(item,index) in selectList" :key="index" :class="[{ 'chosen-condition': item.checked }, 'tag']" @click="selectLevel(index)">{{item.text}}</span>
                      </div>
                    </div>
                  </li>
                  <li class="components-screenbox--item">
                    <h3>
                      <label>价格区间</label>
                      <div>
                      </div>
                    </h3>
                    <div class="components-screenbox--other">
                      <div>
                        <span class="tag" v-for="(item,index) in priceList" :key="index">
                          {{item.text}}
                        </span>
                        <!-- <span class="tag chosen-condition">0~25</span>
                        <span class="tag">20~50</span>
                        <span class="tag">20~50</span>
                        <span class="tag">50~100</span> -->
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="components-screenbox--btn-group">
                  <a class="components-screenbox-reset" @click="reset">重置</a>
                  <a class="components-screenbox-confirm" @click="getSelect">确定</a>
                </div>
              </section>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      testshow: false,
      consultList: [
        {
          value: 1,
          text: '图文咨询',
          checked: false,
        },
        {
          value: 2,
          text: '电话咨询',
          checked: false,
        },
        {
          value: 3,
          text: '视频咨询',
          checked: false,
        },
      ],
      selectList: [
        {
          value: 1,
          text: '普通',
          checked: false
        },
        {
          value: 2,
          text: '主治医师',
          checked: false
        },
        {
          value: 3,
          text: '副教授',
          checked: false
        }, {
          value: 4,
          text: '五级专家',
          checked: false
        }, {
          value: 5,
          text: '四级专家',
          checked: false
        }, {
          value: 6,
          text: '三级专家',
          checked: false
        }, {
          value: 7,
          text: '二级专家',
          checked: false
        }, {
          value: 8,
          text: '一级专家',
          checked: false
        }, {
          value: 9,
          text: '特需',
          checked: false
        }
      ],
      priceList: [
        {
          value: '0-20',
          text: '0~20',
          checked: false
        },
        {
          value: '20-50',
          text: '20~50',
          checked: false
        },
        {
          value: '50-100',
          text: '50~100',
          checked: false
        }
      ]

    }
  },
  methods: {
    openPop() {
      this.testshow = true;
    },
    // 选择服务
    selectService(index) {
      this.consultList[index].checked = !this.consultList[index].checked;
    },
    // 选择职称
    selectLevel(index) {
      this.selectList[index].checked = !this.selectList[index].checked
    },
    // 重置
    reset() {
      this.selectList.forEach(item => item.checked = false)
      this.consultList.forEach(item => item.checked = false)
    },
    getSelect() {
      const levelresult = this.selectList.filter(item => item.checked == true);
      const serviceresult = this.consultList.filter(item => item.checked == true);
      console.log([{ one: serviceresult, two: levelresult }]);
      this.$emit('childByValue', [serviceresult, levelresult]);
      // this.$emit('childByValue', serviceresult);
      this.testshow = false;
    }
  }

}
</script>

<style scoped>
.filter-pop .md-popup-mask {
  z-index: 1000;
}
.md-popup-box {
  position: relative;
  pointer-events: auto;
  z-index: 2;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
}
.components-screenbox {
  height: 650px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  z-index: 21;
  background: #ffffff;
  justify-content: flex-end;
}

.components-screenbox ul {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.components-screenbox ul .components-screenbox--item {
  padding: 30px 24px 16px;
  border-bottom: 1px solid #ebecf1;
}

.components-screenbox ul .components-screenbox--item h3 {
  height: 44px;
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 26px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.components-screenbox
  ul
  .components-screenbox--item
  .components-screenbox--other
  span.tag,
.components-screenbox ul .components-screenbox--item h3 span.tag {
  display: inline-block;
  min-width: 102px;
  height: 54px;
  text-align: center;
  line-height: 54px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #f5f6f6;
  color: #83889a;
  border-radius: 200px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.components-screenbox .components-screenbox--btn-group {
  height: 120px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.components-screenbox ul .components-screenbox--item:last-child {
  border-bottom: 0;
}

.components-screenbox
  .components-screenbox--btn-group
  a.components-screenbox-reset {
  color: #24a5f1;
  background-color: #fff;
  border-top: 1px solid #ebecf1;
}

.components-screenbox .components-screenbox--btn-group a {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-size: 29px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.components-screenbox .components-screenbox--btn-group a {
  display: block;
  height: 100%;
  line-height: 100px;
  text-align: center;
}

.components-screenbox
  .components-screenbox--btn-group
  a.components-screenbox-confirm {
  color: #fff;
  background-color: #24a5f1;
}

.components-screenbox
  ul
  .components-screenbox--item
  .components-screenbox--other
  span.tag.chosen-condition,
.components-screenbox
  ul
  .components-screenbox--item
  h3
  span.tag.chosen-condition {
  background-color: #24a5f1;
  color: #fff;
}
.md-popup1 {
  width: 100%;
  height: 7.7rem;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background: red;
  /* overflow: hidden; */
}
.md-popup1 .md-action-sheet-content {
  text-align: left;
  font-size: 28px;
}

.md-popup-title-bar {
  position: relative;
  width: 100%;
  height: 1.2rem;
  background-color: #f9fafb;
  border-radius: 0.08rem 0.08rem 0 0;
  overflow: hidden;
}
.md-popup-box {
  background-color: #fff;
  border-radius: 0.08rem 0.08rem 0 0;
}

.md-popup-title-bar .title-bar-left,
.md-popup-title-bar .title-bar-right {
  position: absolute;
  width: 20%;
  max-height: 1.2rem;
  font-size: 0.36rem;
  font-weight: 500;
  box-sizing: border-box;
}

.md-popup-title-bar .title-bar-title {
  width: 100%;
  padding: 0 20%;
  box-sizing: border-box;
}

.md-popup-title-bar > div {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  float: left;
  height: 100%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  word-wrap: break-word;
  white-space: nowrap;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade1-enter-active,
.fade1-leave-active {
  transition: height 0.3s;
}
.fade1-enter, .fade1-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0;
}
</style>
