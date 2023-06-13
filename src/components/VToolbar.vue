<script setup lang="ts">
import VCard from "./VCard.vue";
import {CardElevation, ColorSurface, useCardElevation, useColorOpacity} from "../composables/color.ts";

interface Props {
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="sticky top-0 block h-14 z-10">
    <v-card class="h-full">

    </v-card>
    <div class="h-0.5" :class="[
          useCardElevation(CardElevation.E400),
          useColorOpacity(5, ColorSurface.Background),
      ]"/>
  </div>
</template>

<style scoped>

</style>
