<template>
  <component ref="wrapper" :is="componentTag" :to="link" :disabled="disabled"
             :class="[classes, themeClass, elevationClass, globalClasses]"
             :style="{color, height, width, ...outline}"
             @mouseenter="$emit('mouseenter')" @mouseleave="$emit('mouseleave')">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({wrapper});
import {computed, inject, ref} from "vue";
import defaultProps from "../mixins/DefaultProps";

const vuelize: any = inject('vuelize');

const props = defineProps({
  classes: {type: Array},
  rootTag: {type: String},
  ...defaultProps
})

const componentTag = computed(() => {
  return props.link ? 'router-link' : props.rootTag ?? 'div'
})

const globalClasses = computed(() => {
  return {
    [`rounded-${props.rounded}`]: props.rounded,
    outlined: props.outlined,
    depressed: props.depressed,
    disabled: props.disabled,
    glow: props.glow,
    ['glow--active glow']: props.glowing,
    ['glow--filled glow']: props.filledGlow,
  }
})

const elevationClass = computed(() => {
  let elevationObject: any = {}
  if (props.elevation === '') {
    elevationObject['elevation'] = true
  } else if (props.elevation) {
    elevationObject[`elevation-${props.elevation}`] = true
  }

  if (props.elevationDark === '') {
    elevationObject['elevation-dark'] = true
  } else if (props.elevationDark) {
    elevationObject[`elevation-dark-${props.elevationDark}`] = true
  }

  if (props.elevationLight === '') {
    elevationObject['elevation-light'] = true
  } else if (props.elevationLight) {
    elevationObject[`elevation-light-${props.elevationLight}`] = true
  }
  return elevationObject
})

const themeClass = computed(() => {
  return vuelize.theme.dark ? 'dark' : 'light';
})

const color = computed(() => {
  return vuelize.getColor(props.color, props.tint);
})

const outline = computed(() => {
  return {
    outlineOffset: props.outlineOffset,
    outlineWidth: props.outlineWidth,
    outlineColor: vuelize.getColor(props.outlineColor)
  };
})

</script>

<style scoped lang="scss">

</style>
