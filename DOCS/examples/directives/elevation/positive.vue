<template>
  <d-row>
    <d-column v-for="e in 24" :key="e">
      <d-card style="width: 100px; height: 100px" :elevation="e">
        <d-card-subtitle class="font-weight-bold">{{ e }}</d-card-subtitle>
      </d-card>
    </d-column>
  </d-row>
</template>

<script>
export default {
  name: "Positive"
}
</script>

<style scoped>

</style>
