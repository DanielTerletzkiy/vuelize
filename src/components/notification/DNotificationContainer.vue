<template>
  <DWrapper
    ref="wrapper"
    :classes="['d-notification-wrapper', vertical,horizontal]"
    v-bind="{...$props, ...$attrs}"
  >
    <TransitionSlide>
      <div
        v-if="notifications.length>0"
        class="d-notification-wrapper__content"
      >
        <TransitionFade
          group
          :duration="100"
        >
          <DNotification
            v-for="notification in notifications"
            :key="notification.key"
            :notification="notification"
          />
        </TransitionFade>
      </div>
    </TransitionSlide>
  </DWrapper>
</template>

<script setup lang="ts">
import {computed, PropType, ref} from "vue";
import DWrapper from "../DWrapper.vue";
import DNotification from "./DNotification.vue";
import {TransitionFade, TransitionSlide} from "@morev/vue-transitions";
import {useVuelizeNotifications} from "../../stores";
import {PositionHorizontal, PositionVertical} from "../../types";

const wrapper = ref(null);
defineExpose({wrapper});

const props = defineProps({
    horizontal: {type: Object as PropType<PositionHorizontal>, required: true},
    vertical: {type: Object as PropType<PositionVertical>, required: true},
})

const vuelizeNotifications = useVuelizeNotifications();
const {getPositionalNotifications} = vuelizeNotifications

const notifications = computed(() => getPositionalNotifications({
    horizontal: props.horizontal,
    vertical: props.vertical
}))

</script>

<style scoped lang="scss">
@import "../../styles/variables";

.d-notification-wrapper {
    position: absolute;
    z-index: 10;

    margin: 12px;
    pointer-events: none;

    &.bottom.left {
        bottom: 0;
        left: 0;
    }

    &.bottom.center {
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }

    &.bottom.right {
        bottom: 0;
        right: 0;
    }

    &.top.left {
        top: $toolbarHeight;
        left: 0;
    }

    &.top.center {
        top: $toolbarHeight;
        left: 50%;
        transform: translate(-50%, 0);
    }

    &.top.right {
        top: $toolbarHeight;
        right: 0;
    }

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
