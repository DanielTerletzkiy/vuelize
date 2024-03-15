<template>
  <DWrapper
    ref="wrapper"
    :classes="['d-notification']"
    v-bind="{...$props, ...$attrs}"
  >
    <slot
      name="default"
      :notification="notification"
    >
      <DCardContent
        v-if="options"
        class="d-notification__content"
        :color="options.color"
        :glow="{
          active: true
        }"
        depressed
        min-width="100%"
        max-width="500px"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      >
        <DRow
          class="pa-2 pr-4"
          gap
        >
          <DIconButton
            :color="options.color"
            @click="onCloseClick"
          >
            <TransitionSlide group>
              <DIcon
                v-if="hover && !isPersistent"
                :size="40"
                name="solar:close-circle-line-duotone"
              />
              <DIcon
                v-else
                :size="40"
                :name="options.icon"
              />
            </TransitionSlide>
          </DIconButton>
          <d-column
            no-padding
            style="align-self: stretch; justify-content: center; gap: 16px"
          >
            <DCardTitle
              v-if="notification.title"
              class="py-0 font-size-medium"
              :color="options.color"
            >
              {{ notification.title }}
            </DCardTitle>
            <DCardSubtitle
              v-if="notification.content"
              class="py-0"
              :color="options.color"
            >
              {{ notification.content }}
            </DCardSubtitle>
          </d-column>
        </DRow>
      </DCardContent>
    </slot>
  </DWrapper>
</template>

<script setup lang="ts">
import defaultProps from "../../props/default.props";
import type {PropType} from "vue";
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
import DWrapper from "../DWrapper.vue";
import DCardContent from "../card/content/DCardContent.vue";
import DRow from "../flex/DRow.vue";
import DColumn from "../flex/DColumn.vue";
import DIconButton from "../button/DIconButton.vue";
import DIcon from "../icon/DIcon.vue";
import DCardTitle from "../card/text/DCardTitle.vue";
import DCardSubtitle from "../card/text/DCardSubtitle.vue";
import {TransitionSlide} from "@morev/vue-transitions";
import {Notification, State, ThemeColorProperty} from "./../../types";
import {useVuelizeNotifications} from "../../stores";

const wrapper = ref(null);
defineExpose({wrapper});

const props = defineProps({
    notification: {type: Object as PropType<Notification>, required: true, ...defaultProps}
})

const vuelizeNotifications = useVuelizeNotifications();
const {setNotificationActive, clearTimeout, createTimeout} = vuelizeNotifications;

const hover = ref<boolean>(false);
const options = ref<Notification['options']>({icon: '', color: ThemeColorProperty.primary, timeout: 5000});

const isPersistent = computed(()=>props.notification?.persistent)

watch(hover, (state) => {
    if(!props.notification){
        return
    }
    if (state) {
        clearTimeout(props.notification?.key);
    } else if(props.notification.options?.timeout && !isPersistent.value){
        createTimeout(props.notification?.key,props.notification.options.timeout)
    }
})

function onCloseClick() {
    if(isPersistent.value){
        return;
    }
    setNotificationActive(props.notification?.key, false)
}

onMounted(() => {
    if (!options.value) {
        return
    }

    switch (props.notification.type) {
        case State.success: {
            options.value.icon = 'check'
            options.value.color = ThemeColorProperty.success
            break;
        }
        case State.error: {
            options.value.icon = 'exclamation-triangle'
            options.value.color = ThemeColorProperty.error
            break;
        }
        case State.warning: {
            options.value.icon = 'exclamation-octagon'
            options.value.color = ThemeColorProperty.warning
            break;
        }
        case State.info: {
            options.value.icon = 'info-circle'
            options.value.color = ThemeColorProperty.info
            break;
        }
        default: {
            options.value.icon = 'question'
            options.value.color = ThemeColorProperty.primary
            break;
        }
    }

    if (props.notification.options) {
        Object.assign(options.value, props.notification.options);
    }
})

onBeforeUnmount(() => {
    clearTimeout(props.notification?.key);
})
</script>

<style scoped lang="scss">
.d-notification {
    min-width: auto;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease-out;
    pointer-events: auto;

    &__content {
        backdrop-filter: blur(20px);
        padding: 0;
    }

    &__hide {
        position: absolute;
        display: flex;
        right: 0;
        padding: 0;
        min-height: 100% !important;

        button {
            height: auto !important;
            backdrop-filter: blur(1px);
        }
    }
}
</style>
