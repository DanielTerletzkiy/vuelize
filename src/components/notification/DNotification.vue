<template>
  <DWrapper :classes="['d-notification']" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <slot name="default" :notification="notification">
      <DCardContent class="d-notification__content" :color="options.value.color" glow glowing
                    :outlined="!options.value.color"
                    depressed min-width="100%" max-width="500px"
                    @mouseover="hover.value = true" @mouseleave="hover.value = false">
        <DRow class="pa-2">
          <DColumn class="pa-0">
            <DIconButton :color="(options.value.color)" @click="hide">
              <DIcon :size="hover.value?30:40" :name="hover.value?'multiply':options.value.icon||'multiply'"></DIcon>
            </DIconButton>
          </DColumn>
          <d-column class="pa-0" style="align-self: stretch; justify-content: center; gap: 16px">
            <DCardTitle v-if="notification.title" class="py-0 font-size-medium" :color="(options.value.color)">
              {{ notification.title }}
            </DCardTitle>
            <DCardSubtitle v-if="notification.content" class="py-0" :color="(options.value.color)">
              {{ notification.content }}
            </DCardSubtitle>
          </d-column>
        </DRow>
      </DCardContent>
    </slot>
  </DWrapper>
</template>

<script lang="ts">
export default {
  name: 'DNotification',
}
</script>

<script setup lang="ts">
import {inject, onBeforeUnmount, onMounted, PropType, ref, watch} from "vue";
import DWrapper from "../DWrapper.vue";
import DCardContent from "../card/content/DCardContent.vue";
import DRow from "../flex/DRow.vue";
import DColumn from "../flex/DColumn.vue";
import DIconButton from "../button/DIconButton.vue";
import DIcon from "../icon/DIcon.vue";
import DCardTitle from "../card/text/DCardTitle.vue";
import DCardSubtitle from "../card/text/DCardSubtitle.vue";

const vuelize: any = inject("vuelize");

const props = defineProps({
  notification: {type: Object as PropType<Notifications.Notification>, required: true}
})

const timeout = ref<any>(undefined);
const hover = ref<boolean>(false);
//const active = ref<boolean>(true); TODO
const options = ref<Notifications.Options>({icon: '', color: '', timeout: undefined});

watch(hover, (state) => {
  if (state) {
    deleteTimeout()
  } else {
    addTimeout()
  }
})

function hide() {
  props.notification.active = false
}

function addTimeout() {
  timeout.value = setTimeout(() => {
    hide()
  }, options.value.timeout ? options.value.timeout : 5000)
}

function deleteTimeout() {
  clearTimeout(timeout.value)
}

onMounted(() => {

  options.value.color = vuelize.getColor(props.notification.type)
  switch (props.notification.type) {
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

  if (props.notification.options) {
    Object.assign(options.value, props.notification.options);
  }

  addTimeout();
})

onBeforeUnmount(() => {
  deleteTimeout()
})
</script>

<style scoped lang="scss">
.d-notification {
  min-width: auto;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease-out;

  &:hover {
    transform: scale(1.04);
  }

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
