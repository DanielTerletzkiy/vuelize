import type {App, Ref} from "vue";
import Notification from "../components/notification/Notification";

export enum State {
    success = "success",
    error = "error",
    warning = "warning",
    info = "info"
}

export enum Rounded {
    circle = "circle",
    pill = "pill",
    xl = "xl",
    lg = "lg",
    md = "md",
    none = "none"
}

export enum Position {
    top = 'top',
    bottom = 'bottom',
    left = 'left',
    right = 'right'
}


declare global {
    interface Vuelize {
        app: App;
        notifications: Ref<Array<Ref<Notification>>>;

        notify(title: string, content: string, type: State, options?: object | undefined): void;
    }

    namespace Notifications {

        interface Options {
            color: string,
            icon: string,
            timeout: number
        }
    }
}
