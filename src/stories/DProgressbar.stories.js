import DProgressbar from "../components/progress/DProgressbar.vue";
import {ref} from "vue";

export default {
    title: 'DProgressbar',
    components: [DProgressbar],
    argTypes: {
        value: {control: 'number', defaultValue: 20},
    },
};

const Template = (args) => ({
    components: {DProgressbar},
    setup() {
        return {args};
    },
    template: '<d-progressbar v-bind="args" :show-label="args.label" v-model="args.value"><template v-slot:progress="{progress}">{{progress}} apples</template></d-progressbar>',
});

export const NoLabel = Template.bind({});
NoLabel.args = {
    label: false
};

export const Label = Template.bind({});
Label.args = {
    label: true,
};

