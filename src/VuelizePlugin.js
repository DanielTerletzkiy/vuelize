import { createPinia } from "pinia";
import { ThemeStore } from './store/ThemeStore';
import { NotificationStore } from './store/NotificationStore';
import importAll from "./ComponentImport";
// @ts-ignore no ripple types available
import VWave from "v-wave";
// @ts-ignore
import Unicon from 'vue3-unicons';
import 'v3-transitions/dist/style.css';
class VuelizePlugin {
    app;
    theme;
    notification;
    constructor(app) {
        this.app = app;
        this.theme = ThemeStore();
        this.notification = NotificationStore();
    }
    notify(title, content, type, options) {
        this.notification.notifications.push({ title, content, type, options, active: true });
    }
    getColor(color, tint) {
        let colorOut;
        if (this.theme.dark) {
            colorOut = this.theme.themes.dark[color];
        }
        else {
            colorOut = this.theme.themes.light[color];
        }
        if (!colorOut) {
            colorOut = color;
        }
        if (tint && ['currentColor', 'transparent'].indexOf(colorOut) === -1) {
            try {
                if (typeof tint === "string") {
                    tint = parseInt(tint);
                }
                colorOut = this.#tintColor(colorOut, tint);
            }
            catch (e) {
                console.warn(e);
            }
        }
        return colorOut;
    }
    getColorContrast(color, tint) {
        let hexColor = this.getColor(color, tint);
        if (hexColor.slice(0, 1) === '#') {
            hexColor = hexColor.slice(1);
        }
        if (hexColor.length === 3) {
            hexColor = hexColor.split('').map(function (hex) {
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
    }
    #tintColor = function adjust(color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16))
            .substr(-2));
    };
}
/*function addUnicons(app: App) {
    const objArray: any = [];
    Object.keys(uc).forEach(key => objArray.push(
        uc[key]
    ));
    Unicon.add(objArray)
    // @ts-ignore
    app.use(Unicon)
}*/
export const Vuelize = {
    install(app) {
        app.use(createPinia());
        app.use(VWave, {
            directive: 'ripple',
            duration: 0.2,
            finalOpacity: 0.2
        });
        app.use(Unicon);
        //addUnicons(app);
        app.config.globalProperties.$vuelize = new VuelizePlugin(app);
        app.provide('vuelize', app.config.globalProperties.$vuelize);
        importAll(app);
    }
};
//# sourceMappingURL=VuelizePlugin.js.map