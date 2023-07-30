<script setup lang="ts">
import {name} from "../../package.json"
import {computed} from "vue";
import DRow from "../../src/components/flex/DRow.vue";
import DColumn from "../../src/components/flex/DColumn.vue";
import DImage from "../../src/components/image/DImage.vue";
import DCardTitle from "../../src/components/card/text/DCardTitle.vue";
import {useData} from "vitepress";

const {site} = useData()
const {themeConfig} = site.value;

const appName = computed(() => name);
</script>

<template>
  <d-column class="wrapper" gap>
    <d-card-title class="header-text">
      {{ appName }}
    </d-card-title>
    <d-row justify="center">
      <d-image :src="themeConfig.logo.toString()" width="30vw" height="100%" rounded="none"/>
    </d-row>
  </d-column>
</template>

<style scoped lang="scss">
.wrapper {
  align-items: center;
  padding: 20px !important;

  .header-text {
    font-size: 16vh;
    text-transform: uppercase;
    letter-spacing: 1.5rem;
    font-weight: bold;
    text-decoration: underline overline;
    text-decoration-color: var(--color-accent);
    text-underline-offset: 30px;

    background: linear-gradient(to right, var(--color-primary),var(--color-error),var(--color-warning),var(--color-info));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
