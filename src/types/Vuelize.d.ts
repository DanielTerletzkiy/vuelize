import {App} from "vue";

export enum State {
    Success = "success",
    Error = "error",
    Warning = "warning",
    Info = "info"
}

export enum Round {
    Circle = "circle",
    Pill = "pill",
    XL = "xl",
    LG = "lg",
    MD = "md",
    None = "none"
}

declare global {
    interface Vuelize {
        app: App;
        theme: Theme.ThemeStore;
        notification: Notifications.NotificationStore;

        notify(title: string, content: string, type: State, options?: object | undefined);

        getColor(color: string, tint?: number | string | undefined): string;

        getColorContrast(color: string, tint?: number | string | undefined): string;
    }

    namespace Notifications {
        interface NotificationStore {
            notifications: Notification[],
        }

        interface Notification {
            title: string,
            content: string,
            type: string,
            options?: object,
            active: boolean,
            created: Date
        }
    }

    namespace Theme {
        interface ThemeStore {
            dark: boolean
            rounded: string
            themes: Themes
        }

        interface Themes {
            dark: Dark
            light: Light
        }

        interface Dark {
            primary: string
            secondary: string
            success: string
            error: string
            warning: string
            info: string
        }

        interface Light {
            primary: string
            secondary: string
            success: string
            error: string
            warning: string
            info: string
        }
    }
}
