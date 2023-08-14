<script setup lang="ts">
import {onMounted, ref} from "vue";
import {BlurAmount, ThemeColorProperty, ThemeSheetProperty} from "./types/Theme";
import {Position, PositionHorizontal, PositionVertical, Rounded, State} from "./types/Vuelize";
import {Size} from "./types/components/DButton";
import DCard from "./components/card/DCard.vue";
import DCardTitle from "./components/card/text/DCardTitle.vue";
import DButton from "./components/button/DButton.vue";
import DTooltip from "./components/tooltip/DTooltip.vue";
import DImage from "./components/image/DImage.vue";
import DImageDiffuse from "./components/image/DImageDiffuse.vue";
import DRow from "./components/flex/DRow.vue";
import DCardContent from "./components/card/content/DCardContent.vue";
import DColumn from "./components/flex/DColumn.vue";
import {useVuelizeNotifications} from "./stores";
import DTextfield from "@/components/textfield/DTextfield.vue";
import DCheckbox from "@/components/checkbox/DCheckbox.vue";

const navOpen = ref(true);

const dialog = ref(false);

const notifications = useVuelizeNotifications()
const {notify} = notifications;

onMounted(() => {
    notify('Test', 'test', State.success)
    setTimeout(() => {

        notify('Test2', 'test2', State.success, {
            horizontal: PositionHorizontal.center,
            vertical: PositionVertical.bottom
        })
        setTimeout(() => {

            notify('Test3', 'test3', State.info, {
                horizontal: PositionHorizontal.center,
                vertical: PositionVertical.bottom
            })
            setTimeout(() => {

                notify('Test4', 'test4', State.warning, {
                    horizontal: PositionHorizontal.left,
                    vertical: PositionVertical.bottom
                })
                setTimeout(() => {

                    notify('Test5', 'test5', State.info, {
                        horizontal: PositionHorizontal.center,
                        vertical: PositionVertical.top
                    }, true)
                    setTimeout(() => {

                        notify('Test6', 'test6', State.error, {
                            horizontal: PositionHorizontal.center,
                            vertical: PositionVertical.bottom
                        })
                        setTimeout(() => {

                            notify('Test7', 'test7', State.error, {
                                horizontal: PositionHorizontal.right,
                                vertical: PositionVertical.top
                            })
                        }, 1000)
                    }, 1000)
                }, 1000)
            }, 1000)
        }, 1000)
    }, 1000)
})
</script>

