<template>
  <d-function-wrapper :classes="['d-tooltip', ...classesObject]" v-bind="{...$props, ...$attrs}">
    <div class="d-tooltip__slot" v-hover="{ over: ()=>{onHover(true)}, leave: ()=>{onHover(false)} }">
      <slot name="default" v-bind="{...$props, ...$attrs}">
      </slot>
    </div>
    <transition name="slide-fade">
      <div class="d-tooltip__wrapper" v-if="hovering">
        <div class="d-tooltip__wrapper__content elevation rounded-pill" :style="stylesObject" ref="tooltip">
          <slot name="tooltip" v-bind="{...$props, ...$attrs}">
          </slot>
        </div>
      </div>
    </transition>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-tooltip",

  props: {
    value: Boolean,
    position: {
      type: String,
      required: true,
      validator: function (value) {
        return ['top', 'bottom', 'left', 'right'].indexOf(value) !== -1
      }
    },
  },

  data: () => ({
    hovering: false,
    offset: {
      top: 'initial',
      right: 'initial',
      bottom: 'initial',
      left: 'initial',
    }
  }),

  watch: {
    value(state){
      this.hovering = state
    }
  },

  methods: {
    onHover: async function (state) {
      this.hovering = state
      this.$emit('input',state)
      this.$forceUpdate()

      await this.$refs.tooltip;

      if (state) {
        const clientRect = this.$refs.tooltip.getBoundingClientRect();
        ['top', 'right', 'bottom', 'left'].forEach((pos) => {
          const currentPos = clientRect[pos];
          if (currentPos < 0 ||
              ((pos === 'right' && currentPos + clientRect.width >= window.innerWidth))) {
            this.offset[pos] = 'calc(50% + 8px)';
          }
        })
      } else {
        this.offset = {
          top: 'initial',
          right: 'initial',
          bottom: 'initial',
          left: 'initial',
        }
      }

      this.$forceUpdate()
    }
  },

  computed: {
    classesObject() {
      return [this.position];
    },
    stylesObject() {
      return this.offset
    }
  },

  mounted() {
    this.hovering = this.value
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

.d-tooltip {
  position: relative;
  width: max-content;

  &__wrapper {
    z-index: 12;
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    border-radius: inherit;

    &__content {
      width: auto;
      height: max-content;
      position: relative;
      border-radius: inherit;
      padding: 0 12px;

      word-break: keep-all;

      &:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: '';
        border-radius: inherit;

        background: currentColor;
        opacity: 0.1;

        transition-duration: 0.25s;
      }
    }
  }

  &.theme--dark .d-tooltip__wrapper__content {
    background: $dark_sheet;
  }

  &.theme--light .d-tooltip__wrapper__content {
    background: $light_sheet;
  }

  &.bottom {
    .d-tooltip__wrapper {
      top: calc(100% + 6px);
    }
  }

  &.top {
    .d-tooltip__wrapper {
      bottom: calc(100% + 6px);
    }
  }

  &.left {
    display: flex;
    align-items: center;

    .d-tooltip__wrapper {
      right: calc(100% + 6px);
    }
  }

  &.right {
    display: flex;
    align-items: center;

    .d-tooltip__wrapper {
      left: calc(100% + 6px);
    }
  }
}
</style>
