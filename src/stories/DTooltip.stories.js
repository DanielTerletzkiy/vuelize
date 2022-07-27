import DTooltip from "../components/tooltip/DTooltip.vue";
import DCard from "../components/card/DCard.vue";
import DButton from "../components/button/DButton.vue";

export default {
    title: 'DTooltip',
    component: DTooltip,
    argTypes: {
    },
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
        return {args, positions};
    },
    template: `
      <d-tooltip v-bind="args" v-for="position in positions" :position="position">
      <d-button filled color="primary">
        hello i is btn {{ position }}
      </d-button>
      <template v-slot:tooltip>
        toooooooltip
      </template>
      </d-tooltip>
    `,
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
