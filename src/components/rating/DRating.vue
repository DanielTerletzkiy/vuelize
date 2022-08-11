<template>
  <DWrapper :classes="['d-rating']" v-bind="{...$props, ...$attrs}">
    <DRow disabled>
      <DIconButton v-for="star in stars" :key="star" :color="color" :size="size">
        <DIcon :name="star.icon" :icon-style="star.iconType" :size="size"/>
      </DIconButton>
    </DRow>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DRating',
}
</script>

<script setup lang="ts">
//todo add user click select rating
import DWrapper from "../DWrapper.vue";
import DRow from "../flex/DRow.vue";
import defaultProps from "../../mixins/DefaultProps";
import {computed} from "vue";
import {Style} from "vue3-unicons/types/Unicon";
import DIconButton from "../button/DIconButton.vue";
import DIcon from "../icon/DIcon.vue";
import {toNumber} from "lodash";

const props = defineProps({
  modelValue: {type: Number, default: 0},
  amount: {type: Number, default: 5},
  max: {type: Number, default: null},
  size: {type: Number, default: 24},
  ...defaultProps
})

type Star = {
  icon: string,
  iconType: Style,
  value: number
}

const stars = computed<Star[]>(() => {
  let array: Star[] = [];
  const percentage = (100 * props.modelValue) / (props.max ? props.max : props.amount);

  const scale = (number: number, [inMin, inMax]: number[], [outMin, outMax]: number[]) => {
    return (number - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
  }

  const mapped = toNumber(scale(percentage, [0, 100], [0, props.amount]).toPrecision(2));
  console.log(percentage, mapped, Math.max(0, Math.min(props.amount, props.modelValue)))
  for (const position of [...Array(props.amount).keys()]) {

    const isHalve = mapped < position + 1 && mapped > position;
    let icon = isHalve ? 'star-half-alt' : 'star';
    let iconType = mapped <= position ? Style.LINE : isHalve ? Style.MONO : Style.SOLID;
    array.push({
      icon,
      iconType,
      value: position
    })
  }
  return array;
})

</script>

<style scoped>

</style>
