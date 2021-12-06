<template>
  <div>
    <d-card-title>
      Getting Started
    </d-card-title>
    <d-card-subtitle>
      Installation
    </d-card-subtitle>
    <d-card-content flex wrap column>
      <d-row>
        <d-column class="pl-0">
          <d-btn link="/" href="https://www.npmjs.com/package/vuelize" target="_blank" glow color="error">
            <d-icon name="java-script"/>
            NPM
          </d-btn>
        </d-column>
        <d-column>
          <d-btn link="/" href="https://github.com/DanielTerletzkiy/vue-materialize" target="_blank" glow color="grey">
            <d-icon name="github-alt"/>
            Github
          </d-btn>
        </d-column>
      </d-row>
      <d-code-line label="NPM" :code-array="['npm install vuelize', 'npm run serve']"/>
      <d-code-line label="main.js" :code-array="[`import Vuelize from 'vuelize'`, `Vue.use(Vuelize)`]"/>

      <d-code-snippet label="app.vue" :code="code">
        <d-toolbar show-hamburger style="width: 100%">
          <div>
            <d-card-title class="font-size-medium" color="primary">Vuelize</d-card-title>
          </div>
        </d-toolbar>
        <d-card-subtitle>main content ...</d-card-subtitle>
      </d-code-snippet>
    </d-card-content>
  </div>
</template>

<script>
export default {
  name: "GettingStarted",

  data: () => ({
    code: `
      <d-root>
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
  </d-root>`
  })
}
</script>

<style scoped>

</style>
