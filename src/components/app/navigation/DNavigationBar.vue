<template>
  <slide-x-left-transition :duration="100">
    <DWrapper root-tag="nav" :classes="['d-navigation-bar', {permanent, temporary}]"
              v-bind="{...$props, ...$attrs}"
              v-if="modelValue">
      <DRow block height="100%">
        <DCard block background-color="transparent" class="d-navigation-bar__content" rounded="none">
          <slot></slot>
        </DCard>
        <DColumn height="100%">
          <DDivider vertical block class="my-3"/>
        </DColumn>
      </DRow>
    </DWrapper>
  </slide-x-left-transition>
</template>

<script lang="ts">
export default {
  name: 'DNavigationBar',
}
</script>

<script setup lang="ts">
import DWrapper from "../../DWrapper.vue";
import DRow from "../../flex/DRow.vue";
import DCard from "../../card/DCard.vue";
import DColumn from "../../flex/DColumn.vue";
import DDivider from "../../divider/DDivider.vue";
import {SlideXLeftTransition} from "v3-transitions";

defineProps({
  modelValue: {type: Boolean, default: true},
  permanent: {type: Boolean},
  temporary: {type: Boolean},
})
</script>

<style scoped lang="scss">
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

    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
