<template>
  <DWrapper :classes="['d-notification-wrapper']" v-bind="{...$props, ...$attrs}"
            @click="$emit('click')">
    <div class="d-notification-wrapper__content">
      <FadeTransition group :duration="50">
        <DNotification v-for="notification in notifications" :notification="notification"
                       :key="notification.value.created"/>
      </FadeTransition>
    </div>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DNotificationWrapper',
}
</script>

<script setup lang="ts">
import {computed, inject, Ref, watch} from "vue";
import DWrapper from "../DWrapper.vue";
import DNotification from "./DNotification.vue";
import {FadeTransition} from "v3-transitions";
import Notification from "./Notification";

const vuelize: Vuelize = inject('vuelize') as Vuelize;

console.log(vuelize.notifications)
const notifications = computed<Array<Ref<Notification>>>(() => vuelize.notifications.value.filter((notification) => {
  console.log(notification)
  return notification.value.active
}))

watch(vuelize.notifications, (data) => {
  console.log(data)
}, {deep: true})

</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-notification-wrapper {
  position: absolute;
  z-index: 10;
  bottom: 0;
  right: 0;

  margin: 12px;

  &.permanent {
    position: relative;
    overflow-x: hidden !important;
    padding: 4px !important;
    margin: 0;
  }

  &__content > span {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

}

</style>
