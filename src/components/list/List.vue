<template>
  <d-function-wrapper root-tag="ul" :classes="['d-list', ...classesObject]" v-bind="{...$props, ...$attrs}">
    <slot></slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-list",

  props: {
    value: [Number, String, Array],
    filled: {type: Boolean},
    outlined: {type: Boolean},
  },

  computed: {
    classesObject(){
      return {
        'pa-1 depressed': this.outlined,
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";
.d-list {
  display: flex;
  flex-direction: column;
  padding: 8px;
  margin: 0;
  gap: $gap;
}
</style>
