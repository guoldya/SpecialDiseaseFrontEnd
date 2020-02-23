<template>
  <div class="recordcard">
    <cardTitle :content="content" :type="type" />
    <cardContent :content="content" :type="type" :queryType="queryType" />
    <cardBottom :argn="argn" :type="type" :path="path" v-show="isShow" />
  </div>
</template>
<script>
import cardTitle from './cardTitle'
import cardBottom from './cardBottom'
import cardContent from './cardContent'
export default {
  data() {
    return {
      argn: '',
      path: '',
      isShow: true,
    };
  },
  components: { cardTitle, cardBottom, cardContent },
  props: ['content', 'type', 'queryType'],
  async mounted() {

    this.argn = { id: this.content.id,status:this.content.status }
    this.path = '/outpationinfo';

  


  },
}

</script>

<style lang="scss" scoped>
.recordcard {
  background: #fff;
  border-radius: 17px;
  margin: 24px;
}
</style>
