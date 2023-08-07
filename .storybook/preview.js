import DRoot from "../src/components/root/DRoot.vue";
import DCheckbox from "../src/components/checkbox/DCheckbox.vue";
import DDivider from "../src/components/divider/DDivider.vue";
import {app} from '@storybook/vue3';
import Vuelize from "@/entry.js";

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

export const argTypes = {
    class: {control: "text", defaultValue: ''},
    link: {control: "text", defaultValue: ''},
    color: {control: "color", defaultValue: 'primary'},
    tint: {control: "number", defaultValue: 0},
    rounded: {control: "text", defaultValue: 'lg'},
    outlined: {control: "boolean"},
    outlineOffset: {control: "text", defaultValue: "0px"},
    outlineWidth: {control: "text", defaultValue: "1px"},
    outlineColor: {control: "text", defaultValue: 'none'},
    depressed: {control: "boolean", defaultValue: true},
    elevation: {control: "text"},
    elevationLight: {control: "number"},
    elevationDark: {control:"number"},
    disabled: {control: "boolean"},
    glow: {control: "boolean"},
    glowing: {control: "boolean"},
    filledGlow: {control: "boolean"},
    height: {control: "text", defaultValue: ''},
    width: {control: "text", defaultValue: ''},
}

export const decorators = [(story) => {
    return {
        components: {
            story, DRoot, DCheckbox, DDivider
        },
        template: '<DRoot><DCheckbox class="pa-2" glow v-model="$vuelize.theme.dark" color="primary">Dark Mode</DCheckbox><DDivider class="mb-4"/><story /></DRoot>'
    }
}];
