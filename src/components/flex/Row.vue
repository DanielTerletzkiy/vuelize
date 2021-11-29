<template>
  <d-function-wrapper :classes="['d-row']" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <slot>

    </slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-row"
}
</script>

<style scoped lang="scss">
.d-row {
  display: flex;
  align-items: center;
}
</style>
