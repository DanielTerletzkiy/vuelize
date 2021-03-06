<template>
  <DWrapper :classes="['d-dot-loader']" v-bind="{...$props, ...$attrs}">
    <DRow class="d-dot-loader__container" :wrap="false" gap>
      <DAvatar class="d-dot-loader__container__dot" v-for="i in Array.from(Array(amount).keys())" :key="i"
               ref="dot"
               :style="{transform: currentDot.value === i ? 'scale(200%)' : 'scale(100%)'}"
               :size="defaultSize"
               :color="color" rounded="circle">
        <div/>
      </DAvatar>
    </DRow>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DDotLoader',
}
</script>

<script setup lang="ts">
import defaultProps from "../../mixins/DefaultProps";
import {onMounted, reactive, ref, watch} from "vue";
import DWrapper from "../DWrapper.vue";
import DRow from "../flex/DRow.vue";
import DAvatar from "../avatar/DAvatar.vue";

const props = defineProps({
  modelValue: {type: Boolean, default: true},

  amount: {type: Number, required: true, default: 3},
  speed: {type: Number, default: 400},
  delay: {type: Number, default: 0},
  defaultSize: {type: Number, default: 12},
  sideToSide: {type: Boolean},
  ...defaultProps
})

const currentDot = ref<number>(-1);
const backwards = ref<boolean>(false);

watch(() => props.modelValue, (state) => {
  if (state) {
    loop();
  } else {
    currentDot.value = -1;
    backwards.value = false;
  }
})

onMounted(() => {
  loop();
})

const loop = async function () {
  while (props.modelValue) {
    if (props.sideToSide) {
      if (backwards.value) {
        currentDot.value--;
        if (currentDot.value <= 0) {
          backwards.value = false
          await new Promise(resolve => setTimeout(resolve, props.delay))
        }
      } else {
        currentDot.value++;
        if (currentDot.value >= props.amount - 1) {
          backwards.value = true
          await new Promise(resolve => setTimeout(resolve, props.delay))
        }
      }
    } else {
      currentDot.value++;
      if (currentDot.value >= props.amount) {
        currentDot.value = 0
        await new Promise(resolve => setTimeout(resolve, props.delay))
      }
    }
    await new Promise(resolve => setTimeout(resolve, props.speed))
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-dot-loader {
  max-width: min-content;

  &__container {
    gap: $gap * 1.6;
    padding: $gap * 2;
    max-height: 20px;

    &__dot {
      transition-duration: 0.6s;
    }
  }
}
</style>
