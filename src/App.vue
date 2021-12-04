<template>
  <d-root>
    <title>{{$route.name}}</title>
    <d-toolbar show-hamburger @hamburgerClick="navDrawer = !navDrawer">
      <div>
        <d-card-title class="font-size-medium" color="primary">Vuelize</d-card-title>
      </div>
    </d-toolbar>

    <div style="display: flex">
      <d-navigation-bar :permanent="!this.$isMobile()" :temporary="this.$isMobile()" v-model="navDrawer">
        <div class="pt-2">
          <NavItem v-for="navItem in navItems" path="" :position="0" :key="navItem.category" :nav-item="navItem"
                   class="px-2"/>
        </div>
      </d-navigation-bar>

      <main class="pa-6" style="flex: 1">
        <router-view></router-view>
      </main>
    </div>

  </d-root>
</template>

<script>

import NavItem from "@/DOCS/components/NavItem";

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
    ]
  }),
}
</script>

<style>
</style>
