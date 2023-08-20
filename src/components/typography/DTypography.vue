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
import {PropType, ref} from "vue";
import {Opacity, Type, Weight} from "@/types";
import defaultProps from "../../mixins/DefaultProps";

const props = defineProps({
    type: {
        type: String as PropType<Type>,
        default: Type.body1
    },
    weight: {
        type: Number as PropType<Weight>,
        default: Weight.w400
    },
    opacity: {
        type: Number as PropType<Opacity>,
        default: Opacity.high
    },
    ...defaultProps
});

</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-typography {
    font-weight: v-bind(weight);
    opacity: v-bind(opacity);
}

</style>
