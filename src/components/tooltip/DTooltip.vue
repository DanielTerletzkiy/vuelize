<template>
  <DWrapper :classes="['d-tooltip', position]">
    <div class="d-tooltip__slot" ref="trigger" @mouseover="hoverState=true" @mouseleave="hoverState=false">
      <slot name="default" v-bind="{...$props, ...$attrs}">
      </slot>
    </div>
    <FadeTransition :duration="200">
      <suspense>
        <div class="d-tooltip__wrapper" :style="stylesObject" v-show="hoverState" ref="tooltip">
          <DLabel class="d-tooltip__wrapper__content" v-bind="{...$props, ...$attrs}" :filled="filled" :glow="!filled"
                  glowing>
            <DCardSubtitle :style="{color: useFontColor + '!important'}" class="pa-0">
              <slot name="tooltip">
              </slot>
            </DCardSubtitle>
          </DLabel>
        </div>
      </suspense>
    </FadeTransition>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DTooltip',
}
</script>

<script setup lang="ts">
import {computed, getCurrentInstance, inject, nextTick, reactive, ref, watch} from "vue";
import defaultProps from "../../mixins/DefaultProps";
import DWrapper from "../DWrapper.vue";
import DLabel from "../label/DLabel.vue";
import DCardSubtitle from "../card/text/DCardSubtitle.vue";
import {FadeTransition} from "v3-transitions";

const vuelize: any = inject('vuelize');
const instance: any = getCurrentInstance();

const props = defineProps({
  filled: Boolean,
  fontColor: String,
  position: {
    type: String,
    validator: function (value) {
      return ['top', 'bottom', 'left', 'right'].indexOf(value as string) !== -1
    }
  },
  ...defaultProps
});

const padding = 4;
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

async function onHover() {
  //console.log(tooltip)
  if (hoverState.value && tooltip.value) {
    console.log(trigger.value.clientHeight)
    console.log(trigger, trigger.value.offsetParent.offsetTop, trigger.value.offsetParent.offsetLeft)

    switch (props.position) {
      case 'top': {
        console.log(tooltip.value.clientHeight)
        offset.left = (trigger.value.offsetParent.offsetLeft - (tooltip.value.clientWidth / 2) + (trigger.value.clientWidth / 2)) + 'px';
        offset.top = (trigger.value.offsetParent.offsetTop - (trigger.value.clientHeight - tooltip.value.clientHeight / 2)) - 16 + 'px';
        break;
      }
      case 'bottom': {
        offset.left = (trigger.value.offsetParent.offsetLeft - (tooltip.value.clientWidth / 2) + (trigger.value.clientWidth / 2)) + 'px';
        offset.top = (trigger.value.offsetParent.offsetTop + (trigger.value.clientHeight)) + 'px';
        break;
      }
      case 'right': {
        offset.left = (trigger.value.offsetParent.offsetLeft + trigger.value.clientWidth) + 'px';
        offset.top = (trigger.value.offsetParent.offsetTop + ((trigger.value.clientHeight / 2) - tooltip.value.clientHeight / 2)) + 'px';
        break;
      }
      case 'left': {
        offset.left = (trigger.value.offsetParent.offsetLeft - tooltip.value.clientWidth) + 'px';
        offset.top = (trigger.value.offsetParent.offsetTop + ((trigger.value.clientHeight / 2) - tooltip.value.clientHeight / 2)) + 'px';
        break;
      }
    }
  }
}

const stylesObject = computed(() => {
  return offset
})

const useFontColor = computed(() => {
  return !props.fontColor && props.filled ?
      vuelize.getColorContrast(props.color, props.tint) :
      props.fontColor ?
          props.fontColor : 'inherit';
});

</script>

<style lang="scss">
@import "../../styles/variables";

.d-tooltip {
  position: relative;
  width: max-content;

  &__wrapper {
    z-index: 12;
    padding: $gap*2;
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
        backdrop-filter: blur(1px);
      }

      word-break: keep-all;

      & > * {
        font-size: 0.9rem !important;
        width: max-content !important;
      }
    }
  }

  /*&.left {
    display: flex;
    align-items: center;

    .d-tooltip__wrapper {
      display: unset;
      right: calc(100% + #{$gap});
    }
  }

  &.right {
    display: flex;
    align-items: center;

    .d-tooltip__wrapper {
      display: unset;
      left: calc(100% + #{$gap});
    }
  }

  &.bottom {
    .d-tooltip__wrapper {
      top: calc(100% + #{$gap});
    }
  }

  &.top {
    .d-tooltip__wrapper {
      bottom: calc(100% + #{$gap});
    }
  }*/
}
</style>
