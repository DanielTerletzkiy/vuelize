<template>
  <DWrapper
    ref="wrapper"
    root-tag="button"
    :classes="['d-icon-button', {glow: true, 'glow--active': props.active}]"
    v-bind="{...$props, ...$attrs}"
    @click="$emit('click')"
  >
    <span
      v-ripple
      class="d-icon-button__content"
    >
      <slot name="default">
        <DIcon :name="name" />
      </slot>
    </span>
    <slot name="misc" />
  </DWrapper>
</template>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({ wrapper });
import DWrapper from "../DWrapper.vue";
import {computed, ref} from "vue";
import DIcon from "../icon/DIcon.vue";
import defaultProps from "../../mixins/DefaultProps";

defineEmits(['click'])

const props = defineProps({
  active: {type: Boolean},
  size: {type: [String, Number], default: 50},
  name: {type: String},
  ...defaultProps
})
const size = computed(() => props.size + 'px');
</script>

<style scoped lang="scss">
.d-icon-button {
  height: v-bind(size);
  width: v-bind(size);

  user-select: none;
  position: relative;
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;

  padding: 0;

  border-radius: 8px;

  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.0892857143em;

  transition-duration: 0.1s;

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  .d-icon-button__content {
    height: 100%;
    width: 100%;
    border-radius: inherit;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
