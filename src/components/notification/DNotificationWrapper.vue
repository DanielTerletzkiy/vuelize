<template>
  <DWrapper :classes="['d-notification-wrapper', {permanent}]" v-bind="{...$props, ...$attrs}"
                      @click="$emit('click')">
    <div class="d-notification-wrapper__content">
      <FadeTransition group :delay="0">
        <DNotification v-for="notification in notifications" :notification="notification" color="primary"
                        :key="notification.created"/>
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
import {computed, inject} from "vue";
import DWrapper from "../DWrapper.vue";
import DNotification from "./DNotification.vue";
import {FadeTransition} from "v3-transitions";

const vuelize: any = inject('vuelize');

const props = defineProps({
  permanent: {type: Boolean},
})

const notifications = computed(() => {
  return props.permanent ?
      vuelize.notification.notifications
      : vuelize.notification.notifications.filter((notification: { active: boolean; }) => notification.active)
})
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
