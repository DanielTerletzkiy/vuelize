<template>
<d-function-wrapper :classes="['d-card__title']" v-bind="{...$props, ...$attrs}">
  <slot></slot>
</d-function-wrapper>
</template>

<script>
export default {
  name: "d-card-title",

  props: {
  },

  computed: {
  }
}
</script>

<style scoped lang="scss">

.d-card__title {
  min-height: 34px;
  font-size: 2rem;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.d-card {
  .d-card__title {
    width: auto;
  }
}

.theme--dark {
  .d-card__title {
    color: #bdbdbd;
  }
}

.theme--light {

  .d-card__title {
    color: #46474a;
  }
}
</style>
