<template>
  <d-function-wrapper :classes="['d-notification']" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <slot name="default" :notification="this.notification">
      <d-card :color="options.color" inlined depressed min-width="100%" max-width="500px"
              v-hover="{ over: ()=>{hover = true}, leave: ()=>{hover = false} }">
        <d-row class="px-3 left">
          <d-column>
            <d-icon size="40" :color="getContrast(options.color)" :name="options.icon"></d-icon>
          </d-column>
          <d-column>
            <d-card-title class="font-size-medium" :color="getContrast(options.color)">
              {{ notification.title }}
            </d-card-title>
            <d-card-subtitle :color="getContrast(options.color)">
              {{ notification.content }}
            </d-card-subtitle>
          </d-column>
          <d-spacer/>
          <transition name="fade-x">
            <d-column v-if="hover" class="d-notification__hide">
              <d-icon-button size="40" outlined depressed rounded="none" :color="getContrast(options.color)" @click="hide">
                <d-icon name="multiply"></d-icon>
              </d-icon-button>
            </d-column>
          </transition>
        </d-row>
      </d-card>
    </slot>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-notification",

  props: {
    notification: {type: Object, required: true}
  },

  data: () => ({
    timeout: null,
    hover: false,
    options: {},
  }),

  watch: {
    hover(state) {
      if (state) {
        this.clearTimeout()
      } else {
        this.setTimeout()
      }
    }
  },

  methods: {
    hide() {
      this.notification.active = false
    },
    setTimeout() {
      this.timeout = setTimeout(() => {
        this.hide()
      }, 3000)
    },
    clearTimeout() {
      clearTimeout(this.timeout)
    }
  },

  mounted() {
    this.setTimeout();

    this.options.color = this.processColor(this.notification.type)
    switch (this.notification.type) {
      case 'success': {
        this.options.icon = 'check'
        break;
      }
      case 'error': {
        this.options.icon = 'exclamation-triangle'
        break;
      }
      case 'warning': {
        this.options.icon = 'exclamation-octagon'
        break;
      }
      case 'info': {
        this.options.icon = 'info-circle'
        break;
      }
      default: {
        this.options.icon = 'question'
        break;
      }
    }

    if (this.notification.options) {
      this.options = this.notification.options
    }

    this.$forceUpdate()

  },

  beforeDestroy() {
    this.clearTimeout()
  }

}
</script>

<style scoped lang="scss">
.d-notification {
  min-width: auto;
  position: relative;
  overflow: hidden;

  &__hide {
    position: absolute;
    right: 0;
    padding: 0;

    button {
      min-height: 100% !important;
      backdrop-filter: blur(1px);
    }
  }
}
</style>
