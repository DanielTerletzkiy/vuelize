<template>
  <DWrapper :classes="['d-card', {block}]" v-bind="{...$props, ...$attrs}"
            @click="$emit('click')">
    <slot></slot>
  </DWrapper>
</template>

<script setup lang="ts">
import DWrapper from "../DWrapper.vue";
import {computed, inject} from "vue";
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
  }else{
    return 'unset'
  }
})

</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-card {
  width: max-content;
  min-width: v-bind(minWidth);
  max-width: v-bind(maxWidth);

  background-color: v-bind(backgroundColor);

  &.block {
    width: auto;
    flex: 1;
  }

  &.dark {
    background: $dark_sheet;
    color: $dark_card_text;
  }

  &.light {
    background: $light_sheet;
    color: $light_card_text;
  }
}

</style>
