import type {App, Plugin} from "vue";
import {createPinia} from "pinia";
import {useVuelizeTheme} from './stores'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore no ripple types available
import VWave from "v-wave";

import '@morev/vue-transitions/styles';
import ClickOutside from "./directives/ClickOutside";
import {Themes} from "./types";
import {merge} from "lodash";
import {importAll} from "./ComponentImport";


export const Vuelize: Plugin = {
    install(app: App, themesOptions: Partial<Themes>) {
        ClickOutside(app);
        app.use(createPinia());
        app.use(VWave, {
            directive: 'ripple',
            duration: 0.2,
            finalOpacity: 0.2
        });

        const vuelizeTheme= useVuelizeTheme();
        vuelizeTheme.themes = (merge(vuelizeTheme.themes, themesOptions));

        return importAll(app);
    }
}

