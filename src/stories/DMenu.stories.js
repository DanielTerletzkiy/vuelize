import DSelectMenu from "../components/menu/DSelectMenu.vue";
import DCard from "../components/card/DCard.vue";
import DButton from "../components/button/DButton.vue";
import {ref} from "vue";

export default {
    title: 'DSelectMenu',
    component: DSelectMenu,
    argTypes: {},
};

const Template = (args) => ({
    components: {DSelectMenu, DCard, DButton},
    setup() {
        const open1 = ref(false)
        const open2 = ref(false)
        const position = ref(2)
        const positions = ref([1, 3])
        const positionsArray = [
            'bottom',
            'top',
            'left',
            'right'
        ]
        return {args, positionsArray, positions, position, open1, open2};
    },
    template: `
      <d-card class="ma-20 pa-10" elevation>
      <d-row>
        <d-column gap v-for="val in [false, true]" :outlined="val">
          {{ positions }}
          <d-button @click="open1 = !open1">
            Multi Select
            <template v-slot:misc>
              <d-select-menu v-model="positions" :items="positionsArray" :open="open1" multiple :mandatory="val" v-bind="args"/>
            </template>
          </d-button>
          {{ position }}
          <d-button @click="open2 = !open2">
            Single Select
            <template v-slot:misc>
              <d-select-menu v-model="position" :items="positionsArray" :open="open2" :mandatory="val" v-bind="args"/>
            </template>
          </d-button>
        </d-column>
      </d-row>
      </d-card>`,
});

export const Primary = Template.bind({});
Primary.args = {};
/*
export const Secondary = Template.bind({});
Secondary.args = {
    label: 'Secondary',
};

export const Outlined = Template.bind({});
Outlined.args = {
    label: 'Outlined',
    outlined: true
};

export const Glow = Template.bind({});
Glow.args = {
    label: 'Outlined',
    glow: true
};*/
