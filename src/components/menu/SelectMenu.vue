<template>
  <d-function-wrapper :classes="['d-select-menu']" v-bind="{...$props, ...$attrs}">
    <d-card v-if="open" class="d-select-menu__dropdown pa-0" elevation="4">
      <d-list v-model="value" color="primary" class="pa-0" rounded="none">
        <d-list-item v-for="(item, index) in items" :key="index">
          <slot name="item" :item="item" :index="index">
            {{ item }}
          </slot>
        </d-list-item>
      </d-list>
    </d-card>
  </d-function-wrapper>
</template>

<script>
import DCard from "@/components/card/Card";
import DList from "@/components/list/List";
import DListItem from "@/components/list/ListItem";

export default {
  name: "d-select-menu",
  components: {DCard, DList, DListItem},

  props: {
    value: Number,
    open: Boolean,
    items: Array
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
    width: 100%;
    top: 54px;
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
