export enum RoundedFactor {
    Small = "sm",
    Medium = "md",
    Large = "lg",
    XLarge = "xl",
    Full = "full",
    None = "none",
}

export function useRounded(factor: RoundedFactor = RoundedFactor.Large) {
    switch (factor) {
        case RoundedFactor.Small: {
            return "rounded-sm";
        }
        case RoundedFactor.Medium: {
            return "rounded-md";
        }
        case RoundedFactor.Large: {
            return "rounded-lg";
        }
        case RoundedFactor.XLarge: {
            return "rounded-xl";
        }
        case RoundedFactor.Full: {
            return "rounded-full";
        }
        case RoundedFactor.None: {
            return "rounded-none";
        }
    }
}
