import DButton from "../components/button/DButton.vue";

export default {
    title: 'DButton',
    component: DButton,
    argTypes: {
        label: {control: 'text'},
    },
};

const Template = (args) => ({
    components: {DButton},
    setup() {
        return {args};
    },
    template: '<d-button v-bind="args">{{args.label}}</d-button>',
});

export const Primary = Template.bind({});
Primary.args = {
    label: 'Primary',
    color: 'primary',
    filled: true
};

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
    label: 'Glow',
    glow: true
};
