export const color = {
  titanWhite: "#F0F2FF",
  electricViolet: "#5800FF",
  white: "#FFFFFF",
  black: "#000000",
  mineShaft: "#3E3E3E",
  supernova: "#FFC700",
  alto: "#D9D9D9",
  line: "#06C655",
  twitter: "#1D9AF0",
  carnation: "#FF515B",
  aquamarine: "#50FFD4",
  springGreen: "#23FF95",
  linkWater: "#E0E9F5",
} as const;

export const basic = {
  primary: color.electricViolet,
  error: color.carnation,
  success: color.springGreen,
} as const;

export const background = {
  default: color.white,
  selected: color.electricViolet,
  loading: color.linkWater,
} as const;

export const text = {
  default: color.black,
  highLight: color.white,
} as const;

export const fontSize = {
  s1: "2.5rem",
  s2: "2rem",
  s3: "1.75rem",
  s4: "1.5rem",
  s5: "1.25rem",
  s6: "1rem",
  s7: ".875rem",
} as const;
