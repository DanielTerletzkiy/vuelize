<template>
  <d-function-wrapper :classes="['d-column', ...classesObject]" v-bind="{...$props, ...$attrs}" :style="stylesObject" @click="$emit('click')">
    <slot>

    </slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-column",

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
.d-column {
  padding: 4px;
  flex-direction: column;

  ::v-deep > .d-column {
    padding: 0;
  }
}
</style>
