<template>
  <d-row column>
    <d-column flex block>
      <d-code-snippet label="Weight" :code="example[0]">
        <div>
          <d-card-title class="font-weight-light">
            Light
          </d-card-title>
          <d-card-title class="font-weight-medium">
            Medium
          </d-card-title>
          <d-card-title class="font-weight-bold">
            Bold
          </d-card-title>
        </div>
      </d-code-snippet>
    </d-column>
    <d-column flex block>
      <d-code-snippet label="Size" :code="example[1]"/>
    </d-column>
  </d-row>
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
