<template>
  <d-function-wrapper root-tag="ul" :classes="['d-list']" v-bind="{...$props, ...$attrs}">
    <slot></slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-list",

  props: {
    value: [Number, String, Array]
  },
}
</script>

<style scoped lang="scss">
.d-list {
  display: flex;
  flex-direction: column;
  padding: 8px;
  margin: 0;
}
</style>
