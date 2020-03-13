<template>
  <router-link :to="{ path: path, query: argn}" class="consult">
    <div class="lookmore">
      <span><label v-if="content.status!=0">查看详情</label></span>
      <span class="  have" v-if="content.status==0">确认记账</span>
      <span v-else><img src="@/assets/images/icon_right.png" alt=""></span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['argn', 'type', 'path', 'content'],
}
</script>
<style lang="scss" scoped>
.lookmore {
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 26px;
  color: var(--primary--content);
  border-top: 1px solid #e5e5e5;
  line-height: 50px;
  img {
    width: 12px;
  }
}
.have {
  font-size: 26px;
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 40px;
  line-height: 26px;
  text-align: center;
  display: block;
  padding: 12px;
}
</style>
