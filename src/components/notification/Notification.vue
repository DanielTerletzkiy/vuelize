<template>
  <d-function-wrapper :classes="['d-notification']" v-bind="{...$props, ...$attrs}" @click="$emit('click')">
    <slot name="default" :notification="this.notification">
      <d-card :color="color" min-width="100%" max-width="500px" v-hover="{ over: ()=>{hover = true}, leave: ()=>{hover = false} }">
        <d-row class="px-3 left">
          <d-column>
            <d-icon size="40" :color="getContrast(color)" name="layer-group" icon-style="monochrome"></d-icon>
          </d-column>
          <d-column>
            <d-card-title class="font-size-medium" :color="getContrast(color)">
              {{ notification.title }}
            </d-card-title>
            <d-card-subtitle :color="getContrast(color)">
              {{ notification.content }}
            </d-card-subtitle>
          </d-column>
          <d-spacer/>
          <transition name="slide-fade">
            <d-column v-if="hover">
              <d-icon-button size="40" :color="getContrast(color)" @click="hide">
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
  }),

  methods: {
    hide() {
      this.notification.active = false
    }
  },

  mounted() {
    this.timeout = setTimeout(()=>{
      this.hide()
    }, 3000)
  },

  beforeDestroy() {
    clearTimeout(this.timeout)
  }

}
</script>

<style scoped lang="scss">
.d-notification {
}
</style>
