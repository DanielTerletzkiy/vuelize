<template>
  <d-column gap>
    <d-column block>
      <d-code-snippet label="Rows with Columns" :code="example[0]"/>
    </d-column>
  </d-column>
</template>

<script>
export default {
  name: "Flex",

  data: () => ({
    example: [
      '<d-row>\n' +
      '  <d-column v-for="i in 20" :key="i">\n' +
      '    <d-card-title inlined depressed> {{i}} </d-card-title>\n' +
      '  </d-column>\n' +
      '</d-row>'
    ]
  }),
}
</script>

<style scoped>

</style>
