<template>
  <d-function-wrapper :classes="['d-label', ...classesObject]" v-bind="{...$props, ...$attrs}" @click="$emit('click')" v-ripple>
    <d-card-subtitle class="d-label__content py-1" :color="filled?getContrast(color):'inherit'" rounded="inherit">
      <slot name="default">
      </slot>
    </d-card-subtitle>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-label",

  props: {
    filled: Boolean
  },

  computed: {
    classesObject() {
      return {
        'glow': true,
        'glow--active': true,
        'd-label--filled': this.filled
      }
    }
  }
}
</script>

<style scoped lang="scss">
.d-label {
  padding: 2px 6px;
  margin: 4px;
  height: min-content;
  width: max-content;

  &.d-label--filled {
    &::before {
      opacity: 0.8;
    }
  }

  &__content {
    z-index: 1;
    width: max-content;
  }
}
</style>
