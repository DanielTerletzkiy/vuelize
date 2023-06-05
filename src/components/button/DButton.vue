<template>
  <DWrapper ref="wrapper" root-tag="button" :classes="['d-btn', {filled, block, glow, size}]"
            v-bind="{...$props, ...$attrs}"
            @click="$emit('click')" :glow="false">
    <span class="d-btn__content" :style="{color: filled && color ? $vuelize.getColorContrast(color,tint):''}" v-ripple>
      <span class="prefix" v-if="!!$slots.prefix">
        <slot name="prefix"></slot>
      </span>
      <span class="center"><slot name="default"></slot></span>
      <span class="suffix" v-if="!!$slots.suffix">
        <slot name="suffix"></slot>
      </span>
    </span>
    <slot name="misc"></slot>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DButton',
}
</script>

<script setup lang="ts">
import {ref} from "vue";

const wrapper = ref(null);
defineExpose({ wrapper });
import DWrapper from "../DWrapper.vue";
import defaultProps from "../../mixins/DefaultProps";

defineEmits(['click'])

defineProps({
  filled: {type: Boolean},
  block: {type: Boolean},

  size: {
    type: String, validator: function (value: string) {
      return ['small', 'regular', 'large'].indexOf(value) !== -1
    }
  },
  ...defaultProps
})
</script>

<style scoped lang="scss">
.d-btn {
  user-select: none;
  position: relative;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  display: flex;

  min-height: 36px;

  border-radius: inherit;

  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.089em;

  transition-duration: 0.1s;

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    border-radius: inherit;

    background: currentColor;
    opacity: 0;

    transition-duration: 0.25s;
  }


  &:hover {
    &::before {
      opacity: 0.1;
      transition-duration: 0.15s;
    }
  }

  &.filled {
    &::before {
      opacity: 1;
    }

    &:hover {
      &::before {
        opacity: 0.9;
      }
    }
  }

  &.glow {
    &::before {
      opacity: 0.1;
    }

    &:hover {
      &::before {
        opacity: 0.15;
      }
    }
  }

  &.block {
    //noinspection CssInvalidPropertyValue
    width: -webkit-fill-available; //Its valid...
    width: -moz-available;
  }

  .d-btn__content {
    min-height: inherit;
    height: 100%;
    width: 100%;
    border-radius: inherit;
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 8px;
    //justify-content: center;

    .prefix {
      //margin-left: 8px;
    }

    .center {
      margin-left: auto;
      margin-right: auto;
    }

    .suffix {
      //margin-right: 8px;
    }
  }

  &.small .d-btn {
    padding: 0;
  }

  &.large .d-btn__content {
    min-height: 50px;
    font-size: 1.6rem;
    font-weight: normal;

  }
}
</style>
