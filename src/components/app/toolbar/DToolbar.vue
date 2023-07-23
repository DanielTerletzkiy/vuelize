<template>
  <DWrapper ref="wrapper" :classes="['d-toolbar']" v-bind="{...$props, ...$attrs}">
    <DCard block rounded="none" height="100%">
      <DRow block gap class="px-2">
        <DIconButton v-if="showHamburger" @click="onHamburgerClick"
                     style="margin-left: -8px" :color="ThemeColorProperty.primary">
          <DIcon name="bars"/>
        </DIconButton>
        <slot></slot>
      </DRow>
    </DCard>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DToolbar',
}
</script>

<script setup lang="ts">
import {ref} from "vue";

const wrapper = ref(null);
defineExpose({wrapper});
import DWrapper from "../../DWrapper.vue";
import DCard from "../../card/DCard.vue";
import DRow from "../../flex/DRow.vue";
import DIconButton from "../../button/DIconButton.vue";
import DIcon from "../../icon/DIcon.vue";
import defaultProps from "../../../mixins/DefaultProps";
import {ThemeColorProperty} from "../../../types/Theme";

const emit = defineEmits(['hamburgerClick'])

defineProps({
  showHamburger: {type: Boolean, default: false},
  ...defaultProps
})

function onHamburgerClick(e: Event) {
  emit('hamburgerClick', e)
}
</script>

<style scoped lang="scss">
@import "../../../styles/variables";

.d-toolbar {
  position: sticky;
  top: 0;

  width: 100%;
  height: 54px;
  max-height: 54px;
  z-index: 10;

  border-radius: 0;

  &.dark {
    box-shadow: 0 0 30px -20px darken($dark_background, 5);
  }

  &.light {
    box-shadow: 0 2px 30px -24px rgba(31, 33, 40, 1);
  }

  .d-card {
    min-height: inherit;
    padding: 2px;
    display: flex;
    align-items: center;
  }

  .d-divider.dark {
    color: lighten($dark_sheet, 4);
  }
}
</style>
