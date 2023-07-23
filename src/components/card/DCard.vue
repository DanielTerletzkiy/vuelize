<template>
  <DWrapper ref="wrapper" :classes="['d-card', {block}]" v-bind="{...$props, ...$attrs}" :style="{backgroundColor}"
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
defineExpose({ wrapper });
import DWrapper from "../DWrapper.vue";
import {computed, inject, ref} from "vue";
import defaultProps from "../../mixins/DefaultProps";

const vuelize: any = inject('vuelize');

const props = defineProps({
  block: {type: Boolean},
  backgroundColor: {type: String},
  minWidth: {type: String},
  maxWidth: {type: String},
  ...defaultProps
});

const backgroundColor = computed(()=>{
  if(props.backgroundColor){
    return vuelize.getColor(props.backgroundColor, props.tint)
  }
})

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
