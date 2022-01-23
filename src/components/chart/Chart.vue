<template>
  <d-function-wrapper :classes="['d-chart']" v-bind="{...$props, ...$attrs}">
    <d-row>
      <d-column>
        <d-card-subtitle v-for="i in Array.from(Array(10).keys())" :key="i">
          {{ i }}
        </d-card-subtitle>
      </d-column>
      <d-divider block vertical/>
      <d-column>
        chart
        <d-spacer/>
        <d-divider block/>
        <d-row>
          <d-card-subtitle v-for="i in Array.from(Array(10).keys())" :key="i">
            {{ i }}
          </d-card-subtitle>
        </d-row>
      </d-column>
    </d-row>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-chart",

  props: {
    variant: String
  }
}
</script>

<style scoped>

</style>
