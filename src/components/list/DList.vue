<template>
  <DWrapper root-tag="ul" :classes="['d-list', {'pa-1': outlined}]" v-bind="{...$props, ...$attrs}">
    <slot></slot>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DList',
}
</script>

<script setup lang="ts">
import defaultProps from "../../mixins/DefaultProps";
import DWrapper from "../DWrapper.vue";

defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: [Number, String, Array],
  filled: {type: Boolean},
  ...defaultProps
})
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-list {
  display: flex;
  flex-direction: column;
  padding: 8px;
  margin: 0;
  gap: $gap;
}
</style>
