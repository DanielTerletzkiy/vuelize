export enum ColorSurface {
    Background = "bg",
    Text = "text",
}

type ColorResult = {
    [ColorSurface.Background]: string
    [ColorSurface.Text]: string
}

export enum GeneralColor {
    Primary = 'primary',
    Secondary = 'secondary',
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
    Info = 'info',
}

export function useGeneralColor(color: GeneralColor, surface?: ColorSurface) {

    let result: ColorResult = {
        [ColorSurface.Background]: "",
        [ColorSurface.Text]: "",
    };

    switch (color) {
        case GeneralColor.Primary: {
            result = {
                [ColorSurface.Background]: "bg-primary",
                [ColorSurface.Text]: "text-primary",
            };
            break;
        }
        case GeneralColor.Secondary: {
            result = {
                [ColorSurface.Background]: "bg-secondary",
                [ColorSurface.Text]: "text-secondary",
            };
            break;
        }
        case GeneralColor.Success: {
            result = {
                [ColorSurface.Background]: "bg-success",
                [ColorSurface.Text]: "text-success",
            };
            break;
        }
        case GeneralColor.Warning: {
            result = {
                [ColorSurface.Background]: "bg-warning",
                [ColorSurface.Text]: "text-warning",
            };
            break;
        }
        case GeneralColor.Error: {
            result = {
                [ColorSurface.Background]: "bg-error",
                [ColorSurface.Text]: "text-error",
            };
            break;
        }
        case GeneralColor.Info: {
            result = {
                [ColorSurface.Background]: "bg-info",
                [ColorSurface.Text]: "text-info",
            };
            break;
        }
    }

    return surface ? result[surface] : result;
}

export function useColorOpacity(amount: number, surface?: ColorSurface) {
    let result: ColorResult = {
        [ColorSurface.Background]: "",
        [ColorSurface.Text]: "",
    };

    switch (amount) {
        case 0: {
            result = {
                [ColorSurface.Background]: "bg-opacity-0",
                [ColorSurface.Text]: "text-opacity-0",
            };
            break;
        }
        case 1: {
            result = {
                [ColorSurface.Background]: "bg-opacity-10",
                [ColorSurface.Text]: "text-opacity-10",
            };
            break;
        }
        case 2: {
            result = {
                [ColorSurface.Background]: "bg-opacity-20",
                [ColorSurface.Text]: "text-opacity-20",
            };
            break;
        }
        case 3: {
            result = {
                [ColorSurface.Background]: "bg-opacity-30",
                [ColorSurface.Text]: "text-opacity-30",
            };
            break;
        }
        case 4: {
            result = {
                [ColorSurface.Background]: "bg-opacity-40",
                [ColorSurface.Text]: "text-opacity-40",
            };
            break;
        }
        case 5: {
            result = {
                [ColorSurface.Background]: "bg-opacity-50",
                [ColorSurface.Text]: "text-opacity-50",
            };
            break;
        }
        case 6: {
            result = {
                [ColorSurface.Background]: "bg-opacity-60",
                [ColorSurface.Text]: "text-opacity-60",
            };
            break;
        }
        case 7: {
            result = {
                [ColorSurface.Background]: "bg-opacity-70",
                [ColorSurface.Text]: "text-opacity-70",
            };
            break;
        }
        case 8: {
            result = {
                [ColorSurface.Background]: "bg-opacity-80",
                [ColorSurface.Text]: "text-opacity-80",
            };
            break;
        }
        case 9: {
            result = {
                [ColorSurface.Background]: "bg-opacity-90",
                [ColorSurface.Text]: "text-opacity-90",
            };
            break;
        }
        case 10: {
            result = {
                [ColorSurface.Background]: "bg-opacity-100",
                [ColorSurface.Text]: "text-opacity-100",
            };
            break;
        }
    }

    return surface ? result[surface] : result;
}
