<template>
  <div class="d-checkbox" @click="$emit('input', value = !value)">
    <div class="d-checkbox__box" :class="classesObject" :style="stylesObject">
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
    size: {type: String, default: '18'},
    onIcon: {type: String, default: 'check'},
    offIcon: {type: String, default: 'check'},
  },

  computed: {
    stylesObject() {
      return {color: this.value ? this.processColor(this.color) : this.processColor('currentColor')}
    },
    classesObject() {
      return {'d-checkbox--checked': this.value}
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
    }
  }

}
</style>
