import {Color} from "../Theme";

export type ToggleState = {
    color: Color,
    icon: string,
    value: string | number | boolean
    tooltip?: string
    hidden?: boolean
}
