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
      <d-textfield v-bind="args" select search v-model="modelValue" :items="[{value: 'test'}, {value: 'mogus'}, {value: 'foo'}, {value: 'tebar'}]" mandatory>
      <template v-slot:item="{item}">
        <d-tooltip>
            item: {{ item.value }}
          <template v-slot:tooltip>
            {{item.value}}
          </template>
        </d-tooltip>
      </template>
      <template v-slot:label="{item}">
        selected: {{ item.value }}
      </template>
      </d-textfield>`,
});

export const Primary = Template.bind({});
Primary.args = {
    label: 'Primary',
    color: 'primary',
    filled: true
};
