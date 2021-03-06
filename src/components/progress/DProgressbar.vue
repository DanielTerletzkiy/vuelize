<template>
  <DWrapper elevation="n4" :classes="['d-progressbar', {label: showLabel}]" v-bind="{...$props, ...$attrs}"
            @click="$emit('click')">
    <DCard class="d-progressbar__wrapper" :color="props.color" block :rounded="props.rounded">
      <DCard class="d-progressbar__wrapper__indicator" :width="`${progress}%`" :rounded="props.rounded"
             :color="props.color">
      </DCard>
      <DCardSubtitle v-if="showLabel" class="d-progressbar__wrapper__label" :rounded="props.rounded"
                     :color="$vuelize.getColorContrast(props.color, props.tint)">
        <slot name="progress" :progress="progress">
          {{ progress }} %
        </slot>
      </DCardSubtitle>
    </DCard>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DProgressbar',
}
</script>

<script setup lang="ts">
import DWrapper from "../DWrapper.vue";
import DCard from "../card/DCard.vue";
import {computed} from "vue";
import defaultProps from "../../mixins/DefaultProps";
import DCardSubtitle from "../card/text/DCardSubtitle.vue";

const props = defineProps({
  modelValue: {type: Number, default: 0},
  max: {type: Number},
  showLabel: {type: Boolean},
  ...defaultProps
})

const progress = computed(() => {
  let value = props.modelValue;
  if (props.max) {
    value = getPercentage(props.modelValue, props.max)
  }
  return value
})


function getPercentage(partialValue: number, totalValue: number): number {
  return (100 * partialValue) / totalValue;
}

</script>

<style scoped lang="scss">
.d-progressbar {
  position: relative;
  user-select: none;

  &.label {
    .d-progressbar__wrapper {
      height: 20px !important;
    }
  }

  &__wrapper {
    padding: 0;
    overflow: hidden;
    background: transparent !important;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.2;
      overflow: hidden;
      background: currentColor;
    }

    &__indicator {
      transition-duration: .5s;
      height: 100%;
      min-height: 6px;
      background: currentColor !important;
      box-shadow: 0 2px 10px -5px currentColor;
    }

    &__label {
      height: 20px;
      position: absolute;
      top: 0;
      left: 0;
      font-weight: 600;
      padding: 0 12px;
      width: max-content;
      filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
    }
  }
}
</style>
