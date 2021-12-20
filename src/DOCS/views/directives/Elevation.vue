<template>
  <d-row column>
    <d-column>
      <d-code-snippet label="Elevation" :code="example[0]">
        <d-row wrap>
          <d-column v-for="e in 24" :key="e">
            <d-card style="width: 100px; height: 100px" :elevation="e">
              <d-card-subtitle class="font-weight-bold">{{ e }}</d-card-subtitle>
            </d-card>
          </d-column>
        </d-row>
      </d-code-snippet>
    </d-column>
    <d-column>
      <d-code-snippet label="Elevation with n prefix" :code="example[1]">
        <d-row wrap>
          <d-column v-for="e in 24" :key="e">
            <d-card style="width: 100px; height: 100px" :elevation="'n'+e">
              <d-card-subtitle class="font-weight-bold">{{ e }}</d-card-subtitle>
            </d-card>
          </d-column>
        </d-row>
      </d-code-snippet>
    </d-column>
  </d-row>
</template>

<script>
export default {
  name: "Elevation",

  data: () => ({
    example: [
      '<d-card elevation="5">\n</d-card>',
      '<d-card elevation="n5">\n</d-card>',
    ]
  }),
}
</script>

<style scoped>

</style>
