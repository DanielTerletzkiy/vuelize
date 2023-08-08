<template>
  <DWrapper ref="wrapper" :classes="['d-tooltip', position, {stay}]" @mouseleave="stay && onHoverLeave()"
            :color="color">
    <div class="d-tooltip__slot" ref="trigger" @mouseover="onHoverOver" @mouseleave="!stay && onHoverLeave()">
      <slot name="default" v-bind="{...$props, ...$attrs}">
      </slot>
    </div>
    <component :is="transitionComponent" :duration="100">
      <suspense>
        <div class="d-tooltip__wrapper" :style="stylesObject" v-if="hoverState" ref="tooltip">
          <slot name="tooltip-wrapper">
            <DLabel class="d-tooltip__wrapper__content" v-bind="{...$props, ...$attrs}" :filled="filled"
                    :glow="{disabled: filled, active: true}" :color="props.color">
              <DCardSubtitle class="pa-0 d-tooltip__wrapper__content__text">
                <slot name="tooltip">
                </slot>
              </DCardSubtitle>
            </DLabel>
          </slot>
        </div>
      </suspense>
    </component>
  </DWrapper>
</template>

<script setup lang="ts">
import {ThemeTextProperty} from "../../types/Theme";

const wrapper = ref(null);
defineExpose({wrapper});
import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  reactive,
  ref, useSlots,
  watch
} from "vue";
import type {PropType} from "vue";
import defaultProps from "../../mixins/DefaultProps";
import DWrapper from "../DWrapper.vue";
import DLabel from "../label/DLabel.vue";
import DCardSubtitle from "../card/text/DCardSubtitle.vue";
import {
  TransitionSlide, //TODO: add slide offset definitions
  TransitionFade
} from "@morev/vue-transitions";
import {Position} from "../../types/Vuelize";

const instance: any = getCurrentInstance();
const slots = useSlots()

const props = defineProps({
  filled: Boolean,
  fontColor: String,
  stay: Boolean,
  simpleFade: Boolean,
  inactive: Boolean,
  padding: {type: String, default: '4px'},
  position: {
    type: String as PropType<Position>,
    default: Position.Bottom,
  },
  ...defaultProps
});

const hoverState = ref(false);
const offset = reactive({
  top: 'initial',
  right: 'initial',
  bottom: 'initial',
  left: 'initial',
})

let trigger = ref<any | null>(null);
let tooltip = ref<any | null>(null);

watch([() => hoverState.value, () => slots.tooltip ? slots.tooltip() : null], () => {
  nextTick().then(() => onHover())
}, {
  deep: true
})

function onHoverOver() {
  if (props.inactive) return;
  hoverState.value = true;
}

function onHoverLeave() {
  hoverState.value = false;
}

async function onHover() {
  if (!(hoverState.value && tooltip.value)) {
    return;
  }
  const triggerRect = trigger.value.getBoundingClientRect();
  const tooltipRect = tooltip.value.getBoundingClientRect();
  switch (props.position) {
    case Position.Top: {
      offset.left = (triggerRect.left - (tooltipRect.width / 2) + (triggerRect.width / 2)) + 'px';
      offset.top = (triggerRect.top - (tooltipRect.height)) + 'px';
      break;
    }
    case Position.Bottom: {
      offset.left = (triggerRect.left - (tooltipRect.width / 2) + (triggerRect.width / 2)) + 'px';
      offset.top = (triggerRect.top + (triggerRect.height)) + 'px';
      break;
    }
    case Position.Right: {
      offset.left = (triggerRect.left + triggerRect.width) + 'px';
      offset.top = (triggerRect.top + ((triggerRect.height / 2) - tooltipRect.height / 2)) + 'px';
      break;
    }
    case Position.Left: {
      offset.left = (triggerRect.left - tooltipRect.width) + 'px';
      offset.top = (triggerRect.top + ((triggerRect.height / 2) - tooltipRect.height / 2)) + 'px';
      break;
    }
  }
}

const stylesObject = computed(() => {
  return offset
})

const transitionComponent = computed(() => {
  return TransitionFade;
  /*if (props.simpleFade) {
    return TransitionFade;
  }
  switch (props.position) {
    case Position.Top: {
      return SlideYDownTransition;
    }
    case Position.Bottom: {
      return SlideYUpTransition;
    }
    case Position.Right: {
      return SlideXLeftTransition;
    }
    case Position.Left: {
      return SlideXRightTransition;
    }
  }*/
})

const useFontColor = computed(() => {
  /*return !props.fontColor && props.filled ?
      vuelize.getColorContrast(props.color, props.tint) :
      props.fontColor ?
          props.fontColor : 'inherit';*/
});

</script>

<style lang="scss">
@import "../../styles/variables";

.d-tooltip {
  position: relative;
  width: max-content;

  &.stay {
    .d-tooltip__wrapper {
      pointer-events: all;
    }
  }

  &__wrapper {
    z-index: 12;
    padding: v-bind(padding);
    position: fixed;
    display: flex;
    justify-content: center;
    border-radius: inherit;
    pointer-events: none;

    &__content {
      position: relative;
      width: auto;
      height: max-content;
      border-radius: inherit;
      padding: 0;

      &:not(.filled) {
        background: transparent !important;
        backdrop-filter: saturate(120%) blur(10px);

      }

      &:not(.filled) &__text {
        color: var(--text-card) !important;
      }

      word-break: keep-all;

      &__text {
        color: var(--text-contrast) !important;
      }
    }
  }
}
</style>
