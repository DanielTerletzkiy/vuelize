import {PositionHorizontal, PositionVertical, State} from "./Vuelize";
import {ThemeAllPropertyType} from "./Theme";

export type Notification = {
    key: number,
    title: string,
    content: string,
    type: State,
    position: NotificationPosition,
    options?: Partial<NotificationOptions>,
    created: Date,
    active: boolean,
    persistent: boolean
}

export type NotificationPosition = {
    vertical: PositionVertical,
    horizontal: PositionHorizontal
}

export type NotificationOptions = {
    color: ThemeAllPropertyType,
    icon: string,
    timeout: number,
}

