<script setup lang="ts">
import {repository} from "../../../package.json"
import {useData} from 'vitepress'
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
import {Size} from "../../../src/types/components/DButton";
import DList from "../../../src/components/list/DList.vue";
import DListItem from "../../../src/components/list/DListItem.vue";

// https://vitepress.dev/reference/runtime-api#usedata
const {site, frontmatter} = useData()

</script>

<template>
  <d-root>
    <template v-slot:toolbar>
      <d-toolbar>
        <d-column height="50px" :wrap="false" link="/" glow>
          <d-card-title class="font-size-medium pt-0">{{ site.title }}</d-card-title>
          <d-card-subtitle class="pb-0">{{ site.description }}</d-card-subtitle>
        </d-column>
        <d-spacer/>
        <d-button :link="repository.url" glow :color="ThemeColorProperty.warning">
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
