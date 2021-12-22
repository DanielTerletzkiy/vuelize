<template>
  <div>
    <d-card-title>
      {{ title }}
    </d-card-title>
    <d-card-subtitle>
      {{ subtitle }}
    </d-card-subtitle>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Wrapper",

  computed: {
    title() {
      return this.$route.matched.length > 1 ? this.$route.matched[this.$route.matched.length - 2].name : this.$route.name
    },
    subtitle() {
      return this.$route.matched.length > 1 ? this.$route.matched[this.$route.matched.length - 1].name : ''
    }
  },

  mounted() {
    console.log(this.$route)
  }
}
</script>

<style scoped lang="scss">

</style>
