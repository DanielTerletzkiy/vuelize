<template>
  <DWrapper :classes="['d-accordion']"
            v-bind="{...$props, ...$attrs}">
    <div @click="onClick" style="border-radius: inherit">
      <DCardTitle class="d-accordion__header" :color="headerColor" glow :glowing="open"
                  v-ripple>
        <slot name="header"></slot>
        <DIcon :name="angleIcon" class="d-accordion__header__icon"/>
      </DCardTitle>
    </div>
    <CollapseTransition :duration="60">
      <DCardContent class="d-accordion__content" v-if="open">
        <slot name="default"></slot>
      </DCardContent>
    </CollapseTransition>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DAccordion',
}
</script>

<script setup lang="ts">
import {computed, getCurrentInstance, ref, watch} from "vue";
import DWrapper from "../DWrapper.vue";
import DCardTitle from "../card/text/DCardTitle.vue";
import DCardContent from "../card/content/DCardContent.vue";
import DIcon from "../icon/DIcon.vue";
import {CollapseTransition} from 'v3-transitions';

const component = getCurrentInstance();

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {type: [Boolean, Number]},
  headerColor: {type: String},
})

const state = ref(props.modelValue);

watch(() => props.modelValue, () => {
  state.value = props.modelValue
})

const angleIcon = computed((): string => {
  return open.value ? 'angle-up' : 'angle-down'
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
