<template>
  <fade-transition :duration="{enter: 200, leave: 150}">
    <DWrapper ref="wrapper" :classes="['d-dialog']" v-bind="{...$props, ...$attrs}" v-if="modelValue">
      <div class="d-dialog__backdrop" @click.self="handleClick"/>
      <focus-trap :active="modelValue">
        <div class="d-dialog__content" tabindex="-1">
          <DWrapper ref="wrapper" class="d-dialog__content__focus" tabindex="0">
            <slot name="default">
            </slot>
          </DWrapper>
        </div>
      </focus-trap>
    </DWrapper>
  </fade-transition>
</template>

<script lang="ts">
export default {
  name: 'DDialog',
}
</script>

<script setup lang="ts">
import {ref} from "vue";

const wrapper = ref(null);
defineExpose({ wrapper });
import DWrapper from "../DWrapper.vue";
import {FadeTransition} from "v3-transitions";
import {FocusTrap} from "focus-trap-vue";
import defaultProps from "../../mixins/DefaultProps";

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {type: Boolean},
  persistent: {type: Boolean},
  ...defaultProps
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
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
    user-select: none;
  }

  &__content {
    z-index: 5;

    &__focus {
      outline: none;
    }
  }
}
</style>
