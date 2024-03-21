<template>
  <DWrapper
    ref="wrapper"
    :classes="['d-rating']"
    v-bind="{...$props, ...$attrs}"
  >
    <DRow disabled>
      <DIconButton
        v-for="star in stars"
        :key="star.value"
        :color="color"
        :size="size"
      >
        <DIcon
          :name="star.icon"
          :size="size"
        />
      </DIconButton>
    </DRow>
  </DWrapper>
</template>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({ wrapper });
//todo add user click select rating
import DWrapper from "../DWrapper.vue";
import DRow from "../flex/DRow.vue";
import defaultProps from "../../props/default.props";
import {computed, ref} from "vue";
import DIconButton from "../button/DIconButton.vue";
import DIcon from "../icon/DIcon.vue";

const props = defineProps({
  modelValue: {type: Number, default: 0},
  amount: {type: Number, default: 5},
  max: {type: Number, default: null},
  size: {type: Number, default: 24},
  ...defaultProps
})

type Star = {
  icon: string,
  //iconType: string,
  value: number
}

const stars = computed<Star[]>(() => {
  let array: Star[] = [];
  const percentage = (100 * props.modelValue) / (props.max || props.amount);

  const scale = (number: number, [inMin, inMax]: number[], [outMin, outMax]: number[]) => {
    return (number - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
  }

  const mapped = parseFloat(scale(percentage, [0, 100], [0, props.amount]).toPrecision(2));
  for (const position of [...Array(props.amount).keys()]) {

    const isHalve = mapped < position + 1 && mapped > position;
    let icon = isHalve ? 'star-half-alt' : 'star';
    //TODO find good star icons
    //let iconType = mapped <= position ? Style.LINE : isHalve ? Style.MONO : Style.SOLID;
    array.push({
      icon,
      //iconType,
      value: position
    })
  }
  return array;
})

</script>

<style scoped>

</style>
