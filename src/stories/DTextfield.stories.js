import DTextfield from "../components/textfield/DTextfield.vue";
import {ref} from "vue";

export default {
    title: 'DTextfield',
    component: DTextfield,
};

const Template = (args) => ({
    components: {DTextfield},
    setup() {
        const modelValue = ref(0)
        return {args, modelValue};
    },
    template: `
      <d-textfield v-bind="args" v-model="modelValue" :items="[1,2,3,4]" mandatory>
      <template v-slot:item="{item}">
        <d-tooltip>
            item: {{ item }}
          <template v-slot:tooltip>
            {{item}}
          </template>
        </d-tooltip>
      </template>
      <template v-slot:label="{item}">
        selected: {{ item }}
      </template>
      </d-textfield>`,
});

export const Primary = Template.bind({});
Primary.args = {
    label: 'Primary',
    color: 'primary',
    filled: true
};
