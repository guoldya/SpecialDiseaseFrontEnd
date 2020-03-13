<template>
  <div :style="type!='online'?'margin-top:140px ':''">
    <div class="sk-circle" :class="type!='online'?' ':'aa'">
      <div class="sk-circle1 sk-child"></div>
      <div class="sk-circle2 sk-child"></div>
      <div class="sk-circle3 sk-child"></div>
      <div class="sk-circle4 sk-child"></div>
      <div class="sk-circle5 sk-child"></div>
      <div class="sk-circle6 sk-child"></div>
      <div class="sk-circle7 sk-child"></div>
      <div class="sk-circle8 sk-child"></div> 
      <div class="sk-circle9 sk-child"></div>
      <div class="sk-circle10 sk-child"></div>
      <div class="sk-circle11 sk-child"></div>
      <div class="sk-circle12 sk-child"></div>
    </div>
    <p :style="type!='online'?'text-align:center':'display:none'"  >正在加载</p>
  </div>
</template>
<script>
export default {
  props: ['type']
  
}
</script>
<style scoped>
@import url("./loading.css");
</style>
