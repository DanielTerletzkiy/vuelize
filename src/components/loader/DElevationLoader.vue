<template>
  <DWrapper ref="wrapper" :classes="['d-elevation-loader']" v-bind="{...$props, ...$attrs}">
    <DRow class="d-elevation-loader__container" :width="(defaultSize*columns)+'px'">
      <DCard v-for="item in amount" :key="item" :rounded="Rounded.none" class="d-elevation-loader__container__pillar"
             :elevation="elevationMap[item-1]"
             :width="defaultSize+'px'"
             :height="defaultSize+'px'"
             :style="{transition: speed+'ms'}"
      />
    </DRow>
  </DWrapper>
</template>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({ wrapper });
import {Rounded} from "../../types/Vuelize";
import defaultProps from "../../mixins/DefaultProps";
import {onMounted, ref, watch} from "vue";
import DWrapper from "../DWrapper.vue";
import DRow from "../flex/DRow.vue";
import DCard from "../card/DCard.vue";


const props = defineProps({
  modelValue: {type: Boolean, default: true},

  amount: {type: Number, default: 9},
  columns: {type: Number, default: 3},
  speed: {type: Number, default: 200},
  defaultSize: {type: Number, default: 20},
  ...defaultProps
})

const elevationMap = ref<Array<string>>([]);

watch(() => props.modelValue, (state) => {
  if (state) {
    loop();
  }
})

onMounted(() => {
  loop();
})

const loop = async function () {
  while (props.modelValue) {
    for (let i = 0; i < props.amount; i++) {
      // @ts-ignore
      elevationMap.value[i] = ((Math.round(Math.random()) === 1 && 'n') + Math.round(Math.random() * 20)).toString();
    }
    await new Promise(resolve => setTimeout(resolve, props.speed))
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-elevation-loader {
  max-width: min-content;

  &__container {
    overflow: hidden;
  }
}
</style>
