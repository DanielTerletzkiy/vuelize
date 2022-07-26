import DProgressbar from "../components/progress/DProgressbar.vue";
import {ref} from "vue";

export default {
    title: 'DProgressbar',
    components: [DProgressbar],
    argTypes: {
        value: {control: 'number', defaultValue: 20},
        label: {control: 'boolean'},
        color: {control: 'color', defaultValue: '#f1cdcd'},
        filled: {control: 'boolean'},
        outlined: {control: 'boolean'},
        glow: {control: 'boolean'},
    },
};

const Template = (args) => ({
    components: {DProgressbar},
    setup() {
        const value = ref(1);
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

