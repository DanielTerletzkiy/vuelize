<template>
  <DWrapper ref="wrapper" :classes="['d-tooltip', position, {popover}]" @mouseleave="popover && onHoverLeave()">
    <div class="d-tooltip__slot" ref="trigger" @mouseover="onHoverOver" @mouseleave="!popover && onHoverLeave()">
      <slot name="default" v-bind="{...$props, ...$attrs}">
      </slot>
    </div>
    <component :is="transitionComponent" :duration="100">
      <suspense>
        <div class="d-tooltip__wrapper" :style="stylesObject" v-show="hoverState" ref="tooltip">
          <div id="helper">
            <slot name="tooltip-wrapper">
              <DLabel class="d-tooltip__wrapper__content" v-bind="{...$props, ...$attrs}" :filled="filled"
                      :glow="!filled" glowing :color="props.color || 'inherit'">
                <DCardSubtitle :style="{color: useFontColor + '!important'}" class="pa-0">
                  <slot name="tooltip">
                  </slot>
                </DCardSubtitle>
              </DLabel>
            </slot>
          </div>
        </div>
      </suspense>
    </component>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DTooltip',
}
</script>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({wrapper});
import {
  computed,
  getCurrentInstance,
  inject,
  nextTick, onBeforeUnmount,
  onMounted,
  onUpdated,
  PropType,
  reactive,
  ref,
  watch
} from "vue";
import defaultProps from "../../mixins/DefaultProps";
import DWrapper from "../DWrapper.vue";
import DLabel from "../label/DLabel.vue";
import DCardSubtitle from "../card/text/DCardSubtitle.vue";
import {
  SlideYDownTransition,
  SlideXLeftTransition,
  SlideXRightTransition,
  SlideYUpTransition,
  FadeTransition
} from "v3-transitions";
import {Position} from "../../types/Vuelize";

const vuelize: any = inject('vuelize');
const instance: any = getCurrentInstance();

const props = defineProps({
  filled: Boolean,
  fontColor: String,
  popover: Boolean,
  simpleFade: Boolean,
  inactive: Boolean,
  padding: {type: String, default: '4px'},
  position: {
    type: String as PropType<Position>,
    default: 'bottom',
    validator: function (value) {
      return ['top', 'bottom', 'left', 'right'].indexOf(value as string) !== -1
    }
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

watch(() => hoverState.value, () => {
  nextTick().then(() => onHover())
})

function onHoverOver() {
  if (props.inactive) return;
  hoverState.value = true;
}

function onHoverLeave() {
  hoverState.value = false;
}

async function onHover() {
  if (hoverState.value && tooltip.value) {
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
}

const stylesObject = computed(() => {
  return offset
})

const transitionComponent = computed(() => {
  if (props.simpleFade) {
    return FadeTransition;
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
  }
})

const useFontColor = computed(() => {
  return !props.fontColor && props.filled ?
      vuelize.getColorContrast(props.color, props.tint) :
      props.fontColor ?
          props.fontColor : 'inherit';
});

const observer = ref<any>(null);

onMounted(() => {
  try {
    observer.value = new MutationObserver(function () {
      onHover();
    }.bind(this));

    observer.value.observe(
        document.getElementById('helper'),
        {attributes: true, childList: true, characterData: true, subtree: true}
    );
  } catch (e) {
  }
})

onBeforeUnmount(() => {
  observer.value.disconnect();
})

</script>

<style lang="scss">
@import "../../styles/variables";

.d-tooltip {
  position: relative;
  width: max-content;

  &.popover {
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

      word-break: keep-all;

      & > * {
        font-size: 0.9rem !important;
        width: max-content !important;
      }
    }
  }
}
</style>
