<template>
  <div class="d-root" id="root" :class="theme">
    <header style="position: sticky; top: 0; width: 100%; max-height: 54px; z-index: 10;" :class="theme">
      <slot name="toolbar"></slot>
    </header>
    <div style="position: relative;display: flex;" :class="theme">
      <aside style="position: sticky;">
        <slot name="navbar"></slot>
      </aside>
      <main style="flex: 1;" :class="theme">
        <slot name="default"></slot>
      </main>
    </div>
    <footer :class="theme">
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
const wrapper = ref(null);
defineExpose({wrapper});
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
@import "../../styles/index";
</style>
