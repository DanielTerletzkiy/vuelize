<template>
  <d-function-wrapper root-tag="button" :classes="['d-btn', ...classesObject]" v-bind="{...$props, ...$attrs}"
                      @click="$emit('click')">
    <span class="d-btn__content" :style="{color: this.filled ? this.getContrast(this.color):''}" v-ripple>
      <slot name="default"></slot>
    </span>
    <slot name="misc"></slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-btn",

  props: {
    filled: Boolean,
    block: Boolean,
    glow: Boolean,

    size: {
      type: String, validator: function (value) {
        return ['small', 'regular', 'large'].indexOf(value) !== -1
      }
    }
  },

  computed: {
    classesObject() {
      return {
        'd-btn--filled': this.filled,
        'd-btn--block': this.block,
        'd-btn--glow': this.glow,
        [`d-btn--${this.size}`]: this.size
      }
    },
  }
}
</script>

<style scoped lang="scss">
.d-btn {
  user-select: none;
  position: relative;
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;

  min-height: 36px;

  border-radius: inherit;

  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.0892857143em;

  &:focus-visible {
    outline: 2px solid currentColor;
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

  &.d-btn--filled {
    &::before {
      opacity: 1;
    }

    &:hover {
      &::before {
        opacity: 0.9;
      }
    }
  }

  &.d-btn--glow {
    &::before {
      opacity: 0.1;
    }

    &:hover {
      &::before {
        opacity: 0.15;
      }
    }
  }

  &.d-btn--block {
    //noinspection CssInvalidPropertyValue
    width: -webkit-fill-available; //Its valid...
    width: -moz-available;
  }

  .d-btn__content {
    min-height: inherit;
    padding: 0 16px;
    border-radius: inherit;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  &.d-btn--small .d-btn__content{
    padding: 0;
  }

  &.d-btn--large .d-btn__content{
    min-height: 50px;
    font-size: 1.6rem;
    font-weight: normal;

  }
}
</style>
