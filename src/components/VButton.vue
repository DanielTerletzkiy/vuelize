<script setup lang="ts">
import {ColorSurface, GeneralColor, useColorOpacity, useGeneralColor} from "../composables/color.ts";
import {RoundedFactor, useRounded} from "../composables/rounded.ts";

interface Props {
  color: GeneralColor,
  rounded: RoundedFactor,
}

const props = withDefaults(defineProps<Props>(), {
  color: GeneralColor.Primary,
  rounded: RoundedFactor.Medium
})
</script>

<template>
  <button
      class="px-4 text-xl font-bold uppercase backdrop-blur-md h-10"
      :class="[
      useGeneralColor(props.color, ColorSurface.Background),
      useGeneralColor(props.color, ColorSurface.Text),
      useColorOpacity(2, ColorSurface.Background),
      useRounded(props.rounded)
      ]">
    <slot/>
  </button>
</template>

<style scoped>

</style>
