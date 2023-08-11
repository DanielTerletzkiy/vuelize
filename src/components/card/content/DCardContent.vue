<template>
  <DWrapper
    ref="wrapper"
    :classes="['d-content']"
    v-bind="{...$props, ...$attrs}"
  >
    <slot />
  </DWrapper>
</template>

<script setup lang="ts">
import {ref} from "vue";
import DWrapper from "../../DWrapper.vue";

const wrapper = ref(null);
defineExpose({ wrapper });
</script>

<style scoped lang="scss">
@import "../../../styles/variables";

.d-content {
  width: 100%;
  height: min-content;

  padding: $gap*2;
}
</style>
