<template>
  <d-function-wrapper :classes="['d-text-field', ...classesObject]" v-bind="{...$props, ...$attrs}"
         :style="textFieldStylesObject"
         @mouseenter="()=> this.hover = true" @mouseleave="()=> this.hover = false">
      <input v-bind="$attrs" :id="label" class="d-text-field__input" autocomplete="off" placeholder=" "
             :value="value" @input="onInput"
             @focusin="()=>this.selected = true" @focusout="()=>this.selected = false">
      <label :for="label" class="d-text-field__label">{{ label }}</label>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-text-field",
  props: {
    value: undefined,
    label: String,
  },

  data: () => ({
    hover: false,
    selected: false
  }),

  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    }
  },

  computed: {
    textFieldStylesObject() {
      return {color: (this.hover || this.selected) ? this.processColor(this.$attrs.color) : ''}
    },

    classesObject() {
      return {'d-text-field--active': (this.hover || this.selected), elevation: true}
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.d-text-field {
  position: relative;
  min-width: 264px;
  height: 3rem;
  background: inherit;
  caret-color: currentColor;
  transition-duration: 0.15s;

  &__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: inherit;
    font-family: inherit;
    font-size: inherit;
    outline: none;
    padding: 1.25rem;
    background: none;

    color: currentColor;
    caret-color: inherit;

    transition-duration: 0.2s;
    transition-timing-function: ease-in;
  }

  &__label {
    border-radius: inherit;
    position: absolute;
    left: 1rem;
    top: 0.8rem;
    margin: 0 0.5rem;
    cursor: text;
    transition-duration: 0.2s;
    background: inherit;
  }

  &--active {
    box-shadow: inset 0 0 0 1.8px currentColor !important;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    border-radius: inherit;
    transition-duration: 0.2s;
  }

  &:focus-within::before {
    box-shadow: inset 0 -3px 0 1.4px currentColor;
  }

  &.theme--dark {
    .d-text-field__input {
      color: $dark_card_text;
    }
  }

  &.theme--light {
    .d-text-field__input {
      color: $light_card_text;
    }
  }
}

/*
1. When the input is in the focus state
reduce the size of the label and move upwards

2. Keep label state when content is in input field
*/

.d-text-field__input:focus ~ .d-text-field__label,
.d-text-field__input:not(:placeholder-shown).d-text-field__input:not(:focus) ~ .d-text-field__label {
  font-size: 0.9rem;
  padding: 0 0.1rem;
  top: -0.5rem;
  left: 0.7rem;
}

</style>
