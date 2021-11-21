<template>
  <div class="d-list__item" :class="Object.assign(classesObject ,themeClass)" :style="stylesObject" @click="click">
    <div class="d-list__item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "d-list-item",

  computed: {
    classesObject() {
      return {'d-list__item--active /*outlined depressed*/': this.$parent.$props.value === this.$vnode.key}
    }
  },

  methods: {
    click() {
      //check if listItem is under d-list
      if (this.$parent._vnode.data.staticClass === 'd-list') {
        this.$parent.$emit('input', this.$vnode.key)
      } else {
        this.$emit('input', this.$vnode.key)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-list__item {
  position: relative;

  border-radius: 8px;
  min-height: 36px;

  &::before {
    position: absolute;
    border-radius: inherit;

    width: 100%;
    height: 100%;

    background: currentColor;
    opacity: 0;

    content: '';
    transition-duration: 0.15s;

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
    }
  }

  &:not(.d-list__item--active) {
    &.theme--dark {
      color: $dark_card_text
    }

    &.theme--light {
      color: $light_card_text
    }
  }

  &.d-list__item--active {
    &::before {
      background: currentColor;
      opacity: 0.1;
    }
  }

  .d-list__item__content {
    padding: 8px;
    display: flex;
    align-items: center;
    gap: $gap;
  }
}
</style>
