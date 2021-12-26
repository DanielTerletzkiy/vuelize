<template>
  <d-function-wrapper :classes="['d-badge']" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <slot name="default">
    </slot>
    <fade-transition>
      <d-avatar v-if="value" v-bind="{...$props, ...$attrs}" :size="size" rounded="circle" class="d-badge__content">
        <d-card-subtitle :color="getContrast(color)">
          <slot name="content">
          </slot>
        </d-card-subtitle>
      </d-avatar>
    </fade-transition>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-badge",

  props: {
    value: {type: Boolean, default: true},
    size: {type: [String, Number], default: '18'}
  }
}
</script>

<style scoped lang="scss">
.d-badge {
  position: relative;

  &__content {
    position: absolute;
    top: calc(15px - 100%);
    right: calc(15px - 100%);
    padding: 4px;
  }
}
</style>
