<template>
  <div class="d-card" :style="{background: this.processColor(this.color)}" :class="classesObject">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "d-card",
  props: {
    color: String,
    block: Boolean
  },

  computed: {
    classesObject() {
      return {'d-card--block': this.block}
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/colors";

.d-card {
  padding: 4px;
  width: max-content;

  &.d-card--block{
    width: auto;
  }
}

.theme--dark {
  .d-card {
    background: $dark_sheet;
    color: #bdbdbd;
  }
}

.theme--light {
  .d-card {
    background: $light_sheet;
    color: #46474a;
  }
}

</style>
