<template>
  <DWrapper
    ref="wrapper"
    :classes="['d-toggle']"
    v-bind="{...$props, ...$attrs}"
    role="toggle"
    :outlined="{color: currentState&&coloredOutline&&currentState.color||'', transparency: 60,width: '2px'}"
    :tabindex="disabled || !simpleToggle?-1:0"
    @keyup.enter="simpleToggle && simpleClick()"
  >
    <d-row
      ref="parent"
      v-ripple="simpleToggle"
      width="max-width"
      :glow="{disabled: !simpleToggle}"
      :color="currentState&&currentState.color"
      @click="simpleToggle && simpleClick()"
    >
      <d-card
        v-if="currentState"
        ref="indicator"
        class="d-toggle__indicator"
        height="100%"
        :width="sizePX"
        :rounded="Rounded.none"
        :glow="{active:true}"
        :color="{
          map: [
            {
              color: currentState.color,
              property: ThemeSheetProperty.glow
            }
          ]
        }"
      />
      <d-tooltip
        v-for="(state,i) in filteredStates"
        :key="state.icon"
        :color="state.color"
        :inactive="!state.tooltip"
        @mouseover="()=>onHover(i)"
        @mouseleave="onHoverLeave"
      >
        <d-icon-button
          ref="stateButtons"
          :rounded="Rounded.none"
          :size="size"
          :color="modelValue === i || hovering === i ? state.color : ThemeColorProperty.secondary"
          :disabled="simpleToggle"
          @click="()=>setCurrent(i)"
        >
          <d-icon
            :color="modelValue === i || hovering === i ? state.color : ThemeColorProperty.secondary"
            :name="state.icon"
            :size="size / 1.5"
          />
        </d-icon-button>
        <template #tooltip>
          {{ state.tooltip }}
        </template>
      </d-tooltip>
    </d-row>
  </DWrapper>
</template>

<script setup lang="ts">
import {ComponentPublicInstance, computed, nextTick, onMounted, PropType, ref, watch} from "vue";
import defaultProps from "../../props/default.props";
import {Rounded, ThemeColorProperty, ThemeSheetProperty, ToggleState, Wrapper} from "../../types";
import DWrapper from "../DWrapper.vue";
import DIconButton from "../button/DIconButton.vue";
import DIcon from "../icon/DIcon.vue";

const wrapper = ref(null);
defineExpose({wrapper});

const emit = defineEmits(['update:modelValue', 'toggleValue'])

const props = defineProps({
  modelValue: {type: Number, required: true},
  states: {
    type: Array as PropType<ToggleState[]>, default: () => [
      {
        color: ThemeColorProperty.error,
        icon: 'times',
        value: false,
      }, {
        color: ThemeColorProperty.success,
        icon: 'check',
        value: true,
      }
    ]
  },
  size: {type: Number, default: 30},
  coloredOutline: {type: Boolean},
  ...defaultProps
});

const sizePX = computed(() => `${props.size}px`)

const simpleToggle = computed(() => filteredStates.value.length < 3)

const hovering = ref<number>(-1);

function onHover(index: number) {
  hovering.value = index;
}

function onHoverLeave() {
  hovering.value = -1;
}

const filteredStates = computed(() => props.states.filter((state: ToggleState) => !state.hidden))

const currentState = computed<ToggleState | null>(() => props.states.at(props.modelValue));

function setCurrent(index: number) {
  emit('update:modelValue', index);
}

function simpleClick() {
  setCurrent(props.modelValue === 0 ? 1 : 0);
}

const parent = ref<ComponentPublicInstance<HTMLElement> | null>(null)
const indicator = ref<Wrapper<ComponentPublicInstance<HTMLElement>> | null>(null)
const stateButtons = ref<ComponentPublicInstance<HTMLElement>[]>()

watch([() => props.modelValue, sizePX], updateIndicator)

function updateIndicator() {
  nextTick(() => {
    emit('toggleValue', currentState.value?.value);
  })
  if (props.modelValue === undefined || props.modelValue < 0) {
    return;
  }
  const button = stateButtons.value?.at(props.modelValue);
  if (!button || !indicator.value || !parent.value) {
    return;
  }
  const parentRect: Partial<DOMRect> = getBoundingClientRect(parent.value.$el);
  const childRect: Partial<DOMRect> = getBoundingClientRect(button.$el);

  const rect: Partial<DOMRect> = {
    height: 0,
    width: 0,
    x: 0,
    y: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  };
  Object.entries(childRect).forEach(([key, value]) => {
    const rectKey = key as keyof DOMRect;
    const parentValue = parentRect[rectKey] as number;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    rect[rectKey] = value - parentValue
  });

  indicator.value.wrapper.wrapper.style.setProperty('left', `${rect.left}px`);
}

function getBoundingClientRect(element: HTMLElement) {
  const {top, right, bottom, left, width, height, x, y} = element.getBoundingClientRect();
  return {top, right, bottom, left, width, height, x, y}
}

onMounted(() => nextTick().then(updateIndicator))

</script>

<style lang="scss">

.d-toggle {
  position: relative;
  width: max-content;
  overflow: hidden;
  cursor: pointer;

  &__indicator {
    position: absolute !important;
    top: 0;
    left: 0;
    background: black;
    border-radius: inherit;
    transition: all .4s;
    pointer-events: none;
  }

  &:focus-visible {
    outline: 2px solid currentColor !important;
    outline-offset: 2px;
  }

  /*&:focus-within {
      outline: 2px solid var(--sheet-secondary);
      outline-offset: 2px;
  }*/
}
</style>
