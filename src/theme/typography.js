import { createTheme } from "@mui/material/styles";
import { Poppins, Merriweather } from "next/font/google";
import { breakpoints as bpVals } from "./breakpoints";

const poppins = Poppins({ weight: ["400", "500", "600", "700"], style: ["normal"], subsets: ["latin"] });
const merriweather = Merriweather({ weight: ["300"], style: ["normal"], subsets: ["latin"] });

const bp = createTheme({ breakpoints: bpVals }).breakpoints;

export const makeTypography = () => ({
  fontFamily: poppins.style.fontFamily,

  h1: {
    fontFamily: poppins.style.fontFamily,
    fontWeight: 700,
    marginBottom: "1.2rem",
    [bp.down("sm")]: { fontSize: "2rem", lineHeight: 1.2 },
    [bp.up("sm")]: { fontSize: "3.25rem", lineHeight: 1.15 },
  },

  h2: {
    fontFamily: poppins.style.fontFamily,
    fontWeight: 700,
    marginBottom: "1.1rem",
    [bp.down("sm")]: { fontSize: "1.75rem" },
    [bp.up("sm")]: { fontSize: "2.5rem" },
  },

  h3: {
    fontFamily: poppins.style.fontFamily,
    fontWeight: 600,
    marginBottom: "1rem",
    [bp.down("sm")]: { fontSize: "1.25rem" },
    [bp.up("sm")]: { fontSize: "2rem" },
  },

  h4: {
    fontFamily: poppins.style.fontFamily,
    fontWeight: 600,
    fontSize: "1.5rem",
    marginBottom: "0.9rem",
  },

  h5: {
    fontFamily: poppins.style.fontFamily,
    fontWeight: 600,
    fontSize: "1.25rem",
    marginBottom: "0.8rem",
  },

  h6: {
    fontFamily: poppins.style.fontFamily,
    fontWeight: 600,
    fontSize: "1.125rem",
    marginBottom: "0.7rem",
  },

  subtitle1: {
    fontFamily: poppins.style.fontFamily,
    fontWeight: 600,
    marginBottom: "0.75rem",
  },

  subtitle2: {
    fontFamily: poppins.style.fontFamily,
    fontWeight: 600,
    fontSize: "0.9rem",
    marginBottom: "0.6rem",
  },

  body1: {
    fontFamily: merriweather.style.fontFamily,
    fontSize: "1rem",
    lineHeight: 1.7,
    marginBottom: "1rem",
  },

  body2: {
    fontFamily: poppins.style.fontFamily,
    fontSize: "0.92rem",
    lineHeight: 1.6,
    marginBottom: "0.8rem",
  },

  button: {
    textTransform: "none",
    fontWeight: 700,
    letterSpacing: ".3px",
  },

  overline: {
    textTransform: "uppercase",
    letterSpacing: ".08em",
    fontWeight: 700,
  },
});
