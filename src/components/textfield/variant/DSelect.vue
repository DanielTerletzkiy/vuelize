<template>
  <div class="d-select" v-bind="{...$props, ...$attrs}" @keyup.esc="dropdownOpen = false"
       @focusin="focusIn" @focusout="focusOut" @click.self="toggleDropdown" @keypress.enter="dropdownOpen = true"
       tabindex="0">
    <slot v-if="search ? !dropdownOpen : true" name="label" :item="itemsCopy[modelValue]" :index="modelValue">
      <span class="d-text-field__input__default">{{ itemsCopy[modelValue] }}</span>
    </slot>
    <input v-show="dropdownOpen && search" v-model="searchInput" class="d-text-field__input d-text-field__input__search" ref="searchBox"/>
    <DIconButton size="24" rounded="md" class="d-text-field__input__icon" tabindex="-1" @click="toggleDropdown">
      <SlideYDownTransition group :duration="150">
        <DIcon :name="angleIcon" color="currentColor"/>
      </SlideYDownTransition>
    </DIconButton>
    <DSelectMenu :items="itemsCopy" :modelValue="modelValue" @update:modelValue="onInput"
                 v-model:open="dropdownOpen" :mandatory="mandatory" :multiple="false" :index-key="indexKey"
                 :color="$props.color">
      <template v-slot:item="props">
        <slot name="item" v-bind="props"></slot>
      </template>
    </DSelectMenu>
  </div>
</template>

<script setup lang="ts">
import {computed, nextTick, onBeforeMount, onMounted, Ref, ref, toRef, watch} from "vue";
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
watch(()=>props.items, mapItems)

function mapItems(){
  itemsCopy.value = props.items;
  if(!itemsCopy.value || !props.items){
    return;
  }
  const copy = props.items.map((item: any, i: number)=>{
    if(!item[props.searchKey] || !searchInput.value.toLowerCase()){
      return {...item, _show: true};
    }
    item = {...item, _show: item[props.searchKey].toString().toLowerCase().includes(searchInput.value.toLowerCase())};
    return item;
  })
  itemsCopy.value = copy;
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
.d-text-field__input {
  user-select: none;
  position: relative;
  padding-top: 0.5em !important;
  padding-bottom: 0.5em !important;
  display: flex;

  &__search {
    padding-left: 0 !important;
  }

  &__icon {
    margin-left: auto;
    margin-right: -8px;
    align-self: center;
  }
}
</style>
