<template>
  <d-column gap>
    <d-column block>
      <d-code-snippet label="Weight" :code="example[0]"/>
    </d-column>
    <d-column block>
      <d-code-snippet label="Size" :code="example[1]"/>
    </d-column>
  </d-column>
</template>

<script>
export default {
  name: "Font",

  data: () => ({
    example: [
      '<div>\n' +
      '  <d-card-title class="font-weight-light">\n' +
      '    Light\n' +
      '  </d-card-title>\n' +
      '  <d-card-title class="font-weight-medium">\n' +
      '    Medium\n' +
      '  </d-card-title>\n' +
      '  <d-card-title class="font-weight-bold">\n' +
      '    Bold\n' +
      '  </d-card-title>\n' +
      '</div>',

      '<div>\n' +
      '  <d-card-title class="font-size-small">\n' +
      '    Small\n' +
      '  </d-card-title>\n' +
      '  <d-card-title class="font-size-medium">\n' +
      '    Medium\n' +
      '  </d-card-title>\n' +
      '  <d-card-title class="font-size-large">\n' +
      '    Large\n' +
      '  </d-card-title>',
      '</div>',
    ]
  }),
}
</script>

<style scoped>

</style>
