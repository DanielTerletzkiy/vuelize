<template>
  <d-function-wrapper :classes="['d-card', ...classesObject]" v-bind="{...$props, ...$attrs}" :style="{background: this.processColor(this.color)}">
    <slot></slot>
  </d-function-wrapper>
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
@import "../../styles/variables";

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
    color: $dark_card_text;
  }
}

.theme--light {
  .d-card {
    background: $light_sheet;
    color: $light_card_text;
  }
}

</style>
