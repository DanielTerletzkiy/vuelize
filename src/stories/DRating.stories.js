import DRating from "../components/rating/DRating.vue";
import DButton from "../components/button/DButton.vue";

export default {
    title: 'DRating',
    component: DRating,
};

const Template = (args) => ({
    components: {DRating, DButton},
    setup() {
        return {args};
    },
    template: '<d-rating v-bind="args"/>',
});

export const Primary = Template.bind({});
Primary.args = {
    label: 'Primary',
    color: 'primary',
    filled: true
};
