<template>
  <d-function-wrapper :classes="['d-notification-wrapper', ...classesObject]" v-bind="{...$props, ...$attrs}"
                      @click="$emit('click')">
    <div class="d-notification-wrapper__content">
      <fade-transition group :delay="0">
        <d-notification v-for="notification in notifications" :notification="notification" color="primary"
                        :key="notification.created"/>
      </fade-transition>
    </div>
  </d-function-wrapper>
</template>

<script>
export default {
  name: "d-notification-wrapper",

  props: {
    permanent: Boolean,
  },

  computed: {
    classesObject() {
      return {'d-notification-wrapper--permanent': this.permanent}
    },
    notifications() {
      return this.permanent ?
          this.$vuelize.notification.notifications
          : this.$vuelize.notification.notifications.filter(notification => notification.active === true)
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

.d-notification-wrapper {
  position: absolute;
  z-index: 10;
  bottom: 0;
  right: 0;

  margin: 12px;

  &--permanent {
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
