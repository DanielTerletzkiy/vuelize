<script setup lang="ts">
import DRoot from "./components/root/DRoot.vue";
import DToolbar from "./components/app/toolbar/DToolbar.vue";
import DCardTitle from "./components/card/text/DCardTitle.vue";
import DNotificationWrapper from "./components/notification/DNotificationWrapper.vue";
import DNavigationBar from "./components/app/navigation/DNavigationBar.vue";
import {ref} from "vue";
import DButton from "./components/button/DButton.vue";
import {ThemeColorProperty, ThemeSheetProperty} from "./types/Theme";
import DCard from "./components/card/DCard.vue";
import DColumn from "./components/flex/DColumn.vue";
import DRow from "./components/flex/DRow.vue";

const navOpen = ref(true);
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
      <d-button glow :color="ThemeColorProperty.success">
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
    <d-button :color="ThemeColorProperty.success" :outlined="{
      color: ThemeColorProperty.primary,
      offset: '-2px',
      width: '4px'
    }">
      this is a button
    </d-button>
    <d-card block>
      <d-column>
        <d-row gap>
          <d-button v-for="color in Object.values(ThemeColorProperty)" :color="color" filled>
            {{ color }}
          </d-button>
        </d-row>
      </d-column>
      <d-column>
        <d-row gap>
          <d-button v-for="color in Object.values(ThemeColorProperty)" :color="color">
            {{ color }}
          </d-button>
        </d-row>
      </d-column>
      <d-column>
        <d-row gap>
          <d-button v-for="color in Object.values(ThemeColorProperty)" :color="color" glow>
            {{ color }}
          </d-button>
        </d-row>
      </d-column>
    </d-card>
    <d-card :glow="{active: false, central: true}" width="200px" height="200px" :color="{
      map: [{
        color: '#f3f33f',
        property: ThemeSheetProperty.glow
      }]
    }">
      <d-card :glow="{
        active: true,
        central: true
      }" width="100px" height="100px" :color="{
      map: [{
        color: ThemeColorProperty.primary,
        property: ThemeSheetProperty.glow
      }]
    }">
        central
      </d-card>
      <d-card glow width="100px" height="100px" blur :color="{
        map: [
            {
              color: null,
              property: ThemeSheetProperty.card
            },
            {

             color: ThemeColorProperty.warning,
             property: ThemeSheetProperty.glow
            }
        ]
      }">
        return original
      </d-card>
    </d-card>
  </DRoot>
</template>

<style>
</style>
