<template>
  <div ref="wrapper" class="d-select" v-bind="{...$props, ...$attrs}" @keyup.esc="dropdownOpen = false"
       @focusin="focusIn" @focusout="focusOut" @click.self="toggleDropdown" @keypress.enter="dropdownOpen = true"
       tabindex="0">
    <span v-if="search ? !dropdownOpen : true"  @click="toggleDropdown" style="width: 100%">
      <slot name="label" :item="itemsCopy[modelValue]" :index="modelValue">
        <span class="d-text-field__input__default">{{ itemsCopy[modelValue].value }}</span>
      </slot>
    </span>
    <input v-show="dropdownOpen && search" v-model="searchInput" class="d-text-field__input d-text-field__input__search"
           ref="searchBox"/>
    <DIconButton size="24" rounded="md" class="d-text-field__input__icon" tabindex="-1" @click="toggleDropdown">
      <SlideYDownTransition group :duration="150">
        <DIcon :name="angleIcon" color="currentColor"/>
      </SlideYDownTransition>
    </DIconButton>
    <DSelectMenu :items="itemsCopy" :modelValue="modelValue" @update:modelValue="onInput"
                 v-model:open="dropdownOpen" :mandatory="mandatory" :multiple="false" :index-key="indexKey"
                 :color="$props.color">
      <template v-slot:item="props">
        <slot name="item" v-bind="props">
          <span class="d-text-field__select__default">{{ props.value }}</span>
        </slot>
      </template>
    </DSelectMenu>
  </div>
</template>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({wrapper});
import {computed, nextTick, onBeforeMount, ref, watch} from "vue";
import DSelectMenu from "../../menu/DSelectMenu.vue";
import DIconButton from "../../button/DIconButton.vue";
import DIcon from "../../icon/DIcon.vue";
import defaultProps from "../../../mixins/DefaultProps";

const emit = defineEmits(['update:modelValue', 'removeFocus', 'focusout', 'focusin'])
const props = defineProps({
  modelValue: [Number, String],
  items: Array,
  indexKey: {type: String},
  mandatory: {type: Boolean},
  search: {type: Boolean},
  searchKey: {type: String, default: 'value'},
  ...defaultProps
})

const itemsCopy = ref(props.items);

const searchBox = ref<HTMLElement | null>(null);
const searchInput = ref("");

watch(searchInput, mapItems)
watch(() => props.items, mapItems)

function mapItems() {
  itemsCopy.value = props.items;
  if (!itemsCopy.value || !props.items) {
    return;
  }
  itemsCopy.value = props.items.map((item: any, i: number) => {
    if (!item[props.searchKey] || !searchInput.value.toLowerCase()) {
      return {...item, _show: true};
    }
    item = {...item, _show: item[props.searchKey].toString().toLowerCase().includes(searchInput.value.toLowerCase())};
    return item;
  });
}

const dropdownOpen = ref(false);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

watch(dropdownOpen, (value) => {
  if (value) {
    nextTick(() => {
      if (searchBox.value) {
        searchBox.value.focus();
      }
    })
  }
})

function onInput(val: any) {
  emit('update:modelValue', val)
  emit('removeFocus')
}

function focusOut() {
  emit('focusout');
}

function focusIn() {
  emit('focusin');
}

const angleIcon = computed(() => {
  return dropdownOpen.value ? 'times' : 'angle-down'
})

onBeforeMount(mapItems)
</script>

<style scoped lang="scss">
:deep(.d-select-menu__dropdown) {
  left: -1.2em;
  width: calc(100% + (1.2em * 2));
}

.d-text-field__input {
  cursor: pointer;
  user-select: none;
  position: relative;
  margin-top: 0.5em !important;
  margin-bottom: 0.5em !important;
  display: flex;

  &__search {
    margin-left: 0 !important;
    cursor: text;
  }

  &__icon {
    margin-left: auto;
    margin-right: -8px;
    align-self: center;
  }
}
</style>
