<template>
  <div v-bind="{...$props, ...$attrs}" @focusin="$emit('focusin')"
       @focusout="$emit('focusout')" @click.self="toggleDropdown" @keypress.enter="toggleDropdown" tabindex="0">
    <slide-y-down-transition group style="display: flex;">
      <div v-for="(item, i) in value.map(v=>items[v])" :key="i">
        <slot name="label" :item="item" :index="i">
          <d-label class="d-text-field__input__default">{{ item }}</d-label>
        </slot>
      </div>
    </slide-y-down-transition>
    <input v-model="search" @input="()=>dropdownOpen=true" @click.self="()=>dropdownOpen=true" v-bind="{...$props, ...$attrs}"
           class="d-text-field__input__autocomplete"/>
    <d-icon :name="angleIcon" class="d-text-field__input__icon"/>
    <d-select-menu width="0" v-bind="{...$props, ...$attrs}" :items="searchedItems" :inlined="false" :value="value"
                   @input="onInput"
                   :open.sync="dropdownOpen">
      <template slot="item" slot-scope="props">
        <slot name="item" v-bind="props"></slot>
      </template>
    </d-select-menu>
  </div>
</template>

<script>
export default {
  name: "d-autocomplete",

  props: {
    value: Array,
    items: Array,
    text: String
  },

  methods: {
    toggleDropdown() {
      this.dropdownOpen = true;
    },

    onInput(val) {
      this.$emit('input', val)
      this.$emit('removeFocus')
    }
  },

  computed: {
    angleIcon() {
      return this.dropdownOpen ? 'angle-up' : 'angle-down'
    },
    searchedItems() {
      const text = this.search.toLowerCase().split(' ');
      return this.items.map((item) => {
        item.activeSearch = item[this.text].toLowerCase().indexOf(text.toString()) !== -1;
        return item;
      })
    }
  },

  data: () => ({
    dropdownOpen: false,
    search: ''
  }),
}
</script>

<style scoped lang="scss">
.d-text-field__input {
  position: relative;
  padding-left: 12px !important;
  padding-top: 0.5em !important;
  padding-bottom: 0.5em !important;
  display: flex;

  .d-text-field__input__autocomplete {
    position: relative !important;
    padding-left: 8px !important;
  }

  .d-text-field__input__default {
    align-self: center;
    padding: 0 4px;
    width: 100%;
  }

  .d-text-field__input__icon {
    margin-left: auto;
    margin-right: -8px;
    align-self: center;
  }
}
</style>
