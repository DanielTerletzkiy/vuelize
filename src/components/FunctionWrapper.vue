<template>
  <component :is="root" :to="link" :disabled="disabled"
             :class="[...this.classes, themeClass, elevationClass, ...classAttributes]"
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
      /*if (this.elevation && this.elevationInvert) {
          return `elevation-${this.elevation.includes('n') ? '' : 'n'}${this.elevation}`
      }*/
      if (this.elevationDark !== '' || this.elevationLight !== '') {
        if (this.themeClass === 'theme--dark' && this.elevationDark) {
          return `elevation-${this.elevationDark}`;
        }

        if (this.themeClass === 'theme--light' && this.elevationLight) {
          return `elevation-${this.elevationLight}`;
        }
      }
      if (this.elevation === '' || this.elevationDark === '' || this.elevationLight === '') {
        return 'elevation'
      } else if (this.elevation) {
        return `elevation-${this.elevation}`
      } else {
        return ''
      }
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
