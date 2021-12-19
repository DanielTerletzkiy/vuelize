<template>
  <d-row column>
    <d-column flex block>
      <d-card block>
        <d-card-title>
          Weight
        </d-card-title>
        <d-card-content>
          <d-code-snippet label="Example" :code="example[0]">
            <d-card-title class="font-weight-light">
              Light
            </d-card-title>
            <d-card-title class="font-weight-medium">
              Medium
            </d-card-title>
            <d-card-title class="font-weight-bold">
              Bold
            </d-card-title>
          </d-code-snippet>
        </d-card-content>
      </d-card>
    </d-column>
    <d-column flex block>
      <d-card block>
        <d-card-title>
          Size
        </d-card-title>
        <d-card-content>
          <d-code-snippet label="Example" :code="example[1]">
            <d-card-title class="font-size-small">
              Small
            </d-card-title>
            <d-card-title class="font-size-medium">
              Medium
            </d-card-title>
            <d-card-title class="font-size-large">
              Large
            </d-card-title>
          </d-code-snippet>
        </d-card-content>
      </d-card>
    </d-column>
  </d-row>
</template>

<script>
export default {
  name: "Font",

  data: () => ({
    example: [
      '<d-card-title class="font-weight-light">\n' +
      '  Light\n' +
      '</d-card-title>\n' +
      '<d-card-title class="font-weight-medium">\n' +
      '  Medium\n' +
      '</d-card-title>\n' +
      '<d-card-title class="font-weight-bold">\n' +
      '  Bold\n' +
      '</d-card-title>',

      '<d-card-title class="font-size-small">\n' +
      '  Small\n' +
      '</d-card-title>\n' +
      '<d-card-title class="font-size-medium">\n' +
      '  Medium\n' +
      '</d-card-title>\n' +
      '<d-card-title class="font-size-large">\n' +
      '  Large\n' +
      '</d-card-title>'
    ]
  }),
}
</script>

<style scoped>

</style>
