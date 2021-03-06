<template>
  <DWrapper :classes="['d-label', {filled, 'glow': true, 'glow--active': !filled, clickable}]"
            v-bind="{...$props, ...$attrs}"
            @click="$emit('click')" v-ripple="clickable && {
              color: filled ? contrast :'currentColor'
            }">
    <DCardSubtitle class="d-label__wrapper__content py-1 px-4"
                   :color="filled?contrast:'inherit'"
                   rounded="inherit">
      <span class="prefix" v-if="!!$slots.prefix">
            <slot name="prefix"></slot>
      </span>
      <span class="center">
        <slot name="default"></slot>
      </span>
      <span class="suffix" v-if="!!$slots.suffix">
            <slot name="suffix"></slot>
      </span>
    </DCardSubtitle>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DLabel',
}
</script>

<script setup lang="ts">
import DWrapper from "../DWrapper.vue";
import DCardSubtitle from "../card/text/DCardSubtitle.vue";
import {computed, inject} from "vue";
import defaultProps from "../../mixins/DefaultProps";

const vuelize: any = inject('vuelize');

const props = defineProps({
  filled: {type: Boolean},
  clickable: {type: Boolean},
  ...defaultProps
})

const color = computed(() => vuelize.getColor(props.color, props.tint));
const contrast = computed(() => vuelize.getColorContrast(props.color, props.tint));
</script>

<style scoped lang="scss">
.d-label {
  height: min-content;
  width: max-content;
  font-weight: 600;

  &.filled {
    background: v-bind(color);
  }

  &.clickable {
    cursor: pointer;
  }

  &__wrapper {
    &__content {
      width: max-content;
      gap: 4px;
    }
  }

  .prefix {
    margin-left: -10px;
    display: flex;
  }

  .suffix {
    margin-right: -10px;
    display: flex;
  }
}
</style>
