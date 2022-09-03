<template>
  <div v-bind="{...$props, ...$attrs}" @focusin="$emit('focusin')" @keyup.esc="dropdownOpen = false"
       @focusout="$emit('focusout')" @click.self="toggleDropdown" @keypress.enter="dropdownOpen = true"
       tabindex="0">
    <slot name="label" :item="items[modelValue]" :index="modelValue">
      <span class="d-text-field__input__default">{{ items[modelValue] }}</span>
    </slot>
    <DIconButton size="24" rounded="md" class="d-text-field__input__icon" tabindex="-1" @click="toggleDropdown">
      <SlideYDownTransition group :duration="150">
        <DIcon :name="angleIcon" color="currentColor"/>
      </SlideYDownTransition>
    </DIconButton>
    <DSelectMenu :items="items" :modelValue="modelValue" @update:modelValue="onInput"
                 v-model:open="dropdownOpen" :mandatory="mandatory" :multiple="false" :index-key="indexKey" :color="$props.color">
      <template v-slot:item="props">
        <slot name="item" v-bind="props"></slot>
      </template>
    </DSelectMenu>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import DSelectMenu from "../../menu/DSelectMenu.vue";
import DIconButton from "../../button/DIconButton.vue";
import DIcon from "../../icon/DIcon.vue";
import defaultProps from "../../../mixins/DefaultProps";

const emit = defineEmits(['update:modelValue', 'removeFocus'])
const props = defineProps({
  modelValue: [Number, String],
  items: Array,
  indexKey: {type: String},
  mandatory: {type: Boolean},
  ...defaultProps
})

const dropdownOpen = ref(false);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function onInput(val: any) {
  emit('update:modelValue', val)
  emit('removeFocus')
}

const angleIcon = computed(() => {
  return dropdownOpen.value ? 'times' : 'angle-down'
})
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
  }

  .d-text-field__input__icon {
    margin-left: auto;
    margin-right: -8px;
    align-self: center;
  }
}
</style>
