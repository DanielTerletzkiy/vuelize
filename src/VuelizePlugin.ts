import {ref} from 'vue';
import type {Plugin, App} from "vue";
import type {Ref} from "vue";
import {createPinia} from "pinia";
import {useVuelizeTheme} from './store/ThemeStore'
import importAll from "./ComponentImport";
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

    getColor(color: string, tint?: number | string | undefined): string {
        let colorOut: string = "unset";

        return colorOut;
    }

    getColorContrast(color: string, tint?: number | string | undefined): string {
        /*try {
            let hexColor = this.getColor(color, tint);
            if (hexColor.slice(0, 1) === '#') {
                hexColor = hexColor.slice(1);
            }
            if (hexColor.length === 3) {
                hexColor = hexColor.split('').map(function (hex: string) {
                    return hex + hex;
                }).join('');
            }
            // Convert to RGB value
            const r = parseInt(hexColor.substr(0, 2), 16);
            const g = parseInt(hexColor.substr(2, 2), 16);
            const b = parseInt(hexColor.substr(4, 2), 16);
            // Get YIQ ratio
            let yiq = (r * 0.299) + (g * 0.587) + (b * 0.114);
            // Check contrast
            return (yiq > 160) ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.85)';
        } catch (e) {
            return this.getColor('error')
        }*/
        return "red"
    }
}

export const Vuelize: Plugin = {
    install(app: App, themesOptions: Partial<Themes> ) {
        ClickOutside(app);
        app.use(createPinia());
        app.use(VWave, {
            directive: 'ripple',
            duration: 0.2,
            finalOpacity: 0.2
        });

        const plugin =  new VuelizePlugin(app);

        plugin.theme.themes = (merge(plugin.theme.themes,themesOptions));

        app.config.globalProperties.$vuelize = plugin;
        app.provide('vuelize', app.config.globalProperties.$vuelize);

        importAll(app);
    }
}
