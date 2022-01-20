<template>
  <d-function-wrapper :classes="['d-text-spoiler']" v-bind="{...$props, ...$attrs}"
                      v-long-press="300" @long-press-start="onLongClick" @click="onClick">
    <slot name="default" class="d-text-spoiler__content">
    </slot>
    <fade-transition>
      <d-card :color="color" v-if="hidden" class="d-text-spoiler__blocker glow" elevation="n4" v-ripple>
        <d-spacer/>
        <d-icon name="eye"/>
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

<style scoped lang="scss">
.d-text-spoiler {
  position: relative;
  max-width: max-content;
  margin: 0 4px;

  &__blocker {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
