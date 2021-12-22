<template>
  <d-column column gap>
    <d-column block>
      <d-code-snippet label="Elevation" :code="example[0]"/>
    </d-column>
    <d-column block>
      <d-code-snippet label="Elevation with n prefix" :code="example[1]"/>
    </d-column>
  </d-column>
</template>

<script>
export default {
  name: "Elevation",

  data: () => ({
    example: [
      '<d-row>\n' +
      '  <d-column v-for="e in 24" :key="e">\n' +
      '    <d-card style="width: 100px; height: 100px" :elevation="e">\n' +
      '      <d-card-subtitle class="font-weight-bold">{{ e }}</d-card-subtitle>\n' +
      '    </d-card>\n' +
      '  </d-column>\n' +
      '</d-row>',
      '<d-row wrap>\n' +
      '  <d-column v-for="e in 24" :key="e">\n' +
      '    <d-card style="width: 100px; height: 100px" :elevation="\'n\'+e">\n' +
      '      <d-card-subtitle class="font-weight-bold">{{ e }}</d-card-subtitle>\n' +
      '    </d-card>\n' +
      '  </d-column>\n' +
      '</d-row>',
    ]
  }),
}
</script>

<style scoped>

</style>
