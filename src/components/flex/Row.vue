<template>
  <d-function-wrapper :classes="['d-row', ...classesObject]" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <slot>

    </slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-row",

  props: {
    height: String,
    width: String,
  },

  computed: {
    stylesObject() {
      return {
        height: this.height,
        width: this.width,
      }
    },
  },
}
</script>

<style scoped lang="scss">
.d-row {
  width: 100%;
  align-items: center;

  .no-gap::v-deep > .d-column {
    padding: 4px;
  }
}
</style>
