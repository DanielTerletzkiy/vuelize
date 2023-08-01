import type {App, Plugin, Ref} from "vue";
import {ref} from 'vue';
import {createPinia} from "pinia";
import {useVuelizeTheme} from './store/ThemeStore'
import * as Components from "./ComponentImport";
import {State} from "./types/Vuelize";
import Notification from "./components/notification/Notification";

// @ts-ignore no ripple types available
import VWave from "v-wave";

import '@morev/vue-transitions/styles';
import ClickOutside from "./directive/ClickOutside";
import {Themes} from "./types/Theme";
import {merge} from "lodash";

class VuelizePlugin implements Vuelize {
    app;
    theme;
    notifications = ref<Array<Ref<Notification>>>([]);

    constructor(app: App) {
        this.app = app;
        this.theme = useVuelizeTheme();
        this.notifications.value;
    }

    notify(title: string, content: string, type: State, options: Notifications.Options) {
        this.notifications.value.push(ref<Notification>(new Notification(title, content, type, options)))
    }
}

export const Vuelize: Plugin = {
    install(app: App, themesOptions: Partial<Themes>) {
        ClickOutside(app);
        app.use(createPinia());
        app.use(VWave, {
            directive: 'ripple',
            duration: 0.2,
            finalOpacity: 0.2
        });

        const plugin = new VuelizePlugin(app);

        plugin.theme.themes = (merge(plugin.theme.themes, themesOptions));

        app.config.globalProperties.$vuelize = plugin;
        app.provide('vuelize', app.config.globalProperties.$vuelize);

        return importAll(app);
    }
}


function importAll(app: App) {
    const keys = Object.keys(Components);
    for (const key of keys) {
        // @ts-ignore
        const component = Components[key]
        const name = component.default.name;
        app.component(name, component.default)
    }
    return app;
}
