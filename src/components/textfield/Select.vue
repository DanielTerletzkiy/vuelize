<template>
  <div v-bind="{...$props, ...$attrs}" @focusin="$emit('focusin')"
       @focusout="$emit('focusout')" @click="dropdownOpen = !dropdownOpen"
       v-click-outside="hideDropdown" tabindex="0">
    <slot name="item" :item="items[value]" :index="value">
      {{ item }}
    </slot>
    <d-card v-if="dropdownOpen" class="d-text-field__input__dropdown pa-0" elevation="4">
      <d-list v-model="value" color="primary" class="pa-0" rounded="none">
        <d-list-item v-for="(item, index) in items" :key="index">
          <slot name="item" :item="item" :index="index">
            {{ item }}
          </slot>
        </d-list-item>
      </d-list>
    </d-card>
  </div>
</template>

<script>
import DCard from "@/components/card/Card";
import DList from "@/components/list/List";
import DListItem from "@/components/list/ListItem";

export default {
  name: "d-select",
  components: {DListItem, DList, DCard},

  props: {
    value: Number,
    items: Array,
  },

  watch: {
    value(val) {
      this.$emit('input', val)
      this.$emit('removeFocus')

    }
  },

  methods: {
    hideDropdown() {
      this.dropdownOpen = false;
    }
  },

  data: () => ({
    dropdownOpen: false
  }),
}
</script>

<style scoped lang="scss">
.d-text-field__input {
  position: relative;
  padding: inherit;
  padding-top: 0.5em !important;
  padding-bottom: 0.5em !important;

  &__dropdown {
    position: absolute;
    z-index: 1;
    box-sizing: inherit;
    width: 100%;
    top: 54px;
    left: 0;
  }

  .d-list > div {
    &:first-child {
      border-radius: 8px 8px 0 0;
    }

    &:last-child {
      border-radius: 0 0 8px 8px;
    }
  }
}
</style>
