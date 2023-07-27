<template>
  <DWrapper ref="wrapper" :classes="['d-icon']" v-bind="{...$props, ...$attrs}"
            @click="$emit('click')" :style="{width: size+'px', height: size+'px'}">
    <svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">
      <linearGradient :id="uid" x1="0%" y1="0%" x2="100%" y2="0%"
                      :gradientTransform="`rotate(${gradientRotation})`" v-if="gradient">
        <stop v-for="{offset, color} in gradient" :key="offset" :offset="offset+'%'"
              :stop-color="'currentColor'"/>
      </linearGradient>
    </svg>
    <fade-transition :duration="120">
      <unicon :name="name" :size="size" :icon-style="iconStyle"
              :color="`url(#${uid}) ${'currentColor'}`"></unicon>
    </fade-transition>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DIcon',
}
</script>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({ wrapper });
import {getCurrentInstance, inject, ref} from "vue";
import type {PropType} from "vue";
import DWrapper from "../DWrapper.vue";
import {FadeTransition} from "v3-transitions";
import {Style} from "vue3-unicons/types/Unicon"
import defaultProps from "../../mixins/DefaultProps";
import Unicon from "vue3-unicons/src/components/Unicon.vue"

const vuelize: any = inject('vuelize');

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
