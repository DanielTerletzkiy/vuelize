<template>
  <component :is="root" :to="link" :class="[...this.classes, themeClass, ...classAttributes]" :style="stylesObject" @click="()=>$emit('click')"
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
    depressed: Boolean,

    link: {type: String, default: null}
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
    root(){
      return this.link ? 'router-link' : this.rootDiv
    },
    themeClass() {
      return {'theme--dark': this.$vuelize.theme.dark, 'theme--light': !this.$vuelize.theme.dark}
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
