<template>
  <DWrapper ref="wrapper" :classes="['d-pagination']" v-bind="{...$props, ...$attrs}"
            @click="$emit('click')">
    <DRow gap>
      <DIconButton name="angle-left" :disabled="isPreviousDisabled" :rounded="props.rounded" :size="size"
                   @click="previous"/>
      <DRow gap width="max-content">
        <DRow gap width="max-content" v-if="modelValue <= visibleButtons">
          <DCard v-for="i in visibleButtons - modelValue + 1" :key="i" :rounded="props.rounded" :width="`${size}px`"
                 :height="`${size}px`" outlined/>
        </DRow>
        <DButton v-for="page in props.total" :key="page" class="page" v-show="isVisible(page)"
                 :style="{minWidth: `${size}px`,fontSize: `${size/28}rem`}"
                 :height="`${size}px`"
                 :rounded="props.rounded"
                 :filled="modelValue===page"
                 :glow="modelValue!==page"
                 :color="props.color"
                 @click="setPage(page)">
          {{ page }}
        </DButton>
        <DRow gap width="max-content" v-if="total - modelValue < visibleButtons">
          <DCard v-for="i in visibleButtons - total + modelValue" :key="i" :rounded="props.rounded" :width="`${size}px`"
                 :height="`${size}px`" outlined/>
        </DRow>
      </DRow>
      <DIconButton name="angle-right" :disabled="isNextDisabled" :rounded="props.rounded" :size="size" @click="next"/>
    </DRow>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DPagination',
}
</script>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({ wrapper });
import defaultProps from "../../mixins/DefaultProps";
import DWrapper from "../DWrapper.vue";
import DIconButton from "../button/DIconButton.vue";
import DRow from "../flex/DRow.vue";
import DButton from "../button/DButton.vue";
import DCard from "../card/DCard.vue";
import {computed, ref} from "vue";

const emit = defineEmits(['update:modelValue', 'click']);

const props = defineProps({
  modelValue: {type: Number, default: 1},
  total: {type: Number, default: 5},
  visibleButtons: {type: Number, default: 3},
  size: {type: Number, default: 40},
  ...defaultProps
})

function isVisible(page: number) {
  return props.modelValue === page ||
      (
          page + props.visibleButtons > props.modelValue &&
          page - props.visibleButtons < props.modelValue
      ) ||
      page === 1 || page === props.total
}

function setPage(page: number) {
  emit('update:modelValue', page)
}

function previous() {
  emit('update:modelValue', props.modelValue - 1)
}

function next() {
  emit('update:modelValue', props.modelValue + 1)
}

const isPreviousDisabled = computed(() => {
  return props.modelValue === 1;
})

const isNextDisabled = computed(() => {
  return props.modelValue === props.total;
})
</script>

<style scoped lang="scss">
.page {
  min-height: unset;
  letter-spacing: normal;

  :deep(.d-button__content) {
    padding: 0;
  }
}
</style>
