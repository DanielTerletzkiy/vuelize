import {Color} from "../Theme";

export type SwitchState = {
    color: Color,
    icon: string,
    value: string | number | boolean
    tooltip?: string
}
