<template>
  <d-function-wrapper :classes="['d-tab-list']" v-bind="{...$props, ...$attrs}">
    <slot></slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-tab-list",

  props: {
    value: {type: [String, Number]}
  }
}
</script>

<style scoped lang="scss">
.d-tab-list {
  display: flex;
}
</style>
