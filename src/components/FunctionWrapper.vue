<template>
  <component :is="root" :to="link" :disabled="disabled" :class="[...this.classes, themeClass, ...classAttributes]" :style="stylesObject" @click="()=>$emit('click')"
       @mouseenter="$emit('mouseenter')" @mouseleave="$emit('mouseleave')">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "d-function-wrapper",

  computed: {
    classAttributes() {
      return {
        [`rounded-${this.rounded}`]: this.rounded,
        [`elevation-${this.elevation}`]: this.elevation,
        elevation: this.elevation === '',
        outlined: this.outlined,
        inlined: this.inlined,
        depressed: this.depressed,
        disabled: this.disabled,
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
