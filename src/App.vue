<template>
  <d-root>
    <d-toolbar show-hamburger elevation @hamburgerClick="navDrawer = !navDrawer">
      <div>
        <d-card-title class="font-size-medium pt-0" color="primary">Demo page</d-card-title>
        <d-card-subtitle class="pb-0 pl-2">Everything in this Lib
          <d-icon name="download-alt" color="primary" icon-style="monochrome"/>
        </d-card-subtitle>
      </div>
    </d-toolbar>

    <div style="display: flex">
      <d-navigation-bar permanent v-model="navDrawer">
        <d-list :value="currentNavigation" color="primary">
          <d-list-item :key="'/'" link="/">
            <d-icon name="estate"/>
            Home
          </d-list-item>
          <d-list-item :key="'/test'" link="test">
            <d-icon name="flask"/>
            Test
          </d-list-item>
        </d-list>
      </d-navigation-bar>

      <main class="pa-6" style="flex: 1">
        <router-view></router-view>
      </main>
    </div>

  </d-root>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    navDrawer: true,
  }),

  computed: {
    currentNavigation() {
      return this.$route.path;
    }
  },
}
</script>

<style>
</style>
