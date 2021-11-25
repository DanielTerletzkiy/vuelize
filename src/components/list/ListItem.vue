<template>
  <d-function-wrapper root-div="li" tabindex="0" :classes="['d-list__item', ...classesObject]"
                      v-bind="{...$props, ...$attrs}" @click="click">
    <div class="d-list__item__content">
      <slot></slot>
    </div>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-list-item",

  computed: {
    classesObject() {
      return {'d-list__item--active': this.$parent.$parent.$props.value === this.$vnode.key}
    }
  },

  methods: {
    click() {
      //check if listItem is under d-list
      if (this.$parent.$parent.$options._componentTag === 'd-list') {
        this.$parent.$parent.$emit('input', this.$vnode.key)
      } else {
        this.$emit('input', this.$vnode.key)
      }
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-list__item {
  position: relative;

  border-radius: inherit;
  min-height: 36px;

  list-style: none;

  &::before {
    position: absolute;
    border-radius: inherit;

    top: 0;
    left: 0;

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
    padding: 10px 12px;
    display: flex;
    align-items: center;
    gap: $gap;
  }
}
</style>
