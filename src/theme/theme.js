import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { breakpoints } from "./breakpoints";
import { lightPalette, darkPalette } from "./palette";
import { makeTypography } from "./typography";

const toVars = (t) => ({
  "--color-primary": t.palette.primary.main,
  "--color-primary-dark": t.palette.primary.dark,
  "--color-primary-light": t.palette.primary.light,
  "--color-secondary": t.palette.secondary.main,
  "--color-text": t.palette.text.primary,
  "--color-text-secondary": t.palette.text.secondary,
  "--color-bg": t.palette.background.default,
  "--color-paper": t.palette.background.paper,
  "--radius-sm": "8px",
  "--radius-md": "12px",
  "--radius-lg": "16px",
  "--space-1": `${t.spacing(1)}`,
  "--space-2": `${t.spacing(2)}`,
  "--space-3": `${t.spacing(3)}`,
  "--space-4": `${t.spacing(4)}`,
});

const make = (mode) => {
  let theme = createTheme({
    breakpoints,
    palette: mode === "dark" ? darkPalette : lightPalette,
    shape: { borderRadius: 12 },
    typography: makeTypography(),
    components: {
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          ':root, [data-theme="light"]': toVars(createTheme({ ...theme, palette: lightPalette })),
          '[data-theme="dark"]': toVars(createTheme({ ...theme, palette: darkPalette })),
        }),
      },
      MuiContainer: { defaultProps: { maxWidth: "lg" } },
      MuiButton: { styleOverrides: { root: { borderRadius: 12, paddingInline: 18, paddingBlock: 10 } } },
      MuiAppBar: { styleOverrides: { colorPrimary: { boxShadow: "none" } } },
    },
  });
  theme = responsiveFontSizes(theme, { factor: 2.2 });
  return theme;
};

export const lightTheme = make("light");
export const darkTheme = make("dark");
