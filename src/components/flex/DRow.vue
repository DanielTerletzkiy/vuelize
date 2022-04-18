<template>
  <DWrapper :classes="['d-row', flexClasses($props)]" v-bind="{...$props, ...$attrs}"
            @click="$emit('click')">
    <slot>
    </slot>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DRow',
}
</script>

<script setup lang="ts">
import DWrapper from "../DWrapper.vue";
import defaultProps from "../../mixins/DefaultProps";
import flexProps, {flexClasses} from "../../mixins/FlexProps";

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
