<template>
  <DWrapper :classes="['d-avatar']" v-bind="{...$props, ...$attrs}">
    <slot>
      <DImage class="d-avatar__image" :src="src" :rounded="rounded"/>
    </slot>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DAvatar',
}
</script>

<script setup lang="ts">
import DWrapper from "../DWrapper.vue";
import DImage from "../image/DImage.vue";
import {computed, ref} from "vue";
import defaultProps from "../../mixins/DefaultProps";

const props = defineProps({
  src: {type: String},
  size: {type: [String, Number], default: 50},
  ...defaultProps
})

const size = computed(() => props.size + 'px');
</script>

<style scoped lang="scss">
.d-avatar {
  height: v-bind(size);
  width: v-bind(size);

  background: currentColor;

  display: flex;
  justify-content: center;
  align-items: center;

  transition-duration: 0.2s;

  overflow: hidden;

  &__image {
    width: inherit;
    height: inherit;
    border-radius: inherit;
    object-fit: cover;
  }
}
</style>
