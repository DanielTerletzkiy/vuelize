<template>
  <d-function-wrapper :classes="['d-select-menu']" v-bind="{...$props, ...$attrs}">
    <slide-y-up-transition :duration="80">
      <d-card v-if="open" class="d-select-menu__dropdown pa-0" :elevation="$vuelize.theme.dark?'n2':'5'"
              v-click-outside="hideSelectMenu">
        <d-list :value="value" @input="onInput" color="primary" class="pa-0" rounded="none">
          <d-list-item v-for="(item, index) in items" :key="index" v-show="activeSearch(item)">
            <slot name="item" :item="item" :index="index">
              {{ item }}
            </slot>
          </d-list-item>
        </d-list>
      </d-card>
    </slide-y-up-transition>
  </d-function-wrapper>
</template>

<script>

export default {
  name: "d-select-menu",

  props: {
    value: [Number, String, Array],
    open: Boolean,
    items: Array
  },

  methods: {
    hideSelectMenu() {
      this.$emit('update:open', false)
    },
    onInput(e) {
      this.$emit('input', e)
    },

    activeSearch(item){
      if(item.activeSearch !== null && item.activeSearch !== undefined){
        return item.activeSearch
      }else {
        return true
      }
    }
  },
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
    border-radius: 0 !important;

    &:first-child {
      border-radius: 8px 8px 0 0 !important;
    }

    &:last-child {
      border-radius: 0 0 8px 8px !important;
    }
  }
}
</style>
