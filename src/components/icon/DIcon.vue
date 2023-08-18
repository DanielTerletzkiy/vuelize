<template>
  <DWrapper
    ref="wrapper"
    :classes="['d-icon']"
    v-bind="{...$props, ...$attrs}"
    :style="{width: size+'px', height: size+'px'}"
    @click="$emit('click')"
  >
    <svg
      style="width:0;height:0;position:absolute;"
      aria-hidden="true"
      focusable="false"
    >
      <linearGradient
        v-if="gradient"
        :id="uid"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
        :gradientTransform="`rotate(${gradientRotation})`"
      >
        <stop
          v-for="{offset, color} in gradient"
          :key="offset"
          :offset="offset+'%'"
          :stop-color="'currentColor'"
        />
      </linearGradient>
    </svg>
    <TransitionFade :duration="120">
      <unicon
        :name="name"
        :size="size"
        :icon-style="iconStyle"
        :color="`url(#${uid}) ${'currentColor'}`"
      />
    </TransitionFade>
  </DWrapper>
</template>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({ wrapper });
import type {PropType} from "vue";
import {getCurrentInstance, ref} from "vue";
import DWrapper from "../DWrapper.vue";
import {TransitionFade} from "@morev/vue-transitions";
import {Style} from "vue3-unicons/types/Unicon"
import defaultProps from "../../mixins/DefaultProps";
import Unicon from "vue3-unicons/src/components/Unicon.vue"

defineProps({
  name: {type: String, required: true},
  iconStyle: {type: String as PropType<Style>},
  size: [Number],
  gradient: {type: Array},
  gradientRotation: {type: [String, Number], default: 0},
  ...defaultProps
})

const uid = getCurrentInstance()?.uid;
</script>

<style lang="scss">
.unicon {
  display: flex !important;
}
</style>
