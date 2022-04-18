<template>
  <DWrapper :classes="['d-subtitle']" v-bind="{...$props, ...$attrs}">
    <slot></slot>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DCardSubtitle',
}
</script>

<script setup lang="ts">
import DWrapper from "../../DWrapper.vue";
import defaultProps from "../../../mixins/DefaultProps";

defineProps({...defaultProps})
</script>

<style lang="scss">
@import "../../../styles/variables";

.d-subtitle {
  font-size: 1rem;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  &.dark {
    color: darken($dark_card_text, 16);
  }

  &.light {
    color: lighten($light_card_text, 26);
  }

}

.d-title ~ .d-subtitle {
  margin-top: -20px;
  //padding-left: 10px;
}


.d-card {
  .d-subtitle {
    width: auto;
  }

  .d-title + .d-content {
    padding-top: 0;
  }
}
</style>
