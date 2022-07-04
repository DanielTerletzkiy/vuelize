<template>
  <fade-transition :duration="{enter: 200, leave: 150}">
    <DWrapper :classes="['d-dialog']" v-bind="{...$props, ...$attrs}" v-if="modelValue">
      <div class="d-dialog__backdrop" @click.self="handleClick"/>
      <div class="d-dialog__content">
        <slot name="default">
        </slot>
      </div>
    </DWrapper>
  </fade-transition>
</template>

<script lang="ts">
export default {
  name: 'DDialog',
}
</script>

<script setup lang="ts">
import DWrapper from "../DWrapper.vue";
import {FadeTransition} from "v3-transitions";

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {type: Boolean},
  persistent: {type: Boolean},
})

function handleClick() {
  if (!props.persistent) {
    close()
  }
}

function close() {
  emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.d-dialog {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;

  &__backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
    user-select: none;
  }

  &__content {
    z-index: 5;
  }
}
</style>
