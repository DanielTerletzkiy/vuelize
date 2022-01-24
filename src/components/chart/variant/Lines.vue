<template>
  <d-function-wrapper :classes="['d-lines', ...classesObject]" v-bind="{...$props, ...$attrs}" :color="color">
    <svg class="d-lines__flip">
      <defs>
        <pattern id="grid" :width="gridSize" :height="gridSize" patternUnits="userSpaceOnUse">
          <path :d="`M ${gridSize} 0 L 0 0 0 ${gridSize}`" fill="none" stroke-width="1" class="d-lines__grid"></path>
        </pattern>
      </defs>
      <rect x="0" width="100%" height="100%" fill="url(#grid)"></rect>
      <svg class="d-line__flip" ref="chart" :key="key">
        <SvgLine :value="data" v-for="(data, i) in value" :key="i" :columns="columns" :color="data.color"
                 :id="data.name" @hover="setHover"/>
        <fade-transition>
          <use v-if="hover" id="use" :key="hover" :xlink:href="'#'+hover"/>
        </fade-transition>
      </svg>
    </svg>
  </d-function-wrapper>
</template>

<script>
import SvgLine from "@/components/chart/variant/SvgLine";
import debounce from "lodash/debounce";

import Vivus from "vivus"

export default {
  name: "d-lines",
  components: {SvgLine},
  props: {value: Array, columns: Array, gridSize: {type: [Number,String], default: 50}},

  data: () => ({
    key: 1,
    hover: null
  }),

  watch: {
    value(){
      this.key = Math.random();
      this.animatePaths();
      this.$forceUpdate();
    },
  },

  methods: {
    setHover: debounce(function (e){
      this.hover = e
    },100),
    animatePaths(){
      new Vivus(this.$refs.chart, {
        type: 'delayed',
        duration: 250,
        animTimingFunction: Vivus.EASE
      }, ()=>{console.log('ok')});
    }
  },

  mounted() {
    this.animatePaths();
  }
}
</script>
<style scoped lang="scss">
@import "../../../styles/variables";

.d-lines {
  height: 100%;
  width: 100% !important;
  position: relative;

  &__flip {
    transform: scale(1, -1);
    width: 100%;
    height: 100%;
  }

  &.theme--dark {
    .d-lines__grid {
      stroke: rgba($dark_card_text, .2)
    }
  }

  &.theme--light {
    .d-lines__grid {
      stroke: rgba($light_card_text, .1)
    }
  }
}
</style>

