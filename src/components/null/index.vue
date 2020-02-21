<template>
   <div v-show="loadingTrue" class="nullDiv">
      <img src="@/assets/images/null_hosi.png">
      <p class="nullTEXT">暂时没有数据哦</p>
   </div>
</template>

<script>
export default {
   props: ['loadingTrue'],
   
}
</script>

<style>
</style>
