<template>
  <d-function-wrapper :classes="['d-row', ...classesObject]" v-bind="{...$props, ...$attrs}" :style="stylesObject" @click="$emit('click')">
    <slot>

    </slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-row",

  props: {
    align: String,
    justify: String,
  },

  computed: {
    stylesObject() {
      return {
        alignItems: this.align,
        justifyContent: this.justify,
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
