<template>
  <DWrapper ref="wrapper" :classes="['d-divider', {block, vertical, horizontal: !vertical}]"
            v-bind="{...$props, ...$attrs}"/>
</template>

<script lang="ts">
export default {
  name: 'DDivider',
}
</script>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({ wrapper });
import {ref} from "vue";
import DWrapper from "../DWrapper.vue";

const props = defineProps({
  block: {type: Boolean},
  vertical: {type: Boolean},
  size: {type: String, default: '1px'},
  height: {type: String},
  width: {type: String},
})

const height = ref(!props.vertical ? props.size : props.height)
const width = ref(props.vertical ? props.size : props.width)
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-divider {
  height: v-bind(height);
  width: v-bind(width);

  background: currentColor;
  border-radius: 9999px !important;
  transition: 0.2s ease;

  &.horizontal {
    min-width: min-content;
  }

  &.vertical {
    //min-height: min-content;
  }

  &.block {
    &.horizontal {
      width: auto;
      flex: 1;
    }

    &.vertical {
      height: inherit;
      display: flex;
      align-self: stretch;
    }
  }

  &.dark {
    color: darken($dark_card_text, 55);
  }

  &.light {
    color: lighten($light_card_text, 60);
  }
}


</style>
