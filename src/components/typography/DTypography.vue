<template>
  <DWrapper
    ref="wrapper"
    :classes="['d-typography', type]"
    v-bind="{...$props, ...$attrs}"
  >
    <slot />
  </DWrapper>
</template>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({wrapper});

import DWrapper from "../DWrapper.vue";
import {computed, ref} from "vue";
import typographyProps from "../..//props/typography.props";
import defaultProps from "../../props/default.props";

const props = defineProps({
    ...typographyProps,
    ...defaultProps
});

const opacityPercent = computed(()=>`${props.opacity}%`)

</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-typography {
    font-weight: v-bind(weight);
    color: color-mix(in srgb, var(--misc-current), transparent v-bind(opacityPercent)) !important;
}

</style>
