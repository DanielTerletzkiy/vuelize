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
import {provide, unref} from "vue";

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: [Number, String, Array],
  filled: {type: Boolean},
  multiple: {type: Boolean},
  mandatory: {type: Boolean},
  ...defaultProps
})

provide('updateList', (key: number) => {
  console.log('props.multiple:', props.multiple, 'props.modelValue:', props.modelValue, 'key:', key)

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
      console.log('aaa')
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
  gap: $gap;
}
</style>
