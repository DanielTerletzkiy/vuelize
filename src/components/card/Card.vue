<template>
  <d-function-wrapper :classes="['d-card', ...classesObject]" v-bind="{...$props, ...$attrs}" :style="stylesObject"
                      @click="$emit('click')">
    <slot></slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-card",
  props: {
    block: Boolean,
    minWidth: String,
    maxWidth: String,
  },

  computed: {
    classesObject() {
      return {'d-card--block': this.block}
    },
    stylesObject() {
      return {
        background: this.processColor(this.color, this.tint),
        minWidth: this.minWidth,
        maxWidth: this.maxWidth,
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-card {
  width: max-content;

  &.d-card--block {
    width: auto;
    flex: 1;
  }

  &.theme--dark {
    background: $dark_sheet;
    color: $dark_card_text;
  }

  &.theme--light {
    background: $light_sheet;
    color: $light_card_text;
  }
}

</style>
