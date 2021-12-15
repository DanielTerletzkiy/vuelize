<template>
  <d-function-wrapper :classes="['d-label']" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <d-card-subtitle v-ripple class="d-label__content py-1 glow glow--active" color="inherit" rounded="inherit">
      <slot name="default">
      </slot>
    </d-card-subtitle>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-label"
}
</script>

<style scoped lang="scss">
.d-label {
  padding: 4px;
  height: min-content;
  &__content {
    width: max-content;
  }
}
</style>
