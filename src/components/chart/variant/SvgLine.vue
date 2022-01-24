<template>
  <d-function-wrapper root-tag="g" :classes="['d-svg-line', ...classesObject]" v-bind="{...$props, ...$attrs}" v-hover="{over: ()=>{this.$emit('hover',value.name)}, leave:()=>{this.$emit('hover',null)}}">
      <linearGradient :id="'grad'+value.color" x1="0%" y1="0%" x2="0%" y2="100%" class="d-svg-line__gradient">
        <stop offset="0%" class="d-svg-line__gradient__end"></stop>
        <stop offset="100%" class="d-svg-line__gradient__start"></stop>
      </linearGradient>

      <path :fill="`url(#grad${value.color})`" class="d-svg-line__gradient" stroke-width="0" :d="getGradientPoints"></path>

      <path fill="none" stroke="currentColor" class="d-svg-line__path" style="height:100%; width:100%" stroke-width="2"
            :d="getDataPoints"></path>
      <g>
        <circle v-for="points in getDataPoints" :key="points" :cx="points.split(',')[0].replace(/\D/g, '')"
                :cy="points.split(',')[1].replace(/\D/g, '')" r="4" fill="currentColor"></circle>
      </g>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "SvgLine",

  props: {value: Object, columns: Array},

  computed: {
    getDataPoints() {
      let points = [];
      this.value.points.forEach((dataPoint, i) => {
        let point = ""
        if (i === 0) {
          point += "M";
        }
        if (!dataPoint.column) {
          point += i * 50
        } else {
          point += this.columns.indexOf(dataPoint.column) * 50;
        }
        point += ","
        point += this.getValue(dataPoint) * 50;
        points.push(point);
      })
      console.log(points);
      return points
    },
    getGradientPoints() {
      let points = ['M0,-100'];

      let point = "";
      if (!this.value.points[0].column) {
        point += 0
      } else {
        point += this.columns.indexOf(this.value.points[0].column) * 50;
      }
      point += ",0";
      points.push(point);

      this.value.points.forEach((dataPoint, i) => {
        let point = ""
        if (!dataPoint.column) {
          point += i * 50
        } else {
          point += this.columns.indexOf(dataPoint.column) * 50;
        }
        point += ","
        point += this.getValue(dataPoint) * 50;
        points.push(point);
      })
      point = "";
      if (!this.value.points[this.value.points.length - 1].column) {
        point += (this.value.points.length - 1) * 50
      } else {
        point += this.columns.indexOf(this.value.points[this.value.points.length - 1].column) * 50;
      }
      point += ",-100";
      points.push(point);


      return points
    }
  },

  methods: {
    getValue(dataPoint) {
      if (typeof dataPoint.value === "number") {
        return dataPoint.value;
      } else {
        return dataPoint;
      }
    }
  }

}
</script>

<style scoped lang="scss">
@import "../../../styles/variables";

.d-svg-line {
  position: absolute;
  height: 100%;
  width: 100%;

  @keyframes dash {
    from {
      stroke-dashoffset: 1000;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  &__gradient {
    &__start {
      stop-color: currentColor;
      stop-opacity: 0.6;
    }

    &__end {
      stop-opacity: 0;

    }
  }

  &.theme--dark {
    .d-svg-line__gradient__end {
      stop-color: transparent;
    }
  }

  &.theme--light {
    .d-svg-line__gradient__end {
      stop-color: white;
    }
  }

}
</style>
