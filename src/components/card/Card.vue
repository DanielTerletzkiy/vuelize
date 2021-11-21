<template>
  <div class="d-card" :style="{background: this.processColor(this.color)}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "d-card",
  props: {
    color: String
  }
}
</script>

<style scoped lang="scss">

.d-card {
  padding: 4px;
}

.theme--dark {
  $dark_sheet: #242731;
  .d-card {
    background: $dark_sheet;
    color: #bdbdbd;
  }
}

.theme--light {
  $dark_sheet: #ffff;
  .d-card {
    background: $dark_sheet;
    color: #46474a;
  }
}

</style>
