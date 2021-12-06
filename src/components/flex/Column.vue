<template>
  <d-function-wrapper :classes="['d-column']" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <slot>

    </slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-column",

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
.d-column {
  display: flex;
  padding: 4px;
}
</style>
