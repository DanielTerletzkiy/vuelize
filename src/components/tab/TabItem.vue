<template>
  <d-function-wrapper :classes="['d-tab-list__item', ...classesObject]"
                      v-bind="{...$props, ...$attrs}" :style="stylesObject"
                      @click="click" v-ripple :tabindex="this.disabled?-1:0" @keyup.enter="click" glow :glowing="!filled && selected">
    <div class="d-tab-list__item__content">
      <slot></slot>
    </div>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-tab-item",

  computed: {
    itemColor() {
      return this.color || this.$parent.$parent.$props.color;
    },
    selected() {
      return this.$parent.$parent.$props.value === this.$vnode.key
    },
    filled(){
      return this.$parent.$parent.$props.filled
    },
    classesObject(){
      return {
        'd-tab-list__item__content--selected': this.selected
      }
    },
    stylesObject() {
      if (this.filled) {
        return {
          background: this.selected ? this.processColor(this.itemColor) : 'transparent',
          color: this.selected ? this.getContrast(this.itemColor) : '',
        }
      }else{
        return {}
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
  width: 100%;
  min-width: 64px;
  min-height: 44px;
  padding: 0 14px;
  font-weight: 600;

  transition-duration: 0.5s;

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  .d-tab-list__item__content {
    display: flex;
    align-items: center;
    gap: $gap;

  }

  &:not(.d-tab-list__item__content--selected) {
    color: darken($dark_card_text, 30);
  }
}
</style>
