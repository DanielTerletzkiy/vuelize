<template>
  <d-root>
    <title>{{$route.name}}</title>
    <template v-slot:toolbar>
      <d-toolbar show-hamburger @hamburgerClick="()=>navDrawer = !navDrawer">
          <d-card-title class="font-size-medium" color="primary">Vuelize</d-card-title>
          <d-spacer/>
          <d-checkbox flex-direction="row-reverse" :size="24" on-icon="moonset" off-icon="sunset"
                      v-model="$vuelize.theme.dark">
            Dark mode
          </d-checkbox>
          <d-tooltip color="#fff" elevation-light>
            <d-card-subtitle elevation-dark="n1" outlined class="font-weight-bold">
              <d-icon color="primary" name="chart-growth"/>
              v{{ version }}
            </d-card-subtitle>
            <template slot="tooltip">
              <d-icon name="chart-growth"/>
              Current NPM Version
            </template>
          </d-tooltip>
      </d-toolbar>
    </template>

    <template v-slot:navbar>
      <d-navigation-bar :permanent="!$isMobile()" :temporary="$isMobile()" v-model="navDrawer">
        <d-column class="pt-2" :wrap="false" style="height: 100%">
          <d-column flex column block>
            <NavItem v-for="navItem in navItems" path="" :position="0" :key="navItem.category" :nav-item="navItem"
                     class="px-2"/>
          </d-column>
          <d-spacer :flex-grow="100"/>
          <d-row>
            <d-accordion v-model="notifications" header-color="primary" style="width: 100%" outlined depressed>
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
    </template>

    <template v-slot:main>
      <router-view/>
    </template>

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
