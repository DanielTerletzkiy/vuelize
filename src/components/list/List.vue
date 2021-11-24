<template>
  <d-function-wrapper :classes="['d-list']" v-bind="{...$props, ...$attrs}">
    <slot></slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-list",

  props: {
    value: Number
  },

  watch: {
    value(val){
      console.log(val)
    }
  }
}
</script>

<style scoped lang="scss">
.d-list {
  display: flex;
  flex-direction: column;
  padding: 8px;
}
</style>
