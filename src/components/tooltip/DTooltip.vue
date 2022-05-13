<template>
  <DWrapper :classes="['d-tooltip', position]">
    <div class="d-tooltip__slot" @mouseover="hoverState=true" @mouseleave="hoverState=false">
      <slot name="default" v-bind="{...$props, ...$attrs}">
      </slot>
    </div>
    <FadeTransition :duration="200">
      <div class="d-tooltip__wrapper" v-show="hoverState">
        <DLabel class="d-tooltip__wrapper__content" v-bind="{...$props, ...$attrs}" :filled="filled" :glow="!filled"
                glowing :style="stylesObject" ref="tooltip">
          <DCardSubtitle :style="{color: useFontColor + '!important'}" class="pa-0">
            <slot name="tooltip">
            </slot>
          </DCardSubtitle>
        </DLabel>
      </div>
    </FadeTransition>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DTooltip',
}
</script>

<script setup lang="ts">
import {computed, getCurrentInstance, inject, reactive, ref, watch} from "vue";
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
const tooltip = ref<HTMLElement | null>(null);
const offset = reactive({
  top: 'initial',
  right: 'initial',
  bottom: 'initial',
  left: 'initial',
})

watch(() => hoverState.value, () => {
  onHover();
})

async function onHover() {
  if (hoverState.value && tooltip.value) {
    // TODO
    // @ts-ignore
    /*const clientRect = tooltip.value.el.getBoundingClientRect();

    if (clientRect.right >= window.innerWidth) {
      offset.right = Math.round(clientRect.right - window.innerWidth) + padding + 'px';
    }
    if (clientRect.left <= 0) {
      offset.left = Math.round(clientRect.left * -1) + padding + 'px';
    }*/
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
    width: 100%;
    padding: $gap;
    position: absolute;
    display: flex;
    justify-content: center;
    border-radius: inherit;

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

  &.left {
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
  }
}
</style>
