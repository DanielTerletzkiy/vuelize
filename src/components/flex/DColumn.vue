<template>
  <DWrapper ref="wrapper" :classes="['d-column', flexClasses($props), noPadding ? 'pa-0' : 'pa-1']"
            v-bind="{...$props, ...$attrs}"
            @click="$emit('click')">
    <slot>
    </slot>
  </DWrapper>
</template>

<script setup lang="ts">
import {ref} from "vue";

const wrapper = ref(null);
defineExpose({wrapper});
import DWrapper from "../DWrapper.vue";
import defaultProps from "../../mixins/DefaultProps";
import flexProps, {flexClasses} from "../../mixins/FlexProps";

defineProps({noPadding: {type: Boolean}, ...flexProps, ...defaultProps})
</script>

<style scoped lang="scss">
.d-column {
  display: flex;
  flex-direction: column;

  :deep(> .d-column) {
    padding: 0;
  }
}
</style>
