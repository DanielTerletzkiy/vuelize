<template>
  <d-function-wrapper :classes="['d-badge']" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <slot name="default">
    </slot>
    <fade-transition>
      <d-card v-if="value" v-bind="{...$props, ...$attrs}" :min-width="size+'px'" :height="size+'px'" rounded="pill"
              class="d-badge__content">
        <d-card-subtitle :color="getContrast(color)" class="d-badge__content__text">
          <slot name="content">
          </slot>
        </d-card-subtitle>
      </d-card>
    </fade-transition>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-badge",

  props: {
    value: {type: Boolean, default: true},
    size: {type: [String, Number], default: '22'}
  }
}
</script>

<style scoped lang="scss">
.d-badge {
  position: relative;

  &__content {
    position: absolute;
    top: -12px;
    right: -12px;
    display: flex;
    justify-content: center;

    &__text {
      padding: 0 6px;
    }
  }
}
</style>
