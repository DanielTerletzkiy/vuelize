<template>
  <d-function-wrapper :classes="['d-label']" v-bind="{...$props, ...$attrs}"
                      @click="$emit('click')">
    <d-card class="d-label__wrapper" style="color: inherit" :color="filled?color:'inherit'" :class="classesObject" :rounded="rounded">
      <d-card-subtitle class="d-label__wrapper__content py-1" :color="filled?getContrast(color):'inherit'"
                       rounded="inherit">
        <slot name="default">
        </slot>
      </d-card-subtitle>
      <d-card-subtitle v-if="ripple" class="d-label__wrapper__ripple" :color="filled?getContrast(color):'inherit'"
                       v-ripple/>
    </d-card>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-label",

  props: {
    filled: Boolean,
    ripple: Boolean
  },

  computed: {
    classesObject() {
      return {
        'glow': true,
        'glow--active': !this.filled,
        'd-label--filled': this.filled
      }
    }
  }
}
</script>

<style scoped lang="scss">
.d-label {
  height: min-content;
  width: max-content;

  &__wrapper {
    position: relative;
    padding: 0 6px;
    min-height: 32px;

    &__content {
      width: max-content;
    }

    &__ripple {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
