<template>
  <DWrapper ref="wrapper" :classes="['d-notification']" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <slot name="default" :notification="notification">
      <DCardContent class="d-notification__content" :color="options.color" glow glowing
                    outlined="!options.color"
                    depressed min-width="100%" max-width="500px"
                    @mouseover="hover = true" @mouseleave="hover = false">
        <DRow class="pa-2">
          <DColumn no-padding>
            <DIconButton :color="(options.color)" @click="onCloseClick">
              <TransitionSlide group>
                <DIcon v-if="hover" :size="40" name="multiply"></DIcon>
                <DIcon v-else :size="40" :name="options.icon"></DIcon>
              </TransitionSlide>
            </DIconButton>
          </DColumn>
          <d-column no-padding style="align-self: stretch; justify-content: center; gap: 16px">
            <DCardTitle v-if="notification.value.title" class="py-0 font-size-medium" :color="(options.color)">
              {{ notification.value.title }}
            </DCardTitle>
            <DCardSubtitle v-if="notification.value.content" class="py-0" :color="(options.color)">
              {{ notification.value.content }}
            </DCardSubtitle>
          </d-column>
        </DRow>
      </DCardContent>
    </slot>
  </DWrapper>
</template>

<script setup lang="ts">
import defaultProps from "../../mixins/DefaultProps";

const wrapper = ref(null);
defineExpose({ wrapper });
import {inject, onBeforeUnmount, onMounted, ref, watch} from "vue";
import type {Ref} from "vue";
import type {PropType} from "vue";
import DWrapper from "../DWrapper.vue";
import DCardContent from "../card/content/DCardContent.vue";
import DRow from "../flex/DRow.vue";
import DColumn from "../flex/DColumn.vue";
import DIconButton from "../button/DIconButton.vue";
import DIcon from "../icon/DIcon.vue";
import DCardTitle from "../card/text/DCardTitle.vue";
import DCardSubtitle from "../card/text/DCardSubtitle.vue";
import {TransitionSlide} from "@morev/vue-transitions";

import Notification from "./Notification";

const vuelize: any = inject("vuelize");

const props = defineProps({
  notification: {type: Object as PropType<Ref<Notification>>, required: true, ...defaultProps}
})

const hover = ref<boolean>(false);
const options = ref<Notifications.Options>({icon: '', color: '', timeout: 5000});

watch(hover, (state) => {
  if (state) {
    props.notification.value.removeTimeout();
  } else {
    props.notification.value.startTimeout();
  }
})

function onCloseClick() {
  props.notification.value.close();
}

onMounted(() => {

  options.value.color = vuelize.getColor(props.notification.value.type)
  switch (props.notification.value.type) {
    case 'success': {
      options.value.icon = 'check'
      break;
    }
    case 'error': {
      options.value.icon = 'exclamation-triangle'
      break;
    }
    case 'warning': {
      options.value.icon = 'exclamation-octagon'
      break;
    }
    case 'info': {
      options.value.icon = 'info-circle'
      break;
    }
    default: {
      options.value.icon = 'question'
      break;
    }
  }

  if (props.notification.value.options) {
    Object.assign(options.value, props.notification.value.options);
  }
})

onBeforeUnmount(() => {
  props.notification.value.removeTimeout();
})
</script>

<style scoped lang="scss">
.d-notification {
  min-width: auto;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease-out;

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
