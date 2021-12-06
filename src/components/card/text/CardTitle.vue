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

<style lang="scss">
@import "../../../styles/variables";

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

  .d-card__title + .d-card__content {
    padding-top: 0;
  }
}

.theme--dark {
  .d-card__title {
    color: $dark_card_text;
  }
}

.theme--light {

  .d-card__title {
    color: $light_card_text;
  }
}
</style>
