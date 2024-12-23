import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const spacing = Object.fromEntries(
  Object.entries(defaultTheme.spacing).map(([key, value]) => {
    if (typeof value === "string" && value.endsWith("rem")) {
      const pxValue = parseFloat(value) * 4
      return [key, `${pxValue}px`]
    }
    return [key, value]
  }),
)

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      spacing: { ...spacing },

      colors: {
        primary: {
          DEFAULT: "var(--primary1-color)",
          2: "var(--primary2-color)",
          3: "var(--primary3-color)",
          4: "var(--primary4-color)",
          5: "var(--primary5-color)",
        },

        gray: {
          40: "var(--gray-40-color)",
          50: "var(--gray-50-color)",
          60: "var(--gray-60-color)",
          65: "var(--gray-65-color)",
          70: "var(--gray-70-color)",
          80: "var(--gray-80-color)",
          90: "var(--gray-90-color)",
        },

        bg: {
          DEFAULT: "var(--background1-color)",
          2: "var(--background2-color)",
          3: "var(--background3-color)",
          4: "var(--background4-color)",
        },
      },

      keyframes: {
        "translate-fade-in": {
          "0%": { opacity: "0", transform: "translateY(-5%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "translate-fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-5%)" },
        },

        "dynamic-bounce-y": {
          "0%, 100%": { transform: "translateY(var(--bounce-distance, 0))" },
          "50%": { transform: "translateY(calc(var(--bounce-distance, 0) * -1.5))" },
        },
      },
      animation: {
        "fade-in": "translate-fade-in 200ms ease-in-out",
        "fade-out": "translate-fade-out 200ms ease-in-out",

        "dynamic-bounce-y": "dynamic-bounce-y 300s ease-in-out",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: ({ theme }) => theme("spacing"),

      fontSize: {
        h1: ["3.0rem", { fontWeight: 700, lineHeight: "100%" }],
        h2: ["2.4rem", { fontWeight: 700, lineHeight: "100%" }],
        h3: ["2.2rem", { fontWeight: 700, lineHeight: "100%" }],
        h4: ["2.0rem", { fontWeight: 700, lineHeight: "100%" }],

        body1: ["1.8rem", { fontWeight: 600, lineHeight: "140%" }],
        body2: ["1.8rem", { fontWeight: 700, lineHeight: "140%" }],
        body3: ["1.6rem", { fontWeight: 600, lineHeight: "140%" }],
        body4: ["1.6rem", { fontWeight: 400, lineHeight: "100%" }],
        body5: ["1.5rem", { fontWeight: 400, lineHeight: "160%" }],
        body6: ["1.4rem", { fontWeight: 400, lineHeight: "100%" }],
        body7: ["1.4rem", { fontWeight: 600, lineHeight: "100%" }],
        body8: ["1.4rem", { fontWeight: 700, lineHeight: "100%" }],
        body9: ["1.4rem", { fontWeight: 700, lineHeight: "140%" }],

        element1: ["1.3rem", { fontWeight: 600, lineHeight: "100%" }],
        element2: ["1.2rem", { fontWeight: 500, lineHeight: "100%" }],
        element3: ["1.0rem", { fontWeight: 600, lineHeight: "100%" }],
        element4: ["1.1rem", { fontWeight: 500, lineHeight: "100%" }],

        /** mobile */
        mH1: ["3.2rem", { fontWeight: 700, lineHeight: "100%" }],
        mH2: ["2.2rem", { fontWeight: 700, lineHeight: "100%" }],
        mH3: ["2.2rem", { fontWeight: 700, lineHeight: "100%" }],
        mH4: ["1.8rem", { fontWeight: 700, lineHeight: "156%" }],

        mBody1: ["1.6rem", { fontWeight: 400, lineHeight: "162%" }],
        mBody2: ["1.6rem", { fontWeight: 600, lineHeight: "140%" }],
        mBody3: ["1.5rem", { fontWeight: 400, lineHeight: "160%" }],
        mBody4: ["1.4rem", { fontWeight: 500, lineHeight: "140%" }],
        mBody5: ["1.4rem", { fontWeight: 600, lineHeight: "100%" }],

        mElement1: ["1.3rem", { fontWeight: 400, lineHeight: "100%" }],
        mElement2: ["1.3rem", { fontWeight: 700, lineHeight: "100%" }],
        mElement3: ["1.2rem", { fontWeight: 500, lineHeight: "100%" }],
        mElement4: ["1.1rem", { fontWeight: 500, lineHeight: "100%" }],
        mElement5: ["0.9rem", { fontWeight: 500, lineHeight: "100%" }],
      },
    },
  },
  // plugins: [
  //   plugin(({ addUtilities }: PluginAPI) => {
  //     addUtilities({ ...typography })
  //   }),
  // ],
} satisfies Config

export default config
