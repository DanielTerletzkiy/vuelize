<template>
  <DWrapper ref="wrapper" root-tag="button" :classes="['d-button', size, {filled, block, glow}]"
            v-bind="{...$props, ...$attrs}"
            @click.capture="$emit('click')" :elevation="typeof $props.glow === 'undefined' && !filled && !flat ? 2 : 0">
    <span class="d-button__content" v-ripple>
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
import {PropType, ref} from "vue";

const wrapper = ref(null);
defineExpose({wrapper});
import DWrapper from "../DWrapper.vue";
import defaultProps from "../../mixins/DefaultProps";
import {Size} from "../../types/components/DButton";

defineEmits(['click'])

defineProps({
  flat: {type: Boolean},
  filled: {type: Boolean},
  block: {type: Boolean},
  size: {type: Object as PropType<Size>, default: Size.regular},
  ...defaultProps
})
</script>

<style scoped lang="scss">
.d-button {
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
    .d-button__content {
      color: var(--text-contrast); //var(--text-card); // TODO: use color-contrast when it finally comes out!
    }

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
    //noinspection CssInvalidPropertyValue
    width: -moz-available;
  }

  .d-button__content {
    min-height: inherit;
    height: 100%;
    width: 100%;
    border-radius: inherit;
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
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

  &.small {
    min-height: unset;

    .d-button__content {
      font-size: 0.65rem;
      padding: 0.4rem;
    }
  }

  &.large .d-button__content {
    font-size: 1.4rem;
    padding: 10px 1rem;

  }
}
</style>
