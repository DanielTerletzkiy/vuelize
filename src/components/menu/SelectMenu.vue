<template>
  <d-function-wrapper :classes="['d-select-menu', 'bottom']" v-bind="{...$props, ...$attrs}">
    <transition name="slide-fade">
      <d-card v-if="open" class="d-select-menu__dropdown pa-0" elevation="4" v-click-outside="hideSelectMenu">
        <d-list v-model="value" color="primary" class="pa-0" rounded="none">
          <d-list-item v-for="(item, index) in items" :key="index">
            <slot name="item" :item="item" :index="index">
              {{ item }}
            </slot>
          </d-list-item>
        </d-list>
      </d-card>
    </transition>
  </d-function-wrapper>
</template>

<script>

export default {
  name: "d-select-menu",

  props: {
    value: Number,
    open: Boolean,
    items: Array
  },

  methods: {
    hideSelectMenu() {
      this.$emit('update:open', false)
    }
  },

  watch: {
    value(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped lang="scss">
.d-select-menu {
  &__dropdown {
    position: absolute;
    z-index: 1;

    box-sizing: inherit;
    min-width: 100%;
    max-height: calc(54px * 5);
    overflow: auto;

    top: calc(100% + 6px);
    left: 0;
  }

  .d-list > li {
    &:first-child {
      border-radius: 8px 8px 0 0;
    }

    &:last-child {
      border-radius: 0 0 8px 8px;
    }
  }
}
</style>
