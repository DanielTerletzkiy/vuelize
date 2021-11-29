<template>
  <d-function-wrapper :classes="['d-column']" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <slot>

    </slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-column"
}
</script>

<style scoped lang="scss">
.d-column {
  display: flex;
  padding: 4px;
}
</style>
