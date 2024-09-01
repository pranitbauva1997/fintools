import {
  // Core functions
  generateTheme,
  cssConverter,

  // Helper functions
  //
  // - Colors
  getShades,
  shiftLCH,
  // - Typography
  typeScale,
  defaultTypeScale,
} from "@xypnox/themescura";

const base = {
  layout: {
    width: "1000px",
  },
  font: {
    family: '"Inter", sans-serif',
    heading: '"Source Serif 4", serif',
    mono: '"Fira Mono", monospace',
    scale: { ...defaultTypeScale, maxFontSize: 16 },
  },
};

const vars = {
  light: {
    primary: "oklch(50% 0.15 290)", //'oklch(55.5% 0.15 220)',
    background: "oklch(95.5% 0.02 290)",
    text: "oklch(25% 0.04 240)",
  },
  dark: {
    primary: "oklch(65% 0.15 290)",
    background: "oklch(10% 0.03 290)",
    text: "oklch(75% 0.04 240)",
  },
};

export type Base = typeof base;
export type Vars = typeof vars.light;

const shade = (
  color: string,
  lightness: number,
  md: "light" | "dark",
  len: number = 5,
) =>
  getShades(color, [len, len], {
    lightness: md === "light" ? lightness : -lightness,
  });

const overlay = (color: string, md: "light" | "dark") =>
  shiftLCH(color, { lightness: md === "light" ? 50 : -45, chroma: -0.1 });

const getUIColor = (color: string, md: "light" | "dark") => {
  return {
    b: color,
    s: shade(color, 6, md),
    o: overlay(color, md),
  };
};

const baseFn = (b: Base) => ({
  ...b,
  font: {
    ...b.font,
    size: typeScale(b.font.scale),
  },
});

const modeFn = (m: Vars, md: "light" | "dark") => ({
  ...m,

  primary: getUIColor(m.primary, md),
  secondary: getUIColor(shiftLCH(m.primary, { hue: 60 }), md),
  tertiary: getUIColor(shiftLCH(m.primary, { hue: -60 }), md),
  textS: getShades(m.text, [2, 2], { lightness: md === "light" ? -6 : 6 }),

  border: shiftLCH(m.primary, {
    lightness: md === "light" ? 30 : -40,
    chroma: -0.11,
  }),
  primaryLight: shiftLCH(m.primary, {
    lightness: md === "light" ? 10 : -10,
    chroma: -0.08,
  }),
  // Remove the first element
  surface: getShades(m.background, [0, 4], {
    lightness: md === "light" ? -2 : 4,
  }).slice(1),
});

const palette = { id: "xipProto", name: "xip Proto", base, vars };

// Theme is a type with return types of baseFn and modeFn
const theme = generateTheme(palette, baseFn, modeFn);

const cssVal = cssConverter(theme);

export { palette, theme, cssVal };
