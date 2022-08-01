import DAccordion from "../components/accordion/DAccordion.vue";
import DButton from "../components/button/DButton.vue";

export default {
    title: 'DAccordion',
    component: DAccordion,
};

const Template = (args) => ({
    components: {DAccordion, DButton},
    setup() {
        return {args};
    },
    template: '<d-accordion v-bind="args" disabled show-arrow><template v-slot:header><d-button>hello</d-button></template>open</d-accordion>',
});

export const Primary = Template.bind({});
Primary.args = {
    label: 'Primary',
    color: 'primary',
    filled: true
};
