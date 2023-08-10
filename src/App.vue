<script setup lang="ts">
import {ref} from "vue";
import {BlurAmount, ThemeColorProperty, ThemeSheetProperty} from "./types/Theme";
import {Position, Rounded} from "./types/Vuelize";
import {Size} from "./types/components/DButton";
import DCard from "./components/card/DCard.vue";
import DCardTitle from "./components/card/text/DCardTitle.vue";
import DButton from "./components/button/DButton.vue";
import DTooltip from "./components/tooltip/DTooltip.vue";
import DImage from "./components/image/DImage.vue";
import DImageDiffuse from "./components/image/DImageDiffuse.vue";
import DRow from "./components/flex/DRow.vue";

const navOpen = ref(true);

const dialog = ref(false);
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
    <d-row gap>
      <d-image :rounded="Rounded.none" height="200px" src="/logo.svg" width="200px"/>
      <d-image-diffuse :rounded="Rounded.xl" blur-amount="100px" elevation="n4" sharp-edge src="/logo.svg"
                       width="500px"/>
    </d-row>
    <d-dialog v-model="dialog">
      <d-card :blur="{amount:BlurAmount.strong}" width="600px" height="400px">
        <d-card-title>
          Hello there
        </d-card-title>
      </d-card>
    </d-dialog>
    <d-button @click="dialog = true" :color="ThemeColorProperty.warning">
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
    <d-card block elevation="n6">
      <d-column>
        <d-row gap>
          <d-button v-for="color in Object.values(ThemeColorProperty)" :color="color" filled :size="Size.small">
            {{ color }}
          </d-button>
        </d-row>
      </d-column>
      <d-column gap outlined>
        <d-row gap>
          <d-button v-for="color in Object.values(ThemeColorProperty)" :color="color">
            {{ color }}
          </d-button>
        </d-row>
        <d-row gap>
          <d-button v-for="color in Object.values(ThemeColorProperty)" :color="color" flat>
            {{ color }}
          </d-button>
        </d-row>
      </d-column>
      <d-column>
        <d-row gap>
          <d-button v-for="color in Object.values(ThemeColorProperty)" :color="color" glow :size="Size.large">
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
    <d-column gap block>
      <d-row gap v-for="x in ['','n']">
        <d-card v-for="e in 30" :glow="{central: true}" :elevation="`${x}${e}`" width="100px" height="50px"
                :outlined="{offset: '1px'}" :rounded="Rounded.pill">
          {{ e }}
        </d-card>
      </d-row>
    </d-column>
    <d-tooltip :color="ThemeColorProperty.primary" stay>
      <d-button :color="ThemeColorProperty.primary">
        testtesttesttesttesttesttesttest
      </d-button>
      <template v-slot:tooltip>
        test
      </template>
    </d-tooltip>
    <d-tooltip :color="ThemeColorProperty.primary" :position="Position.top" filled stay>
      <d-button :color="ThemeColorProperty.primary">
        testtesttesttesttesttesttesttest
      </d-button>
      <template v-slot:tooltip>
        test
      </template>
    </d-tooltip>
  </DRoot>
</template>

<style>
</style>
