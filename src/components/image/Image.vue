<template>
  <d-function-wrapper root-tag="img" :src="src" draggable="false" :classes="['d-image', ...classesObject]" v-bind="{...$props, ...$attrs}"
                      :style="stylesObject"/>
</template>

<script>
export default {
  name: "d-image",

  props: {
    src: String,
    width: {type: String, default: 'inherit'},
    height: {type: String, default: 'inherit'},
  },

  computed: {
    classesObject() {
      return {}
    },
    stylesObject() {
      return {
        width: this.width,
        height: this.height,
      }
    }
  }
}
</script>

<style scoped lang="scss">
.d-image {
  user-select: none;
  display: block;
  object-fit: cover;
}
</style>
