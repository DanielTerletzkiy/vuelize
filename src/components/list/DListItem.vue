<template>
  <DWrapper root-tag="li" :classes="['d-list__item', {selected}]"
            :style="stylesObject" v-ripple
            @focusin="()=>focus = true"
            @focusout="()=>focus = false"
            v-bind="{...$props, ...$attrs}" @click="click" :tabindex="this.disabled?-1:0" @keyup.enter="click"
            glow :glowing="!filled && selected">
    <fade-transition>
      <DCard v-if="focus" class="d-list__item__indicator"/>
    </fade-transition>
    <div class="d-list__item__content">
      <slot></slot>
    </div>
  </DWrapper>
</template>

<script setup lang="ts">
import {computed, getCurrentInstance, inject, ref} from "vue";
import defaultProps from "../../mixins/DefaultProps";
import DWrapper from "../DWrapper.vue";
import DCard from "../card/DCard.vue";

const vuelize: any = inject('vuelize');

const emit = defineEmits(['click']);
const props = defineProps({
  ...defaultProps
})

const focus = ref(false);

const instance: any = getCurrentInstance();

const itemColor = computed(() => {
  return props.color || instance.parent.parent.props.color;
})

const itemTint = computed(() => {
  return props.tint || instance.parent.parent.props.tint;
})

const isMultiple = computed(() => {
  return typeof instance.parent.parent.props.modelValue === 'object'
})

const selected = computed(() => {
  return isMultiple.value ?
      instance.parent.parent.props.modelValue.includes(instance.vnode.key)
      : instance.parent.parent.props.modelValue === instance.vnode.key
})

const filled = computed(() => {
  return instance.parent.parent.props.filled
})

const stylesObject = computed(() => {
  if (filled.value) {
    return {
      background: selected.value ? vuelize.getColor(itemColor.value, itemTint.value) : 'transparent',
      color: selected.value ? vuelize.getColorContrast(itemColor.value, itemTint.value) : '',
    }
  } else {
    return {}
  }
})


function click() {
  //check if listItem is under d-list
  if (instance.parent.parent.vnode.el.classList[0] === 'd-list') {
    if (isMultiple.value) {
      let tempArray = instance.parent.parent.props.modelValue;
      if (instance.parent.parent.props.modelValue.includes(instance.vnode.key)) {
        tempArray.splice(tempArray.indexOf(instance.vnode.key), 1)
      } else {
        tempArray.push(instance.vnode.key)
      }
      instance.parent.parent.emit('update:modelValue', tempArray)

    } else {
      instance.parent.parent.emit('update:modelValue', instance.vnode.key)
    }
  } else {
    emit('click', instance.vnode.key)
  }
  //emit('click')
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-list__item {
  position: relative;

  border-radius: inherit;
  min-height: 36px;
  padding: 4px;
  cursor: pointer;

  list-style: none;
  margin: 0;

  transition: background 0.2s ease-out;

  &:focus-visible {
    position: relative;

    outline: none;

    .d-list__item__indicator {
      position: absolute;
      left: -2px;
      top: 50%;
      transform: translateY(-50%);
      max-height: 30px;
      height: 100%;
      width: 4px;
      background: currentColor;
    }
  }

  .d-list__item__content {
    width: 100%;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: $gap*2;
  }

  &:not(.selected) {
    color: darken($dark_card_text, 14) !important;
  }
}
</style>
