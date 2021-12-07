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
    wrap: Boolean,
    column: Boolean,
    noGap: {type: Boolean, default: true},
  },

  computed: {
    classesObject() {
      return {
        flex: true,
        wrap: this.wrap,
        column: this.column,
        'no-gap': this.noGap,
      }
    },
  },
}
</script>

<style scoped lang="scss">
.d-row {
  width: 100%;
  align-items: center;
}
</style>
