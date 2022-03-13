<template>
  <d-function-wrapper :classes="['d-tab-list', ...classesObject]" v-bind="{...$props, ...$attrs}">
    <slot ref="item"></slot>
    <d-divider v-if="showIndicator" class="d-tab-list__indicator" :color="currentColor" size="2px" :style="indicatorStylesObject"/>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-tab-list",

  props: {
    value: {type: [String, Number]},
    showIndicator: {type: Boolean},
    filled: {type: Boolean},
    outlined: {type: Boolean},
  },

  data: () => ({
    items: {}
  }),

  computed: {
    currentItem() {
      return this.items[this.value]
    },
    currentColor() {
      if (this.currentItem) {
        return this.currentItem.current.color ? this.currentItem.current.color : this.color
      } else {
        return this.color
      }
    },
    indicatorStylesObject() {
      if (this.currentItem) {
        const padding = 8;

        return {
          left: (this.currentItem.current.left - this.currentItem.parent.left) + padding + 'px',
          width: (this.currentItem.current.width - padding * 2) + 'px'
        }
      } else {
        return {}
      }

    },
    classesObject(){
      return {
        'pa-1 depressed': this.outlined,
      }
    }
  },

  watch: {
    value() {
      this.updateSlotList()
    },
    '$slots.default'() {
      this.updateSlotList()
    }
  },

  methods: {
    updateSlotList: async function () {
      await this.$nextTick();
      let items = [];
      this.$slots.default.forEach((item) => {
        //console.log(item.componentInstance.$options.propsData)
        items[item.data.key] = {
          current: Object.assign(item.componentInstance.$el.getBoundingClientRect(), item.componentInstance.$options.propsData),
          parent: item.componentInstance.$parent.$el.getBoundingClientRect()
        }
      })
      this.items = items
    }
  },

  mounted() {
    this.updateSlotList()
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-tab-list {
  display: flex;
  position: relative;
  gap: $gap;

  &.theme--dark {
    border-color: rgba(45, 49, 59, 1);
  }

  &__indicator {
    position: absolute;
    bottom: -1px;
    opacity: 0.6;
    transition-duration: 0.2s;
  }
}
</style>
