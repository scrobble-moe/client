import type { Config } from "tailwindcss";

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
        textOne: "#433e39",
        textTwo: "#968878",
      },
    },
  },
} satisfies Config;
