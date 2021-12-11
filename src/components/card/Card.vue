<template>
  <d-function-wrapper :classes="['d-card', ...classesObject]" v-bind="{...$props, ...$attrs}" :style="stylesObject">
    <slot></slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-card",
  props: {
    color: String,
    block: Boolean,
    minWidth: String,
    maxWidth: String,
    width: String,
  },

  computed: {
    classesObject() {
      return {'d-card--block': this.block}
    },
    stylesObject(){
      return {
        background: this.processColor(this.color),
        minWidth: this.minWidth,
        maxWidth: this.maxWidth,
        width: this.width,
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-card {
  width: max-content;

  &.d-card--block{
    width: auto;
    flex: 1;
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
