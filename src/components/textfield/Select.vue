<template>
  <div v-bind="{...$props, ...$attrs}" @focusin="$emit('focusin')"
       @focusout="$emit('focusout')" @click="toggleDropdown" @keypress.enter="toggleDropdown"
       v-click-outside="hideDropdown" tabindex="0">
    <slot name="item" :item="items[value]" :index="value">
      {{ item }}
    </slot>
    <d-select-menu v-bind="{...$props, ...$attrs}" v-model="value" :open="dropdownOpen">
      <template slot="item" slot-scope="props">
        <slot name="item" v-bind="props"></slot>
      </template>
    </d-select-menu>
  </div>
</template>

<script>

import DSelectMenu from "@/components/menu/SelectMenu";

export default {
  name: "d-select",
  components: {DSelectMenu},

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
    },
    toggleDropdown(){
      this.dropdownOpen = !this.dropdownOpen;
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
}
</style>
