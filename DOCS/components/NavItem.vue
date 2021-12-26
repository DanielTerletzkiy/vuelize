<template>
  <div>
    <d-list v-model="currentNavigation" color="primary" :key="navItem.category" class="py-0 px-0"
            v-hover="{over, leave}">
      <d-list-item :key="toUrl(newPath)" :link="toUrl(newPath)" class="pr-0">
        <d-icon v-if="navItem.icon" :name="navItem.icon"/>
        {{ navItem.category }}
        <d-spacer/>
        <d-icon v-if="navItem.items.length>0" :name="open ? 'angle-up' : 'angle-down'"/>
      </d-list-item>
      <collapse-transition :duration="200">
        <d-list v-if="navItem.items.length>0 && open" class="py-0 pr-0 pl-6">
          <div style="display: flex;">
            <d-divider vertical size="2px" :color="open?'primary':''" class="my-2"
                       v-if="navItem.items.length>0"></d-divider>
            <div style="width: 100%;" class="pl-1">
              <NavItem :nav-item="subNavItem" :path="newPath" :position="position+1" v-for="subNavItem in navItem.items"
                       :key="subNavItem.category"/>
            </div>
          </div>
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
      return this.currentNavigation.includes(
          this.toUrl(this.newPath)
      ) || this.hover
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
