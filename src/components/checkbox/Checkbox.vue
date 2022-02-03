<template>
  <d-function-wrapper :classes="['d-checkbox']" v-bind="{...$props, ...$attrs}" :style="checkboxStylesObject"
                      @click="changeValue">
    <div class="d-checkbox__box" :class="classesObject" v-ripple :tabindex="this.disabled?-1:0" @keyup.enter="changeValue">
      <d-icon :name="value ? onIcon : offIcon" :size="size" :color="'currentColor'"/>
    </div>
    <div class="d-checkbox__label" v-if="!!this.$slots.default">
      <slot></slot>
    </div>
  </d-function-wrapper>
</template>

<script>

export default {
  name: "d-checkbox",
  props: {
    value: Boolean,
    color: {type: String, default: 'primary'},
    size: {type: [String, Number], default: 18},
    onIcon: {type: String, default: 'check'},
    offIcon: {type: String, default: 'check'},
    flexDirection: {type: String, default: 'row'}
  },

  computed: {
    checkboxStylesObject() {
      return {
        color: this.value ? this.processColor(this.color) : this.processColor('currentColor'),
        flexDirection: this.flexDirection
      }
    },
    classesObject() {
      return {
        'd-checkbox--checked': this.value,
        'elevation-4': this.value && !this.$vuelize.theme.dark,
        'inlined depressed theme--dark': !this.value,
        'theme--light': !this.$vuelize.theme.dark,
        'glow': true,
        'glow--active': this.value
      }
    }
  },

  methods: {
    changeValue() {
      let value = this.value;
      value = !value;
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-checkbox {
  user-select: none;

  display: flex;
  align-items: center;
  gap: 8px;

  .d-checkbox__box {
    border-radius: $gap*1.4;
    width: min-content;
    padding: 2px;

    transition-duration: 0.1s;

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  }

  &.theme--dark {
    .d-checkbox__label {
      color: $dark_card_text
    }

    .d-checkbox__box:not(.d-checkbox--checked) {
      color: darken($dark_card_text, 16);
    }
  }

  &.theme--light {
    .d-checkbox__label {
      color: $light_card_text
    }

    .d-checkbox__box:not(.d-checkbox--checked) {
      color: lighten($light_card_text, 24) !important;
    }
  }

}
</style>
