<template>
  <button class="d-btn" :style="stylesObject" :class="Object.assign(classesObject,themeClass)" @click="$emit('click')">
    <span class="d-btn__content" :style="{color: this.filled ? getContrast():''}">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "d-btn",

  props: {
    filled: Boolean,
    outlined: Boolean,
    block: Boolean,
    depressed: Boolean,
  },

  computed: {
    classesObject() {
      return {'d-btn--filled': this.filled, 'd-btn--outlined': this.outlined, 'd-btn--block': this.block, 'd-btn--depressed': this.depressed}
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
  padding: 0 12px;

  min-height: 36px;
  min-width: 80px;

  border-radius: 8px;

  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.875rem;
  letter-spacing: 0.0892857143em;

  &:focus-visible {
    outline: 1px solid currentColor;
    box-shadow: inset 0px -2px 0px 0px currentColor
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

  &:active {
    &::before {
      background-color: currentColor;
      opacity: 0.2 !important;
    }
  }

  &:hover {
    &::before {
      background: currentColor;
      opacity: 0.1;
      transition-duration: 0.15s;
    }
  }

  &.d-btn--filled {
    &::before {
      background: currentColor;
      opacity: 1;
    }
    &:active {
      &::before {
        background-color: currentColor;
        opacity: 0.75 !important;
      }
    }
    &:hover {
      &::before {
        background: currentColor;
        opacity: 0.9;
      }
    }
  }

  &.d-btn--block {
    //noinspection CssInvalidPropertyValue
    width: -webkit-fill-available; //Its valid...
    width: -moz-available;
  }

  .d-btn__content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px
  }

  &.d-btn--outlined {
    box-shadow: inset 0 0 0 1.4px currentColor;
    &.d-btn--depressed.theme--dark {
      box-shadow: inset 0 0 0 1.4px rgba(255, 255, 255, 0.12);
    }
    &.d-btn--depressed.theme--light {
      box-shadow: inset 0 0 0 1.4px rgba(0, 0, 0, 0.12);
    }
  }
}

.theme--dark .d-btn {

}


.theme--light .d-btn {

}
</style>
