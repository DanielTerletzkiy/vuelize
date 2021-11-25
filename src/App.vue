<template>
  <div id="app" :class="themeMode">
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

  data: ()=> ({
    themeMode: 'theme--light'
  }),

  watch: {
    '$store.state.theme.dark'(){
      this.themeMode = this.$store.state.theme.dark ? 'theme--dark' : 'theme--light'
    }
  },

  mounted() {
    this.themeMode = this.$store.state.theme.dark ? 'theme--dark' : 'theme--light'
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
