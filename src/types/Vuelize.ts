import type {App} from "vue";
import type {Ref} from "vue";
import Notification from "../components/notification/Notification";

export const enum State {
    Success = "success",
    Error = "error",
    Warning = "warning",
    Info = "info"
}

export const enum Round {
    Circle = "circle",
    Pill = "pill",
    XL = "xl",
    LG = "lg",
    MD = "md",
    None = "none"
}

export const enum Position {
    Top = 'top',
    Bottom = 'bottom',
    Left = 'left',
    Right = 'right'
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
