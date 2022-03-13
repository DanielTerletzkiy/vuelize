<template>
  <div>
    <d-card elevation rounded="lg" block>
      <d-card-title>
        <d-icon name="power" color="primary" :size="30"/>
        Buttons!
      </d-card-title>

      <d-card class="ma-4 pa-2" color="primary">
        <d-card class="pa-4" color="primary" tint="8">
          <d-card-subtitle color="primary" tint="80">
            tinting test
          </d-card-subtitle>
        </d-card>
      </d-card>

      <d-card width="auto" height="100px" class="ma-4" glow filled-glow="primary" tint="10">
        <d-row class="pa-2">
          <d-avatar src="https://picsum.photos/400/400" size="80"/>
          <d-column>
            <d-card-title>
              User Name
            </d-card-title>
            <d-card-subtitle>
              Sample text
            </d-card-subtitle>
          </d-column>
        </d-row>
      </d-card>

      <d-card-subtitle>
        This is a
        <d-text-spoiler color="primary">
          <d-card-subtitle>
            very big Spoiler
          </d-card-subtitle>
        </d-text-spoiler>
        !!!
      </d-card-subtitle>

      <d-chart class="ma-2" color="primary" columnSpacing="40" row-spacing="40" row-lines="6"
               :columns="['T0','T1','T2','T3','T4','T5','T6','T7','T8']"
               :show-labels="false"
               showGrid
               :value="[{
        name: 'Data 1',
        color: 'primary',
        points: dataPool[0]
      },
      {
        name: 'Data 2',
        color: 'warning',
        points: dataPool[1]
      },
      {
        name: 'Data 3',
        color: 'error',
        points: dataPool[2]
      },
      {
        name: 'Data 4',
        color: '#A37EFF',
        points: [
            {
              value: 0,
              column: 'T3'
            },
            {
              value: 8,
              column: 'T4'
            },
            {
              value: 0,
              column: 'T8'
            },
        ]
      }]"/>


      <d-card-content>
        <d-card-subtitle>
          Checkbox
        </d-card-subtitle>
        <d-card-content flex wrap column>
          <d-checkbox :size="24" color="primary" tint="20" v-model="$vuelize.theme.hmmm" off-icon="times">
            Dummy
          </d-checkbox>
          <d-checkbox :size="24" on-icon="moonset" off-icon="sunset" v-model="$vuelize.theme.dark">
            Dark mode
          </d-checkbox>
          <d-checkbox :size="24" color="success" :value="true">
            True
          </d-checkbox>
          <d-checkbox :size="24" color="info" :value="false" off-icon="times">
            False
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
          <d-card-subtitle class="pl-0 py-0" color="primary">depressed and outlined | outlined | glowing | camo
          </d-card-subtitle>
        </d-card-subtitle>
        <d-card-content flex wrap>
          <d-btn color="success" outlined depressed @click="changeColor('success')">
            <d-icon name="check"/>
            Success
          </d-btn>
          <d-btn color="error" outlined :depressed="false" @click="changeColor('error')">
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
          <d-btn color="primary" glow block
                 @click="()=>{changeColor('primary'); this.$notify('Yup...', `That's full width...`, 'info')}">
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

      <d-card-content flex wrap root-tag="form">
        <d-text-field color="primary" tint="40" solo outlined placeholder="Amount..."
                      type="number"
                      v-model="text">
          <template v-slot:prefix>
            <d-icon size="14" name="euro"/>
          </template>
          <template v-slot:suffix>
            <d-icon name="plus" v-ripple class="rounded-circle"
                    @click="$notify('Amount added', text, 'success')"/>
          </template>
        </d-text-field>
        <d-text-field color="primary" filled label="E-mail" type="email" v-model="text"/>
        <d-text-field color="primary" solo outlined label="Password" type="password" v-model="text"/>
        <d-text-field color="primary" outlined depressed label="Text with placeholder" type="text" v-model="text"
                      placeholder="This is a placeholder"/>

        <d-text-field color="primary" filled label="Default Select" v-model="selectedIcon" select
                      :items="['Cube', 'Anchor', 'Layers Alt']"/>

        <d-text-field placeholder="test" color="primary" full-width outlined label="Icon Select Autocomplete"
                      text="name" v-model="selectedIcons" autocomplete
                      :items="iconItems">
          <template v-slot:label="{ item, index }">
            <d-label class="px-1 py-0" :color="item.color">
              <d-icon :name="item.icon" :icon-style="item.iconStyle"/>
              {{ item.name }}
              <d-icon-button size="24" color="inherit" rounded="circle" @click="()=>selectedIcons.splice(index,1)">
                <d-icon name="times"/>
              </d-icon-button>
            </d-label>
          </template>
          <template slot="item" slot-scope="{item}">
            <d-icon :name="item.icon" :icon-style="item.iconStyle"/>
            {{ item.name }}
          </template>
        </d-text-field>

        <d-text-field color="primary" filled label="Icon Select" v-model="selectedIcon" select
                      :items="iconItems">
          <template slot="item" slot-scope="{item}">
            <d-card-subtitle class="pa-0" :color="item.color">
              <d-icon :name="item.icon" :icon-style="item.iconStyle"/>
              {{ item.name }}
            </d-card-subtitle>
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
      </d-card-content>

      <d-card-content flex wrap class="pt-2">
        <d-card-title class="font-size-medium" outlined depressed elevation="2" rounded="lg">
          <d-icon :size="34" color="primary" name="text"/>
          {{ text }}
        </d-card-title>
        <d-card-title class="font-size-medium" outlined depressed elevation="2" rounded="lg">
          <d-icon :size="34" color="primary" name="list-ol"/>
          <d-icon :size="34" :name="iconItems[selectedIcon].icon" :icon-style="iconItems[selectedIcon].iconStyle"/>
        </d-card-title>
        <d-card-title class="font-size-medium" outlined depressed elevation="2" rounded="lg">
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
        <d-btn color="primary" glow @click="()=>openSelectMenu=!openSelectMenu" size="large">
          <template slot="default">
            <d-icon :name="iconItems[selectedIcon].icon" :icon-style="iconItems[selectedIcon].iconStyle"
                    color="primary"/>
            {{ iconItems[selectedIcon].name }}
          </template>
          <template slot="misc">
            <d-select-menu :open.sync="openSelectMenu" v-model="selectedIcon" :items="iconItems">
              <template slot="item" slot-scope="{item}">
                <d-card-title class="font-size-small" color="inherit">
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
        <d-icon name="comment-alt" color="primary" :size="30"/>
        Dialogs!
      </d-card-title>
      <d-card-content>
        <d-btn filled color="primary" @click="()=>openDialog=true">
          Open Dialog
        </d-btn>
        <d-dialog v-model="openDialog" :persistent="persistentDialog">
          <d-card width="400px">
            <d-card-title>
              YesNo Dialog
            </d-card-title>
            <d-card-subtitle>
              <d-checkbox v-model="persistentDialog" size="24" off-icon="lock-open-alt" on-icon="lock-alt">
                Persistent
              </d-checkbox>
            </d-card-subtitle>
            <d-divider class="mx-3"/>
            <d-column gap>
              <d-column block>
                <d-row>
                  <d-column>
                    <d-card-title class="font-size-large font-weight-bold" style="text-transform: uppercase"
                                  :color="yesNo.answer === 'yes' ? 'success' : 'error'">
                      {{ yesNo.answer }}
                    </d-card-title>
                    <d-card-subtitle>
                      Answer
                    </d-card-subtitle>
                  </d-column>
                  <d-spacer/>
                  <d-icon-button @click="()=>yesNoApi()">
                    <d-icon name="sync"/>
                  </d-icon-button>
                </d-row>
                <d-image height="300px" :src="yesNo.image"/>
              </d-column>
              <d-spacer/>
              <d-row class="pa-1" elevation="1">
                <d-spacer/>
                <d-btn color="primary" glow @click="()=>openDialog=false">
                  Close
                </d-btn>
              </d-row>
            </d-column>
          </d-card>
        </d-dialog>
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
        <d-icon name="percentage" color="primary" :size="30"/>
        Progressbar!
      </d-card-title>
      <d-card-content flex column wrap>
        <d-column>
          <d-row>
            <d-card-subtitle class="pl-0">
              With Label
            </d-card-subtitle>
          </d-row>
          <d-row>
            <d-progressbar :value="progressValue%100" style="min-width: 300px; width: 100%">
              Download @ {{ progressValue % 100 }}%
            </d-progressbar>
          </d-row>
        </d-column>
        <d-column>
          <d-row>
            <d-card-subtitle class="pl-0">
              Without Label
            </d-card-subtitle>
          </d-row>
          <d-row>
            <d-progressbar hide-label :value="progressValue%100" style="min-width: 300px; width: 100%"/>
          </d-row>
        </d-column>
      </d-card-content>
    </d-card>

    <div class="my-4"/>

    <d-card elevation block>
      <d-card-title>
        <d-icon name="chat" color="primary" :size="30"/>
        Toooool Tips!
      </d-card-title>
      <d-card-content>
        <d-tooltip position="bottom" color="primary" filled>
          <d-btn filled color="primary">
            Hover me!
          </d-btn>
          <template slot="tooltip">
            <d-icon name="smile-beam"/>
            Hello this is a Tooooooooool Tip
          </template>
        </d-tooltip>
      </d-card-content>
    </d-card>

    <div class="my-4"/>

    <d-card elevation block>
      <d-card-title>
        <d-icon name="label" color="primary" :size="30"/>
        Labels!
      </d-card-title>
      <d-card-content>
        <d-row gap>
          <d-label ripple>
            Label 1
          </d-label>
          <d-label ripple color="primary">
            Label 1
          </d-label>
          <d-label ripple filled color="primary">
            Label 1
          </d-label>
        </d-row>
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
        <d-avatar rounded="lg" elevation color="transparent" :size="50" src="https://picsum.photos/500/850"></d-avatar>
      </d-card-content>
    </d-card>

    <div class="my-4"/>

    <d-card elevation rounded="lg" block>
      <d-card-title>
        <d-icon name="expand-from-corner" color="primary" :size="30"/>
        Accordion!
      </d-card-title>

      <d-card-content flex wrap column>
        <d-accordion v-model="openAccordion" :key="0" header-color="primary" elevation="2">
          <template slot="header">
            <d-icon name="nerd"/>
            Hey you...
          </template>
          <template slot="content">
            Good day
            <d-icon name="smile"/>
          </template>
        </d-accordion>
        <d-accordion v-model="openAccordion" :key="1" header-color="primary" elevation="2" outlined depressed>
          <template slot="header">
            <d-icon name="nerd"/>
            Nice
          </template>
          <template slot="content">
            Day
            <d-icon name="smile"/>
          </template>
        </d-accordion>
      </d-card-content>
    </d-card>

    <div class="my-4"/>

    <d-card elevation rounded="lg" block>
      <d-card-title>
        <d-icon name="browser" color="primary" :size="30"/>
        Tabs!
      </d-card-title>

      <d-card-content flex wrap column>
        <d-tab-list color="primary" filled elevation-dark="1" v-model="tabs">
          <d-tab-item :key="0">
            <d-column style="align-items: center;">
              <d-icon name="user"/>
              SCP-096
            </d-column>
          </d-tab-item>
          <d-tab-item :key="1">
            <d-column style="align-items: center;">
              <d-icon name="user"/>
              SCP-173
            </d-column>
          </d-tab-item>
          <d-tab-item :key="2" disabled>
            <d-column style="align-items: center;">
              <d-icon name="user"/>
              REDACTED
            </d-column>
          </d-tab-item>
          <d-tab-item :key="3">
            <d-column style="align-items: center;">
              <d-icon name="user"/>
              SCP-049
            </d-column>
          </d-tab-item>
        </d-tab-list>

        <collapse-transition>
          <d-card-content v-if="tabs === 0" :key="0">
            <d-card-subtitle elevation="2" class="pa-4 pt-0" style="display: block">
              <d-card-subtitle class="pa-0">
                <d-avatar
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fart.ngfiles.com%2Fcomments%2F95000%2Fiu_95222_7850304.jpg&f=1&nofb=1"/>
                <d-card-title color="primary" class="font-weight-light font-size-large">SCP-096</d-card-title>
              </d-card-subtitle>
              SCP-096 is a humanoid creature that is normally extremely docile. However, when someone views SCP-096's
              face
              it will enter a stage of considerable emotional distress. SCP-096 will cover its face with its hands and
              begin screaming, crying, and babbling incoherently briefly before chasing down the person who viewed its
              face.

              SCP-096 will not stop until it reaches the person's location, after which it will proceed to kill them.
              Afterward, it will regain its composure and become docile once again.
            </d-card-subtitle>
          </d-card-content>
          <d-card-content v-if="tabs === 1" :key="1">
            <d-card-subtitle elevation="2" class="pa-4 pt-0" style="display: block">
              <d-card-subtitle class="pa-0">
                <d-avatar
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJwX7kQMQ0UaBN4hfG40RmJrFbBnEgcUvQmjEgNyZA%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1"/>
                <d-card-title color="primary" class="font-weight-light font-size-large">SCP-173</d-card-title>
              </d-card-subtitle>
              SCP-173 is a sculpture constructed out of concrete. It is capable of moving at high speeds and will kill
              by
              either snapping at the base of the skull or strangulation.

              SCP-173 however, is incapable of moving when in direct line of sight of a person.
            </d-card-subtitle>
          </d-card-content>
          <d-card-content v-if="tabs === 3" :key="3">
            <d-card-subtitle elevation="2" class="pa-4 pt-0" style="display: block">
              <d-card-subtitle class="pa-0">
                <d-avatar
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJwoSlJk198vIZt4kIE9PR6pKa1pXUy9V4zIkA%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1"/>
                <d-card-title color="primary" class="font-weight-light font-size-large">SCP-049</d-card-title>
              </d-card-subtitle>
              SCP-049 is a humanoid entity which bears the appearance of a medieval plague doctor. While SCP-049 appears
              to be wearing the thick robes and the ceramic mask indicative of that profession, the garments instead
              seem
              to have grown out of SCP-049's body over time, and are now nearly indistinguishable from whatever form is
              beneath them.

              SCP-049 is capable of causing all biological functions of an organism to cease through direct skin
              contact.
              SCP-049 has expressed frustration or remorse after these killings, indicating that they have done little
              to
              kill "The Pestilence", though will usually seek to then perform a crude surgery on the corpse using the
              implements contained within a black doctor's bag it carries on its person at all times. While these
              surgeries are not always successful, they often result in the creation of instances of SCP-049-2.
            </d-card-subtitle>
          </d-card-content>
        </collapse-transition>
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
          <d-list class="rounded-lg elevation-2" color="primary" v-model="listItem">
            <d-list-item v-for="i in 6" :key="i-1" glow filled-glow="primary">
              <d-icon class="mr-1" :name="`${i-1}-plus`"/>
              Item {{ i - 1 }}
            </d-list-item>
          </d-list>
        </d-card-content>

        <d-card-content style="flex: 1">
          <d-card-title>
            outlined
          </d-card-title>
          <d-list class="rounded-lg elevation-2" color="primary" v-model="listItem">
            <d-list-item v-for="i in 6" :key="i-1" :outlined="listItem === i-1">
              <d-icon class="mr-1" :name="`${i-1}-plus`"/>
              Item {{ i - 1 }}
            </d-list-item>
          </d-list>
        </d-card-content>

        <d-card-content style="flex: 1" elevation="1">
          <d-card-title>
            <d-icon name="sad-crying" color="primary" :size="34"/>
            & outlined
          </d-card-title>
          <d-list class="rounded-lg elevation-2" color="primary" v-model="listItem">
            <d-list-item v-for="i in 6" :key="i-1" :outlined="listItem === i-1" depressed>
              <d-icon class="mr-1" :name="`${i-1}-plus`"/>
              Item {{ i - 1 }}
            </d-list-item>
          </d-list>
        </d-card-content>
      </d-card-content>
    </d-card>

    <div class="my-4"/>

    <d-card elevation rounded="lg" block max-width="800px">
      <d-card-title>
        <d-icon name="flask" color="primary" :size="30"/>
        Test Design
      </d-card-title>
      <d-card-content flex column wrap>
        <d-card-subtitle class="pb-0">
          Recent Projects
        </d-card-subtitle>
        <d-column block>
          <d-row align="initial">
            <d-column>
              <d-card v-for="i in 3" :key="i" min-width="340px" glow filled-glow="primary" v-ripple rounded="xl">
                <d-row>
                  <d-column>
                    <d-avatar src="https://picsum.photos/400/400" size="85" rounded="xl"/>
                  </d-column>
                  <d-column block>
                    <d-card-title class="font-size-medium pt-0">
                      Project {{ i }}
                      <d-spacer/>
                      <d-icon-button size="30">
                        <d-icon name="angle-right"/>
                      </d-icon-button>
                    </d-card-title>
                    <d-card-subtitle>
                      Mega-project
                    </d-card-subtitle>
                    <d-label style="margin-top: -4px" class="ml-2" color="primary" tint="20">
                      {{ Math.round(Math.random() * i * (Math.random() * i * 4)) * 4 }}h
                    </d-label>
                  </d-column>
                </d-row>
              </d-card>
            </d-column>
            <d-column block outlined depressed>
              <d-spacer/>
              <d-row justify="center">
                <d-btn elevation-dark="n1" height="50px" width="140px" rounded="xl" color="primary" glow>
                  <d-icon name="file-plus-alt"/>
                  Add
                </d-btn>
              </d-row>
            </d-column>
          </d-row>
          <d-card-subtitle class="pb-0">Sorting</d-card-subtitle>
          <d-tab-list color="primary" rounded="xl" filled v-model="listItem" outlined>
            <d-tab-item :key="0" rounded="xl">
              <d-column class="pa-0" style="align-items: center;">
                <d-icon name="sort-amount-up"/>
                Sort asc
              </d-column>
            </d-tab-item>
            <d-tab-item :key="1" rounded="xl">
              <d-column class="pa-0" style="align-items: center;">
                <d-icon name="sort-amount-down"/>
                Sort desc
              </d-column>
            </d-tab-item>
            <d-tab-item :key="2" rounded="xl">
              <d-column class="pa-0" style="align-items: center;">
                <d-icon name="filter"/>
                Filter
              </d-column>
            </d-tab-item>
            <d-tab-item :key="3" rounded="xl">
              <d-column class="pa-0" style="align-items: center;">
                <d-icon name="scroll"/>
                Scroll
              </d-column>
            </d-tab-item>
          </d-tab-list>
        </d-column>
      </d-card-content>
    </d-card>
  </div>
