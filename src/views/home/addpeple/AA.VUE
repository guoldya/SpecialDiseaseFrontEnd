<template>
  <div class="md-example-child md-example-child-selector md-example-child-selector-0">
    <md-field>
      <md-field-item title="普通模式" :content="selectorValue" @click="showSelector" arrow solid />
    </md-field>
    <md-selector v-model="isSelectorShow" default-value="2" :data="data[0]" max-height="320px" title="普通模式" large-radius @choose="onSelectorChoose"></md-selector>
  </div>
</template>

<script>
import {Selector, Field, FieldItem} from 'mand-mobile'

export default {
  title: '无需确认',
  titleEnUS: 'No need to confirm',
  height: 300,
  /* DELETE */
  components: {
    [Selector.name]: Selector,
    [Field.name]: Field,
    [FieldItem.name]: FieldItem,
  },
  data() {
    return {
      isSelectorShow: false,
      data: [
        [
          {
            value: '1',
            text: '自己',
          },
          {
            value: '2',
            text: '父母',
          },
          {
            value: '3',
            text: '子女',
          },
          {
            value: '4',
            text: '配偶',
          },
          {
            value: '5',
            text: '朋友',
          },
          {
            value: '6',
            text: '其他亲属',
          },
           
        ],
      ],
      selectorValue: '自己',
    }
  },
  methods: {
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorChoose({text}) {
      this.selectorValue = text
    },
  },
}

</script>
