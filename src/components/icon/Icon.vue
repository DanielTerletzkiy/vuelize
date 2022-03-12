<template>
  <div>
    <svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">
      <linearGradient :id="this.uuid" x1="0%" y1="0%" x2="100%" y2="0%"
                      :gradientTransform="`rotate(${gradientRotation})`" v-if="gradient">
        <stop v-for="{offset, color} in gradient" :key="offset" :offset="offset+'%'"
              :stop-color="processColor(color || 'currentColor')"/>
      </linearGradient>
    </svg>
    <unicon class="d-icon unicon--large" :name="name" :width="size" :height="size" :icon-style="iconStyle"
            :fill="`url(#${this.uuid}) ${this.processColor(color || 'currentColor',tint)}`"
            @click="$emit('click')"></unicon>
  </div>
</template>

<script>
export default {
  name: "d-icon",

  props: {
    name: {type: String, required: true},
    iconStyle: String,
    size: [String, Number],
    gradient: Array,
    gradientRotation: {type: [String, Number], default: 0},
  }
}
</script>

<style scoped lang="scss">
.unicon {
  display: flex;
}
</style>
