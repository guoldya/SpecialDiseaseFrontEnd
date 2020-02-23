<template>
  <router-link :to="{ path: path, query: argn}" class="consult">
    <div class="lookmore">
      <span>查看详情</span>
      <span><img src="@/assets/images/icon_right.png" alt=""></span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['argn', 'type', 'path'],
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
</style>
