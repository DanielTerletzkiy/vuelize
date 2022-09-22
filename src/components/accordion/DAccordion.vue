<template>
  <DWrapper ref="wrapper" :classes="['d-accordion']"
            v-bind="{...$props, ...$attrs}">
    <DCardTitle @click.self="onClick" class="d-accordion__header" :class="{'pa-0':removePadding}" :color="headerColor"
                glow :glowing="open"
                v-ripple>
      <slot name="header"></slot>
      <DIcon v-if="showArrow" :name="angleIcon" class="d-accordion__header__icon"/>
    </DCardTitle>
    <CollapseTransition :duration="60">
      <suspense>
        <DCardContent class="d-accordion__content" v-if="open">
          <slot name="default"></slot>
        </DCardContent>
      </suspense>
    </CollapseTransition>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DAccordion',
}
</script>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({ wrapper });
import {computed, getCurrentInstance, ref, watch} from "vue";
import DWrapper from "../DWrapper.vue";
import DCardTitle from "../card/text/DCardTitle.vue";
import DCardContent from "../card/content/DCardContent.vue";
import DIcon from "../icon/DIcon.vue";
import {CollapseTransition} from 'v3-transitions';
import defaultProps from "../../mixins/DefaultProps";

const component = getCurrentInstance();

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {type: [Boolean, Number]},
  headerColor: {type: String},
  showArrow: {type: Boolean},
  removePadding: {type: Boolean},
  ...defaultProps
})

const state = ref(props.modelValue);

watch(() => props.modelValue, () => {
  state.value = props.modelValue
})

const angleIcon = computed((): string => {
  return props.disabled ? 'ban' :open.value ? 'angle-up' : 'angle-down'
})
const isKeyed = computed((): boolean => {
  return (typeof state.value === "number" && typeof component?.vnode.key === "number")
})
const open = computed((): boolean | number => {
  if (isKeyed.value) {
    return state.value === component?.vnode.key
  } else {
    return !!state.value;
  }
})

function onClick() {
  let value: boolean | number;
  if (props.disabled) {
    return;
  }
  if (isKeyed.value) {
    if (state.value === component?.vnode.key) {
      value = -1;
    } else {
      value = component?.vnode.key as number;
    }
  } else {
    value = !state.value;
  }
  if (props.modelValue) {
    emit('update:modelValue', value)
  } else {
    state.value = value;
  }
}
</script>

<style scoped lang="scss">
.d-accordion {
  position: relative;

  &__header {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 1.4em;
    padding: 10px 12px;

    pointer-events: all;

    &__icon {
      margin-left: auto;
      align-self: center;
    }
  }

  &__content {
    padding: 8px;

  }
}
</style>
