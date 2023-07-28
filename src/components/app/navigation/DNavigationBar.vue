<template>
  <TransitionSlide :duration="100" :offset="['-100%', 0]">
    <DWrapper ref="wrapper" root-tag="nav" :classes="['d-navigation-bar', {permanent, temporary: !permanent}]"
              v-bind="{...$props, ...$attrs}"
              v-show="modelValue">
      <DRow block align="unset" height="100%" class="content" :class="[permanent]" rounded="none">
        <DColumn block>
          <slot></slot>
        </DColumn>
      </DRow>
    </DWrapper>
  </TransitionSlide>
  <div v-if="!permanent && modelValue" class="d-navigation-bar__backdrop" @click.self="onClose"/>
</template>

<script lang="ts">
export default {
  name: 'DNavigationBar',
}
</script>

<script setup lang="ts">
import {ref} from "vue";

const wrapper = ref(null);
defineExpose({wrapper});
import DWrapper from "../../DWrapper.vue";
import DRow from "../../flex/DRow.vue";
import DColumn from "../../flex/DColumn.vue";
import {TransitionSlide} from "@morev/vue-transitions";
import defaultProps from "../../../mixins/DefaultProps";

const emit = defineEmits(['update:modelValue']);

defineProps({
  modelValue: {type: Boolean, default: true},
  permanent: {type: Boolean},
  ...defaultProps

})

function onClose() {
  emit('update:modelValue', false);
}
</script>

<style scoped lang="scss">
@import "../../../styles/variables";

.d-navigation-bar {
  height: 100dvh;
  width: 300px;

  &.temporary {
    position: fixed;

    .content {
      backdrop-filter: blur(10px);
    }
  }

  &.permanent {
    position: sticky;
    top: $navbarHeight;
    height: calc(100dvh - $navbarHeight) !important;
  }

  .content {
    background-color: color-mix(in srgb, var(--sheet-card), transparent 90%);

    border-right: $outline;

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
}
</style>
