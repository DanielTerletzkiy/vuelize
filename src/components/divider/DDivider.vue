<template>
  <DWrapper
    ref="wrapper"
    :classes="['d-divider', {block, vertical, horizontal: !vertical}]"
    v-bind="{...$props, ...$attrs}"
  />
</template>

<script setup lang="ts">
import defaultProps from "../../mixins/DefaultProps";
import {computed, ref} from "vue";
import DWrapper from "../DWrapper.vue";

const wrapper = ref(null);
defineExpose({wrapper});

const props = defineProps({
  block: {type: Boolean},
  vertical: {type: Boolean},
  size: {type: String, default: '2px'},
  ...defaultProps
})

const height = computed(() => {
  return !props.vertical ? props.size : props.height
})
const width = computed(() => {
  return props.vertical ? props.size : props.width
})
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-divider {
  height: v-bind(height);
  width: v-bind(width);

  background: currentColor;
  border-radius: 9999px !important;
  transition: 0.2s ease;

  &.horizontal {
    min-width: min-content;
  }

  &.vertical {
    //min-height: min-content;
  }

  &.block {
    &.horizontal {
      width: auto;
      flex: 1;
    }

    &.vertical {
      height: inherit;
      display: flex;
      align-self: stretch;
    }
  }

  color: $outlineColor;
}


</style>
