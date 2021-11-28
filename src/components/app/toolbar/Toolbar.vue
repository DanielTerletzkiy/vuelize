<template>
  <d-function-wrapper :classes="['d-toolbar']" v-bind="{...$props, ...$attrs}">
    <d-card block>
      <d-icon-button v-if="showHamburger" color="primary" @click="(e)=>$emit('hamburgerClick', e)">
        <d-icon name="bars"/>
      </d-icon-button>
      <slot></slot>
    </d-card>
    <d-divider v-if="this.$vuelize.theme.dark" height="2px"/>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-toolbar",
  props: {
    showHamburger: {type: Boolean, default: false}
  }
}
</script>

<style scoped lang="scss">
@import "../../../styles/variables";

.d-toolbar {
  position: sticky;
  top: 0;

  width: 100%;
  min-height: 54px;
  z-index: 10;

  border-radius: 0;

  .d-card{
    min-height: inherit;
    padding: 2px;
    display: flex;
    align-items: center;
  }

  .d-divider.theme--dark {
    color: lighten($dark_sheet, 4);
  }
}
</style>
