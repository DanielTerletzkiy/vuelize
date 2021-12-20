<template>
  <d-row column>
    <d-column flex block>
      <d-code-snippet label="Rows with Columns" :code="example[0]">
        <d-row wrap>
          <d-column v-for="i in 20" :key="i">
            <d-card-title inlined depressed> {{ i }}</d-card-title>
          </d-column>
        </d-row>
      </d-code-snippet>
    </d-column>
  </d-row>
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
