<template>
  <DWrapper ref="wrapper" :classes="['d-image-diffuse']"
            v-bind="{...$props, ...$attrs}">
    <div class="d-image-diffuse__content" draggable="false"
         v-bind="{...$props, ...$attrs}"/>
  </DWrapper>
</template>

<script lang="ts" setup>
import DWrapper from "../DWrapper.vue";
import defaultProps from "../../mixins/DefaultProps";
import {computed, onMounted, ref, watch} from "vue";

const wrapper = ref(null);
defineExpose({wrapper});

const props = defineProps({
  src: {type: String, required: true},
  alt: {type: String, required: false},
  sharpEdge: {type: Boolean, required: false},
  blurAmount: {type: String, default: '100px'},
  ...defaultProps
})

const background = computed(() => {
  return `url(${props.src})`
})

const overflow = computed(() => {
  return props.sharpEdge ? 'hidden' : ''
})

const width = ref('0px');
const height = ref('0px');

watch(background, watchLoad)

function watchLoad() {
  const img = new Image();
  img.onload = function () {
    //@ts-ignore
    width.value = props.width || this.width + 'px';
    //@ts-ignore
    height.value = props.height || this.height + 'px';
  };
  img.src = props.src;
}

onMounted(watchLoad)

</script>

<style lang="scss" scoped>
.d-image-diffuse {
  overflow: v-bind(overflow);

  &__content {
    border-radius: unset;
    user-select: none;
    display: block;
    background-size: cover;

    height: v-bind(height);
    width: v-bind(width);
    align-self: center;
    object-fit: contain;
    background-origin: content-box;
    background: v-bind(background) no-repeat center;
    position: relative;
    transform-style: preserve-3d;
    z-index: 0;

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: inherit;
      background-repeat: repeat-x;
      filter: blur(v-bind(blurAmount));
      opacity: 0.5;
      transform: translateZ(-1px);
    }
  }
}
</style>
