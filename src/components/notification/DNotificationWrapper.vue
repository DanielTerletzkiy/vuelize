<template>
  <d-row
    v-for="vertical in Object.keys(PositionVertical)"
    :key="vertical"
    class="'d-notification-wrapper__wrapper"
  >
    <DNotificationContainer
      v-for="horizontal in Object.keys(PositionHorizontal)"
      :key="horizontal"
      :horizontal="horizontal"
      :vertical="vertical"
    />
  </d-row>
</template>

<script setup lang="ts">
import {ref} from "vue";
import DRow from "@/components/flex/DRow.vue";
import {PositionHorizontal, PositionVertical} from "../../types";
import DNotificationContainer from "@/components/notification/DNotificationContainer.vue";

const wrapper = ref(null);
defineExpose({wrapper});

</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-notification-wrapper {
    &__wrapper {
        pointer-events: none;
    }
}

</style>
