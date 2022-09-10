<template>
  <slide-x-left-transition :duration="100">
    <DWrapper ref="wrapper" root-tag="nav" :classes="['d-navigation-bar', {permanent, temporary}]"
              v-bind="{...$props, ...$attrs}"
              v-show="modelValue">
      <DCard block :backgroundColor="permanent && 'transparent'" class="d-navigation-bar__content" rounded="none">
        <DRow block align="unset" height="100%">
          <DColumn block>
            <slot></slot>
          </DColumn>
          <DDivider v-if="permanent" vertical class="d-navigation-bar__content__divider my-3"/>
        </DRow>
      </DCard>
    </DWrapper>
  </slide-x-left-transition>
  <div v-if="temporary && modelValue" class="d-navigation-bar__backdrop" @click.self="onClose"/>
</template>

<script lang="ts">
export default {
  name: 'DNavigationBar',
}
</script>

<script setup lang="ts">
import {ref} from "vue";

const wrapper = ref(null);
defineExpose({ wrapper });
import DWrapper from "../../DWrapper.vue";
import DRow from "../../flex/DRow.vue";
import DCard from "../../card/DCard.vue";
import DColumn from "../../flex/DColumn.vue";
import DDivider from "../../divider/DDivider.vue";
import {SlideXLeftTransition, FadeTransition} from "v3-transitions";

const emit = defineEmits(['update:modelValue']);

defineProps({
  modelValue: {type: Boolean, default: true},
  permanent: {type: Boolean},
  temporary: {type: Boolean},
})

function onClose() {
  emit('update:modelValue', false);
}
</script>

<style scoped lang="scss">
@import "../../../styles/variables";

.d-navigation-bar {
  height: 100vh;
  width: 300px;

  z-index: 9;

  &.temporary {
    position: fixed;
  }

  &.permanent {
    position: sticky;
    top: 54px;
    height: calc(100vh - 54px) !important;
  }

  &__content {
    height: inherit;
    width: inherit;
    overflow: overlay;

    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &__divider {
      height: auto;
    }
  }

  &__backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
    user-select: none;
    z-index: 1;
  }

  &.dark {
    background-color: $dark_background;
  }

  &.light {
    background-color: $light_background;
  }
}
</style>
