<template>
<span class="d-card__title" :style="stylesObject">
  <slot></slot>
</span>
</template>

<script>
export default {
  name: "d-card-title",

  props: {
    color: String
  },

  computed: {
    stylesObject(){
      return {color: this.processColor(this.color)}
    }
  }
}
</script>

<style scoped lang="scss">

.d-card__title {
  padding: 8px;
  font-size: 2rem;
}

.d-card {
  .d-card__title {
    display: flex;
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
