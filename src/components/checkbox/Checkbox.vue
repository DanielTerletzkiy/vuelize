<template>
  <div class="d-checkbox" @click.prevent="changeValue" :class="themeClass">
    <div class="d-checkbox__box" :class="classesObject" :style="checkboxStylesObject">
      <d-icon :name="value ? onIcon : offIcon" :size="size" :color="value ? getContrast() : 'currentColor'"/>
    </div>
    <div class="d-checkbox__label">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import DIcon from "@/components/icon/Icon";

export default {
  name: "d-checkbox",
  components: {DIcon},
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

}
</style>
