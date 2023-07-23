<template>
  <div ref="wrapper" class="d-root" id="root" :class="mode">
    <header style="position: sticky; top: 0; width: 100%; max-height: 54px; z-index: 10;" :class="mode">
      <slot name="toolbar"></slot>
    </header>
    <div style="position: relative;display: flex;" :class="mode">
      <aside style="position: sticky;">
        <slot name="navbar"></slot>
      </aside>
      <main style="flex: 1;" :class="mode">
        <slot name="default"></slot>
      </main>
    </div>
    <footer :class="mode">
      <slot name="footer"></slot>
    </footer>
    <slot name="notifications"/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DRoot',
}
</script>

<script setup lang="ts">
import {Theme, ThemeColorProperty, ThemeSheetProperty, ThemeTextProperty} from "../../types/Theme";

const wrapper = ref<HTMLElement | null>(null);
defineExpose({wrapper});
import {inject, onMounted, ref, watch} from "vue";
import {useSetColor} from "../../composables/Color.composable";
import {useVuelizeTheme} from "../../store/ThemeStore";
import {storeToRefs} from "pinia";

const vuelize: any = inject('vuelize');

const themeStore = useVuelizeTheme();
const {mode, themes, currentTheme} = storeToRefs(themeStore);

watch([mode, themes], () => {
  setTheme();
}, {
  deep: true
})

onMounted(() => {
  setTheme()
})

function setTheme() {
  if (!wrapper.value) {
    return;
  }
  console.log(currentTheme);

  for (const key of Object.keys(ThemeColorProperty)) {
    useSetColor(
        document.documentElement,
        currentTheme.value.colors[key as keyof Theme['colors']],
        ThemeColorProperty[key as keyof typeof ThemeColorProperty],
    )
  }

  for (const key of Object.keys(ThemeSheetProperty)) {
    useSetColor(
        document.documentElement,
        currentTheme.value.sheets[key as keyof Theme['sheets']],
        ThemeSheetProperty[key as keyof typeof ThemeSheetProperty],
    )
  }

  for (const key of Object.keys(ThemeTextProperty)) {
    useSetColor(
        document.documentElement,
        currentTheme.value.text[key as keyof Theme['text']],
        ThemeTextProperty[key as keyof typeof ThemeTextProperty],
    )
  }
}

</script>

<style lang="scss">
@import "../../styles/index";


</style>
