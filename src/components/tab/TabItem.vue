<template>
  <d-function-wrapper :classes="['d-tab-list__item', 'top', ...classesObject]" v-bind="{...$props, ...$attrs}" @click="click">
    <div class="d-tab-list__item__content">
      <slot></slot>
    </div>
    <transition name="slide-fade">
      <d-divider class="d-tab-list__item__indicator" color="primary" size="2px"
                 v-if="this.$parent.$parent.$props.value === this.$vnode.key"/>
    </transition>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-tab-item",

  computed: {
    classesObject() {
      return {'d-tab-list__item--active': this.$parent.$parent.$props.value === this.$vnode.key}
    }
  },

  methods: {
    click() {
      //check if tabItem is under d-tab-list
      if (this.$parent.$parent.$options._componentTag === 'd-tab-list') {
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

.d-tab-list__item {
  user-select: none;
  position: relative;

  border-radius: inherit;
  min-width: 64px;
  min-height: 44px;
  padding: 4px;

  list-style: none;
  margin: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__indicator {
    position: absolute;
    width: calc(100% - 16px);
    bottom: -1px;
    opacity: 0.6;
  }

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
      opacity: 0.08;
    }
  }

  &:not(.d-tab-list__item--active) {
    &.theme--dark {
      color: $dark_card_text
    }

    &.theme--light {
      color: $light_card_text
    }
  }

  &.d-tab-list__item--active {
    &::before {
      background: currentColor;
      opacity: 0.1;
    }

    &:hover {
      &::before {
        background: currentColor;
        opacity: 0.15;
      }
    }
  }

  .d-tab-list__item__content {
    padding: 10px 12px;
    display: flex;
    align-items: center;
    gap: $gap;
  }
}

.slide-fade{
  &-leave-active {
    opacity: 0;
    transition: all 0.5s ease;
  }

  .top :is(&-enter, &-leave-to) {
    transform: translateY(2px);
  }

}
</style>
