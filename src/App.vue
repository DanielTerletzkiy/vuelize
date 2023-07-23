<script setup lang="ts">
import DRoot from "./components/root/DRoot.vue";
import DToolbar from "./components/app/toolbar/DToolbar.vue";
import DCardTitle from "./components/card/text/DCardTitle.vue";
import DNotificationWrapper from "./components/notification/DNotificationWrapper.vue";
import DNavigationBar from "./components/app/navigation/DNavigationBar.vue";
import {ref} from "vue";
import DButton from "./components/button/DButton.vue";
import {ThemeColorProperty} from "./types/Theme";
import DCard from "./components/card/DCard.vue";

const navOpen = ref(false);
</script>

<template>
  <DRoot>
    <template v-slot:toolbar>
      <DToolbar show-hamburger @hamburgerClick="navOpen = !navOpen">
        <d-card-title class="font-size-medium">
          Vuelize
        </d-card-title>
      </DToolbar>
    </template>
    <template v-slot:navbar>
      <d-navigation-bar v-model="navOpen" permanent>
        test
      </d-navigation-bar>
    </template>
    <template v-slot:notifications>
      <DNotificationWrapper/>
    </template>
    <d-button :color="ThemeColorProperty.warning">
      this is a button
    </d-button>
    <d-card :color="{ color: 'orange',map: [
        {
          property: ThemeColorProperty.success,
          color: 'cyan'
        }
    ]}">
      TEST
      <d-button :color="ThemeColorProperty.success">
        success but cyan
      </d-button>
    </d-card>
    <d-card :color="{map: [
        {
          property: ThemeColorProperty.primary,
          color: 'red'
        }
    ]}">
      <d-button>
        this is a button
      </d-button>
    </d-card>
    <d-button :color="ThemeColorProperty.success" outlined>
      this is a button
    </d-button>
  </DRoot>
</template>

<style>
</style>
