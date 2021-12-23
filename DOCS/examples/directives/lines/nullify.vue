<template>
  <d-row gap light width="max-content" root-tag="d-card" class="pa-4">
    <d-card light elevation="8" inlined depressed>
      <d-card-title light>
        Elevation is nullified
      </d-card-title>
      <d-card-subtitle>
        (Inlined) Wow no shadow event with elevation applied
      </d-card-subtitle>
    </d-card>
    <d-card light elevation="8" outlined depressed>
      <d-card-title light>
        Elevation is nullified
      </d-card-title>
      <d-card-subtitle>
        (Outlined) Wow no shadow event with elevation applied
      </d-card-subtitle>
    </d-card>
  </d-row>
</template>

<script>
export default {
  name: "Nullify"
}
</script>

<style scoped>

</style>
