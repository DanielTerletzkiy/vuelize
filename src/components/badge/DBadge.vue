<template>
  <DWrapper
    ref="wrapper"
    :classes="['d-badge']"
    v-bind="{...$props, ...$attrs}"
    @click="$emit('click')"
  >
    <slot name="default" />
    <fade-transition>
      <DCard
        v-if="value"
        v-bind="{...$props, ...$attrs}"
        :min-width="size+'px'"
        :height="size+'px'"
        rounded="pill"
        class="d-badge__content"
      >
        <DCardSubtitle
          :color="$vuelize.getColorContrast(color)"
          class="d-badge__content__text"
        >
          <slot name="content" />
        </DCardSubtitle>
      </DCard>
    </fade-transition>
  </DWrapper>
</template>

<script setup lang="ts">
import defaultProps from "../../props/default.props";
import DWrapper from "../DWrapper.vue";
import DCard from "../card/DCard.vue";
import DCardSubtitle from "../card/text/DCardSubtitle.vue";
import {ref} from "vue";

const wrapper = ref(null);
defineExpose({ wrapper });

const props = defineProps({
  value: {type: Boolean, default: true},
  size: {type: [String, Number], default: 22},
  color: {type: String},
  ...defaultProps
})

const size = ref(props.size + 'px');
</script>

<style scoped lang="scss">
.d-badge {
  position: relative;

  &__content {
    height: v-bind(size);
    width: v-bind(size);

    position: absolute;
    top: -12px;
    right: -12px;
    display: flex;
    justify-content: center;

    &__text {
      padding: 0 6px;
    }
  }
}
</style>
