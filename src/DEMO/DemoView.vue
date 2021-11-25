<template>
  <d-root style="padding: 24px">
    <d-card elevation rounded="lg" block>

      <d-card-title class="font-weight-light" color="primary">Demo page
      </d-card-title>
      <d-card-subtitle>
        Everything in this Lib
        <d-icon name="download-alt" color="primary" icon-style="monochrome"/>
      </d-card-subtitle>

      <d-checkbox class="pa-2 px-0" :size="24" on-icon="sunset" off-icon="moonset" v-model="$store.state.theme.dark">
        Dark mode
      </d-checkbox>

      <d-card color="error" class="rounded-lg">
        <d-card-title color="#fff">
          <d-btn @click="openGithub">
            <d-icon name="github-alt"/>
            Github
          </d-btn>
        </d-card-title>
      </d-card>

      <div style="display: flex; gap: 8px; margin: 8px 0; flex-flow: row wrap;">
        <d-btn color="success" filled @click="changeColor('success')">
          <d-icon name="check"/>
          Success
        </d-btn>
        <d-btn color="error" filled @click="changeColor('error')">
          <d-icon name="exclamation-triangle"/>
          Error
        </d-btn>
        <d-btn color="warning" filled @click="changeColor('warning')">
          <d-icon name="exclamation-octagon"/>
          Warning
        </d-btn>
        <d-btn color="info" filled @click="changeColor('info')">
          <d-icon name="info-circle"/>
          Info
        </d-btn>
      </div>

      <div style="display: flex; gap: 8px; margin: 8px 0; flex-flow: row wrap;">
        <d-btn color="success" outlined depressed @click="changeColor('success')">
          <d-icon name="check"/>
          Success
        </d-btn>
        <d-btn color="error" outlined @click="changeColor('error')">
          <d-icon name="exclamation-triangle"/>
          Error
        </d-btn>
        <d-btn color="warning" glow @click="changeColor('warning')">
          <d-icon name="exclamation-octagon"/>
          Warning
        </d-btn>
        <d-btn color="info" @click="changeColor('info')">
          <d-icon name="info-circle"/>
          Info
        </d-btn>
      </div>

      <d-btn color="primary" glow block @click="changeColor('primary')">
        <d-icon name="angle-left" :size="32"/>
        This is full width
        <d-icon name="angle-right" :size="32"/>
      </d-btn>
    </d-card>

    <div class="my-4"/>

    <d-card elevation rounded="lg" block>
      <d-card-title>
        <d-icon name="clipboard-alt" color="primary" :size="30"/>
        Text fields!
      </d-card-title>

      <div class="ma-4" style="display: flex; gap: 12px; flex-wrap: wrap">
        <d-text-field color="primary" outlined depressed label="Text" type="text" v-model="text"/>
        <d-text-field color="primary" outlined depressed label="Text with placeholder" type="text" v-model="text"
                      placeholder="This is a placeholder"/>

        <d-text-field color="primary" outlined depressed label="Icon Select" v-model="selectedIcon" select
                      :items="iconItems">
          <template slot="item" slot-scope="{item}">
            <d-card-title class="pa-0 font-size-small" color="inherit">
              <d-icon :name="item.icon" :icon-style="item.iconStyle" color="primary"/>
              {{ item.name }}
            </d-card-title>
          </template>
        </d-text-field>

        <d-text-field color="primary" outlined depressed label="User Select" v-model="selectedUser" select
                      :items="userItems">
          <template slot="item" slot-scope="{item}">
            <d-card-title class="pa-0 font-size-small" color="inherit">
              <d-avatar :size="30" :src="item.profilePic"/>
              {{ item.name }}
            </d-card-title>
          </template>
        </d-text-field>

        <d-text-field color="primary" outlined depressed label="Date" type="date" v-model="date"/>
      </div>

      <div class="ma-4" style="display: flex; gap: 12px; flex-wrap: wrap">
        <d-card-title class="font-size-medium" outlined depressed elevation="n2" rounded="lg">
          <d-icon :size="34" color="primary" name="text"/>
          {{ text }}
        </d-card-title>
        <d-card-title class="font-size-medium" outlined depressed elevation="n2" rounded="lg">
          <d-icon :size="34" color="primary" name="list-ol"/>
          <d-icon :size="34" :name="iconItems[selectedIcon].icon" :icon-style="iconItems[selectedIcon].iconStyle"/>
        </d-card-title>
        <d-card-title class="font-size-medium" outlined depressed elevation="n2" rounded="lg">
          <d-icon :size="34" color="primary" name="calendar-alt"/>
          {{ date }}
        </d-card-title>
      </div>
    </d-card>

    <div class="my-4"/>

    <d-card elevation rounded="lg" block>
      <d-card-title>
        <d-icon name="layer-group" icon-style="monochrome" color="primary" :size="30"/>
        Menus!
      </d-card-title>

      <div style="display: flex; gap: 8px">
        <d-btn color="primary" glow @click="()=>openSelectMenu=!openSelectMenu" class="pa-3">
          <template slot="default">
            Select Icon
          </template>
          <template slot="misc">
            <d-select-menu :open.sync="openSelectMenu" v-model="selectedIcon" :items="iconItems">
              <template slot="item" slot-scope="{item}">
                <d-card-title class="pa-0 font-size-small" color="inherit">
                  <d-icon :name="item.icon" :icon-style="item.iconStyle" color="primary"/>
                  {{ item.name }}
                </d-card-title>
              </template>
            </d-select-menu>
          </template>
        </d-btn>
      </div>
    </d-card>

    <div class="my-4"/>

    <d-card elevation rounded="lg" block>
      <d-card-title>
        <d-icon name="user-circle" color="primary" :size="30"/>
        Avatars!
      </d-card-title>

      <div style="display: flex; gap: 8px">
        <d-avatar rounded="lg" color="primary" :size="50">
          <d-icon :size="34" :color="getContrast('primary')" name="vuejs"/>
        </d-avatar>
        <d-avatar rounded="circle" color="info" :size="50">
          <d-icon :size="34" :color="getContrast('info')" name="info-circle"/>
        </d-avatar>
        <d-avatar rounded="lg" elevation color="transparent" :size="50" src="https://picsum.photos/100"></d-avatar>
      </div>
    </d-card>

    <div class="my-4"/>

    <d-card elevation rounded="lg" block>
      <d-card-title>
        List with List items!
      </d-card-title>
      <d-list class="rounded-lg elevation-n2 ma-2" color="primary" v-model="listItem">
        <d-list-item v-for="i in 21" :key="i-1">
          <d-icon class="mr-1" :name="`${i-1}-plus`"/>
          Item {{ i - 1 }}
        </d-list-item>
      </d-list>
    </d-card>
  </d-root>
