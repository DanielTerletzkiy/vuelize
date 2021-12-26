<template>
  <d-function-wrapper root-tag="li" tabindex="0" :classes="['d-list__item', ...classesObject]"
                      v-bind="{...$props, ...$attrs}" @click="click" v-ripple>
    <div class="d-list__item__content">
      <slot></slot>
    </div>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-list-item",

  computed: {
    isMultiple() {
      return typeof this.$parent.$parent.$props.value === 'object'
    },
    classesObject() {
      return {
        glow: true,
        'glow--active': this.isMultiple ?
            this.$parent.$parent.$props.value.includes(this.$vnode.key)
            : this.$parent.$parent.$props.value === this.$vnode.key
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

  list-style: none;
  margin: 0;

  .d-list__item__content {
    width: 100%;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    gap: $gap*2;
  }
}
</style>
