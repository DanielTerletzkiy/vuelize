<template>
  <d-function-wrapper root-div="button" :classes="['d-icon-button', ...classesObject]" v-bind="{...$props, ...$attrs}" @click="$emit('click')" :style="stylesObject">
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
    value: Boolean,
    size: {type: [String, Number], default: 50},
  },

  computed: {
    stylesObject(){
      return {
        'width': this.size + 'px',
        'height': this.size + 'px',
      }
    },
    classesObject(){
      return {
        glow: true,
        'glow--active': this.value
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

  padding: 0;

  border-radius: 8px;

  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.0892857143em;

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
