<template>
  <DWrapper
    ref="wrapper"
    :classes="['d-switch']"
    v-bind="{...$props, ...$attrs}"
    :color="color"
    role="switch"
    :outlined="{width: '2px'}"
  >
    <d-row
      ref="parent"
      width="max-width"
    >
      <d-card
        v-if="currentState"
        ref="indicator"
        class="d-switch__indicator"
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
        v-for="(state,i) in states"
        :key="state.icon"
        :color="state.color"
        :inactive="!state.tooltip"
      >
        <d-icon-button
          ref="stateButtons"
          :rounded="Rounded.none"
          :size="size"
          :color="modelValue === i || hovering === i ? state.color : ThemeColorProperty.secondary"
          @click="()=>setCurrent(i)"
          @mouseover="()=>onHover(i)"
          @mouseleave="onHoverLeave"
        >
          <d-icon
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
import defaultProps from "@/props/default.props";
import {Rounded, SwitchState, ThemeColorProperty, ThemeSheetProperty, Wrapper} from "@";
import DWrapper from "../DWrapper.vue";
import DIconButton from "@/components/button/DIconButton.vue";
import DIcon from "@/components/icon/DIcon.vue";

const wrapper = ref(null);
defineExpose({wrapper});

const emit = defineEmits(['update:modelValue', 'onSwitch'])

const props = defineProps({
    modelValue: {type: Number, required: true},
    states: {type: Array as PropType<SwitchState[]>, required: true},
    size: {type: Number, default: 30},
    ...defaultProps
});

const sizePX = computed(() => `${props.size}px`)

const hovering = ref<number>(-1);
function onHover(index: number){
    hovering.value = index;
}

function onHoverLeave(){
    hovering.value = -1;
}

const currentState = computed<SwitchState | null>(() => props.states.at(props.modelValue));
function setCurrent(index: number) {
    emit('update:modelValue', index);
    emit('onSwitch', currentState.value?.value);
}

const parent = ref<ComponentPublicInstance<HTMLElement> | null>(null)
const indicator = ref<Wrapper<ComponentPublicInstance<HTMLElement>> | null>(null)
const stateButtons = ref<ComponentPublicInstance<HTMLElement>[]>()

watch([() => props.modelValue, sizePX], updateIndicator)

function updateIndicator() {
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

.d-switch {
    position: relative;
    width: max-content;
    overflow: hidden;

    &__indicator {
        position: absolute !important;
        top: 0;
        left: 0;
        background: black;
        border-radius: inherit;
        transition: all .4s;
    }

    /*&:focus-within {
        outline: 2px solid var(--sheet-secondary);
        outline-offset: 2px;
    }*/
}
</style>
