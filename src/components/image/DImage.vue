<template>
  <DWrapper :classes="['d-image']" root-tag="img" :style="styles" draggable="false"
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
import {computed} from "vue";

const props = defineProps({
  src: {type: String, required: true},
  ...defaultProps
})

const styles = computed(() => {
  return {
    backgroundImage: `url(${props.src})`,
  }
})
</script>

<style scoped lang="scss">
.d-image {
  user-select: none;
  display: block;
  object-fit: cover;
  background-size: cover;
  background-position: center;
}
</style>
