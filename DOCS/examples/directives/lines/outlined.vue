<template>
  <d-row gap>
    <d-card>
      <d-card outlined width="450px">
        <d-card-title color="primary" class="font-weight-light">outlined</d-card-title>
        <d-card-subtitle>
          Outlined sets a 1.4px box-shadow outside of one component.
          Without depression declared, the current color given will be used
        </d-card-subtitle>
      </d-card>
    </d-card>
    <d-card>
      <d-card outlined depressed width="450px">
        <d-card-title color="primary" class="font-weight-light">outlined + depressed</d-card-title>
        <d-card-subtitle>
          Outlined sets a 1.4px box-shadow outside of one component.
          With depression declared, a declared css color will be applied to the box-shadow
        </d-card-subtitle>
      </d-card>
    </d-card>
  </d-row>
</template>

<script>
export default {
  name: "Outlined",
  weight: "2"
}
</script>

<style scoped>

</style>
