<template>
  <d-function-wrapper :classes="['d-notification']" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <slot name="default" :notification="this.notification">
      <d-card :color="options.color" :elevation="!$vuelize.theme.dark && hover?'4':'none'" :inlined="!options.color"
              depressed min-width="100%" max-width="500px"
              v-hover="{ over: ()=>{hover = true}, leave: ()=>{hover = false} }">
        <d-row class="px-3 left">
          <d-column>
            <d-icon-button :color="getContrast(options.color)" @click="hide">
              <d-icon :size="hover?30:40" :name="hover?'multiply':options.icon"></d-icon>
            </d-icon-button>
          </d-column>
          <d-column>
            <d-card-title class="font-size-medium" :color="getContrast(options.color)">
              {{ notification.title }}
            </d-card-title>
            <d-card-subtitle :color="getContrast(options.color)">
              {{ notification.content }}
            </d-card-subtitle>
          </d-column>
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
      }, this.options.timeout ? this.options.timeout : 5000)
    },
    clearTimeout() {
      clearTimeout(this.timeout)
    }
  },

  mounted() {
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
      Object.assign(this.options,this.notification.options);
    }

    this.setTimeout();
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
