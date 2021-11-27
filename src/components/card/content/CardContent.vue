<template>
  <d-function-wrapper :classes="['d-card__content', ...classesObject]" v-bind="{...$props, ...$attrs}">
    <slot></slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-card-content",

  props: {
    flex: Boolean,
    wrap: Boolean,
    column: Boolean,
    noGap: Boolean,
  },

  computed: {
    classesObject(){
      return {
        flex: this.flex,
        wrap: this.wrap,
        column: this.column,
        'no-gap': this.noGap,
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import "../../../styles/variables";

.d-card__content {
  width: 100%;
  height: min-content;

  padding: $gap*2;
  padding-top: 0;
}
</style>
