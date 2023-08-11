<template>
  <DWrapper
    ref="wrapper"
    :classes="['d-title']"
    v-bind="{...$props, ...$attrs}"
  >
    <slot />
  </DWrapper>
</template>

<script setup lang="ts">
import {ref} from "vue";
import DWrapper from "../../DWrapper.vue";
import defaultProps from "../../../mixins/DefaultProps";

const wrapper = ref(null);
defineExpose({ wrapper });

defineProps({
  ...defaultProps
})
</script>

<style lang="scss">
@import "../../../styles/variables";

.d-title {
  font-size: 36px;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  &.dark {
    color: $dark_card_text;
  }

  &.light {
    color: $light_card_text;
  }
}

.d-card {
  .d-title {
    width: auto;
  }

  .d-title + .d-content {
    padding-top: 0;
  }
}
</style>
