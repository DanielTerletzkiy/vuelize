import DRoot from "../src/components/root/DRoot.vue";
import DCheckbox from "../src/components/checkbox/DCheckbox.vue";
import {app} from '@storybook/vue3';
import Vuelize from "../src/index";

app.use(Vuelize);


export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}

export const decorators = [(story) => {
    return {
        components: {
            story, DRoot, DCheckbox
        },
        template: '<DRoot><DCheckbox class="mb-2" v-model="$vuelize.theme.dark" color="primary">Dark Mode</DCheckbox><story /></DRoot>'
    }
}];
