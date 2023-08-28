<template>
  <DWrapper
    ref="wrapper"
    :classes="['d-checkbox']"
    v-bind="{...$props, ...$attrs}"
    @click="click"
  >
    <div
      v-ripple
      class="d-checkbox__box"
      :class="classes"
      :tabindex="disabled?-1:0"
      @keyup.enter="click"
    >
      <TransitionSlide
        group
        :duration="150"
      >
        <DIcon
          v-if="icon"
          :key="icon"
          :name="icon"
          :size="size"
          :color="currentColor"
        />
      </TransitionSlide>
    </div>
    <div
      v-if="!!$slots.default"
      class="d-checkbox__label"
    >
      <slot />
    </div>
  </DWrapper>
</template>

<script setup lang="ts">
import {useVuelizeTheme} from "../../stores";
import {computed, ref} from "vue";
import DWrapper from "../DWrapper.vue";
import DIcon from "../icon/DIcon.vue";
import {TransitionSlide} from '@morev/vue-transitions';
import defaultProps from "@/props/default.props";
import {storeToRefs} from "pinia";
import {ThemeColorProperty} from "@";

const wrapper = ref(null);
defineExpose({wrapper});

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {type: Boolean},
  size: {type: Number, default: 30},
  onIcon: {type: String, default: 'check'},
  offIcon: {type: String, default: ''},
  flexDirection: {type: String, default: 'row'},
  ...defaultProps
})

const vuelizeTheme = useVuelizeTheme()
const {mode} = storeToRefs(vuelizeTheme);

function click() {
  emit('update:modelValue', !props.modelValue)
}

const icon = computed(() => props.modelValue ? props.onIcon : props.offIcon)
const currentColor = computed(()=>props.modelValue ? props.color : ThemeColorProperty.secondary)

const sizePX = ref(`${props.size}px`);
//const color = ref(props.modelValue ? vuelize.getColor(props.color, props.tint) : vuelize.getColor('currentColor'));
const classes = computed(() => {
  return {
    'd-checkbox--checked': props.modelValue,
    'elevation-2': props.modelValue,
    'elevation-light-n6 elevation-dark-4': !props.modelValue,
    'glow': true,
    'glow--active': props.modelValue,
    [mode.value]: true
  }
})
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-checkbox {
  //color: v-bind(color);
  flex-direction: v-bind(flexDirection);
  user-select: none;

  display: flex;
  align-items: center;
  gap: 8px;

  .d-checkbox__box {
    height: v-bind(sizePX);
    width: v-bind(sizePX);

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

  .d-checkbox__label {
    color: var(--text-card);
  }

  .d-checkbox__box:not(.d-checkbox--checked) {
    color: var(--text-contrast);
  }


}
</style>
