<script setup lang="ts">
import {repository} from "../../../package.json"
import {useData, useRoute} from 'vitepress'
import DRoot from "../../../src/components/root/DRoot.vue";
import DToolbar from "../../../src/components/app/toolbar/DToolbar.vue";
import DCardTitle from "../../../src/components/card/text/DCardTitle.vue";
import DCardSubtitle from "../../../src/components/card/text/DCardSubtitle.vue";
import DColumn from "../../../src/components/flex/DColumn.vue";
import DNavigationBar from "../../../src/components/app/navigation/DNavigationBar.vue";
import {ThemeColorProperty} from "../../../src/types/Theme";
import DSpacer from "../../../src/components/flex/DSpacer.vue";
import DButton from "../../../src/components/button/DButton.vue";
import DIcon from "../../../src/components/icon/DIcon.vue";
import DList from "../../../src/components/list/DList.vue";
import DListItem from "../../../src/components/list/DListItem.vue";
import DRow from "../../../src/components/flex/DRow.vue";

import DImage from "../../../src/components/image/DImage.vue";
import {computed} from "vue";
import DDivider from "../../../src/components/divider/DDivider.vue";

// https://vitepress.dev/reference/runtime-api#usedata
const {site,page} = useData()
const {themeConfig} = site.value;

const route = useRoute();

const repo = computed(() => repository)

</script>

<template>
  <d-root>
    <template v-slot:toolbar>
      <d-toolbar>
        <d-row height="50px" :wrap="false" link="/" glow width="max-content" class="pl-2">
          <d-image class="logo" :src="themeConfig.logo" height="calc(100% - 10px)" rounded="none"/>
          <d-column height="50px" :wrap="false">
            <d-card-title class="font-size-medium pt-0">{{ site.title }}</d-card-title>
            <d-card-subtitle class="pb-0">{{ site.description }}</d-card-subtitle>
          </d-column>
        </d-row>
        <d-divider vertical block class="my-3 mx-2"/>
        <d-spacer/>
        <d-divider vertical block class="my-3 mx-2"/>
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
        <d-list>
          <d-list-item link="/markdown-examples.html">
            Markdown Examples
          </d-list-item>
          <d-list-item link="/api-examples.html">
            API Examples
          </d-list-item>
        </d-list>
      </d-navigation-bar>
    </template>
    <Content/>
  </d-root>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
}
</style>
