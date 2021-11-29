<template>
  <d-function-wrapper :classes="['d-spacer']" v-bind="{...$props, ...$attrs}"/>
</template>

<script>
export default {
  name: "d-spacer"
}
</script>

<style scoped lang="scss">
.d-spacer {
  flex: 1;
}
</style>
