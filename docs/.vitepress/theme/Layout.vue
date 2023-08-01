<script setup lang="ts">
import {author, repository, version} from "../../../package.json"
import {useData, useRoute} from 'vitepress'
import {BlurAmount, ThemeColorProperty, ThemeSheetProperty} from "../../../src/types/Theme";
import DRoot from "../../../src/components/root/DRoot.vue";
import DToolbar from "../../../src/components/app/toolbar/DToolbar.vue";
import DCardTitle from "../../../src/components/card/text/DCardTitle.vue";
import DCardSubtitle from "../../../src/components/card/text/DCardSubtitle.vue";
import DColumn from "../../../src/components/flex/DColumn.vue";
import DNavigationBar from "../../../src/components/app/navigation/DNavigationBar.vue";
import DSpacer from "../../../src/components/flex/DSpacer.vue";
import DButton from "../../../src/components/button/DButton.vue";
import DIcon from "../../../src/components/icon/DIcon.vue";
import DList from "../../../src/components/list/DList.vue";
import DListItem from "../../../src/components/list/DListItem.vue";
import DRow from "../../../src/components/flex/DRow.vue";

import DImage from "../../../src/components/image/DImage.vue";
import {computed, onMounted, ref} from "vue";
import DDivider from "../../../src/components/divider/DDivider.vue";
import DAccordion from "../../../src/components/accordion/DAccordion.vue";

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
        <d-divider/>
        <d-row justify="center">
          <d-column>
            <d-card-title class="font-size-medium font-weight-bold">
              Author
            </d-card-title>
            <d-row>
              <d-divider vertical block :color="{
                map: [
                    {
                      color: ThemeColorProperty.primary,
                      property: ThemeSheetProperty.card
                    }
                ]
              }"/>
              <d-column no-padding :link="`mailto:${creator.email}?subject=${site.title} Feedback&body=Message`">
                <d-card-title class="font-size-medium">
                  {{ creator.name }}
                </d-card-title>
                <d-card-subtitle>
                  Name
                </d-card-subtitle>
                <d-card-title class="font-size-small">
                  {{ creator.email }}
                </d-card-title>
                <d-card-subtitle>
                  E-Mail
                </d-card-subtitle>
              </d-column>
            </d-row>
          </d-column>
        </d-row>
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
