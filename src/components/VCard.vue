<script setup lang="ts">
import {RoundedFactor, useRounded} from "../composables/rounded.ts";
import {CardElevation, ColorSurface, useCardElevation, useColorOpacity} from "../composables/color.ts";

interface Props {
  elevation: CardElevation,
  rounded: RoundedFactor,
}

const props = withDefaults(defineProps<Props>(), {
  elevation: CardElevation.DEFAULT,
  rounded: RoundedFactor.Medium,
})
</script>

<template>
  <div :class="[
    useCardElevation(props.elevation),
    useColorOpacity(8, ColorSurface.Background),
    useRounded(props.rounded)
]" class="overflow-hidden backdrop-blur-md">
    <div v-if="!!$slots.header" class="text-2xl p-2" :class="[
    useCardElevation(CardElevation.E900),
    useColorOpacity(4, ColorSurface.Background),
    ]">
      <slot name="header"/>
    </div>
    <div v-if="!!$slots.header && false" class="h-0.5" :class="[
          useCardElevation(CardElevation.E400),
          useColorOpacity(4, ColorSurface.Background),
      ]"/>
    <div class="p-2">
      <slot/>
    </div>
    <div v-if="!!$slots.actions" :class="[
    useCardElevation(CardElevation.E700),
    useColorOpacity(6, ColorSurface.Background),
    ]" class="h-12 flex gap-1 items-center p-1">
      <slot name="actions"/>
    </div>
  </div>
</template>

<style scoped>

</style>
