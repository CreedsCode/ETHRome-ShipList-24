export interface IAccessibilitySettings {
    colorScheme?: 'light' | 'dark',
    scale?: number
}

export const DEFAULT_ACCESSIBILITY_SETTINGS: IAccessibilitySettings = {
    colorScheme: 'dark',
    scale: 14,
};
