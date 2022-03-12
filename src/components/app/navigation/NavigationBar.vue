<template>
  <slide-x-left-transition :duration="100">
    <d-function-wrapper root-tag="nav" :classes="['d-navigation-bar', ...classesObject]" v-bind="{...$props, ...$attrs}"
                        v-if="value">
      <d-row block height="100%">
        <d-card block color="transparent" class="d-navigation-bar__content" rounded="none">
          <slot></slot>
        </d-card>
        <d-column height="100%">
          <d-divider vertical block class="my-3"/>
        </d-column>
      </d-row>
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
