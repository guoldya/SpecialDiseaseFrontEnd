 
<template>
  <div class="margin55 outCarint">
    <Header post-title="我的咨询"> </Header>

    <div class="doctor-list">
      <div class="discrib">
        <p class="history">患者描述：全身把啦啦啦啦啦啦啦啦啦啦，既往史：啦能力，过敏史：灌灌灌灌帆帆帆帆</p>
        <p class="top">
          <span>男 40岁 <label> 40分钟前</label> </span>
          <span class="aut">解答中</span>
        </p>
      </div>
      <div class="doctor">
        <div class="header"><img src="@/assets/images/3.jpg" /></div>
        <div class="comment-right">
          <p class="introduce">
            <span class="name"> 张三 </span>&nbsp;
            <span>医师 </span>&nbsp;
            <span>大坪医院</span>&nbsp;
          </p>
          <p class="colo13">
            医生正在了解你的病情
          </p>
        </div>
      </div>

    </div>

    <div class="doctor-list">
      <div class="discrib">
        <p class="history">患者描述：全身把啦啦啦啦啦啦啦啦啦啦，既往史：啦能力，过敏史：灌灌灌灌帆帆帆帆</p>
        <p class="top">
          <span>男 40岁 <label> 40分钟前</label> </span>
          <span class="aut">解答中</span>
        </p>
      </div>

    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {};
  },


};
</script>
<style scoped lang="scss">
.doctor-list {
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 18px rgba(20, 19, 51, 0.1);

  .discrib {
    .top {
      margin: 10px 0 0s;
      display: flex;
      justify-content: space-between;
      label {
        font-size: 12px;
        color: var(--primary--content);
      }
    }
    .aut {
      border: 1px solid red;
      border-radius: 30px;
      padding: 5px 12px;
      color: red;
      font-size: 12px;
    }
    .history {
      line-height: 40px;
    }
  }
  .doctor {
    border-top: 1px solid var(--primary--line);
    margin-top: 20px;
  }
  .header {
    width: 98px;
    position: absolute;
    margin-top: 10px;
  }
  .header img {
    width: 100%;
    border-radius: 50%;
    padding: 5px;
  }
  .comment-right {
    padding: 20px 0px 0px 108px;
    p {
      line-height: 40px;
    }
  }
}
</style>

