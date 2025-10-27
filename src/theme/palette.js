const brand = {
  blueMain: "#103561",
  blueDark: "#012a59",
  blueLight: "#445a78",
  aqua: "#1690ca",
  aquaLight: "#86b2c9",
};

export const lightPalette = {
  mode: "light",
  primary: { main: brand.blueMain, dark: brand.blueDark, light: brand.blueLight, contrastText: "#ffffff" },
  secondary: { main: brand.aqua, dark: "#093f6d", light: brand.aquaLight, contrastText: "#ffffff" },
  background: { default: "#ffffff", paper: "#ffffff" },
  text: { primary: "#0e223f", secondary: "#445a78" },
};

export const darkPalette = {
  mode: "dark",
  primary: { main: brand.blueMain, dark: brand.blueDark, light: brand.blueLight, contrastText: "#ffffff" },
  secondary: { main: brand.aqua, dark: "#093f6d", light: brand.aquaLight, contrastText: "#ffffff" },
  background: { default: "#0f1115", paper: "#151821" },
  text: { primary: "#e7edf6", secondary: "#9fb0c5" },
};
