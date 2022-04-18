<template>
  <DWrapper :classes="['d-image']" root-tag="img" :src="src" draggable="false"
            v-bind="{...$props, ...$attrs}"/>
</template>

<script lang="ts">
export default {
  name: 'DImage',
}
</script>

<script setup lang="ts">
import DWrapper from "../DWrapper.vue";
import defaultProps from "../../mixins/DefaultProps";

defineProps({
  src: {type: String, required: true},
  ...defaultProps
})
</script>

<style scoped lang="scss">
.d-image {
  user-select: none;
  display: block;
  object-fit: cover;
}
</style>
