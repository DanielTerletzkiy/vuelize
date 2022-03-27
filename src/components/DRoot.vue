<template>
  <div class="d-root" id="root" :class="theme">
    <header style="position: sticky; top: 0; width: 100%; max-height: 54px; z-index: 10;">
      <slot name="toolbar"></slot>
    </header>
    <div style="display: flex;">
      <aside>
        <slot name="navbar"></slot>
      </aside>
      <main style="flex: 1;" class="pa-3">
        <slot name="default"></slot>
      </main>
    </div>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {inject, onMounted, ref, watch} from "vue";

const vuelize: any = inject('vuelize');
const theme = ref('dark');

watch(() => vuelize.theme.dark, () => {
  setTheme();
})

onMounted(() => {
  setTheme()
})

function setTheme(dark: boolean = vuelize.theme.dark) {
  theme.value = dark ? 'dark' : 'light';
}

</script>

<style lang="scss">
@import "../styles/index";
</style>
