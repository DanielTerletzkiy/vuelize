<template>
  <fade-transition :duration="{leave: 150}">
    <d-function-wrapper :classes="['d-dialog', ...classesObject]" v-bind="{...$props, ...$attrs}"
                        @click="$emit('click')"
                        v-if="value">
      <div class="d-dialog__backdrop" @click.self="handleClick"/>
      <div class="d-dialog__content">
        <slot name="default">
          hello there
        </slot>
      </div>
    </d-function-wrapper>
  </fade-transition>
</template>

<script>
export default {
  name: "Dialog",

  props: {
    value: Boolean,
    persistent: Boolean
  },

  methods: {
    handleClick() {
      if (!this.persistent) {
        this.close()
      }
    },
    close() {
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped lang="scss">
.d-dialog {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;

  &__backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
    user-select: none;
  }

  &__content {
    z-index: 5;
  }
}
</style>
