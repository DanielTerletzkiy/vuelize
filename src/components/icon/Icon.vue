<template>
  <unicon class="d-icon unicon--large" :name="name" :width="size" :height="size" :icon-style="iconStyle" :fill="this.processColor(color || 'currentColor')"></unicon>
</template>

<script>
export default {
  name: "d-icon",

  props: {
    name: String,
    color: String,
    iconStyle: String,
    size: [String, Number],
  }
}
</script>

<style scoped lang="scss">
.unicon {
  display: flex;
}
</style>
