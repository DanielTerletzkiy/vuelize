<template>
  <slide-x-left-transition :duration="100">
    <d-function-wrapper root-tag="nav" :classes="['d-navigation-bar', ...classesObject]" v-bind="{...$props, ...$attrs}" v-if="value">
      <d-card block class="d-navigation-bar__content" :elevation="this.$vuelize.theme.dark?'1':''">
        <slot></slot>
      </d-card>
    </d-function-wrapper>
  </slide-x-left-transition>
</template>

<script>
export default {
  name: "d-navigation-bar",

  props: {
    value: {type: Boolean, default: true},
    permanent: Boolean,
    temporary: Boolean,
  },

  computed: {
    classesObject() {
      return {
        'd-navigation-bar--temporary': this.temporary,
        'd-navigation-bar--permanent': this.permanent
      }
    }
  },
}
</script>

<style scoped lang="scss">
.d-navigation-bar {

  height: 100vh;
  width: 300px;

  z-index: 9;

  &--temporary {
    position: fixed;
  }

  &--permanent {
    position: sticky;
    top: 54px;
    height: calc(100vh - 54px) !important;
  }

  &__content {
    height: inherit;
    width: inherit;

    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
