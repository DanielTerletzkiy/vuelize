<template>
  <d-row gap>
    <d-card height="50px" class="glow glow--active">
      I am active!
    </d-card>
    <d-divider vertical block/>
    <d-card-subtitle height="50px" class="glow glow--active"
                     v-for="color in Object.keys(this.$vuelize.theme.themes[this.$vuelize.theme.dark ? 'dark' : 'light'])"
                     :key="color" :color="color">
      I am active! ({{ color }})
    </d-card-subtitle>
  </d-row>
</template>

<script>
export default {
  name: "Active",
}
</script>

<style scoped>

</style>
