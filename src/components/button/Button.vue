<template>
  <button class="d-btn" :style="stylesObject" :class="classesObject">
    <span class="d-btn__content" :style="{color: getContrast}">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "d-btn",

  props: {
    color: String,
    filled: Boolean,
    outlined: Boolean,
    block: Boolean
  },

  computed: {
    stylesObject() {
      return {color: this.processColor(this.color)}
    },
    classesObject() {
      return {'d-btn--filled': this.filled, 'd-btn--outlined': this.outlined, 'd-btn--block': this.block}
    },

    getContrast() {
      if(!this.filled){
        return
      }
      let hexColor = this.processColor(this.color);
      if (hexColor.slice(0, 1) === '#') {
        hexColor = hexColor.slice(1);
      }
      if (hexColor.length === 3) {
        hexColor = hexColor.split('').map(function (hex) {
          return hex + hex;
        }).join('');
      }
      // Convert to RGB value
      let r = parseInt(hexColor.substr(0, 2), 16);
      let g = parseInt(hexColor.substr(2, 2), 16);
      let b = parseInt(hexColor.substr(4, 2), 16);
      // Get YIQ ratio
      let yiq = ((r * 299) + (g * 395) + (b * 114)) / 1000;
      // Check contrast
      return (yiq >= 128) ? 'black' : 'white';

    }
  }

}
</script>

<style scoped lang="scss">
.d-btn {
  position: relative;
  background: none;
  color: inherit;
  //border: 2px solid currentColor;
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

  .d-btn__content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px
  }
}

.theme--dark .d-btn {

}


.theme--light .d-btn {

}
</style>
