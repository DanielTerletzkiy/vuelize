<template>
  <d-function-wrapper :classes="['d-divider', ...classesObject]" v-bind="{...$props, ...$attrs}" :style="stylesObject"/>
</template>

<script>
export default {
  name: "d-divider",

  props: {
    block: Boolean,
    vertical: Boolean,
    size: {type: String, default: '1px'},
  },

  computed: {
    classesObject() {
      return {
        'd-divider--block': this.block,
        'd-divider--vertical': this.vertical,
        'd-divider--horizontal': !this.vertical,
      }
    },
    stylesObject(){
      return {
        height: this.vertical === false ? this.size : this.$attrs.height,
        width: this.vertical === true ? this.size : this.$attrs.width,
      }
    }
  },
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-divider {
  background: currentColor;
  border-radius: 9999px !important;

  &--horizontal {
    min-width: min-content;
  }

  &--vertical {
    //min-height: min-content;
  }

  &.d-divider--block {
    &.d-divider--horizontal {
      width: auto;
      flex: 1;
    }
    &.d-divider--vertical {
      height: inherit;
      display: flex;
      align-self: stretch;
    }
  }

  &.theme--dark {
    color: darken($dark_card_text, 55);
  }
  &.theme--light {
    color: lighten($light_card_text, 60);
  }
}


</style>
