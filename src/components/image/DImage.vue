<template>
  <DWrapper ref="wrapper" :classes="['d-image']" :src="src"
            draggable="false" root-tag="img" v-bind="{...$props, ...$attrs}">
  </DWrapper>
</template>

<script setup lang="ts">
import DWrapper from "../DWrapper.vue";
import defaultProps from "../../mixins/DefaultProps";
import {ref} from "vue";

const wrapper = ref(null);
defineExpose({wrapper});

const props = defineProps({
  src: {type: String, required: true},
  alt: {type: String, required: false},
  fit: {type: String, required: false, default: "contain"},
  ...defaultProps
})

</script>

<style scoped lang="scss">
.d-image {
  overflow: hidden;

  user-select: none;
  object-fit: v-bind(fit);
  background-position: center;
  width: inherit;
  height: inherit;
}
</style>
