<script setup lang="ts">
import {ref} from "vue";
import {BlurAmount, ThemeColorProperty, ThemeSheetProperty, ThemeTextProperty} from "./types/Theme";
import {Position, Rounded} from "./types/Vuelize";
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
import {useVuelizeNotifications, useVuelizeTheme} from "./stores";
import {Opacity, Weight} from "./types";
import DTextfield from "./components/textfield/DTextfield.vue";
import DCheckbox from "./components/checkbox/DCheckbox.vue";
import DNotificationWrapper from "./components/notification/DNotificationWrapper.vue";
import DNavigationBar from "./components/app/navigation/DNavigationBar.vue";
import DToolbar from "./components/app/toolbar/DToolbar.vue";
import DDialog from "./components/dialog/DDialog.vue";
import DCardSubtitle from "./components/card/text/DCardSubtitle.vue";
import DRoot from "./components/root/DRoot.vue";
import DTypography from "./components/typography/DTypography.vue";
import DToggle from "./components/toggle/DToggle.vue";
import {storeToRefs} from "pinia";

const navOpen = ref(true);

const dialog = ref(false);

const notifications = useVuelizeNotifications()
const {notify} = notifications;

const vuelizeTheme = useVuelizeTheme()
const {mode} = storeToRefs(vuelizeTheme);

const items = ref(Array.from(Array(1000).keys()).map((value) => {
    return {
        value
    }
}))

const switchValue = ref(0);

const selected = ref(0);
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

    {{ switchValue }}
    <d-toggle
      v-model="switchValue"
      class="ma-24 mb-2"
      :size="45"
      :states="[{
        color: ThemeColorProperty.error,
        icon: 'times',
        value: false,
      },{
        color: ThemeColorProperty.secondary,
        icon: 'line-alt',
        value: null,
        hidden: false
      },{
        color: ThemeColorProperty.success,
        icon: 'check',
        value: true,
      }]"
    />
    <d-toggle
      v-model="switchValue"
      class="mx-24 mb-4"
      :size="45"
      colored-outline
    />
    <d-toggle
      v-model="switchValue"
      class="mx-24 mb-4"
      :size="45"
      colored-outline
      :states="[{
        color: ThemeColorProperty.secondary,
        icon: 'moon',
        tooltip: 'Dark',
        value: 'dark',
      },{
        color: ThemeColorProperty.info,
        icon: 'sun',
        tooltip: 'Light',
        value: 'light',
      },]"
      @toggle-value="(value)=>mode = value"
    />
    {{ mode }}
    <d-row>
      <d-column
        v-for="color in [ThemeColorProperty.primary, ThemeTextProperty.card]"
        :key="color"
        no-padding
      >
        <d-typography
          v-for="opacity in Object.values(Opacity).filter((v) => !isNaN(Number(v)))"
          :key="opacity"
          :outlined="{disabled: true}"
          :color="color"
          :opacity="opacity"
          :weight="Weight.w400"
        >
          this is a nice text in {{ opacity }}
        </d-typography>
      </d-column>
    </d-row>

    <d-textfield
      v-model="selected"
      filled
      :color="ThemeColorProperty.primary"
      solo
      placeholder="Test"
      select
      search
      :items="items"
    >
      <template #label="{item}">
        {{ item.value }}
      </template>
      <template #item="{item}">
        {{ item.value }}
      </template>
    </d-textfield>

    <d-textfield
      filled
      :color="ThemeColorProperty.primary"
      solo
      placeholder="Test"
    />
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
    <DRow :align="BlurAmount.low" />
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
      :loading="switchValue * 15"
      glow
      :color="ThemeColorProperty.warning"
      @click="dialog = true"
    >
      this is a button
    </d-button>
    <d-button
      loading
      filled
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
        :key="x"
      >
        <d-card
          width="100px"
          height="100px"
          :rounded="Rounded.none"
          :glow="{central: true}"
        >
          <d-card-subtitle>
            Default
          </d-card-subtitle>
        </d-card>
        <d-card
          v-for="e in 10"
          :key="e"
          :glow="{central: true}"
          :elevation="`${x}${e}`"
          width="100px"
          height="100px"
          :rounded="Rounded.none"
        >
          <d-card-subtitle :opacity="Opacity.low">
            {{ `${x}${e}` }}
          </d-card-subtitle>
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
      :color="ThemeSheetProperty.background"
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
    <d-checkbox
      v-model="navOpen"
      :color="ThemeColorProperty.primary"
      off-icon="times"
    >
      test
    </d-checkbox>
  </DRoot>
</template>

<style>
</style>
