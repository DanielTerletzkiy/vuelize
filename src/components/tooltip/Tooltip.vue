<template>
  <d-function-wrapper :classes="['d-tooltip', position]">
    <div class="d-tooltip__slot" v-hover="{ over: ()=>{onHover(true)}, leave: ()=>{onHover(false)} }">
      <slot name="default" v-bind="{...$props, ...$attrs}">
      </slot>
    </div>
    <fade-transition>
      <div class="d-tooltip__wrapper" v-show="hovering">
        <d-label class="d-tooltip__wrapper__content" v-bind="{...$props, ...$attrs}" :class="contentClassesObject"
                 :style="stylesObject" ref="tooltip">
          <d-card-subtitle :style="{color: fontColor + '!important'}" class="pa-0">
            <slot name="tooltip">
            </slot>
          </d-card-subtitle>
        </d-label>
      </div>
    </fade-transition>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-tooltip",

  props: {
    value: Boolean,
    filled: Boolean,
    fontColor: String,
    position: {
      type: String,
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
    },
    padding: 8
  }),

  watch: {
    value(state) {
      this.hovering = state
    },
  },

  methods: {
    onHover: async function (state) {
      this.hovering = state
      this.$emit('input', state)
      await this.$nextTick();
      await this.$refs.tooltip;

      if (state) {
        const clientRect = this.$refs.tooltip.$el.getBoundingClientRect();
        //console.log(clientRect);

        if (clientRect.right >= window.innerWidth) {
          this.offset.right = Math.round(clientRect.right - window.innerWidth) + this.padding + 'px';
        }
        if (clientRect.left <= 0) {
          this.offset.left = Math.round(clientRect.left * -1) + this.padding + 'px';
        }
        //console.log(this.offset);
      }
    },
  },

  computed: {
    contentClassesObject() {
      return {
        filled: this.filled,
        glow: !this.filled,
        'glow--active': !this.filled && this.color
      }
    },
    stylesObject() {
      return {
        ...this.offset,
        color: this.processColor(this.color),
        background: this.opacity < 1 ? 'transparent' : this.color
      }
    }
  },

  mounted() {
    if(!this.fontColor && this.filled){
      this.fontColor = this.getContrast(this.color)
    }
    this.hovering = this.value;
    if (this.hovering) {
      this.onHover(this.hovering);
    }
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
    padding: $gap;
    position: absolute;
    display: flex;
    justify-content: center;
    border-radius: inherit;

    &__content {
      position: relative;
      width: auto;
      height: max-content;
      border-radius: inherit;
      padding: 0;

      background: transparent !important;

      word-break: keep-all;

      & > * {
        font-size: 0.9rem !important;
        width: max-content !important;
      }
    }
  }

  &.left {
    display: flex;
    align-items: center;

    .d-tooltip__wrapper {
      right: calc(100% + 8px);
    }
  }

  &.right {
    display: flex;
    align-items: center;

    .d-tooltip__wrapper {
      left: calc(100% + 8px);
    }
  }
}
</style>
