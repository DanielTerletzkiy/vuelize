<template>
  <DWrapper ref="wrapper" :classes="['d-column', flexClasses($props)]" v-bind="{...$props, ...$attrs}"
            @click="$emit('click')">
    <slot>
    </slot>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DColumn',
}
</script>

<script setup lang="ts">
import {ref} from "vue";

const wrapper = ref(null);
defineExpose({ wrapper });
import DWrapper from "../DWrapper.vue";
import defaultProps from "../../mixins/DefaultProps";
import flexProps, {flexClasses} from "../../mixins/FlexProps";

defineProps({...flexProps, ...defaultProps})
</script>

<style scoped lang="scss">
.d-column {
  padding: 4px;
  display: flex;
  flex-direction: column;

  :deep(> .d-column) {
    padding: 0;
  }
}
</style>
