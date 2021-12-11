<template>
  <d-root>
    <title>{{$route.name}}</title>
    <d-toolbar show-hamburger @hamburgerClick="navDrawer = !navDrawer">
      <d-row>
        <d-card-title class="font-size-medium" color="primary">Vuelize</d-card-title>
        <d-spacer/>
        <d-card-subtitle elevation="n2" :inlined="!$vuelize.theme.dark" depressed class="my-0 mr-1 font-weight-thicc">
          <d-icon color="primary" name="chart-growth"/>
          v{{ version }}
        </d-card-subtitle>
      </d-row>
    </d-toolbar>

    <d-notification-wrapper/>

    <div style="display: flex">
      <d-navigation-bar :permanent="!this.$isMobile()" :temporary="this.$isMobile()" v-model="navDrawer">
        <d-row class="pt-2" column style="height: 100%">
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
        </d-row>
      </d-navigation-bar>

      <main class="pa-6" style="flex: 1">
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
        category: 'Components', icon: 'layers', items: [
          {
            category: 'Buttons', icon: 'power', items: [
              {category: 'Normal', icon: 'square-shape', items: []},
              {category: 'Icon', icon: 'icons', items: []}
            ]
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
