<template>
  <DWrapper
    ref="wrapper"
    :classes="['d-tooltip', position, {stay}]"
    :color="color"
    @mouseleave="wrapperHoverLeave"
  >
    <div
      ref="trigger"
      class="d-tooltip__slot"
      @mousemove="onHoverOver"
      @mouseleave="!stay && onHoverLeave()"
    >
      <slot
        name="default"
        v-bind="{...$props, ...$attrs}"
      />
    </div>
    <teleport
      to="#app"
    >
      <component
        :is="transitionComponent"
        :offset="transitionSlides"
        :duration="100"
      >
        <suspense>
          <div
            v-if="hoverState"
            ref="tooltip"
            class="d-tooltip__wrapper"
            :class="[{stay}]"
            @mousemove="onStayHoverOver"
            @mouseleave="onStayHoverLeave"
          >
            <slot name="tooltip-wrapper">
              <DLabel
                class="d-tooltip__wrapper__content"
                v-bind="{...$props, ...$attrs}"
                :filled="filled"
                :glow="{disabled: filled, active: true}"
                :color="props.color"
              >
                <slot name="tooltip" />
              </DLabel>
            </slot>
          </div>
        </suspense>
      </component>
    </teleport>
  </DWrapper>
</template>

<script setup lang="ts">
import type {PropType} from "vue";
import {computed, nextTick, ref, useSlots, watch} from "vue";
import defaultProps from "../../props/default.props";
import DWrapper from "../DWrapper.vue";
import DLabel from "../label/DLabel.vue";
import {TransitionFade, TransitionSlide} from "@morev/vue-transitions";
import {Position} from "../../types/Vuelize";

const wrapper = ref(null);
defineExpose({wrapper});

const slots = useSlots()

const props = defineProps({
    //fontColor: String, TODO
    filled: Boolean,
    stay: Boolean,
    simpleFade: Boolean,
    inactive: Boolean,
    position: {
        type: String as PropType<Position>,
        default: Position.bottom,
    },
    ...defaultProps
});


let trigger = ref<HTMLElement | null>(null);
let tooltip = ref<HTMLElement | null>(null);

const hoverState = ref(false);

function onHoverOver() {
    if (props.inactive) return;
    hoverState.value = true;
}

function onHoverLeave() {
    hoverState.value = false;
}


const stayHoverState = ref(false);

function onStayHoverOver() {
    stayHoverState.value = true;
}

function onStayHoverLeave() {
    stayHoverState.value = false;
    wrapperHoverLeave();
}

function wrapperHoverLeave() {
    setTimeout(() => {
        if (!(props.stay && !stayHoverState.value)) {
            return;
        }
        onHoverLeave()
    }, 150)
}

async function onHover() {
    if (!(hoverState.value && tooltip.value) || !trigger.value) {
        return;
    }
    const triggerRect = trigger.value.getBoundingClientRect();
    const tooltipRect = tooltip.value.getBoundingClientRect();

    switch (props.position) {
        case Position.top: {
            tooltip.value.style.left = (triggerRect.left - (tooltipRect.width / 2) + (triggerRect.width / 2)) + 'px';
            tooltip.value.style.top = (triggerRect.top - tooltipRect.height) + 'px';
            break;
        }
        case Position.bottom: {
            tooltip.value.style.left = (triggerRect.left - (tooltipRect.width / 2) + (triggerRect.width / 2)) + 'px';
            tooltip.value.style.top = (triggerRect.top + triggerRect.height) + 'px';
            break;
        }
        case Position.right: {
            tooltip.value.style.left = (triggerRect.left + triggerRect.width) + 'px';
            tooltip.value.style.top = (triggerRect.top + (triggerRect.height / 2) - tooltipRect.height / 2) + 'px';
            break;
        }
        case Position.left: {
            tooltip.value.style.left = (triggerRect.left - tooltipRect.width) + 'px';
            tooltip.value.style.top = (triggerRect.top + (triggerRect.height / 2) - tooltipRect.height / 2) + 'px';
            break;
        }
    }
}

const transitionComponent = computed(() => {
    if (props.simpleFade) {
        return TransitionFade;
    }
    return TransitionSlide;
})

const transitionSlides = computed(() => {
    const modifier = 8;
    switch (props.position) {
        case Position.top: {
            return [0, modifier];
        }
        case Position.bottom: {
            return [0, -modifier];
        }
        case Position.left: {
            return [modifier, 0];
        }
        case Position.right: {
            return [-modifier, 0];
        }
        default:
            return []
    }
})

watch([() => hoverState.value, () => slots.tooltip ? slots.tooltip() : null], () => {
    nextTick().then(() => onHover())
}, {
    deep: true
})

/*const useFontColor = computed(() => {
  /*return !props.fontColor && props.filled ?
      vuelize.getColorContrast(props.color, props.tint) :
      props.fontColor ?
          props.fontColor : 'inherit';
});*/

</script>

<style lang="scss">

.d-tooltip__wrapper.stay {
    pointer-events: all;
}


.d-tooltip {
    width: max-content;

    &__wrapper {
        z-index: 12;
        padding: 4px;
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
                //color: var(--text-card) !important;
            }

            word-break: keep-all;

            &__text {
                //color: var(--text-contrast) !important;
            }
        }
    }
}
</style>
