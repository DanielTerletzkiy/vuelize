<template>
  <DWrapper
    ref="wrapper"
    :classes="['d-select-menu']"
    :color="{
      map: [
        {
          color: null,
          property: ThemeSheetProperty.card
        },
      ]
    }"
    @keyup.esc="hideSelectMenu"
  >
    <TransitionSlide :duration="150">
      <DCard
        v-if="open && items"
        v-click-outside="hideSelectMenu"
        v-bind="{...$props, ...$attrs}"
        class="d-select-menu__dropdown pa-0"
        :blur="BlurAmount.strong"
      >
        <DList
          :model-value="modelValue"
          :multiple="multiple"
          :mandatory="mandatory"
          :color="color"
          class="d-select-menu__dropdown__list pa-0"
          rounded="none"
          @update:model-value="onInput"
        >
          <DLazy
            v-for="(item, index) in items"
            v-show="item._show"
            :key="item[indexKey] || index"
            :min-height="40"
            un-render
          >
            <DListItem
              :key="item[indexKey] || index"
              ref="item"
              :color="item.color || 'currentColor'"
              :tabindex="0"
            >
              <slot
                name="item"
                :item="item"
                :index="index"
              >
                {{ item }}
              </slot>
            </DListItem>
          </DLazy>
        </DList>
      </DCard>
    </TransitionSlide>
  </DWrapper>
</template>

<script setup lang="ts">
import DLazy from "../DLazy.vue";
import {ref, watch} from "vue";
import DWrapper from "../DWrapper.vue";
import DCard from "../card/DCard.vue";
import DList from "../list/DList.vue";
import DListItem from "../list/DListItem.vue";
import {TransitionSlide} from "@morev/vue-transitions";
import defaultProps from "../../props/default.props";
import {BlurAmount, ThemeSheetProperty} from "../../types";

const wrapper = ref(null);
defineExpose({wrapper});

const emit = defineEmits(['update:modelValue', 'update:open']);

const props = defineProps({
    modelValue: {type: [Number, String, Array], required: true},
    open: {type: Boolean},
    items: {type: Array, required: true},
    indexKey: {type: String, required: true},
    multiple: {type: Boolean},
    mandatory: {type: Boolean},
    ...defaultProps
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
    if (!props.multiple) {
        emit('update:open', false)
    }
}

function onInput(e: number | Array<number>) {
    emit('update:modelValue', e)
    hideSelectMenu()
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

        top: 100%;
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
