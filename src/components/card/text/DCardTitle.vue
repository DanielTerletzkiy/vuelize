<template>
  <DWrapper :classes="['d-title']" v-bind="{...$props, ...$attrs}">
    <slot></slot>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DCardTitle',
}
</script>

<script setup lang="ts">
import DWrapper from "../../DWrapper.vue";
</script>

<style lang="scss">
@import "../../../styles/variables";

.d-title {
  min-height: 34px;
  font-size: 2rem;
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
