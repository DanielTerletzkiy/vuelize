<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import DRoot from "./components/root/DRoot.vue";
import DToolbar from "./components/app/toolbar/DToolbar.vue";
import DCardSubtitle from "./components/card/text/DCardSubtitle.vue";
import DCardTitle from "./components/card/text/DCardTitle.vue";
import DImage from "./components/image/DImage.vue";
import DNotificationWrapper from "./components/notification/DNotificationWrapper.vue";
import DNavigationBar from "./components/app/navigation/DNavigationBar.vue";
import {ref} from "vue";

const navOpen = ref(false);
</script>

<template>
  <DRoot>
    <template v-slot:toolbar>
      <DToolbar show-hamburger @hamburgerClick="navOpen = !navOpen">
        <d-card-title color="primary" class="font-size-medium">
          Vuelize
        </d-card-title>
      </DToolbar>
    </template>
    <template v-slot:navbar>
      <d-navigation-bar v-model="navOpen" permanent>
        test
      </d-navigation-bar>
    </template>
    <DNotificationWrapper/>
    <HelloWorld/>
  </DRoot>
</template>

<style>
#app {

}
</style>
