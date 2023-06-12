<script setup lang="ts">
import {ColorSurface, GeneralColor, useColorOpacity, useGeneralColor} from "./composables/color.ts";
import {RoundedFactor, useRounded} from "./composables/rounded.ts";
</script>

<template>
  <div>
    <a href="https://vitejs.dev"
       :class="[useGeneralColor(GeneralColor.Primary,ColorSurface.Text), useGeneralColor(GeneralColor.Warning,ColorSurface.Background), useRounded(RoundedFactor.XLarge)]"
       target="_blank">
      yooo
    </a>
    <a class="text-2xl"
       :class="[useGeneralColor(GeneralColor.Primary,ColorSurface.Background), useGeneralColor(GeneralColor.Primary,ColorSurface.Text), useRounded(RoundedFactor.XLarge), useColorOpacity(3,ColorSurface.Background)]"
       href="https://vuejs.org/" target="_blank">
      yoo
    </a>
  </div>
</template>

<style scoped>

</style>
