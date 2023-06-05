<template>
  <DWrapper ref="wrapper" :classes="['d-grid']" v-bind="{...$props, ...$attrs}"/>
</template>

<script lang="ts">
export default {
  name: 'DGrid',
}
</script>

<script setup lang="ts">
import {computed, ref} from "vue";

const wrapper = ref(null);
defineExpose({wrapper});
import DWrapper from "../DWrapper.vue";
import defaultProps from "../../mixins/DefaultProps";

const props = defineProps({
  gap: {type: Number, default: 0},
  columns: {type: Number, default: 1},
  ...defaultProps
})

const gapCompute = computed(() => props.gap + 'px')
const columnsCompute = computed(() => `repeat(${props.columns}, 1fr)`)
</script>

<style scoped lang="scss">
.d-grid {
  display: grid;
  grid-template-columns: v-bind(columnsCompute);
  grid-gap: v-bind(gapCompute);
}
</style>
