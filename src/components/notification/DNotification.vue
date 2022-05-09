<template>
  <DWrapper :classes="['d-notification']" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <slot name="default" :notification="notification">
      <DCardContent class="d-notification__content" :color="data.options.color" glow glowing
                    :outlined="!data.options.color"
                    depressed min-width="100%" max-width="500px"
                    @mouseover="data.hover = true" @mouseleave="data.hover = false">
        <DRow class="pa-2">
          <DColumn class="pa-0">
            <DIconButton :color="(data.options.color)" @click="hide">
              <DIcon :size="data.hover?30:40" :name="data.hover?'multiply':data.options.icon||'multiply'"></DIcon>
            </DIconButton>
          </DColumn>
          <d-column class="pa-0" style="align-self: stretch; justify-content: center; gap: 16px">
            <DCardTitle v-if="notification.title" class="py-0 font-size-medium" :color="(data.options.color)">
              {{ notification.title }}
            </DCardTitle>
            <DCardSubtitle v-if="notification.content" class="py-0" :color="(data.options.color)">
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
import {inject, onBeforeUnmount, onMounted, reactive, watch} from "vue";
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
  notification: {type: Object, required: true}
})

const data = reactive({
  timeout: undefined as any,
  hover: false,
  options: {} as any,
})

watch(() => data.hover, (state) => {
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
  data.timeout = setTimeout(() => {
    hide()
  }, data.options.timeout ? data.options.timeout : 5000)
}

function deleteTimeout() {
  clearTimeout(data.timeout)
}

onMounted(() => {

  data.options.color = vuelize.getColor(props.notification.type)
  switch (props.notification.type) {
    case 'success': {
      data.options.icon = 'check'
      break;
    }
    case 'error': {
      data.options.icon = 'exclamation-triangle'
      break;
    }
    case 'warning': {
      data.options.icon = 'exclamation-octagon'
      break;
    }
    case 'info': {
      data.options.icon = 'info-circle'
      break;
    }
    default: {
      data.options.icon = 'question'
      break;
    }
  }

  if (props.notification.options) {
    Object.assign(data.options, props.notification.options);
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
