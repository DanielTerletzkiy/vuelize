<template>
  <d-row gap>
    <d-card height="50px" class="glow">
      Hover me
    </d-card>
    <d-divider vertical block/>
    <d-card-subtitle height="50px" class="glow"
                     v-for="color in Object.keys(this.$vuelize.theme.themes[this.$vuelize.theme.dark ? 'dark' : 'light'])"
                     :key="color" :color="color">
      Hover me ({{ color }})
    </d-card-subtitle>
  </d-row>
</template>

<script>
export default {
  name: "Inactive",
}
</script>

<style scoped>

</style>
