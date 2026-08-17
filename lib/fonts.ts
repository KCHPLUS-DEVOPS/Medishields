import localFont from "next/font/local";
import { Fraunces } from "next/font/google";

export const cabinetGrotesk = localFont({
  src: "../public/fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-cabinet",
  display: "swap",
  weight: "300 900",
});

export const generalSans = localFont({
  src: [
    {
      path: "../public/fonts/GeneralSans-Variable.woff2",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-VariableItalic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-general",
  display: "swap",
  weight: "300 700",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["italic"],
  weight: ["400", "500"],
  display: "swap",
});
