<template>
  <div>
    <d-card-title>
      Getting Started
    </d-card-title>
    <d-card-subtitle>
      Installation
    </d-card-subtitle>
      <d-row>
        <d-column>
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
    <d-column gap>
      <d-column>
        <d-code-line label="NPM" :code-array="['npm install vuelize', 'npm run serve']"/>
      </d-column>
      <d-column>
        <d-code-line language="JavaScript" label="main.js"
                     :code-array="[`import Vuelize from 'vuelize'`, `Vue.use(Vuelize)`]"/>
      </d-column>
      <d-column>
        <d-code-snippet label="app.vue" :code="code[0]" hide-preview/>
      </d-column>
    </d-column>
  </div>
</template>

<script>
import app from '!raw-loader!../App.vue'

export default {
  name: "GettingStarted",

  data: () => ({
    code: [
      app
    ]
  })
}
</script>

<style scoped>

</style>
