import DTooltip from "../components/tooltip/DTooltip.vue";
import DCard from "../components/card/DCard.vue";
import DButton from "../components/button/DButton.vue";
import {ref} from "vue";

export default {
    title: 'DTooltip',
    component: DTooltip,
    argTypes: {},
};

const Template = (args) => ({
    components: {DTooltip, DCard, DButton},
    setup() {
        const positions = [
            'bottom',
            'top',
            'left',
            'right'
        ]
        const content = ref(10)

        function changeContent() {
            content.value = Math.random() * 50000
        }

        return {args, positions, content, changeContent};
    },
    template: `
      <d-card class="ma-20 pa-10" elevation>
      <d-column gap>
        <d-tooltip v-bind="args" v-for="position in positions" :position="position">
          <d-button filled color="primary" @click="changeContent">
            hello i is btn {{ position }}
          </d-button>
          <template v-slot:tooltip-wrapper>
            <d-card elevation="6">
              <d-card-title>
                {{ content }}
              </d-card-title>
              <d-button>
                hiii :)
              </d-button>
            </d-card>
          </template>
        </d-tooltip>
      </d-column>
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
