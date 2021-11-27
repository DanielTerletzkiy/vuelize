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
@import "../../../styles/variables";

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
    color: darken($dark_card_text, 16);
  }
}

.theme--light {

  .d-card__subtitle {
    color: lighten($light_card_text, 36);
  }
}
</style>
