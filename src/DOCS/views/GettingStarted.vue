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
      <d-code-line label="main.js" :code-array="[`import Vuelize from './vuelize'`, `Vue.use(Vuelize)`]"/>

      <d-code-snippet label="app.vue">
        <d-btn slot="default" color="primary" filled>{{ $route.path }}</d-btn>
      </d-code-snippet>
    </d-card-content>
  </div>
</template>

<script>
export default {
  name: "GettingStarted",
}
</script>

<style scoped>

</style>
