<template>
  <DWrapper ref="wrapper" :classes="['d-notification-wrapper']" v-bind="{...$props, ...$attrs}"
            @click="$emit('click')">
    <SlideXRightTransition>
      <div class="d-notification-wrapper__content" v-if="notifications.length>0">
        <FadeTransition group :duration="100">
          <DNotification v-for="notification in notifications" :notification="notification"
                         :key="notification.value.key"/>
        </FadeTransition>
      </div>
    </SlideXRightTransition>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DNotificationWrapper',
}
</script>

<script setup lang="ts">
const wrapper = ref(null);
defineExpose({ wrapper });
import {computed, inject, ref, Ref, watch} from "vue";
import DWrapper from "../DWrapper.vue";
import DNotification from "./DNotification.vue";
import {FadeTransition, SlideXRightTransition} from "v3-transitions";
import Notification from "./Notification";

const vuelize: Vuelize = inject('vuelize') as Vuelize;

const notifications = computed<Array<Ref<Notification>>>(() => vuelize.notifications.value.filter((notification) => notification.value.active))

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
