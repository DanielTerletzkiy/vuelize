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
import defaultProps from "../../../props/default.props";

const wrapper = ref(null);
defineExpose({ wrapper });

defineProps({
  ...defaultProps
})
</script>

<style scoped lang="scss">
@import "../../../styles/variables";

.d-content {
  width: 100%;
  height: min-content;

  padding: $gap*2;
}
</style>
