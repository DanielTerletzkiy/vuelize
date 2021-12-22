<template>
  <component :is="root" :to="link" :disabled="disabled" :class="[...this.classes, themeClass, ...classAttributes]" :style="stylesObject" @click="()=>$emit('click')"
       @mouseenter="$emit('mouseenter')" @mouseleave="$emit('mouseleave')">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "d-function-wrapper",

  props: {
    classes: Array,
  },

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
      return this.link ? 'router-link' : this.rootTag
    },
    themeClass() {
      let theme;
      if((this.$vuelize.theme.dark || this.dark) && !this.light){
        theme = 'theme--dark'
      }
      if((!this.$vuelize.theme.dark || this.light) && !this.dark){
        theme = 'theme--light'
      }
      return theme;
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
