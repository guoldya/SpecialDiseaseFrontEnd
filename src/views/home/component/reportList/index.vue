<!-- 病例和检查报告的列表项 -->
<template>
  <div class="report-list">
    <div class="report-info">
    <span class="title">问诊病例</span> 
    <span class="f-r gary">2018-2-1 09:30</span>  
    </div> 
    <div  class="report-result">
      <span>诊断:呼吸道感染</span>
      <span class="f-r"><img src="../../images/right.png" alt=""></span>
    </div> 
  </div>
</template>
<style lang="scss" scoped>
$border:1px solid #f1f3f1;
$color:#4DAED7;
.report-list {
  padding: 20px;
  border-bottom:$border;
  >div{
    overflow: hidden;
  }
  .f-r{
    float:right;
  }
  .report-info {
   .title {
     color:$color;
   }
   .gary  {
     color:#999;
   }
  }
  .report-result {
    margin-top:20px;
    img {
      width:32px;
      height:32px;
    }
  }
}
</style>
