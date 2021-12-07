<template>
  <d-function-wrapper :classes="['d-notification-wrapper']" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <slot>

    </slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-notification-wrapper"
}
</script>

<style scoped>

</style>
