<template>
  <DWrapper root-tag="li" :classes="['d-radio-item', {selected, center}]" v-ripple
            v-bind="{...$props, ...$attrs}" @click="onClick" :tabindex="disabled?-1:0" @keyup.enter="onClick"
            glow :glowing="selected">
    <d-card class="d-radio-item__dot" :color="itemColor" outlined :depressed="!selected" background-color="transparent"
            rounded="circle" width="14px"
            height="14px">
      <ZoomCenterTransition>
        <Suspense>
          <d-card v-if="selected" :background-color="selected ? itemColor : 'transparent'" rounded="circle"
                  width="8px"
                  height="8px"/>
        </Suspense>
      </ZoomCenterTransition>
    </d-card>
    <slot></slot>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DRadioItem',
}
</script>

<script setup lang="ts">
import {computed, getCurrentInstance, inject, onMounted, watch} from "vue";
import defaultProps from "../../mixins/DefaultProps";
import DWrapper from "../DWrapper.vue";
import DCard from "../card/DCard.vue";
import {ZoomCenterTransition} from "v3-transitions";

const vuelize: any = inject('vuelize');
const updateList: any = inject('updateList');
const parentProps: any = inject('parentProps');

const emit = defineEmits(['click']);
const props = defineProps({
  center: Boolean,
  ...defaultProps
})

const instance: any = getCurrentInstance();

const itemColor = computed(() => {
  return props.color || parentProps.color;
})

const selected = computed(() => {
  return parentProps.modelValue === instance.vnode.key
})

watch(() => selected.value, (state) => {
  if (state) {
    updateParent();
  }
})

function updateParent() {
  updateList(instance.vnode.key)
}

function onClick(e: Event) {
  updateParent();
  emit('click', e)
}

onMounted(() => {
  if (selected.value) {
    updateParent();
  }
})
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-radio-item {
  position: relative;

  border-radius: inherit;
  min-height: 36px;
  cursor: pointer;

  list-style: none;
  margin: 0;

  transition-duration: 0.1s;

  width: 100%;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: $gap*3;

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  &:not(.selected):not(.disabled) {
    color: darken($dark_card_text, 14) !important;
  }

  &__dot {
    transition: 0.3s all ease-out;
    outline-width: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
