<template>
  <div>
    <DemoView/>
  </div>
</template>

<script>
import DemoView from './DEMO/DemoView.vue'

export default {
  name: 'App',
  components: {
    DemoView
  },
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
