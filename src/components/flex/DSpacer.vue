<template>
  <DWrapper ref="wrapper" :classes="['d-spacer']" v-bind="{...$props, ...$attrs}"/>
</template>

<script setup lang="ts">
import {ref} from "vue";

const wrapper = ref(null);
defineExpose({ wrapper });
import DWrapper from "../DWrapper.vue";
import defaultProps from "../../mixins/DefaultProps";

defineProps({
  flexGrow: {type: [String, Number], default: 1},
  ...defaultProps
})
</script>

<style scoped lang="scss">
.d-spacer {
  flex-grow: v-bind(flexGrow);
}
</style>
