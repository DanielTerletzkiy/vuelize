import DRadioGroup from "../components/radio/DRadioGroup.vue";
import DRadioItem from "../components/radio/DRadioItem.vue";
import {ref} from "vue";

export default {
    title: 'DRadio',
    components: [DRadioGroup, DRadioItem],
    argTypes: {
        label: {control: 'text'},
        color: {control: 'color'},
        filled: {control: 'boolean'},
        outlined: {control: 'boolean'},
        glow: {control: 'boolean'},
    },
};

const Template = (args) => ({
    components: {DRadioGroup, DRadioItem},
    setup() {
        const value = ref(1);
        return {args, value};
    },
    template: '<d-radio-group v-bind="args" v-model="value"><d-radio-item v-for="i in 10" :key="i">Item {{i}}</d-radio-item></d-radio-group>',
});

export const Primary = Template.bind({});
Primary.args = {
};
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
