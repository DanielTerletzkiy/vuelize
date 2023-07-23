<template>
  <component ref="wrapper" :is="componentTag" :to="link" :disabled="disabled"
             :class="[classes, mode, elevationClass, globalClasses]"
             :style="{height, width, ...outline}"
             @mouseenter="$emit('mouseenter')" @mouseleave="$emit('mouseleave')">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import {useVuelizeTheme} from "../store/ThemeStore";
import {computed, inject, onMounted, ref, watch} from "vue";
import defaultProps from "../mixins/DefaultProps";
import {storeToRefs} from "pinia";
import {useSetColors} from "../composables/Color.composable";

const wrapper = ref(null);
defineExpose({wrapper});

const vuelize: any = inject('vuelize');

const vuelizeTheme = useVuelizeTheme()
const {mode, currentTheme} = storeToRefs(vuelizeTheme)

const props = defineProps({
  classes: {type: Array},
  rootTag: {type: String},
  ...defaultProps
})

const componentTag = computed(() => {
  return props.link ? 'router-link' : props.rootTag ?? 'div'
})

const globalClasses = computed(() => {
  console.log(props.glow)
  const glowActive = typeof props.glow === "object" && props.glow.active;
  const glowCentral = typeof props.glow === "object" && props.glow.central;
  return {
    disabled: props.disabled,
    [`rounded-${props.rounded}`]: props.rounded,
    outlined: checkPropTrue(props.outlined),
    glow: checkPropTrue(props.glow),
    glowActive: glowActive,
    glowCentral: glowCentral,
  }
})

function checkPropTrue(prop: unknown): boolean{
  return prop !== undefined && prop !== false
}

const elevationClass = computed(() => {
  let elevationObject: any = {}
  if (props.elevation === '') {
    elevationObject['elevation'] = true
  } else if (props.elevation) {
    elevationObject[`elevation-${props.elevation}`] = true
  }
  // TODO
  /*if (props.elevationDark === '') {
    elevationObject['elevation-dark'] = true
  } else if (props.elevationDark) {
    elevationObject[`elevation-dark-${props.elevationDark}`] = true
  }

  if (props.elevationLight === '') {
    elevationObject['elevation-light'] = true
  } else if (props.elevationLight) {
    elevationObject[`elevation-light-${props.elevationLight}`] = true
  }*/
  return elevationObject
})

const outline = computed(() => {
  if (typeof props.outlined !== "object") {
    return {}
  }
  return {
    outlineOffset: props.outlined.offset,
    outlineWidth: props.outlined.width,
    //outlineColor: vuelize.getColor(props.outlineColor)
  };
})

watch(() => props.color, () => {
  if (!wrapper.value || !props.color) {
    return;
  }
  useSetColors(wrapper.value, props.color)
});

onMounted(() => {
  if (!wrapper.value || !props.color) {
    return;
  }
  useSetColors(wrapper.value, props.color)
})
</script>

<style scoped lang="scss">

</style>
