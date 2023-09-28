<template>
  <DWrapper
    ref="wrapper"
    v-ripple="clickable && {
      color: filled ? color :'currentColor'
    }"
    :classes="['d-label', {filled, clickable}]"
    v-bind="{...$props, ...$attrs}"
    :glow="{
      disabled: filled,
      active: true
    }"
    @click="$emit('click')"
  >
    <DCardSubtitle
      class="d-label__wrapper__content pa-0"
      :color="filled ? ThemeTextProperty.contrast : color"
      rounded="inherit"
      :opacity="Opacity.none"
      :weight="Weight.w600"
    >
      <span
        v-if="!!$slots.prefix"
        class="prefix"
      >
        <slot name="prefix" />
      </span>
      <span class="center">
        <slot name="default" />
      </span>
      <span
        v-if="!!$slots.suffix"
        class="suffix"
      >
        <slot name="suffix" />
      </span>
    </DCardSubtitle>
  </DWrapper>
</template>

<script setup lang="ts">
import {Opacity, ThemeAllPropertyEnum, ThemeMiscProperty, ThemeTextProperty, Weight} from "../../types";
import DWrapper from "../DWrapper.vue";
import DCardSubtitle from "../card/text/DCardSubtitle.vue";
import {ref} from "vue";
import defaultProps from "../../props/default.props";

const wrapper = ref(null);
defineExpose({wrapper});

defineEmits(['click'])

const props = defineProps({
  filled: {type: Boolean},
  clickable: {type: Boolean},
  ...defaultProps
})
</script>

<style scoped lang="scss">
.d-label {
  height: min-content;
  width: max-content;
  font-weight: 600;
  padding: 4px 16px;

  &.filled {
    background: currentColor;
  }

  &.clickable {
    cursor: pointer;
  }

  &__wrapper {
    &__content {
      width: max-content;
      gap: 4px;
    }
  }

  .prefix {
    margin-left: -10px;
    display: flex;
  }

  .suffix {
    margin-right: -10px;
    display: flex;
  }
}
</style>
