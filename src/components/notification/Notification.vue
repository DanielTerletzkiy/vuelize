<template>
  <d-function-wrapper :classes="['d-notification']" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <slot>

    </slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-notification"
}
</script>

<style scoped>

</style>