</template>

<script>
import DCard from "@/components/card/Card";
import DCardTitle from "@/components/card/text/CardTitle";
import DBtn from "@/components/button/Button";
import DIcon from "@/components/icon/Icon";
import DCheckbox from "@/components/checkbox/Checkbox";
import DList from "@/components/list/List";
import DListItem from "@/components/list/ListItem";
import DRoot from "@/components/Root";
import DTextField from "@/components/textfield/Textfield";
import DAvatar from "@/components/avatar/Avatar";
import DCardSubtitle from "@/components/card/text/CardSubtitle";
import DSelectMenu from "@/components/menu/SelectMenu";

export default {
  name: 'DemoView',
  components: {
    DSelectMenu,
    DCardSubtitle, DAvatar, DTextField, DRoot, DListItem, DList, DCheckbox, DIcon, DBtn, DCard, DCardTitle
  },

  data: () => ({
    listItem: 0,

    text: '',
    selectedIcon: 0,
    iconItems: [
      {icon: 'cube', name: 'Cube', iconStyle: 'line'},
      {icon: 'anchor', name: 'Anchor', iconStyle: 'line'},
      {icon: 'layers-alt', name: 'Layers Alt', iconStyle: 'monochrome'},
    ],
    selectedUser: 0,
    userItems: [
      {
        profilePic: 'https://picsum.photos/100/100',
        name: 'Daniel Terletzkiy'
      }, {profilePic: 'https://picsum.photos/200/200', name: 'Random Guy'}
    ],
    date: undefined,

    openSelectMenu: false
  }),

  methods: {
    openGithub() {
      window.open('https://github.com/DanielTerletzkiy/vue-materialize')
    },
    changeColor(color) {
      if (this.$store.state.theme.dark) {
        this.$store.state.theme.themes.dark.primary = this.processColor(color)
      } else {
        this.$store.state.theme.themes.light.primary = this.processColor(color)

      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
