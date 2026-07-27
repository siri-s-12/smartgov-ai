// PLACEHOLDER THEME
// This theme is a reasonable default so every screen is fully styled and usable
// right now. Swap these tokens once real screenshots are provided — every
// screen reads colors/spacing/radii from here, so restyling the whole app
// should mostly mean editing this one file.

export const colors = {
  background: "#EAF6F6",
  backgroundGradientEnd: "#CFE8EA",
  surface: "#FFFFFF",
  glassCard: "rgba(255,255,255,0.7)",
  glassBorder: "rgba(255,255,255,0.6)",

  primary: "#4A8B96",
  primaryPressed: "#3B7480",
  primaryLight: "#DCEFF1",

  textHeading: "#1A2B2E",
  textBody: "#2C3E42",
  textMuted: "#6B7E82",
  textOnPrimary: "#FFFFFF",

  success: "#3E9B6F",
  warning: "#D99B2B",
  danger: "#F4511E",
  dangerLight: "#FDE7E1",

  border: "#DCE9EA",
  disabled: "#B9C7C9",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 12,
  md: 20,
  lg: 24,
  pill: 999,
} as const;

export const typography = {
  h1: { fontSize: 28, fontWeight: "700" as const, color: colors.textHeading },
  h2: { fontSize: 22, fontWeight: "700" as const, color: colors.textHeading },
  h3: { fontSize: 18, fontWeight: "600" as const, color: colors.textHeading },
  body: { fontSize: 16, fontWeight: "400" as const, color: colors.textBody },
  bodyMedium: { fontSize: 16, fontWeight: "600" as const, color: colors.textBody },
  caption: { fontSize: 13, fontWeight: "400" as const, color: colors.textMuted },
  button: { fontSize: 16, fontWeight: "700" as const, color: colors.textOnPrimary },
};

export const shadow = {
  card: {
    shadowColor: "#1A2B2E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
};
