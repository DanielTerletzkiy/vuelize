import {App} from "vue";

export default interface Vuelize {
    app: App;
    theme: Theme.ThemeStore;
    notification: Notifications.NotificationStore;

    notify(title: string, content: string, type: State, options?: object | undefined);

    getColor(color: string, tint?: number | string | undefined): string;

    getColorContrast(color: string, tint?: number | string | undefined): string;
}

export enum State {
    Success = "success",
    Error = "error",
    Warning = "warning",
    Info = "info"
}

export namespace Notifications {
    export interface NotificationStore {
        notifications: Notification[],
    }

    export interface Notification {
        title: string,
        content: string,
        type: string,
        options?: object,
        active: boolean,
        created: Date
    }
}

export namespace Theme {
    export interface ThemeStore {
        dark: boolean
        rounded: string
        themes: Themes
    }

    export interface Themes {
        dark: Dark
        light: Light
    }

    export interface Dark {
        primary: string
        secondary: string
        success: string
        error: string
        warning: string
        info: string
    }

    export interface Light {
        primary: string
        secondary: string
        success: string
        error: string
        warning: string
        info: string
    }
}
