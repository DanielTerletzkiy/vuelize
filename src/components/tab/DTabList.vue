<template>
  <DWrapper ref="wrapper" :classes="['d-tab-list', {'pa-1': outlined}]" v-bind="{...$props, ...$attrs}">
    <slot ref="item"></slot>
    <DDivider v-if="showIndicator" class="d-tab-list__indicator" :color="currentColor" size="2px"
              :style="indicatorStylesObject"/>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DTabList',
}
</script>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({ wrapper });
import {computed, getCurrentInstance, nextTick, onMounted, provide, ref, watch} from "vue";
import defaultProps from "../../mixins/DefaultProps";
import DWrapper from "../DWrapper.vue";

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {type: [String, Number]},
  showIndicator: {type: Boolean},
  filled: {type: Boolean},
  ...defaultProps
});

const instance: any = getCurrentInstance();

const currentItem = ref<any>([]);

const currentColor = computed(() => {
  if (currentItem.value) {
    return currentItem.value.color ? currentItem.value.color : props.color
  } else {
    return props.color
  }
});

const indicatorStylesObject = computed(() => {

  if (currentItem.value) {
    const padding = 8;

    return {
      left: (currentItem.value.position) + padding + 'px',
      width: (currentItem.value.width - padding * 2) + 'px'
    }
  } else {
    return {}
  }

});

provide('updateList', (key: string | number, position: number, width: number, color: string) => {
  currentItem.value = {
    position,
    width,
    color
  };
  emits("update:modelValue", key);
})
provide('parentProps', props)
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-tab-list {
  display: flex;
  position: relative;
  gap: $gap;

  &.dark {
    border-color: rgba(45, 49, 59, 1);
  }

  &__indicator {
    position: absolute;
    bottom: -1px;
    opacity: 0.6;
    transition-duration: 0.2s;
  }
}
</style>
