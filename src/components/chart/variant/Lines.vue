<template>
  <d-function-wrapper
    :classes="['d-lines', ...classesObject]"
    v-bind="{...$props, ...$attrs}"
    :color="color"
  >
    <fade-transition
      v-if="hover"
      group
      style="width: 100%; height: 100%; position: absolute"
    >
      <d-label
        v-for="(dataPoint, i) in $refs[hover][0].getDataPoints"
        :key="dataPoint"
        ref="dataPointLabel"
        root-tag="d-card"
        class="d-lines__label"
        filled
        :color="$refs[hover][0].color"
        :style="{left: dataPoint.split(',')[0].replace(/\D/g, '') + 'px', bottom: dataPoint.split(',')[1].replace(/\D/g, '') + 'px'}"
      >
        <span class="d-lines__label__content">{{ getDataPointValue($refs[hover][0].value.points[i]) }}</span>
      </d-label>
    </fade-transition>
    <svg
      v-hover="{over: ()=>{mainHover = true}, leave:()=>{mainHover = false}}"
      class="d-lines__flip"
    >
      <defs v-if="showGrid">
        <pattern
          id="grid"
          :width="columnSpacing"
          :height="rowSpacing"
          patternUnits="userSpaceOnUse"
        >
          <path
            :d="`M ${columnSpacing} 0 L 0 0 0 ${rowSpacing}`"
            fill="none"
            stroke-width="1"
            class="d-lines__grid"
          />
        </pattern>
      </defs>
      <rect
        x="0"
        width="100%"
        height="100%"
        fill="url(#grid)"
      />

      <svg
        ref="chart"
        :key="key"
        class="d-line__flip"
      >
        <SvgLine
          v-for="(data, i) in value"
          :id="data.name"
          :ref="data.name"
          :key="i"
          :value="data"
          :columns="columns"
          :color="data.color"
          v-bind="{...$props, ...$attrs}"
          :max-value="maxValue"
          @hover="setHover"
        />
        <fade-transition>
          <use
            v-if="hover"
            id="use"
            :key="hover"
            v-hover="{over: ()=>{hoverLock = true}, leave:()=>{hoverLock = false}}"
            :xlink:href="'#'+hover"
          />
        </fade-transition>
      </svg>

      <path
        ref="cursor"
        :d="`M${cursorPosition} 0 v0 ${(rowLines+1)*rowSpacing}`"
        stroke-width="2"
        stroke-linecap="round"
        style="transition: 0.2s"
        stroke="currentColor"
      />
    </svg>
  </d-function-wrapper>
</template>

<script>
import SvgLine from "../variant/SvgLine";
import debounce from "lodash/debounce";

import Vivus from "vivus"

export default {
  name: "DLines",
  components: {SvgLine},
  props: {
    value: Array,
    columns: Array,
    showGrid: Boolean,
    rowSpacing: {type: [Number, String]},
    columnSpacing: {type: [Number, String]},
    rowLines: {type: [String, Number]},
    maxValue: {type: [Number, String]},
  },

  data: () => ({
    key: 1,
    hover: null,
    hoverLock: false,
    mainHover: false,

    cursorPosition: -100
  }),

  watch: {
    value() {
      this.key = Math.random(); //update everything properly
      this.animatePaths();
      this.$forceUpdate();
    },
    mainHover(state) {
      if (state) {
        window.addEventListener('mousemove', this.updateCursor);
      } else {
        setTimeout(() => {
          this.cursorPosition = -100;
        }, 10)
        window.removeEventListener('mousemove', this.updateCursor);
      }
    }
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
    },
    updateCursor: debounce(function (e) {
      const rect = this.$refs.chart.getBoundingClientRect();
      const x = e.clientX - rect.left;
      this.cursorPosition = Math.round(x / this.columnSpacing) * this.columnSpacing;
    }, 1)
  },

  mounted() {
    this.animatePaths();
  },

  unmounted() {
    window.removeEventListener('mousemove', this.updateCursor);
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

  &.dark {
    .d-lines__grid {
      stroke: rgba($dark_card_text, .2)
    }
  }

  &.light {
    .d-lines__grid {
      stroke: rgba($light_card_text, .15)
    }
  }
}
</style>

