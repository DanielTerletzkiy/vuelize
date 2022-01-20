<template>
  <component :is="root" :to="link" :disabled="disabled"
             :class="[...this.classes, themeClass, ...elevationClass, ...classAttributes]"
             :style="stylesObject" v-on="$listeners"
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
        outlined: this.outlined,
        inlined: this.inlined,
        depressed: this.depressed,
        disabled: this.disabled,
      }
    },
    elevationClass() {
      let elevationObject = {}
      if (this.elevation === '') {
        elevationObject['elevation'] = true
      } else if (this.elevation) {
        elevationObject[`elevation-${this.elevation}`] = true
      }

      if (this.elevationDark === '') {
        elevationObject['elevation-dark'] = true
      } else if (this.elevationDark) {
        elevationObject[`elevation-dark-${this.elevationDark}`] = true
      }

      if (this.elevationLight === '') {
        elevationObject['elevation-light'] = true
      } else if (this.elevationLight) {
        elevationObject[`elevation-light-${this.elevationLight}`] = true
      }
      return elevationObject
    },
    root() {
      return this.link ? 'router-link' : this.rootTag
    },
    themeClass() {
      let theme;
      if ((this.$vuelize.theme.dark || this.dark) && !this.light) {
        theme = 'theme--dark'
      }
      if ((!this.$vuelize.theme.dark || this.light) && !this.dark) {
        theme = 'theme--light'
      }
      return theme;
    },
    stylesObject() {
      //console.log(this.color)
      return {color: this.processColor(this.color), width: this.width, height: this.height}
    }
  },
}
</script>

<style scoped>

</style>
