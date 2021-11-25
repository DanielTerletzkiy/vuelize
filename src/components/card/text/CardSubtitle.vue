<template>
  <d-function-wrapper :classes="['d-card__subtitle']" v-bind="{...$props, ...$attrs}">
    <slot></slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-card-subtitle",

  props: {},

  computed: {}
}
</script>

<style scoped lang="scss">

.d-card__subtitle {
  font-size: 1rem;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.d-card__title ~ .d-card__subtitle {
  margin-top: -20px;
  padding-left: 10px;
}


.d-card {
  .d-card__subtitle {
    width: auto;
  }
}

.theme--dark {
  .d-card__subtitle {
    color: #bdbdbd;
  }
}

.theme--light {

  .d-card__subtitle {
    color: #46474a;
  }
}
</style>
