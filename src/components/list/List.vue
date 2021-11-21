<template>
<div class="d-list" :style="stylesObject" :class="themeClass">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: "d-list",

  props: {
    value: Number
  }
}
</script>

<style scoped lang="scss">
.d-list{
  display: flex;
  flex-direction: column;
  padding: 8px;
}
</style>
