<template>
  <DWrapper :classes="['d-spacer']" v-bind="{...$props, ...$attrs}"/>
</template>

<script lang="ts">
export default {
  name: 'DSpacer',
}
</script>

<script setup lang="ts">
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
