<template>
  <d-function-wrapper :classes="['d-lines', ...classesObject]" v-bind="{...$props, ...$attrs}" :color="color">
    <fade-transition group style="width: 100%; height: 100%; position: absolute" v-if="hover">
      <d-label root-tag="d-card" elevation v-for="(dataPoint, i) in $refs[hover][0].getDataPoints" :key="dataPoint"
               ref="dataPointLabel"
               class="d-lines__label"
               :color="$refs[hover][0].color"
               :style="{left: dataPoint.split(',')[0].replace(/\D/g, '') + 'px', bottom: dataPoint.split(',')[1].replace(/\D/g, '') + 'px'}">
        <span class="d-lines__label__content">{{ getDataPointValue($refs[hover][0].value.points[i]) }}</span>
      </d-label>
    </fade-transition>
    <svg class="d-lines__flip">
      <defs v-if="showGrid">
        <pattern id="grid" :width="columnSpacing" :height="rowSpacing" patternUnits="userSpaceOnUse">
          <path :d="`M ${columnSpacing} 0 L 0 0 0 ${rowSpacing}`" fill="none" stroke-width="1"
                class="d-lines__grid"></path>
        </pattern>
      </defs>
      <rect x="0" width="100%" height="100%" fill="url(#grid)"></rect>
      <svg class="d-line__flip" ref="chart" :key="key">
        <SvgLine :ref="data.name" :value="data" v-for="(data, i) in value" :key="i" :columns="columns"
                 :color="data.color"
                 :id="data.name" @hover="setHover" v-bind="{...$props, ...$attrs}" :maxValue="maxValue"/>
        <fade-transition>
          <use v-if="hover" id="use" :key="hover" :xlink:href="'#'+hover"
               v-hover="{over: ()=>{this.hoverLock = true}, leave:()=>{this.hoverLock = false}}"/>
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
  props: {
    value: Array,
    columns: Array,
    showGrid: Boolean,
    rowSpacing: {type: [Number, String]},
    columnSpacing: {type: [Number, String]},
    maxValue: {type: [Number, String]}
  },

  data: () => ({
    key: 1,
    hover: null,
    hoverLock: false
  }),

  watch: {
    value() {
      this.key = Math.random();
      this.animatePaths();
      this.$forceUpdate();
    },
  },

  methods: {
    setHover: debounce(function (e) {
      if (!this.hoverLock) {
        this.hover = e
      }
      //console.log(this.$refs[this.hover][0].getDataPoints)
    }, 0),
    getDataPointValue(dataPoint) {
      let value = null;
      if (typeof dataPoint.value === "number") {
        value = dataPoint.value;
      } else {
        value = dataPoint;
      }
      return value.toFixed(2).replace(/(?:(\.\d*?[1-9]+)|\.)0*$/, "$1")
    },
    animatePaths() {
      new Vivus(this.$refs.chart, {
        type: 'delayed',
        duration: 250,
        animTimingFunction: Vivus.EASE
      }, () => {
      });
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

  &__label {
    position: absolute;
    transform: translateX(-50%) translateY(-10%);
    z-index: 1;

    &__content {
      font-size: 0.84rem;
    }

    &:hover {
      z-index: 2;
    }
  }

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
      stroke: rgba($light_card_text, .15)
    }
  }
}
</style>

