<template>
  <d-function-wrapper :classes="['d-avatar', ...classesObject]" v-bind="{...$props, ...$attrs}" :style="avatarStylesObject">
    <slot><img class="d-avatar__image" :src="src" alt=""/></slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-avatar",

  props: {
    src: String,
    size: {type: Number, default: 40},
  },

  computed: {
    avatarStylesObject() {
      return {width: this.size + 'px', height: this.size + 'px'}
    },
    classesObject() {
      return {'rounded-circle': this.src}
    }
  }
}
</script>

<style scoped lang="scss">
.d-avatar {
  background: currentColor;

  display: flex;
  justify-content: center;
  align-items: center;

  transition-duration: 0.2s;

  &__image {
    width: inherit;
    height: inherit;
    border-radius: inherit;
  }
}
</style>
