<template>
  <d-function-wrapper root-div="d-card" :classes="['d-accordion', 'bottom']"
                      v-bind="{...$props, ...$attrs}">
    <div @click="onClick" style="border-radius: inherit">
      <d-card-title class="d-accordion__header" :color="headerColor" :class="['glow',{'glow--active': this.open}]">
        <slot name="header"></slot>
        <d-icon :name="angleIcon" class="d-accordion__header__icon"/>
      </d-card-title>
    </div>
    <transition name="slide-fade">
      <d-card-content class="d-accordion__content" v-if="this.open">
        <slot name="content"></slot>
      </d-card-content>
    </transition>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-accordion",

  props: {
    value: [Boolean, Number],
    headerColor: String,
  },

  computed: {
    angleIcon() {
      return this.open ? 'angle-up' : 'angle-down'
    },
    isKeyed() {
      return (typeof this.value === "number" && typeof this.$vnode.key === "number")
    },
    open() {

      if (this.isKeyed) {
        return this.value === this.$vnode.key
      } else {
        return this.value
      }
    }
  },
  methods: {
    onClick() {
      let value;
      if (this.isKeyed) {
        if (this.value === this.$vnode.key) {
          value = -1;
        } else {
          value = this.$vnode.key;
        }
      } else {
        value = !this.value;
      }
      console.log(value)
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped lang="scss">
.d-accordion {
  position: relative;
  width: 200px;

  &__header {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 1.4em;
    padding: 10px 12px;

    &__icon {
      margin-left: auto;
      align-self: center;
    }
  }

  &__content {
    padding: 8px;

  }
}
</style>
