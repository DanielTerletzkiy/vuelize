<template>
  <DWrapper
    ref="wrapper"
    elevation="n4"
    :classes="['d-progressbar', {label: showLabel}]"
    v-bind="{...$props, ...$attrs}"
    @click="$emit('click')"
  >
    <DCard
      class="d-progressbar__wrapper"
      color="secondary"
      block
      :rounded="props.rounded"
    >
      <DCard
        class="d-progressbar__wrapper__indicator"
        :width="`${progress}%`"
        :rounded="props.rounded"
        :color="props.color"
        glowing
      />
      <DCardSubtitle
        v-if="showLabel"
        class="d-progressbar__wrapper__label"
        :rounded="props.rounded"
        :color="props.color"
      >
        <slot
          name="progress"
          :progress="progress"
        >
          {{ progress }} %
        </slot>
      </DCardSubtitle>
    </DCard>
  </DWrapper>
</template>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({ wrapper });
import DWrapper from "../DWrapper.vue";
import DCard from "../card/DCard.vue";
import {computed, ref} from "vue";
import defaultProps from "../../props/default.props";
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
    min-height: 6px;
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
      opacity: 0.1;
      overflow: hidden;
      background: currentColor;
    }

    &__indicator {
      position: absolute;
      top: 0;
      left: 0;
      transition-duration: .5s;
      height: 100%;
      min-height: 6px;
      background: transparent !important;
      box-shadow: 0 2px 10px -5px currentColor;

      &::before {
        opacity: 0.2;
        background: linear-gradient(
                -90deg,
                currentColor 0%,
                rgba(0, 0, 0, 0) 150%
        );
      }
    }

    &__label {
      height: 20px;
      position: absolute;
      top: 0;
      left: 0;
      font-weight: 600;
      padding: 0 12px;
      width: max-content;
      //filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
    }
  }
}
</style>
