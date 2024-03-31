import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      laptop: { max: "1280px" },
      mobile: { max: "640px" }, // TODO: 추후 수정
    },
    extend: {
      spacing: () => ({
        ...Array.from({ length: 1000 }, (_, index) => index * 0.5)
          .filter((i) => i)
          .reduce((acc, i) => {
            // console.log(acc)
            return { ...acc, [i]: `${i / 10}rem` }
          }, {}),
      }),

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
        body2: ["1.8rem", { fontWeight: 700, lineHeight: "140%" }], // weight 기준으로 default 설정
        body3: ["1.6rem", { fontWeight: 600, lineHeight: "140%" }], // weight 기준으로 default 설정
        body4: ["1.6rem", { fontWeight: 700, lineHeight: "140%" }],
        body5: ["1.5rem", { fontWeight: 400, lineHeight: "160%" }],
        body6: ["1.4rem", { fontWeight: 400, lineHeight: "158%" }],
        body7: ["1.4rem", { fontWeight: 600, lineHeight: "158%" }],
        body8: ["1.4rem", { fontWeight: 700, lineHeight: "100%" }],
        body9: ["1.4rem", { fontWeight: 700, lineHeight: "140%" }],

        element1: ["1.3rem", { fontWeight: 600, lineHeight: "100%" }],
        element2: ["1.2rem", { fontWeight: 600, lineHeight: "100%" }],
        element3: ["1.0rem", { fontWeight: 700, lineHeight: "100%" }],
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
