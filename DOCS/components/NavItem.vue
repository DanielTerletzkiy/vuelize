<template>
  <div>
    <d-list v-model="currentNavigation" filled color="primary" :key="navItem.category" class="py-0 px-0"
            v-hover="{over, leave}">
      <d-list-item :key="toUrl(newPath)" :link="toUrl(newPath)" class="pa-2 pr-0 font-weight-bold" rounded="xl">
        <d-icon v-if="navItem.icon" :name="navItem.icon"/>
        {{ navItem.category }}
        <d-spacer/>
        <d-icon v-if="navItem.items.length>0" :name="open ? 'angle-up' : 'angle-down'"/>
      </d-list-item>
      <collapse-transition :duration="200">
        <d-list v-if="navItem.items.length>0 && open" class="py-0 pr-0 pl-6">
          <NavItem :nav-item="subNavItem" :path="newPath" :position="position+1" v-for="subNavItem in navItem.items"
                   :key="subNavItem.category"/>
        </d-list>
      </collapse-transition>
    </d-list>
  </div>
</template>

<script>
import NavItem from './NavItem'

export default {
  name: "NavItem",
  components: {
    NavItem
  },

  props: {
    navItem: Object,
    path: {type: String, default: ''},
    position: Number,
  },

  data: () => ({
    hover: false,
  }),

  computed: {
    currentNavigation() {
      return this.$route.path;
    },
    newPath() {
      return this.path + '/' + this.navItem.category
    },
    open() {
      return true
      /*return this.currentNavigation.includes(
          this.toUrl(this.newPath)
      ) || this.hover*/
    }
  },

  methods: {
    toUrl(path) {
      return encodeURI(path.replaceAll(' ', '_').toLowerCase())
    },
    over() {
      this.hover = true
    },
    leave() {
      this.hover = false
    }
  },
}
</script>

<style scoped lang="scss">
.fade-y {
  &-leave-active {
    position: absolute;
  }
}
</style>
