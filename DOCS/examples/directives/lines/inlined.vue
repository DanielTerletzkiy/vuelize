<template>
  <d-row gap>
    <d-card>
      <d-card inlined width="450px">
        <d-card-title color="primary" class="font-weight-light">inlined</d-card-title>
        <d-card-subtitle>
          Inlined sets a 1.4px box-shadow inside of one component.
          Without depression declared, the current color given will be used
        </d-card-subtitle>
      </d-card>
    </d-card>
    <d-card>
      <d-card inlined depressed width="450px">
        <d-card-title color="primary" class="font-weight-light">inlined + depressed</d-card-title>
        <d-card-subtitle>
          Inlined sets a 1.4px box-shadow inside of one component.
          With depression declared, a declared css color will be applied to the box-shadow
        </d-card-subtitle>
      </d-card>
    </d-card>
  </d-row>
</template>

<script>
export default {
  name: "Inlined"
}
</script>

<style scoped>

</style>
