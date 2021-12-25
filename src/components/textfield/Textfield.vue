<template>
  <d-function-wrapper :classes="['d-text-field', ...classesObject]" v-bind="{...$props, ...$attrs}"
                      :style="textFieldStylesObject"
                      @mouseenter="()=> this.hover = true" @mouseleave="()=> this.hover = false">
    <input v-if="componentType === 'input'" :is="componentType" v-bind="{...$props, ...$attrs}" :id="label"
           class="d-text-field__input"
           :placeholder="placeholderActive ? placeholder : ' '"
           :value="value" @input="onInput"
           @keyup.enter="$emit('enter')"
           @removeFocus="removeFocus"
           @focusin="()=>this.selected = true" @focusout="()=>this.selected = false"/>
    <component v-else :is="componentType" v-bind="{...$props, ...$attrs}" :id="label" class="d-text-field__input"
               :placeholder="placeholderActive ? placeholder : ' '"
               :value="value" @input="onInput"
               @removeFocus="removeFocus"
               @focusin="()=>this.selected = true" @focusout="()=>this.selected = false">
      <template v-if="componentType !== 'input'" slot="item" slot-scope="props">
        <slot name="item" v-bind="props"></slot>
      </template>
    </component>
    <label :for="label" class="d-text-field__label">{{ label }}</label>
  </d-function-wrapper>
</template>

<script>
import DSelect from "@/components/textfield/Select.vue";
export default {
  name: "d-text-field",

  components: {
    DSelect
  },

  props: {
    value: undefined,
    label: String,
    placeholder: String,
    select: Boolean,
    width: String,
    fullWidth: Boolean
  },

  data: () => ({
    hover: false,
    selected: false,
  }),

  methods: {
    onInput(e) {
      this.$emit('input', typeof e === 'object' ? e.target.value : e)
    },
    removeFocus() {
      this.selected = false;
      this.hover = false;
      document.activeElement.blur();
    }
  },

  computed: {
    textFieldStylesObject() {
      return {
        color: (this.hover || this.selected) ? this.processColor(this.color) : null,
        caretColor: (this.hover || this.selected) ? this.processColor(this.color) : null,
        width: this.width,
        'min-width': this.fullWidth ? '100%' : 'unset',
        flex: this.fullWidth ? 1 : 'unset'
      }
    },

    classesObject() {
      return {
        'd-text-field--active': (this.hover || this.selected),
        elevation: true,
        'd-text-field--placeholder': this.placeholderActive
      }
    },

    componentType() {
      return this.select ? 'd-select' : 'input'
    },

    placeholderActive() {
      return this.placeholder && !this.value;
    }
  },

  mounted() {
    this.hover = false;
    this.selected = false;

    this.$forceUpdate();
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-text-field {
  position: relative;
  width: 250px;
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
    padding: 0 1.25em;
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
    box-shadow: inset 0 0 0 1.4px currentColor !important;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    border-radius: inherit;
  }

  &:focus-within::before {
    box-shadow: inset 0 0 0 2px currentColor;
    transition-duration: 0.2s;
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

.d-text-field__input:focus ~ .d-text-field__label, .d-text-field--placeholder .d-text-field__input ~ .d-text-field__label,
.d-text-field__input:not(:placeholder-shown).d-text-field__input:not(:focus) ~ .d-text-field__label {
  font-size: 0.8rem;
  padding: 0 0.3rem;
  top: -0.485rem;
  left: 0.4rem;
}

</style>
