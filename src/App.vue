<template>
  <div id="app" :class="themeMode">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './DEMO/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
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
