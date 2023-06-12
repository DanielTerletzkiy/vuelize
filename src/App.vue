<script setup lang="ts">
import {colorSurface, useColor} from "./composables/color.ts";
import colors from "tailwindcss/colors";
</script>

<template>
  <div>
    <a :class="useColor({color: 'blue',tint: 200,prefix: colorSurface.Text})" href="https://vitejs.dev" target="_blank">
      yooo
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a class="text-2xl text-blue-400" href="https://vuejs.org/" target="_blank">
      yoo
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
</template>

<style scoped>

</style>