<template>
  <DRoot>
    <template #toolbar>
      <DToolbar
        show-hamburger
        @hamburgerClick="navOpen = !navOpen"
      >
        <d-card-title class="font-size-medium">
          Vuelize
        </d-card-title>
      </DToolbar>
    </template>
    <template #navbar>
      <d-navigation-bar
        v-model="navOpen"
        permanent
      >
        test
      </d-navigation-bar>
    </template>
    <template #notifications>
      <DNotificationWrapper />
    </template>
    <d-row gap>
      <d-image
        :rounded="Rounded.none"
        height="200px"
        src="/logo.svg"
        width="200px"
        alt="logo"
      />
      <d-image-diffuse
        :rounded="Rounded.xl"
        blur-amount="100px"
        elevation="n4"
        sharp-edge
        src="/logo.svg"
        width="500px"
      />
    </d-row>
    <d-dialog v-model="dialog">
      <d-card
        :blur="{amount:BlurAmount.strong}"
        width="600px"
        height="400px"
      >
        <d-card-title>
          Hello there
        </d-card-title>
      </d-card>
    </d-dialog>
    <d-button
      :color="ThemeColorProperty.warning"
      @click="dialog = true"
    >
      this is a button
    </d-button>
    <d-card
      :color="{ color: 'orange',map: [
        {
          property: ThemeColorProperty.success,
          color: 'cyan'
        }
      ]}"
    >
      TEST
      <d-button
        glow
        :color="ThemeColorProperty.success"
      >
        success but cyan
      </d-button>
    </d-card>
    <d-card
      :color="{map: [
        {
          property: ThemeColorProperty.primary,
          color: 'red'
        }
      ]}"
    >
      <d-button>
        this is a button
      </d-button>
    </d-card>
    <d-button
      :color="ThemeColorProperty.success"
      :outlined="{
        color: ThemeColorProperty.primary,
        offset: '-2px',
        width: '4px'
      }"
    >
      this is a button
    </d-button>
    <d-card
      block
      elevation="n6"
    >
      <d-column>
        <d-row gap>
          <d-button
            v-for="color in Object.values(ThemeColorProperty)"
            :color="color"
            filled
            :size="Size.small"
          >
            {{ color }}
          </d-button>
        </d-row>
      </d-column>
      <d-column
        gap
        outlined
      >
        <d-row gap>
          <d-button
            v-for="color in Object.values(ThemeColorProperty)"
            :color="color"
          >
            {{ color }}
          </d-button>
        </d-row>
        <d-row gap>
          <d-button
            v-for="color in Object.values(ThemeColorProperty)"
            :color="color"
            flat
          >
            {{ color }}
          </d-button>
        </d-row>
      </d-column>
      <d-column>
        <d-row gap>
          <d-button
            v-for="color in Object.values(ThemeColorProperty)"
            :color="color"
            glow
            :size="Size.large"
          >
            {{ color }}
          </d-button>
        </d-row>
      </d-column>
    </d-card>
    <d-card
      :glow="{active: false, central: true}"
      width="200px"
      height="200px"
      :color="{
        map: [{
          color: '#f3f33f',
          property: ThemeSheetProperty.glow
        }]
      }"
    >
      <d-card
        :glow="{
          active: true,
          central: true
        }"
        width="100px"
        height="100px"
        :color="{
          map: [{
            color: ThemeColorProperty.primary,
            property: ThemeSheetProperty.glow
          }]
        }"
      >
        central
      </d-card>
      <d-card
        glow
        width="100px"
        height="100px"
        blur
        :color="{
          map: [
            {
              color: '',
              property: ThemeSheetProperty.card
            },
            {
              color: ThemeColorProperty.warning,
              property: ThemeSheetProperty.glow
            }
          ]
        }"
      >
        return original
      </d-card>
    </d-card>
    <d-column
      :outlined="{offset: '1px'}"
      no-padding
      width="max-content"
      class="ma-4"
    >
      <d-row
        v-for="x in ['','n']"
      >
        <d-card
          width="100px"
          height="100px"
          :rounded="Rounded.none"
          :glow="{central: true}"
        >
          Default
        </d-card>
        <d-card
          v-for="e in 10"
          :glow="{central: true}"
          :elevation="`${x}${e}`"
          width="100px"
          height="100px"
          :rounded="Rounded.none"
        >
          {{ `${x}${e}` }}
        </d-card>
      </d-row>
    </d-column>
    <d-card
      :elevation="4"
      class="ma-6"
    >
      <d-card-title>
        Test card
      </d-card-title>
      <d-card-title>
        Testing
      </d-card-title>
      <d-column>
        <d-card-content :elevation="1">
          stuff
        </d-card-content>
      </d-column>
    </d-card>
    <d-tooltip
      :color="ThemeColorProperty.primary"
      stay
    >
      <d-button :color="ThemeColorProperty.primary">
        testtesttesttesttesttesttesttest
      </d-button>
      <template #tooltip>
        test
      </template>
    </d-tooltip>
    <d-tooltip
      :color="ThemeColorProperty.primary"
      :position="Position.top"
      filled
      stay
    >
      <d-button :color="ThemeColorProperty.primary">
        testtesttesttesttesttesttesttest
      </d-button>
      <template #tooltip>
        test
      </template>
    </d-tooltip>
    <d-textfield class="ma-8" filled :color="ThemeColorProperty.primary" solo placeholder="Test">

    </d-textfield>
    <d-checkbox v-model="navOpen" :color="ThemeColorProperty.primary" off-icon="times">
      test
    </d-checkbox>
  </DRoot>
</template>

<style>
</style>
