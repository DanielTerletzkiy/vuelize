import DImage from "../components/image/DImage.vue";

export default {
    title: 'DImage',
    component: DImage,
    argTypes: {
        src: {control: 'text', defaultValue: ''},
    },
};

const Template = (args) => ({
    components: {DImage},
    setup() {
        return {args};
    },
    template: '<d-image v-bind="args" s/>',
});

export const Default = Template.bind({});
Default.args = {

};
