<template>
  <div v-bind="{...$props, ...$attrs}" @focusin="$emit('focusin')"
       @focusout="$emit('focusout')" @click="toggleDropdown" @keypress.enter="dropdownOpen = true"
       tabindex="0">
    <slot name="item" v-ripple :item="items[value]" :index="value">
      <span class="d-text-field__input__default">{{ items[value] }}</span>
    </slot>
    <d-icon-button size="24" rounded="md" class="d-text-field__input__icon">
      <d-icon :name="angleIcon"/>
    </d-icon-button>
    <d-select-menu v-bind="{...$props, ...$attrs}" :inlined="false" :value="value" @input="onInput"
                   :open.sync="dropdownOpen">
      <template slot="item" slot-scope="props">
        <slot name="item" v-bind="props"></slot>
      </template>
    </d-select-menu>
  </div>
</template>

<script>
export default {
  name: "d-select",

  props: {
    value: [Number, String],
    items: Array,
  },

  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },

    onInput(val) {
      this.toggleDropdown()
      this.$emit('input', val)
      this.$emit('removeFocus')
    }
  },

  computed: {
    angleIcon() {
      return this.dropdownOpen ? 'angle-up' : 'angle-down'
    }
  },

  data: () => ({
    dropdownOpen: false
  }),
}
</script>

<style scoped lang="scss">
.d-text-field__input {
  user-select: none;
  cursor: default;
  position: relative;
  padding-top: 0.5em !important;
  padding-bottom: 0.5em !important;
  display: flex;

  .d-text-field__input__default {
    align-self: center;
  }

  .d-text-field__input__icon {
    margin-left: auto;
    margin-right: -8px;
    align-self: center;
  }
}
</style>
