<template>
  <d-function-wrapper :classes="['d-text-field', ...classesObject]" v-bind="{...$props, ...$attrs}"
                      :style="textFieldStylesObject"
                      @mouseenter="()=> this.hover = true" @mouseleave="()=> this.hover = false">
    <div class="d-text-field__prefix">
      <slot name="prefix"/>
    </div>
    <component v-if="componentType !== 'input'" :is="componentType" v-bind="{...$props, ...$attrs}" :id="this.uuid"
               class="d-text-field__input"
               :placeholder="placeholderActive ? placeholder : ' '"
               :value="value" @input="onInput"
               @removeFocus="removeFocus"
               @focusin="()=>this.selected = true" @focusout="()=>this.selected = false">
      <template v-if="componentType !== 'input'" slot="label" slot-scope="props">
        <slot name="label" v-bind="props"></slot>
      </template>
      <template v-if="componentType !== 'input'" slot="item" slot-scope="props">
        <slot name="item" v-bind="props"></slot>
      </template>
    </component>
    <input v-else v-bind="{...$props, ...$attrs}" :id="this.uuid"
           class="d-text-field__input"
           :placeholder="placeholderActive ? placeholder : ' '"
           :value="value" @input="onInput"
           @keyup.enter="$emit('enter')"
           @removeFocus="removeFocus"
           @focusin="()=>this.selected = true" @focusout="()=>this.selected = false"/>
    <label v-if="label && !solo" :for="this.uuid" class="d-text-field__label" :class="labelClassesObject">{{
        label
      }}</label>
    <div class="d-text-field__suffix">
      <slot name="suffix"/>
    </div>
  </d-function-wrapper>
</template>

<script>
import DSelect from "@/components/textfield/variant/Select.vue";
import DAutocomplete from "@/components/textfield/variant/Autocomplete.vue";

export default {
  name: "d-text-field",

  components: {
    DSelect,
    DAutocomplete
  },

  props: {
    autocomplete: Boolean,

    filled: Boolean,
    fullWidth: Boolean,
    outlined: Boolean,
    solo: Boolean,
    label: String,
    placeholder: String,

    select: Boolean,
    value: undefined,
    width: String
  },

  data: () => ({
    hover: false,
    selected: false,
  }),

  computed: {

    classesObject() {
      return {
        'd-text-field--active': (this.hover || this.selected),
        'd-text-field--placeholder': this.placeholderActive,
        'd-text-field--outlined outlined depressed elevation': this.outlined,
        'd-text-field--filled glow glow--active': this.filled,
        'd-text-field--solo': this.solo,
      }
    },

    componentType() {
      if (this.select) {
        return 'd-select'
      } else if (this.autocomplete) {
        return 'd-autocomplete'
      } else {
        return 'input'
      }
    },

    labelClassesObject() {
      return {
        'd-text-field--filled': this.filled,
      }
    },

    placeholderActive() {
      return this.placeholder && !this.value;
    },
    textFieldStylesObject() {
      return {
        color: (this.hover || this.selected) ? this.processColor(this.color, this.tint) : null,
        caretColor: (this.hover || this.selected) ? this.processColor(this.color, this.tint) : null,
        width: this.width,
        'min-width': this.fullWidth ? '100%' : 'unset',
      }
    }
  },

  mounted() {
    this.hover = false;
    this.selected = false;

    this.$forceUpdate();
  },

  methods: {
    onInput(e) {
      this.$emit('input', typeof e === 'object' ? e.target.value : e)
    },
    removeFocus() {
      this.selected = false;
      this.hover = false;
      document.activeElement.blur();
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-text-field {
  position: relative;
  width: 250px;
  height: 3rem;
  caret-color: currentColor;
  transition-duration: 0.15s;
  display: flex;
  align-items: center;

  &__input, ::v-deep .d-text-field__input__autocomplete {
    position: relative;
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
    align-items: center;

    color: currentColor;
    caret-color: inherit;

    transition-duration: 0.2s;
    transition-timing-function: ease-in;
  }

  &__label {
    border-radius: 50px 50px 0 0;
    position: absolute;
    left: 1rem;
    top: 0.8rem;
    margin: 0 0.5rem;
    cursor: text;
    transition-duration: 0.2s;
    background: inherit;
    height: 10px;
  }

  &__prefix {
    position: relative;
    left: 0.7rem;
    font-size: 20px;
  }

  &__suffix {
    position: relative;
    right: 0.7rem;
    font-size: 20px;
  }

  &--outlined {
    background: inherit;
    box-shadow: none;

    &.d-text-field--active {
      outline: solid 1px currentColor !important;
      border-color: currentColor;
    }

    &:focus-within::before {
      transition-duration: 0.2s;
    }
  }

  &--filled {
    &.glow--active:not(:hover):not(.d-text-field--active)::before {
      opacity: 0.05 !important;
    }

    height: 3.6rem;

    .d-text-field__label {
      height: auto;
      top: 1rem;
      font-size: 1.2rem;
    }

    .d-text-field__input {
      padding-top: 12px !important;
      padding-bottom: 0 !important;
      padding-left: 1.2em;
      padding-right: 1.2em;
    }

    &:not(.d-text-field--solo){

    .d-text-field__prefix{
      padding-top: 12px;
    }
    .d-text-field__suffix{
      padding-top: 12px;
    }
    }
  }

  &--solo {
    height: 3rem !important;
    .d-text-field__input {
      padding: 0 1.25em !important;
    }
    .d-text-field__label {
      display: none;
    }
  }

  &.d-text-field--filled.d-text-field--outlined label{
    background: none !important;
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

  &.dark {
    .d-text-field__input {
      color: $dark_card_text;
    }
  }

  &.light {
    .d-text-field__input {
      color: $light_card_text;
    }
  }
}

.d-text-field__input:focus ~ .d-text-field__label, .d-text-field--placeholder .d-text-field__input ~ .d-text-field__label,
.d-text-field__input:not(:placeholder-shown).d-text-field__input:not(:focus) ~ .d-text-field__label {

  font-size: 0.9rem;
  padding: 0 0.3rem;
  top: -0.485rem;
  left: 0.4rem;

  &.d-text-field--filled {
    top: 0.2rem !important;
  }
}

</style>
