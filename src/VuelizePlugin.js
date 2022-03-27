import { createPinia } from "pinia";
import { ThemeStore } from './store/ThemeStore';
import { NotificationStore } from './store/NotificationStore';
// @ts-ignore no ripple types available
import VWave from "v-wave";
// @ts-ignore
import Unicon from 'vue-unicons';
// @ts-ignore
import * as uc from 'vue-unicons/dist/icons.js';
import importAll from "./ComponentImport";
class Vuelize {
    app;
    theme;
    notification;
    constructor(app) {
        this.app = app;
        this.theme = ThemeStore();
        this.notification = NotificationStore();
    }
    store() {
        return {
            theme: this.theme,
            notification: this.notification
        };
    }
    getColor(color, tint) {
        let colorOut;
        if (this.theme.dark) {
            // @ts-ignore TODO
            colorOut = this.theme.themes.dark[color];
        }
        else {
            // @ts-ignore TODO
            colorOut = this.theme.themes.light[color];
        }
        if (!colorOut) {
            colorOut = color;
        }
        if (tint && ['currentColor', 'transparent'].indexOf(colorOut) === -1) {
            try {
                colorOut = this.#tintColor(colorOut, parseInt(tint));
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
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        // Check contrast
        return (yiq >= 160) ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.85)';
    }
    #tintColor = function adjust(color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16))
            .substr(-2));
    };
}
function addUnicons(app) {
    const objArray = [];
    Object.keys(uc).forEach(key => objArray.push(uc[key]));
    Unicon.add(objArray);
    // @ts-ignore
    app.use(Unicon);
}
export const VuelizePlugin = {
    install(app, options) {
        app.use(createPinia());
        app.use(VWave, {
            directive: 'ripple',
            duration: 0.2,
            finalOpacity: 0.2
        });
        addUnicons(app);
        app.config.globalProperties.$vuelize = new Vuelize(app);
        app.provide('vuelize', app.config.globalProperties.$vuelize);
        importAll(app);
    }
};
//# sourceMappingURL=VuelizePlugin.js.map