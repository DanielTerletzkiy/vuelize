<script setup lang="ts">
import {author, repository, version} from "../../../package.json"
import {computed, onMounted, ref} from "vue";
import {useData, useRoute} from 'vitepress'
import {BlurAmount, ThemeColorProperty, ThemeSheetProperty} from "../../../src/types/Theme";
import {Rounded} from "../../../src/types/Vuelize";
import {
  DAccordion,
  DButton,
  DCard,
  DCardSubtitle,
  DCardTitle,
  DColumn,
  DDivider,
  DIcon,
  DImage,
  DList,
  DListItem,
  DNavigationBar,
  DRoot,
  DRow,
  DSpacer,
  DToolbar
} from "../../../src/ComponentImport";

// https://vitepress.dev/reference/runtime-api#usedata
const {site, page} = useData()
const {themeConfig} = site.value;
const {sidebar} = themeConfig;

const route = useRoute();

const repo = computed(() => repository)
const creator = computed(() => author)
const versionText = computed(() => version)

const accordionMap = ref<Map<string, boolean>>(new Map())

onMounted(() => {
  sidebar.forEach((group) => accordionMap.value.set(group.text, !group.collapsed))
})

</script>

<template>
  <ClientOnly>
    <d-root>
      <template v-slot:toolbar>
        <d-toolbar>
          <d-row height="50px" :wrap="false" link="/vuelize/" glow width="max-content" class="pl-2">
            <d-image class="logo" :src="themeConfig.logo.toString()" height="calc(100% - 10px)" rounded="none"/>
            <d-column height="50px" :wrap="false">
              <d-card-title class="font-size-medium pt-0">{{ site.title }}</d-card-title>
              <d-card-subtitle class="pb-0">{{ site.description }}</d-card-subtitle>
            </d-column>
          </d-row>
          <d-divider vertical block class="my-3 mx-2"/>
          <d-spacer/>
          <d-divider vertical block class="my-3 mx-2"/>
          <d-card-subtitle :blur="{amount:BlurAmount.strong}" glow>
            {{ versionText }}
          </d-card-subtitle>
          <d-button :link="repo.url" glow :color="ThemeColorProperty.warning" target="_blank">
            <template v-slot:prefix>
              <d-icon name="github"/>
            </template>
            Github
          </d-button>
        </d-toolbar>
      </template>
      <template v-slot:navbar>
        <d-navigation-bar permanent>
          <d-accordion v-for="group in sidebar" :model-value="accordionMap.get(group.text)"
                       @update:model-value="(value)=>accordionMap.set(group.text,value)" remove-padding>
            <template v-slot:header>
              <d-card-subtitle width="100%" style="user-select: none;">
                {{ group.text }}
                <d-divider block/>
              </d-card-subtitle>
            </template>
            <d-list v-model="route.path" mandatory :color="ThemeColorProperty.primary" class="pa-0">
              <d-list-item v-for="item in group.items" :link="`/vuelize${item.link}`" :key="`/vuelize${item.link}`">
                {{ item.text }}
              </d-list-item>
            </d-list>
          </d-accordion>
        </d-navigation-bar>
      </template>
      <d-column class="pa-8">
        <Content/>
      </d-column>
      <template v-slot:footer>
        <d-card :rounded="Rounded.none" block elevation="n15" height="400px">
          <d-row align="center" height="100%" justify="space-evenly">
            <d-column elevation="n2" gap height="320px" width="250px">
              <d-image :src="themeConfig.logo.toString()" class="logo" rounded="none" width="100%"/>
              <d-row justify="center">
                <d-column :wrap="false" height="50px">
                  <d-card-title class="font-size-large pt-0">{{ site.title }}</d-card-title>
                  <d-card-subtitle class="pb-0">{{ site.description }}</d-card-subtitle>
                </d-column>
              </d-row>
            </d-column>
            <d-row gap width="max-content">
              <d-column :rounded="Rounded.xl" elevation="n10" no-padding width="max-content">
                <d-card-title class="font-size-medium font-weight-bold" elevation="n2">
                  Author
                </d-card-title>
                <d-row class="pa-4" justify="start">
                  <d-divider :color="{
                map: [
                    {
                      color: ThemeColorProperty.accent,
                      property: ThemeSheetProperty.card
                    }
                ]
              }" block size="8px" vertical/>
                  <d-column :link="`mailto:${creator.email}?subject=${site.title} Feedback&body=Message`" no-padding>
                    <d-card-title class="font-size-medium">
                      {{ creator.name }}
                    </d-card-title>
                    <d-card-subtitle>
                      Name
                    </d-card-subtitle>
                    <d-card-title class="font-size-medium">
                      {{ creator.email }}
                    </d-card-title>
                    <d-card-subtitle>
                      E-Mail
                    </d-card-subtitle>
                  </d-column>
                </d-row>
              </d-column>
              <d-column :rounded="Rounded.xl" elevation="n10" no-padding width="max-content">
                <d-card-title class="font-size-medium font-weight-bold" elevation="n2">
                  Made with
                </d-card-title>
                <d-row class="pa-4" justify="starts">
                  <d-divider :color="{
                map: [
                    {
                      color: ThemeColorProperty.secondary,
                      property: ThemeSheetProperty.card
                    }
                ]
              }" block size="8px" vertical/>
                  <d-column no-padding>
                    <d-card-title class="font-size-medium">
                      VitePress
                    </d-card-title>
                    <d-card-subtitle>
                      Docs
                    </d-card-subtitle>
                    <d-card-title class="font-size-medium">
                      Vite
                    </d-card-title>
                    <d-card-subtitle>
                      Engine
                    </d-card-subtitle>
                  </d-column>
                </d-row>
              </d-column>
            </d-row>
          </d-row>
        </d-card>
      </template>
    </d-root>
  </ClientOnly>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
}
</style>
