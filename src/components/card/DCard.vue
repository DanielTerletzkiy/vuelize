<template>
  <DWrapper ref="wrapper" :classes="['d-card', {block}]" v-bind="{...$props, ...$attrs}"
            @click="$emit('click')">
    <slot></slot>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DCard',
}
</script>

<script setup lang="ts">

const wrapper = ref(null);
defineExpose({wrapper});
import DWrapper from "../DWrapper.vue";
import {computed, inject, ref, watch} from "vue";
import defaultProps from "../../mixins/DefaultProps";
import {ThemeSheetProperty} from "../../types/Theme";

const vuelize: any = inject('vuelize');

const props = defineProps({
  block: {type: Boolean},
  minWidth: {type: String},
  maxWidth: {type: String},
  ...defaultProps
});

</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-card {
  width: max-content;
  min-width: v-bind(minWidth);
  max-width: v-bind(maxWidth);

  &.block {
    width: auto;
    flex: 1;
  }

  background: var(--sheet-card);
  color: var(--text-card);
}

</style>
