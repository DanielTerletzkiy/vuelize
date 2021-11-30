<template>
  <d-function-wrapper :classes="['d-tooltip', ...classesObject]" v-bind="{...$props, ...$attrs}">
    <div v-hover="{ over: ()=>{this.value = true}, leave: ()=>{this.value = false} }">
      <slot name="default" v-bind="{...$props, ...$attrs}">
      </slot>
    </div>
    <transition name="slide-fade">
      <div class="d-tooltip__wrapper" v-if="value">
        <div class="d-tooltip__wrapper__content elevation">
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
    value: Object,
    position: {
      type: String,
      required: true,
      validator: function (value) {
        return ['top', 'bottom', 'left', 'right'].indexOf(value) !== -1
      }
    },
  },

  computed: {
    classesObject() {
      return [this.position];

    },
  },
}
</script>

<style scoped lang="scss">
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
      padding: 4px 12px;

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

.slide-fade-leave-active {
  transition: all 0.05s ease;
}

.slide-fade-enter-active {
  transition: all 0.2s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
}

.bottom :is(.slide-fade-enter, .slide-fade-leave-to) {
  transform: translateY(-10px);
}

.top :is(.slide-fade-enter, .slide-fade-leave-to) {
  transform: translateY(10px);
}

.left :is(.slide-fade-enter, .slide-fade-leave-to) {
  transform: translateX(10px);
}

.right :is(.slide-fade-enter, .slide-fade-leave-to) {
  transform: translateX(-10px);
}
</style>
