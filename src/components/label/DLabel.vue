<template>
  <DWrapper ref="wrapper" :classes="['d-label', {filled, clickable}]"
            v-bind="{...$props, ...$attrs}" :glow="{
              disabled: filled,
              active: true
            }"
            @click="$emit('click')" v-ripple="clickable && {
              color: filled ? color :'currentColor'
            }">
    <DCardSubtitle class="d-label__wrapper__content pa-0"
                   :color="color"
                   rounded="inherit">
      <span class="prefix" v-if="!!$slots.prefix">
            <slot name="prefix"></slot>
      </span>
      <span class="center">
        <slot name="default"></slot>
      </span>
      <span class="suffix" v-if="!!$slots.suffix">
            <slot name="suffix"></slot>
      </span>
    </DCardSubtitle>
  </DWrapper>
</template>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({wrapper});
import DWrapper from "../DWrapper.vue";
import DCardSubtitle from "../card/text/DCardSubtitle.vue";
import {computed, inject, ref} from "vue";
import defaultProps from "../../mixins/DefaultProps";

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
