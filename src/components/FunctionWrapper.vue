<template>
  <component :is="rootDiv" :class="[...this.classes, themeClass, ...classAttributes]" :style="stylesObject" @click="()=>$emit('click')"
       @mouseenter="$emit('mouseenter')" @mouseleave="$emit('mouseleave')">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "d-function-wrapper",

  props: {
    rootDiv: {type: String, default: 'div'},
    classes: Array,
    color: String,

    rounded: {type: String, default: 'lg'},
    elevation: String,
    outlined: Boolean,
    depressed: Boolean
  },

  computed: {
    classAttributes() {
      return {
        [`rounded-${this.rounded}`]: this.rounded,
        [`elevation-${this.elevation}`]: this.elevation,
        elevation: this.elevation === '',
        outlined: this.outlined,
        depressed: this.depressed,
      }
    },
    themeClass() {
      return {'theme--dark': this.$store.state.theme.dark, 'theme--light': !this.$store.state.theme.dark}
    },
    stylesObject() {
      //console.log(this.color)
      return {color: this.processColor(this.color)}
    }
  },
}
</script>

<style scoped>

</style>
