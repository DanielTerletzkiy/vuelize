<template>
  <DWrapper ref="wrapper" :classes="['d-image']"
            v-bind="{...$props, ...$attrs}">
    <DRow class="d-image-content" :class="{diffuse}" draggable="false" v-bind="{...$props, ...$attrs}"/>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DImage',
}
</script>

<script setup lang="ts">
import DRow from "../flex/DRow.vue";

const wrapper = ref(null);
defineExpose({wrapper});
import DWrapper from "../DWrapper.vue";
import defaultProps from "../../mixins/DefaultProps";
import {computed, onMounted, ref, watch} from "vue";

const props = defineProps({
  src: {type: String, required: true},
  alt: {type: String, required: false},
  diffuse: {type: Boolean, required: false},
  sharpEdge: {type: Boolean, required: false},
  blur: {type: String, default: '100px'},
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

<style scoped lang="scss">
.d-image {
  overflow: v-bind(overflow);

  &-content {
    height: v-bind(height);
    width: v-bind(width);
    background: v-bind(background) !important;
    user-select: none;
    display: block;
    object-fit: cover;
    background-size: cover;
    background-position: center;

    &.diffuse {
      align-self: center;
      object-fit: contain;
      background-origin: content-box;
      background-position: center;
      background-repeat: no-repeat;
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
        filter: blur(v-bind(blur));
        opacity: 0.4;
        transform: translateZ(-1px);
      }
    }
  }
}
</style>
