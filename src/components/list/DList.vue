<template>
  <DWrapper
    ref="wrapper"
    root-tag="ul"
    :classes="['d-list', {'pa-1': outlined}]"
    v-bind="{...$props, ...$attrs}"
  >
    <slot />
  </DWrapper>
</template>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({wrapper});
import defaultProps from "@/props/default.props";
import DWrapper from "../DWrapper.vue";
import type {ComputedRef} from "vue";
import {computed, provide, ref, unref} from "vue";

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: [Number, String, Array],
  filled: {type: Boolean},
  multiple: {type: Boolean},
  mandatory: {type: Boolean},
  gap: {type: Boolean},
  ...defaultProps
})

const gapSize: ComputedRef<string> = computed(() => props.gap ? '4px' : '');

provide('updateList', (key: number) => {
  if (props.multiple) {
    const values = unref(props.modelValue) as Array<number>;
    const index = values.indexOf(key);
    if (index > -1 && !(props.mandatory && values.length === 1)) {
      values.splice(index, 1);
    } else if (index === -1) {
      values.push(key)
    }
    emits("update:modelValue", values);
  } else {
    if (!props.mandatory && key === props.modelValue as number) {
      emits("update:modelValue", -1);
    } else {
      emits("update:modelValue", key);
    }
  }
})
provide('parentProps', props)
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-list {
  display: flex;
  flex-direction: column;
  padding: 8px;
  margin: 0;
  gap: v-bind(gapSize)
}
</style>
