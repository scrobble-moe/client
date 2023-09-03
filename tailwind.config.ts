import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme.js";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        one: "#ebe5d9",
        two: "#f2efe8",
        three: "#fcfcfc",
        four: "#ffddae",
        five: "#f9efe6",
      },
    },
  },
} satisfies Config;
