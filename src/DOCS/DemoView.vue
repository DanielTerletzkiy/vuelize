<template>
  <div>
    <d-card elevation rounded="lg" block>
      <d-card-title>
        <d-icon name="power" color="primary" :size="30"/>
        Buttons!
      </d-card-title>

      <d-card-content>
        <d-card-subtitle>
          Checkbox
        </d-card-subtitle>
        <d-card-content flex wrap column>
          <d-checkbox :size="24" on-icon="sunset" off-icon="moonset" v-model="$vuelize.theme.dark">
            Dark mode
          </d-checkbox>
          <d-checkbox :size="24" color="success" :value="true">
            Test
          </d-checkbox>
        </d-card-content>

        <d-card-subtitle>
          No Color
        </d-card-subtitle>
        <d-card-content>
          <d-btn link="/" href="https://github.com/DanielTerletzkiy/vue-materialize" target="_blank" glow>
            <d-icon name="github-alt"/>
            Github
          </d-btn>
        </d-card-content>

        <d-card-subtitle>
          Colored and filled
        </d-card-subtitle>
        <d-card-content flex wrap>
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
        </d-card-content>

        <d-card-subtitle>
          Colored and
          <d-icon name="angle-right" :size="18"/>
          <d-card-subtitle class="pl-0 py-0" color="primary">sad and inlined | inlined | glowing | camo
          </d-card-subtitle>
        </d-card-subtitle>
        <d-card-content flex wrap>
          <d-btn color="success" inlined depressed @click="changeColor('success')">
            <d-icon name="check"/>
            Success
          </d-btn>
          <d-btn color="error" inlined @click="changeColor('error')">
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
        </d-card-content>

        <d-card-subtitle>
          Full width Button
        </d-card-subtitle>
        <d-card-content>
          <d-btn color="primary" glow block @click="changeColor('primary')">
            <d-icon name="angle-left" :size="32"/>
            This is full width
            <d-icon name="angle-right" :size="32"/>
          </d-btn>
        </d-card-content>
      </d-card-content>
    </d-card>

    <div class="my-4"/>

    <d-card elevation rounded="lg" block>
      <d-card-title>
        <d-icon name="clipboard-alt" color="primary" :size="30"/>
        Text fields!
      </d-card-title>

      <d-card-content flex wrap>
        <d-text-field color="primary" inlined depressed label="Text" type="text" v-model="text"/>
        <d-text-field color="primary" inlined depressed label="Text with placeholder" type="text" v-model="text"
                      placeholder="This is a placeholder"/>

        <d-text-field color="primary" inlined depressed label="Default Select" v-model="selectedIcon" select
                      :items="['Cube', 'Anchor', 'Layers Alt']"/>

        <d-text-field color="primary" inlined depressed label="Icon Select" v-model="selectedIcon" select
                      :items="iconItems">
          <template slot="item" slot-scope="{item}">
            <d-card-title class="pa-0 font-size-small" color="inherit">
              <d-icon :name="item.icon" :icon-style="item.iconStyle" color="primary"/>
              {{ item.name }}
            </d-card-title>
          </template>
        </d-text-field>

        <d-text-field color="primary" inlined depressed label="User Select" v-model="selectedUser" select
                      :items="userItems">
          <template slot="item" slot-scope="{item}">
            <d-card-title class="pa-0 font-size-small" color="inherit">
              <d-avatar :size="30" :src="item.profilePic"/>
              {{ item.name }}
            </d-card-title>
          </template>
        </d-text-field>

        <d-text-field color="primary" inlined depressed label="Date" type="date" v-model="date"/>
      </d-card-content>

      <d-card-content flex wrap class="pt-2">
        <d-card-title class="font-size-medium" inlined depressed elevation="n2" rounded="lg">
          <d-icon :size="34" color="primary" name="text"/>
          {{ text }}
        </d-card-title>
        <d-card-title class="font-size-medium" inlined depressed elevation="n2" rounded="lg">
          <d-icon :size="34" color="primary" name="list-ol"/>
          <d-icon :size="34" :name="iconItems[selectedIcon].icon" :icon-style="iconItems[selectedIcon].iconStyle"/>
        </d-card-title>
        <d-card-title class="font-size-medium" inlined depressed elevation="n2" rounded="lg">
          <d-icon :size="34" color="primary" name="calendar-alt"/>
          {{ date }}
        </d-card-title>
      </d-card-content>
    </d-card>

    <div class="my-4"/>

    <d-card elevation rounded="lg" block>
      <d-card-title>
        <d-icon name="layer-group" icon-style="monochrome" color="primary" :size="30"/>
        Menus!
      </d-card-title>

      <d-card-content>
        <d-btn color="primary" glow @click="()=>openSelectMenu=!openSelectMenu" class="pa-3">
          <template slot="default">
            <d-card-title class="pa-0 font-size-small" color="inherit">
              <d-icon :name="iconItems[selectedIcon].icon" :icon-style="iconItems[selectedIcon].iconStyle"
                      color="primary"/>
              {{ iconItems[selectedIcon].name }}
            </d-card-title>
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
      </d-card-content>
    </d-card>

    <div class="my-4"/>

    <d-card elevation block>
      <d-card-title>
        <d-icon name="scenery" color="primary" :size="30"/>
        Images!
      </d-card-title>
      <d-card-content>
        <d-image height="100px" width="auto"
                 src="https://swansoftwaresolutions.com/wp-content/uploads/2020/01/Benefits-of-Using-VUE.JS.jpeg"/>
      </d-card-content>
    </d-card>

    <div class="my-4"/>

    <d-card elevation block>
      <d-card-title>
        <d-icon name="chat" color="primary" :size="30"/>
        Toooool Tips!
      </d-card-title>
      <d-card-content>
        <d-tooltip position="bottom" color="primary">
          <d-btn filled color="primary">
            Hover me!
          </d-btn>
          <template slot="tooltip">
            <d-card-subtitle style="min-width: 200px" color="inherit">
              <d-icon name="smile-beam"/> Hello this is a Tooooooooool Tip
            </d-card-subtitle>
          </template>
        </d-tooltip>
      </d-card-content>
    </d-card>

    <div class="my-4"/>

    <d-card elevation rounded="lg" block>
      <d-card-title>
        <d-icon name="user" color="primary" :size="30"/>
        Avatars!
      </d-card-title>

      <d-card-content flex wrap>
        <d-avatar rounded="lg" color="primary" :size="50">
          <d-icon :size="34" :color="getContrast('primary')" name="vuejs"/>
        </d-avatar>
        <d-avatar rounded="circle" color="info" :size="50">
          <d-icon :size="34" :color="getContrast('info')" name="info-circle"/>
        </d-avatar>
        <d-avatar rounded="lg" elevation color="transparent" :size="50" src="https://picsum.photos/100"></d-avatar>
      </d-card-content>
    </d-card>

    <div class="my-4"/>

    <d-card elevation rounded="lg" block>
      <d-card-title>
        <d-icon name="list-ui-alt" color="primary" :size="30"/>
        List with List items!
      </d-card-title>
      <d-card-content flex wrap style="justify-content: center">
        <d-card-content style="flex: 1">
          <d-card-title>
            Normal
          </d-card-title>
          <d-list class="rounded-lg elevation-n2" color="primary" v-model="listItem">
            <d-list-item v-for="i in 6" :key="i-1">
              <d-icon class="mr-1" :name="`${i-1}-plus`"/>
              Item {{ i - 1 }}
            </d-list-item>
          </d-list>
        </d-card-content>

        <d-card-content style="flex: 1">
          <d-card-title>
            Inlined
          </d-card-title>
          <d-list class="rounded-lg elevation-n2" color="primary" v-model="listItem">
            <d-list-item v-for="i in 6" :key="i-1" :inlined="listItem === i-1">
              <d-icon class="mr-1" :name="`${i-1}-plus`"/>
              Item {{ i - 1 }}
            </d-list-item>
          </d-list>
        </d-card-content>

        <d-card-content style="flex: 1" elevation="n1">
          <d-card-title>
            <d-icon name="sad-crying" color="primary" :size="34"/>
            & Inlined
          </d-card-title>
          <d-list class="rounded-lg elevation-n2" color="primary" v-model="listItem">
            <d-list-item v-for="i in 6" :key="i-1" :inlined="listItem === i-1" depressed>
              <d-icon class="mr-1" :name="`${i-1}-plus`"/>
              Item {{ i - 1 }}
            </d-list-item>
          </d-list>
        </d-card-content>
      </d-card-content>
    </d-card>
  </div>
</template>

<script>

export default {
  name: 'DemoView',
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
      if (this.$vuelize.theme.dark) {
        this.$vuelize.theme.themes.dark.primary = this.processColor(color)
      } else {
        this.$vuelize.theme.themes.light.primary = this.processColor(color)

      }
    }
  }
}
</script>
