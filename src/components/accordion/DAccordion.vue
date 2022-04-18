<template>
  <DWrapper :classes="['d-accordion']"
            v-bind="{...$props, ...$attrs}">
    <div @click="onClick" style="border-radius: inherit">
      <DCardTitle class="d-accordion__header" :color="headerColor" :class="['glow',{'glow--active': open}]"
                  v-ripple>
        <slot name="header"></slot>
        <DIcon :name="angleIcon" class="d-accordion__header__icon"/>
      </DCardTitle>
    </div>
    <CollapseTransition :duration="60">
      <DCardContent class="d-accordion__content" v-if="open">
        <slot name="content"></slot>
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
import {computed, getCurrentInstance} from "vue";
import DWrapper from "../DWrapper.vue";
import DCardTitle from "../card/text/DCardTitle.vue";
import DCardContent from "../card/content/DCardContent.vue";
import DIcon from "../icon/DIcon.vue";
import { CollapseTransition } from 'v3-transitions';

const component = getCurrentInstance();

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {type: [Boolean, Number], default: true},
  headerColor: {type: String},
})

const angleIcon = computed((): string => {
  return open ? 'angle-up' : 'angle-down'
})
const isKeyed = computed((): boolean => {
  return (typeof props.modelValue === "number" && typeof component?.vnode.key === "number")
})
const open = computed((): boolean | number => {
  if (isKeyed) {
    return props.modelValue === component?.vnode.key
  } else {
    return props.modelValue;
  }
})

function onClick() {
  let value;
  if (isKeyed) {
    if (props.modelValue === component?.vnode.key) {
      value = -1;
    } else {
      value = component?.vnode.key;
    }
  } else {
    value = !component?.vnode.key;
  }
  emit('update:modelValue', value)
}
</script>

<style scoped lang="scss">
.d-accordion {
  position: relative;
  width: 200px;

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
