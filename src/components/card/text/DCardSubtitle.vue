<template>
  <DWrapper
    ref="wrapper"
    :classes="['d-card-subtitle']"
    v-bind="{...$props, ...$attrs}"
  >
    <DTypography v-bind="{...$props, ...$attrs}">
      <slot />
    </DTypography>
  </DWrapper>
</template>

<script setup lang="ts">
import {ref} from "vue";
import DWrapper from "../../DWrapper.vue";
import defaultProps from "@/props/default.props";
import typographyProps from "@/props/typography.props";
import DTypography from "@/components/typography/DTypography.vue";

const wrapper = ref(null);
defineExpose({wrapper});

defineProps({...defaultProps, ...typographyProps})
</script>

<style lang="scss">
@import "../../../styles/variables";

.d-card-subtitle {
    font-size: 16px;
    padding: 8px;

    .d-typography {
        display: flex;
        align-items: center;
        gap: 8px;
    }
}

.d-card-title ~ .d-card-subtitle {
    margin-top: -20px;
    //padding-left: 10px;
}


.d-card {
    .d-card-subtitle {
        width: auto;
    }

    .d-card-title + .d-content {
        padding-top: 0;
    }
}
</style>
