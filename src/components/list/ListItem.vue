<template>
  <d-function-wrapper root-tag="li" :classes="['d-list__item', ...classesObject]"
                      :style="stylesObject" v-ripple
                      @focusin="()=>focus = true"
                      @focusout="()=>focus = false"
                      v-bind="{...$props, ...$attrs}" @click="click" :tabindex="this.disabled?-1:0" @keyup.enter="click"
                      glow :glowing="!filled && selected">
    <fade-transition>
      <d-card v-if="focus" class="d-list__item__indicator" color="currentColor"/>
    </fade-transition>
    <div class="d-list__item__content">
      <slot></slot>
    </div>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-list-item",

  data: () => ({
    focus: false
  }),

  computed: {
    isMultiple() {
      return typeof this.$parent.$parent.$props.value === 'object'
    },
    itemColor() {
      return this.color || this.$parent.$parent.$props.color;
    },
    selected() {
      return this.isMultiple ?
          this.$parent.$parent.$props.value.includes(this.$vnode.key)
          : this.$parent.$parent.$props.value === this.$vnode.key
    },
    filled() {
      return this.$parent.$parent.$props.filled
    },
    classesObject() {
      return {
        'd-list__item__content--selected': this.selected
      }
    },
    stylesObject() {
      if (this.filled) {
        return {
          background: this.selected ? this.processColor(this.itemColor) : 'transparent',
          color: this.selected ? this.getContrast(this.itemColor) : '',
        }
      } else {
        return {}
      }
    }
  },

  methods: {
    click() {
      //check if listItem is under d-list
      if (this.$parent.$parent.$options._componentTag === 'd-list') {
        if (this.isMultiple) {
          let tempArray = this.$parent.$parent.$props.value;
          if (this.$parent.$parent.$props.value.includes(this.$vnode.key)) {
            tempArray.splice(tempArray.indexOf(this.$vnode.key), 1)
          } else {
            tempArray.push(this.$vnode.key)
          }
          this.$parent.$parent.$emit('input', tempArray)

        } else {
          this.$parent.$parent.$emit('input', this.$vnode.key)
        }
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
  padding: 4px;

  list-style: none;
  margin: 0;

  transition: background 0.2s ease-out;

  &:focus-visible {
    position: relative;

    outline: none;

    .d-list__item__indicator {
      position: absolute;
      left: -2px;
      max-height: 30px;
      height: 100%;
      width: 4px;
    }
  }

  .d-list__item__content {
    width: 100%;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: $gap*2;
  }

  &:not(.d-list__item__content--selected) {
    color: darken($dark_card_text, 14) !important;
  }
}
</style>
