<template>
  <DWrapper :classes="['d-content']" v-bind="{...$props, ...$attrs}">
    <slot></slot>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DCardContent',
}
</script>

<script setup lang="ts">
import DWrapper from "../../DWrapper.vue";
</script>

<style scoped lang="scss">
@import "../../../styles/variables";

.d-content {
  width: 100%;
  height: min-content;

  padding: $gap*2;
}
</style>
