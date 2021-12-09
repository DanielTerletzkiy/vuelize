<template>
  <d-function-wrapper :classes="['d-spacer']" v-bind="{...$props, ...$attrs}" :style="stylesObject"/>
</template>

<script>
export default {
  name: "d-spacer",

  props: {
    flexGrow: [String, Number]
  },

  computed: {
    stylesObject(){
      return {
        'flex-grow': this.flexGrow
      }
    }
  }
}
</script>

<style scoped lang="scss">
.d-spacer {
  flex: 1;
}
</style>
