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

export enum CardElevation {
    DEFAULT = 0,
    E100 = 100,
    E200 = 200,
    E300 = 300,
    E400 = 400,
    E500 = 500,
    E600 = 600,
    E700 = 700,
    E800 = 800,
    E900 = 900,
    N100 = "n100",
    N200 = "n200",
    N300 = "n300",
}

export function useCardElevation(elevation: CardElevation = CardElevation.DEFAULT) {
    switch (elevation){
        case CardElevation.DEFAULT:
            return "bg-card-default"
        case CardElevation.E100:
            return "bg-card-100"
        case CardElevation.E200:
            return "bg-card-200"
        case CardElevation.E300:
            return "bg-card-300"
        case CardElevation.E400:
            return "bg-card-400"
        case CardElevation.E500:
            return "bg-card-500"
        case CardElevation.E600:
            return "bg-card-600"
        case CardElevation.E700:
            return "bg-card-700"
        case CardElevation.E800:
            return "bg-card-800"
        case CardElevation.E900:
            return "bg-card-900"
        case CardElevation.N100:
            return "bg-card-n100"
        case CardElevation.N200:
            return "bg-card-n200"
        case CardElevation.N300:
            return "bg-card-n300"

    }
}