</template>

<script>

export default {
  name: 'DemoView',
  data: () => ({

    dataPool: [[], [], []],

    listItem: 0,

    text: '',
    selectedIcon: 0,
    selectedIcons: [0, 2],
    mappedIcons: [],
    iconItems: [
      {icon: 'cube', name: 'Cube', iconStyle: 'line', color: 'primary'},
      {icon: 'anchor', name: 'Anchor', iconStyle: 'line', color: 'warning'},
      {icon: 'layers-alt', name: 'Layers Alt', iconStyle: 'monochrome', color: 'error'},
    ],
    selectedUser: 0,
    userItems: [
      {
        profilePic: 'https://picsum.photos/100/100',
        name: 'Daniel Terletzkiy'
      }, {profilePic: 'https://picsum.photos/200/200', name: 'Random Guy'}
    ],
    date: undefined,

    openSelectMenu: false,

    openDialog: false,
    persistentDialog: false,
    yesNo: {},

    progressValue: 0,

    openAccordion: 0,

    tabs: 0,
  }),

  watch: {
    openDialog(state) {
      if (state) {
        this.yesNoApi()
      }
    }
  },

  mounted() {
    this.$notify('Hello there', 'General Kenobi', 'success')

    /*setInterval(() => {
      this.progressValue += 15
    }, 1000)*/

    for (let i = 0; i < 4; i++) {
      this.dataPool[0].push(Math.random() * 30)
      this.dataPool[1].push(Math.random() * 62)
      this.dataPool[2].push(Math.random() * 15)

      this.dataPool[0].push(Math.random() * 544)
      this.dataPool[1].push(Math.random() * 454)
      this.dataPool[2].push(Math.random() * 344)

      this.dataPool[0].push(Math.random() * 432)
      this.dataPool[1].push(Math.random() * 303)
      this.dataPool[2].push(Math.random() * 301)

      this.dataPool[0].push(Math.random() * 200)
      this.dataPool[1].push(Math.random() * 200)
      this.dataPool[2].push(Math.random() * 200)
    }
  },

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
    },
    yesNoApi: async function () {
      fetch("https://yesno.wtf/api")
          .then(function (response) {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            this.yesNo = data
          })
          .catch(function (error) {
            console.error(error);
          });
    }
  }
}
</script>
