<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import DRoot from "./components/root/DRoot.vue";
import DToolbar from "./components/app/toolbar/DToolbar.vue";
import DCardSubtitle from "./components/card/text/DCardSubtitle.vue";
import DCardTitle from "./components/card/text/DCardTitle.vue";
import DImage from "./components/image/DImage.vue";
</script>

<template>
  <DRoot>
    <template v-slot:toolbar>
      <DToolbar show-hamburger>
        <d-card-title color="primary" class="font-size-medium">
          Vuelize
        </d-card-title>
      </DToolbar>
    </template>
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" color="#88c96b"/>
  </DRoot>
</template>

<style>
#app {

}
</style>
