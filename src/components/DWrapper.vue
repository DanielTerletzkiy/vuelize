<template>
  <component ref="wrapper" class="vuelize" :is="componentTag" :href="link" :disabled="disabled"
             :class="[classes, mode, globalClasses, elevationClasses, glowClasses, blurClasses]"
             :style="{height, width, ...outline}"
             @mouseenter="$emit('mouseenter')" @mouseleave="$emit('mouseleave')">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import {useVuelizeTheme} from "../store/ThemeStore";
import {computed, inject, nextTick, onMounted, ref, watch} from "vue";
import defaultProps from "../mixins/DefaultProps";
import {storeToRefs} from "pinia";
import {useClearColors, useColor, useSetColors} from "../composables/Color.composable";
import {BlurAmount} from "../types/Theme";

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
  return props.link ? 'a' : props.rootTag ?? 'div'
})

const globalClasses = computed(() => {
  return {
    disabled: props.disabled,
    [`rounded-${props.rounded}`]: props.rounded,
    outlined: checkPropTrue(props.outlined),
  }
})

const glowClasses = computed(() => {
  const disabled = typeof props.glow === "object" && props.glow.disabled;
  if (disabled) {
    return {}
  }
  const glowActive = typeof props.glow === "object" && props.glow.active;
  const glowCentral = typeof props.glow === "object" && props.glow.central;
  return {
    glow: checkPropTrue(props.glow),
    glowActive: glowActive,
    glowCentral: glowCentral,
  }
})

const blurClasses = computed(() => {
  const disabled = typeof props.blur === "object" && props.blur.disabled;
  if (disabled) {
    return {}
  }
  const blurAmount = (typeof props.blur === "object" && props.blur.amount) || BlurAmount.medium;
  return {
    blur: checkPropTrue(props.blur),
    [`blur--${blurAmount}`]: blurAmount,
  }
})

function checkPropTrue(prop: unknown): boolean {
  return prop !== undefined && prop !== false
}

const elevationClasses = computed(() => {
  let elevationObject: any = {}
  if (props.elevation === '') {
    elevationObject['elevation'] = true
  } else if (props.elevation) {
    elevationObject[`elevation-${props.elevation}`] = true
  }
  return elevationObject
})

const outline = computed(() => {
  if (typeof props.outlined !== "object" || !wrapper.value) {
    return {}
  }

  if (props.outlined.disabled) {
    return {}
  }

  return {
    outlineOffset: props.outlined.offset,
    outlineWidth: props.outlined.width,
    outlineColor: props.outlined.color && useColor(wrapper.value, props.outlined.color)
  };
})

watch(() => props.color, () => {
  if (!wrapper.value) {
    return;
  }
  if (!props.color) {
    useClearColors(wrapper.value)
    return;
  }
  nextTick(() => {
    if (wrapper.value && props.color) {
      useSetColors(wrapper.value, props.color)
    }
  })
}, {deep: true});

onMounted(() => {
  if (!wrapper.value) {
    return;
  }
  nextTick(() => {
    if (!wrapper.value) {
      return;
    }
    if (props.color) {
      useSetColors(wrapper.value, props.color)
    }
  })
})

</script>

<style scoped lang="scss">

</style>
