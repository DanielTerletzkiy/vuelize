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
    <d-card class="ml-1 mt-1" block max-width="600px" outlined depressed>
      <d-row>
        <d-column>
          <d-card-subtitle style="font-family: monospace">
            npm i vuelize
          </d-card-subtitle>
        </d-column>
        <d-spacer></d-spacer>
        <d-divider vertical block size="1.4px" class="my-3"/>
        <d-column>
          <d-icon-button size="40" color="primary">
            <d-icon name="clipboard-alt"/>
          </d-icon-button>
        </d-column>
      </d-row>
    </d-card>
  </div>
</template>

<script>
export default {
  name: "GettingStarted"
}
</script>

<style scoped>

</style>
