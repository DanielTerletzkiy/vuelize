<template>
  <d-function-wrapper :classes="['d-toolbar']" v-bind="{...$props, ...$attrs}">
    <d-card block rounded="none">
      <d-row block gap class="px-2">
        <d-icon-button v-if="showHamburger" color="primary" @click="(e)=>$emit('hamburgerClick', e)" style="margin-left: -8px">
          <d-icon name="bars"/>
        </d-icon-button>
        <slot></slot>
      </d-row>
    </d-card>
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
  max-height: 54px;
  z-index: 10;

  border-radius: 0;

  &.theme--dark {
    box-shadow: 0 2px 30px -2px rgba(31, 33, 40, 1);
  }

  &.theme--light {
    box-shadow: 0 2px 30px -24px rgba(31, 33, 40, 1);
  }

  .d-card {
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
