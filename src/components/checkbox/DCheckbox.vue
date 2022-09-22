<template>
  <DWrapper ref="wrapper" :classes="['d-checkbox']" v-bind="{...$props, ...$attrs}"
            @click="click">
    <div class="d-checkbox__box" :class="classes" v-ripple
         :tabindex="disabled?-1:0" @keyup.enter="click">
      <SlideYDownTransition group :duration="150">
        <DIcon v-if="icon" :key="icon" :name="icon" :size="size" :color="'currentColor'"/>
      </SlideYDownTransition>
    </div>
    <div class="d-checkbox__label" v-if="!!$slots.default">
      <slot></slot>
    </div>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DCheckbox',
}
</script>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({ wrapper });
import {computed, inject, ref} from "vue";
import DWrapper from "../DWrapper.vue";
import DIcon from "../icon/DIcon.vue";
import { SlideYDownTransition } from 'v3-transitions';
import defaultProps from "../../mixins/DefaultProps";

const vuelize: any = inject('vuelize');

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {type: Boolean},
  size: {type: Number, default: 30},
  onIcon: {type: String, default: 'check'},
  offIcon: {type: String, default: ''},
  flexDirection: {type: String, default: 'row'},
  ...defaultProps
})

function click() {
  emit('update:modelValue', !props.modelValue)
}

const icon = computed(() => props.modelValue ? props.onIcon : props.offIcon)

const size = ref(props.size + 'px');
const color = ref(props.modelValue ? vuelize.getColor(props.color, props.tint) : vuelize.getColor('currentColor'));
const classes = computed(() => {
  return {
    'd-checkbox--checked': props.modelValue,
    'elevation-2': props.modelValue,
    'elevation-light-n6 elevation-dark-4': !props.modelValue,
    'light': !vuelize.theme.dark,
    'glow': true,
    'glow--active': props.modelValue,
    [vuelize.theme.dark ? 'dark' : 'light']: true
  }
})
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-checkbox {
  color: v-bind(color);
  flex-direction: v-bind(flexDirection);
  user-select: none;

  display: flex;
  align-items: center;
  gap: 8px;

  .d-checkbox__box {
    height: v-bind(size);
    width: v-bind(size);

    border-radius: $gap*1.2;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    transition-duration: 0.1s;

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  }

  &.dark {
    .d-checkbox__label {
      color: $dark_card_text
    }

    .d-checkbox__box:not(.d-checkbox--checked) {
      color: darken($dark_card_text, 16);
    }
  }

  &.light {
    .d-checkbox__label {
      color: $light_card_text
    }

    .d-checkbox__box:not(.d-checkbox--checked) {
      color: lighten($light_card_text, 24) !important;
    }
  }

}
</style>
