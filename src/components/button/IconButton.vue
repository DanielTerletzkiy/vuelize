<template>
  <d-function-wrapper root-div="button" :classes="['d-icon-button']" v-bind="{...$props, ...$attrs}" @click="$emit('click')" :style="stylesObject">
    <span class="d-icon-button__content" v-ripple>
      <slot name="default"></slot>
    </span>
    <slot name="misc"></slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-icon-button",

  props: {
    size: {type: [String, Number], default: 50},
  },

  computed: {
    stylesObject(){
      return {
        width: this.size + 'px',
        height: this.size + 'px',
      }
    }
  }
}
</script>

<style scoped lang="scss">
.d-icon-button {
  user-select: none;
  position: relative;
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;

  height: 50px;
  width: 50px;

  border-radius: 8px;

  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.0892857143em;

  &:focus-visible {
    outline: 1px solid currentColor;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    border-radius: inherit;

    background: currentColor;
    opacity: 0;

    transition-duration: 0.25s;
  }

  &:hover {
    &::before {
      opacity: 0.1;
      transition-duration: 0.15s;
    }
  }

  .d-icon-button__content {
    height: 100%;
    width: 100%;
    border-radius: inherit;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
