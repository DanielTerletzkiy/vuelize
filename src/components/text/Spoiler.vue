<template>
  <d-function-wrapper :classes="['d-text-spoiler']" v-bind="{...$props, ...$attrs}"
                      v-long-press="300" @long-press-start="onLongClick" @click="onClick">
    <div class="d-text-spoiler__content">
      <slot name="default">
      </slot>
    </div>
    <fade-transition>
      <d-card :color="color" v-if="hidden" class="d-text-spoiler__blocker glow" elevation="n4" rounded="md" v-ripple>
        <d-spacer/>
        <d-icon name="eye" size="20"/>
        <d-spacer/>
      </d-card>
    </fade-transition>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-text-spoiler",

  data: () => ({
    hidden: true,
  }),

  methods: {
    onClick() {
      this.hidden = true
    },
    onLongClick() {
      this.hidden = false
    }
  }
}
</script>

<style lang="scss">
.d-text-spoiler__content > * {
  padding: 0 !important;
}
</style>

<style scoped lang="scss">
.d-text-spoiler {
  position: relative;
  max-width: max-content;
  padding: 0 4px;
  display: flex;
  align-items: center;

  &__blocker {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
