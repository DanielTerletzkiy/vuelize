<template>
  <d-function-wrapper :classes="['d-select-menu']" v-bind="{...$props, ...$attrs}">
    <slide-y-up-transition :duration="80">
      <d-card v-if="open" class="d-select-menu__dropdown pa-0" elevation="4"
              v-click-outside="hideSelectMenu">
        <d-list :value="value"
                @input="onInput"
                color="primary" class="d-select-menu__dropdown__list pa-0" rounded="none">
          <d-list-item v-for="(item, index) in items" :key="index"
                       v-show="activeSearch(item)"
                       :color="item.color || ''"
                       :tabindex="0" ref="item">
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

  data: () => ({
    currentItem: -1
  }),

  watch: {
    open(state) {
      if (state) {
        document.addEventListener("keyup", this.focusNext);
        window.addEventListener("keydown", this.preventArrow, false);
        this.currentItem = -1
      } else {
        document.removeEventListener("keyup", this.focusNext)
        window.removeEventListener('keydown', this.preventArrow)
      }
    },
    items() {
      this.currentItem = -1
    }
  },

  methods: {
    hideSelectMenu() {
      this.$emit('update:open', false)
    },
    onInput(e) {
      this.$emit('input', e)
    },

    focus(index) {
      this.$nextTick(() => {
        if (this.$refs.item !== undefined) {
          this.$refs.item[index].$el.focus()
        }
      })
    },

    focusNext: async function () {
      await this.$nextTick()

      if (event.keyCode === 27) {
        this.hideSelectMenu();
        return
      }

      if (event.keyCode === 13) {
        //this.currentItem = -1;
        return
      }

      if (event.keyCode === 38 || event.keyCode === 40) {
        if (event.keyCode === 38 && this.currentItem <= 0) {
          this.$parent.$refs.searchInput.focus()
          this.currentItem = -1
          return
        }

        if (event.keyCode === 38 && this.currentItem > 0) {
          this.currentItem--
        } else if (event.keyCode === 40 && this.currentItem < this.items.length-1) {
          this.currentItem++
        }

        if (this.$refs.item) {
          this.$refs.item[this.currentItem].$el.focus()
        }
      }
    },

    preventArrow() {
      if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(event.code) > -1) {
        event.preventDefault();
      }
    },

    activeSearch(item) {
      if (item.activeSearch !== null && item.activeSearch !== undefined && this.$parent.$options._componentTag === 'd-autocomplete') {
        return item.activeSearch
      } else {
        return true
      }
    }
  },
}
</script>

<style scoped lang="scss">
.d-select-menu {
  border: none !important;
  &__dropdown {
    position: absolute;
    z-index: 1;

    box-sizing: inherit;
    min-width: 100%;
    max-height: calc(54px * 5);
    overflow: auto;

    top: calc(100% + 6px);
    left: 0;

    &__list {
      gap: 0;
    }
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
