<template>
  <d-root>
    <title>{{$route.name}}</title>
    <d-toolbar show-hamburger @hamburgerClick="()=>navDrawer = !navDrawer">
      <d-row gap>
        <d-card-title class="font-size-medium" color="primary">Vuelize</d-card-title>
        <d-spacer/>
        <d-checkbox flex-direction="row-reverse" :size="24" on-icon="moonset" off-icon="sunset"
                    v-model="$vuelize.theme.dark">
          Dark mode
        </d-checkbox>
        <d-card-subtitle elevation-dark="2" :inlined="!$vuelize.theme.dark" depressed class="my-0 mr-1 font-weight-bold">
          <d-icon color="primary" name="chart-growth"/>
          v{{ version }}
        </d-card-subtitle>
      </d-row>
    </d-toolbar>

    <d-notification-wrapper/>

    <div style="display: flex">
      <d-navigation-bar :permanent="!this.$isMobile()" :temporary="this.$isMobile()" v-model="navDrawer">
        <d-column class="pt-2" :wrap="false" style="height: 100%">
          <d-column flex column block>
            <NavItem v-for="navItem in navItems" path="" :position="0" :key="navItem.category" :nav-item="navItem"
                     class="px-2"/>
          </d-column>
          <d-spacer :flex-grow="100"/>
          <d-row>
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
          </d-row>
        </d-column>
      </d-navigation-bar>

      <main :class="this.$isMobile() ? 'pa-3' : 'pa-6'" style="flex: 1">
        <router-view></router-view>
      </main>
    </div>

  </d-root>
</template>

<script>

import NavItem from "./components/NavItem";
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
            category: 'Elevation', icon: 'angle-right', items: []
          },
          {
            category: 'Flex', icon: 'angle-right', items: []
          },
          {
            category: 'Font', icon: 'angle-right', items: []
          },
          {
            category: 'Glow', icon: 'angle-right', items: []
          },
          {
            category: 'Lines', icon: 'angle-right', items: []
          },
          {
            category: 'Rounded', icon: 'angle-right', items: []
          },
          {
            category: 'Size', icon: 'angle-right', items: []
          }
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
