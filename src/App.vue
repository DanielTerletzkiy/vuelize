<template>
  <d-root>
    <title>{{$route.name}}</title>
    <d-toolbar show-hamburger @hamburgerClick="navDrawer = !navDrawer">
      <d-row gap>
        <d-card-title class="font-size-medium" color="primary">Vuelize</d-card-title>
        <d-spacer/>
        <d-checkbox flex-direction="row-reverse" :size="24" on-icon="sunset" off-icon="moonset"
                    v-model="$vuelize.theme.dark">
          Dark mode
        </d-checkbox>
        <d-card-subtitle elevation="2" :inlined="!$vuelize.theme.dark" depressed class="my-0 mr-1 font-weight-bold">
          <d-icon color="primary" name="chart-growth"/>
          v{{ version }}
        </d-card-subtitle>
      </d-row>
    </d-toolbar>

    <d-notification-wrapper/>

    <div style="display: flex">
      <d-navigation-bar :permanent="!this.$isMobile()" :temporary="this.$isMobile()" v-model="navDrawer">
        <d-column class="pt-2" column style="height: 100%">
          <d-column flex column block>
            <NavItem v-for="navItem in navItems" path="" :position="0" :key="navItem.category" :nav-item="navItem"
                     class="px-2"/>
          </d-column>
          <d-spacer :flex-grow="100"/>
          <d-column flex column block>
            <d-accordion v-model="notifications" header-color="primary" style="width: 100%">
              <template slot="header">
                <d-badge color="primary" :value="$vuelize.notification.notifications.filter(e => e.active).length > 0">
                  <d-icon name="bell"/>
                  <template slot="content">
                    {{ $vuelize.notification.notifications.filter(e => e.active).length }}
                  </template>
                </d-badge>
                Notifications
              </template>
              <template slot="content">
                <d-notification-wrapper class="pa-0" permanent style="max-height: 474px; overflow: auto"/>
              </template>
            </d-accordion>
          </d-column>
        </d-column>
      </d-navigation-bar>

      <main :class="this.$isMobile() ? 'pa-3' : 'pa-6'" style="flex: 1">
        <router-view></router-view>
      </main>
    </div>

  </d-root>
</template>

<script>

import NavItem from "@/DOCS/components/NavItem";
import {version} from '../package.json';

export default {
  name: 'App',
  components: {NavItem},
  data: () => ({
    navDrawer: true,

    navItems: [
      {
        category: 'Getting Started', icon: 'estate', items: []
      },
      {
        category: 'Directives', icon: 'ruler', items: [
          {
            category: 'Elevation', icon: 'power', items: []
          },
          {
            category: 'Flex', icon: 'power', items: []
          },
          {
            category: 'Font', icon: 'power', items: []
          },
          {
            category: 'Glow', icon: 'power', items: []
          },
          {
            category: 'Lines', icon: 'power', items: []
          },
          {
            category: 'Rounded', icon: 'power', items: []
          },
          {
            category: 'Size', icon: 'power', items: []
          },
          {
            category: 'Transition', icon: 'power', items: []
          },
        ]
      },
      {
        category: 'Components', icon: 'layers', items: [
          {
            category: 'Buttons', icon: 'power', items: []
          }
        ]
      }
    ],

    notifications: false,
  }),

  computed: {
    version() {
      return version
    }
  }
}
</script>

<style>
</style>
