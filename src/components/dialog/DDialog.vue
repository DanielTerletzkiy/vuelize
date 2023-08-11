<template>
  <TransitionFade :duration="{enter: 200, leave: 150}">
    <DWrapper
      v-if="modelValue"
      ref="wrapper"
      :classes="['d-dialog']"
      v-bind="{...$props, ...$attrs}"
    >
      <div
        class="d-dialog__backdrop"
        @click.self="handleClick"
      />
      <focus-trap :active="modelValue">
        <div
          class="d-dialog__content"
          tabindex="-1"
        >
          <DWrapper
            ref="wrapper"
            class="d-dialog__content__focus"
            tabindex="0"
          >
            <slot name="default" />
          </DWrapper>
        </div>
      </focus-trap>
    </DWrapper>
  </TransitionFade>
</template>

<script setup lang="ts">
import {ref} from "vue";
import DWrapper from "../DWrapper.vue";
import {TransitionFade} from "@morev/vue-transitions";
import {FocusTrap} from "focus-trap-vue";
import defaultProps from "../../mixins/DefaultProps";

const wrapper = ref(null);
defineExpose({wrapper});

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
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;

  &__backdrop {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: color-mix(in srgb, var(--sheet-background), transparent 50%);
    //backdrop-filter: blur(2px);
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
