<template>
  <d-function-wrapper :classes="['d-chart']" v-bind="{...$props, ...$attrs}">
    <d-row class="d-chart__container" elevation-dark="1" elevation-light="n2">
      <d-column :wrap="false" class="py-0" style="width:30px">
        <d-spacer/>
        <d-card-subtitle style="align-self: end; transform: translate(0px,25px);" class="pa-0 px-2" height="50px"
                         v-for="i in Array.from(Array(maxValue+1).keys()).reverse()" :key="i">
          {{ i }}
        </d-card-subtitle>
        <div style="height: 30px"/>
      </d-column>
      <d-divider v-if="false" block vertical class="d-chart__container__vertical-divider" elevation="n6"/>
      <d-column block class="pa-0"
                :style="{overflow: 'auto', maxWidth: this.$innerWidth()-80 + 'px', borderRadius: '0 8px 0 0 !important'}"
                :wrap="false">
        <d-card elevation-dark="6" class="d-chart__container__chart"
                :style="`width: ${50*(columnItems.length)}px !important; height: 100% !important`">
          <component :is="variant" v-bind="{...$props, ...$attrs}" v-model="value" :columns="columns"/>
        </d-card>
        <d-divider v-if="false" class="d-chart__container__horizontal-divider" elevation="n6"/>
        <d-row :wrap="false">
          <d-card-subtitle class="pa-0 px-2"
                           style="justify-content: center; min-width: 50px; max-width: 50px; height: 30px; transform: translate(-25px,0px);"
                           height="30px" v-for="i in columnItems"
                           :key="i">
            {{ i }}
          </d-card-subtitle>
        </d-row>
      </d-column>
    </d-row>
  </d-function-wrapper>
</template>

<script>
import lines from "./variant/Lines"

export default {
  name: "d-chart",
  components: {
    lines
  },

  props: {
    value: {type: Array, required: true},
    variant: {type: String, default: "lines"},
    columns: {type: Array},
  },

  computed: {
    maxValue() {
      let maxValue = 0;
      this.value.forEach((item) => {
        item.points.forEach((dataPoint) => {
          if (maxValue < (typeof dataPoint.value === "number" ? dataPoint.value : dataPoint
          )) {
            maxValue = dataPoint.value ?? dataPoint
          }
        })
      })
      return maxValue
    },
    maxColumns() {
      let maxValue = 0;
      this.value.forEach((item) => {
        if (maxValue < item.points.length) {
          maxValue = item.points.length
        }
      })
      return maxValue
    },
    columnItems() {
      let items = []
      if (this.columns&&this.columns.length > 0) {
        items = this.columns
      }
      if (items.length < this.maxColumns) {
        const requiredColumns = this.maxColumns - items.length
        items.push(...Array.from({length: requiredColumns}, (_, i) => i + items.length))
      }
      console.log(items)
      return items
    }
  },

  methods: {}
}
</script>

<style scoped lang="scss">
.d-chart {
  width: max-content;

  &__container {
    align-items: stretch;
    position: relative;
    width: max-content;
    max-width: 100%;

    &__chart {
      border-radius: 0 8px 0 0 !important;
      min-width: 0 !important;
      width: auto !important;
      height: 100% !important;
    }

    &__horizontal-divider {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 30px;
    }
  }
}
</style>
