<template>
  <d-function-wrapper :classes="['d-tab-list__item', ...classesObject]" v-bind="{...$props, ...$attrs}"
                      @click="click" v-ripple :tabindex="this.disabled?-1:0" @keyup.enter="click">
    <div class="d-tab-list__item__content">
      <slot></slot>
    </div>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-tab-item",

  computed: {
    classesObject() {
      return {
        glow: true,
        'glow--active': this.$parent.$parent.$props.value === this.$vnode.key
      }
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
  justify-content: center;
  border-radius: inherit;
  min-width: 64px;
  min-height: 44px;
  padding: 4px;

  &:focus-visible {
    outline: 2px solid currentColor;
  }

  .d-tab-list__item__content {
    padding: 10px 12px;
    display: flex;
    align-items: center;
    gap: $gap;
  }
}

.slide-fade {
  &-leave-active {
    opacity: 0;
    transition: all 0.5s ease;
  }

  .top :is(&-enter, &-leave-to) {
    transform: translateY(2px);
  }

}
</style>
