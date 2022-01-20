<template>
  <d-function-wrapper :classes="['d-dot-loader']" v-bind="{...$props, ...$attrs}">
    <d-row class="d-dot-loader__container" :wrap="false">
      <d-avatar class="d-dot-loader__container__dot" v-for="i in Array.from(Array(this.amount).keys())" :key="i"
                ref="dot"
                :style="{transform: currentDot === i ? 'scale(150%)' : 'scale(100%)'/*, zIndex:currentDot === i? 1 : 0*/}"
                :size="defaultSize"
                :color="color" rounded="circle">
        <div/>
      </d-avatar>
    </d-row>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-dot-loader",

  props: {
    value: {type: Boolean, default: true},

    amount: {type: Number, required: true, default: 3},
    speed: {type: Number, default: 400},
    delay: {type: Number, default: 0},
    defaultSize: {type: Number, default: 12},
    sideToSide: {type: Boolean}
  },

  data: () => ({
    currentDot: 0,
    backwards: false,
  }),

  watch: {
    value(state) {
      if (state) {
        this.loop()
      } else {
        this.currentDot = -1
        this.backwards = false
      }
    }
  },

  methods: {
    loop: async function () {
      while (this.value) {
        if (this.sideToSide) {
          if (this.backwards) {
            this.currentDot--;
            if (this.currentDot <= 0) {
              this.backwards = false
              await new Promise(resolve => setTimeout(resolve, this.delay))
            }
          } else {
            this.currentDot++;
            if (this.currentDot >= this.amount - 1) {
              this.backwards = true
              await new Promise(resolve => setTimeout(resolve, this.delay))
            }
          }
        } else {
          this.currentDot++;
          if (this.currentDot >= this.amount) {
            this.currentDot = 0
            await new Promise(resolve => setTimeout(resolve, this.delay))
          }
        }
        await new Promise(resolve => setTimeout(resolve, this.speed))
      }
    }
  },

  mounted() {
    this.loop()
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
      transition-duration: 0.2s;
    }
  }
}
</style>
