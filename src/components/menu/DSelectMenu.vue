<template>
  <DWrapper :classes="['d-select-menu']" v-bind="{...$props, ...$attrs}">
    <SlideYUpTransition :duration="80">
      <DCard v-if="open" class="d-select-menu__dropdown pa-0" elevation="4"
              v-click-outside="hideSelectMenu">
        <DList :value="modelValue"
                @input="onInput"
                color="primary" class="d-select-menu__dropdown__list pa-0" rounded="none">
          <DListItem v-for="(item, index) in items" :key="index"
                       :color="item.color || ''"
                       :tabindex="0" ref="item">
            <slot name="item" :item="item" :index="index">
              {{ item }}
            </slot>
          </DListItem>
        </DList>
      </DCard>
    </SlideYUpTransition>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DSelectMenu',
}
</script>

<script setup lang="ts">
import {ref, watch} from "vue";
import DWrapper from "../DWrapper.vue";
import DCard from "../card/DCard.vue";
import DList from "../list/DList.vue";
import DListItem from "../list/DListItem.vue";

const emit = defineEmits(['update:modelValue', 'update:open']);

const props = defineProps({
  modelValue: [Number, String, Array],
  open: {type: Boolean},
  items: {type: Array}
})

const currentItem = ref(-1);

watch(() => props.open, (state) => {
  if (state) {
    currentItem.value = -1
  }
})

watch(() => props.items, () => {
  currentItem.value = -1
})

function hideSelectMenu() {
  emit('update:open', false)
}

function onInput(e: Event) {
  emit('update:modelValue', e)
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
      gap: 0 !important;
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
