<template>
  <d-function-wrapper :classes="['d-checkbox']" v-bind="{...$props, ...$attrs}" :style="checkboxStylesObject" @click="changeValue">
    <div class="d-checkbox__box" :class="classesObject">
      <d-icon :name="value ? onIcon : offIcon" :size="size" :color="value ? getContrast() : 'currentColor'"/>
    </div>
    <div class="d-checkbox__label">
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
    size: {type: Number, default: 18},
    onIcon: {type: String, default: 'check'},
    offIcon: {type: String, default: 'check'},
  },

  computed: {
    checkboxStylesObject() {
      return {color: this.value ? this.processColor(this.color) : this.processColor('currentColor')}
    },
    classesObject() {
      return {'d-checkbox--checked': this.value}
    }
  },

  methods: {
    changeValue(){
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
    border-radius: 6px;
    border: 2px solid currentColor;
    width: min-content;

    transition-duration: 0.1s;

    &.d-checkbox--checked {
      background: currentColor;

      &:hover {
        opacity: 0.9;
      }

      &:active {
        opacity: 0.75;
      }
    }
  }

  &.theme--dark > .d-checkbox__label {
    color: $dark_card_text
  }

  &.theme--light > .d-checkbox__label {
    color: $light_card_text
  }

}
</style>
