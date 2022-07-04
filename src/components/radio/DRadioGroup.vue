<template>
  <DWrapper :classes="['d-radio-group']" v-bind="{...$props, ...$attrs}">
    <slot/>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DRadioGroup',
}
</script>

<script setup lang="ts">
import DWrapper from "../DWrapper.vue";
import defaultProps from "../../mixins/DefaultProps";
import {provide} from "vue";

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {type: undefined},
  ...defaultProps
})

provide('updateList', (key: string | number) => {
  emits("update:modelValue", key);
})
provide('parentProps', props)
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-radio-group {
  display: flex;
  flex-direction: column;
  padding: 8px;
  margin: 0;
  gap: calc($gap / 1.5);
}
</style>
