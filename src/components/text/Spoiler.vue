<template>
  <d-function-wrapper
    v-long-press="300"
    :classes="['d-text-spoiler']"
    v-bind="{...$props, ...$attrs}"
    @long-press-start="onLongClick"
    @click="onClick"
  >
    <div class="d-text-spoiler__content">
      <slot name="default" />
    </div>
    <fade-transition>
      <d-card
        v-if="hidden"
        v-ripple
        :color="color"
        class="d-text-spoiler__blocker glow"
        elevation-dark="4"
        elevation-light="n4"
        outlined
        depressed
        rounded="md"
      >
        <d-spacer />
        <d-icon
          name="solar:eye-line-duotone"
          size="30"
        />
        <d-spacer />
      </d-card>
    </fade-transition>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "DTextSpoiler",

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
  padding: 4px 8px;
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
