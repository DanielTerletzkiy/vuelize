<template>
  <DWrapper ref="wrapper" root-tag="li" :classes="['d-list__item', {selected, center}]"
            :style="stylesObject" v-ripple
            @focusin="focus = true"
            @focusout="focus = false"
            @mouseenter="focus = true"
            @mouseleave="focus = false"
            v-bind="{...$props, ...$attrs}" @click="onClick" :tabindex="disabled?-1:0" @keyup.enter="onClick"
            glow :glowing="!filled && selected" :color="focus?itemColor:''">
    <slot></slot>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DListItem',
}
</script>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({wrapper});
import {computed, getCurrentInstance, inject, onMounted, ref, watch} from "vue";
import defaultProps from "../../mixins/DefaultProps";
import DWrapper from "../DWrapper.vue";
import DCard from "../card/DCard.vue";

const vuelize: any = inject('vuelize');
const updateList: any = inject('updateList');
const parentProps: any = inject('parentProps');

const emit = defineEmits(['click']);
const props = defineProps({
  center: Boolean,
  ...defaultProps
})

const focus = ref(false);

const instance: any = getCurrentInstance();

const itemColor = computed(() => {
  return props.color || parentProps.color;
})

const itemTint = computed(() => {
  return props.tint || parentProps.tint;
})

const isMultiple = computed(() => {
  return typeof parentProps.modelValue === 'object'
})

const selected = computed(() => {
  return isMultiple.value ?
      parentProps.modelValue.includes(instance.vnode.key)
      : parentProps.modelValue === instance.vnode.key
})

const filled = computed(() => {
  return instance.parent.parent.props.filled
})

const stylesObject = computed(() => {
  if (filled.value) {
    return {
      background: selected.value ? vuelize.getColor(itemColor.value, itemTint.value) : 'transparent',
      color: selected.value ? vuelize.getColorContrast(itemColor.value, itemTint.value) :
          (focus.value ? vuelize.getColor(itemColor.value, itemTint.value) : ''),
    }
  } else {
    return {}
  }
})

watch(() => selected.value, (state) => {
  if (state) {
    //updateParent();
  }
})

function updateParent() {
  updateList(instance.vnode.key, instance.vnode.el.offsetLeft, instance.vnode.el.clientWidth, props.color)
}

function onClick(e: Event) {
  updateParent();
  emit('click', e)
}

onMounted(() => {
  if (selected.value) {
    //updateParent();
  }
})
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-list__item {
  position: relative;

  border-radius: inherit;
  min-height: 36px;
  cursor: pointer;

  list-style: none;
  margin: 0;

  //transition-duration: 0.1s;

  width: 100%;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: $gap*2;

  &.center {
    flex: 1;
    text-align: center;
    justify-content: center;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  &:not(.selected):hover::before {
    //color: darken($dark_card_text, 14) !important;
    opacity: 0.05 !important;
  }
}
</style>
