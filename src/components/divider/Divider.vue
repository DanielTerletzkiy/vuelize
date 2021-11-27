<template>
  <d-function-wrapper :classes="['d-divider', ...classesObject]" v-bind="{...$props, ...$attrs}" :style="stylesObject"/>
</template>

<script>
export default {
  name: "d-divider",

  props: {
    block: Boolean,
    spacing: Number,
    height: {type: String, default: '1px'}
  },

  computed: {
    classesObject() {
      return {
        'd-divider--block': this.block,
        [`mx-${this.spacing}`]: this.spacing
      }
    },
    stylesObject(){
      return {
        height: this.height,
        'border-radius': this.height
      }
    }
  },
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-divider {
  min-width: min-content;
  height: 1px;
  background: currentColor;
  border-radius: 2px;

  &.d-divider--block {
    width: auto;
  }
}


</style>
