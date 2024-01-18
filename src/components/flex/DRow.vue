<template>
  <DWrapper
    ref="wrapper"
    :classes="['d-row', flexClasses($props)]"
    v-bind="{...$props, ...$attrs}"
    @click="$emit('click')"
  >
    <slot />
  </DWrapper>
</template>

<script setup lang="ts">
import {ref} from "vue";
import DWrapper from "../DWrapper.vue";
import defaultProps from "../../props/default.props";
import flexProps, {flexClasses} from "../../props/flex.props";

const wrapper = ref(null);
defineExpose({ wrapper });

defineProps({
    align: {type: String, default: 'center'},
    justify: {type: String, default: 'unset'},
  ...flexProps,
  ...defaultProps,
})
</script>

<style scoped lang="scss">
.d-row {
  align-items: v-bind(align);
  justify-content: v-bind(justify);

  width: 100%;
  display: flex;

  .no-gap:deep(> .d-column) {
    padding: 4px;
  }
}
</style>
