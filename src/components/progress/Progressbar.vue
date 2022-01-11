<template>
  <d-function-wrapper root-tag="d-card" elevation="n4" :classes="['d-progressbar']" v-bind="{...$props, ...$attrs}"
                      @click="$emit('click')">
    <d-card class="d-progressbar__wrapper glow glow--active" :color="color || 'primary'" block
            :max-width="hideLabel?'100%':`calc(100% - ${labelWidth}px)`">
      <d-card class="d-progressbar__wrapper__indicator" :style="progressStylesObject" :width="`${progress}%`"
              :color="color || 'primary'">
      </d-card>
    </d-card>
    <d-card-subtitle v-if="!hideLabel" class="d-progressbar__label py-0 pl-3" ref="label">
      <slot name="default">
        {{ value }} %
      </slot>
    </d-card-subtitle>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-progressbar",

  props: {
    value: {type: [String, Number], required: true},
    hideLabel: {type: Boolean},
    max: {type: Number},
  },

  data: () => ({
    labelWidth: null,
  }),

  computed: {
    progress() {
      let value = this.value;
      if (this.max) {
        value = this.percentage(this.value, this.max)
        console.log(value)
      }
      return value
    },
    progressStylesObject() {
      return {
        'min-height': this.hideLabel ? '4px' : '16px'
      }
    }
  },

  watch: {
    value() {
      this.updateLabelWidth()
    }
  },

  methods: {
    updateLabelWidth() {
      if (!this.hideLabel) {
        this.$nextTick(() => {
          this.labelWidth = this.$refs.label.$el.clientWidth
        })
      }
    },
    percentage(partialValue, totalValue) {
      return (100 * partialValue) / totalValue;
    }
  },

  mounted() {
    this.updateLabelWidth()
  }
}
</script>

<style scoped lang="scss">
.d-progressbar {
  position: relative;

  &__wrapper {
    padding: 0;
    overflow: hidden;
    background: transparent !important;

    &__indicator {
      transition-duration: .5s;
    }
  }

  &__label {
    min-width: 54px;
    position: absolute;
    top: -3px;
    right: 0;
  }
}
</style>
