<template>
  <d-row>
    <d-column v-for="i in 20" :key="i">
      <d-card-title inlined depressed> {{ i }}</d-card-title>
    </d-column>
  </d-row>
</template>

<script>
export default {
  name: "Simple Row Column"
}
</script>

<style scoped>

</style>
