/**
 * Design tokens that match the original mobile app
 * Source: artifacts/nurul-diet/constants/colors.ts
 */

export const colors = {
  light: {
    text: "#4A1230",
    tint: "#C43670",

    background: "#FFF7FB",
    foreground: "#4A1230",

    card: "#FFFFFF",
    cardForeground: "#4A1230",

    primary: "#C43670",
    primaryForeground: "#FFFFFF",

    secondary: "#FBD9E5",
    secondaryForeground: "#C43670",

    muted: "#FCE9F0",
    mutedForeground: "#8B5A6B",

    accent: "#F283AF",
    accentForeground: "#FFFFFF",

    success: "#C43670",
    successSoft: "#FBD9E5",

    info: "#7BA7CC",
    infoSoft: "#E1ECF6",

    warning: "#E8588A",
    warningSoft: "#FBD9E5",

    destructive: "#8B1538",
    destructiveSoft: "#F5D7E2",
    destructiveForeground: "#FFFFFF",

    border: "#F5D7E2",
    input: "#F5D7E2",

    gradientStart: "#C43670",
    gradientMid: "#F283AF",
    gradientEnd: "#FBD9E5",
  },
  radius: 18,
};

export const fonts = {
  regular: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  medium: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  bold: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  xxl: 28,
};

export type Colors = typeof colors.light;
export type ThemeColors = Colors;