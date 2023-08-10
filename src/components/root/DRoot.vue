<template>
  <div ref="wrapper" class="d-root" id="root" :class="mode">
    <header class="header" :class="mode">
      <slot name="toolbar"></slot>
    </header>
    <div class="content" :class="mode">
      <aside class="navbar">
        <slot name="navbar"></slot>
      </aside>
      <main class="view" :class="mode">
        <slot name="default"></slot>
      </main>
    </div>
    <footer class="footer" :class="mode">
      <slot name="footer"></slot>
    </footer>
    <slot name="notifications"/>
  </div>
</template>

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

<style scoped lang="scss">
@import "../../styles/index";


.header {
  position: sticky;
  top: 0;
  width: 100%;
  max-height: $toolbarHeight;
  z-index: 10;
}

.content {
  position: relative;
  display: flex;

  .navbar {
    position: sticky;
    z-index: 9;
  }

  .view {
    flex: 1;
  }
}
</style>
