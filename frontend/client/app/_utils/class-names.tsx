import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "h1",
            "h2",
            "h3",
            "h4",
            "body1",
            "body2",
            "body3",
            "body4",
            "body5",
            "body6",
            "body7",
            "body8",
            "body9",
            "element1",
            "element2",
            "element3",
            "element4",
          ],
        },
      ],
      rounded: [
        {
          borderRadius: [
            ...Array.from({ length: 96 }, (_, index) => index * 0.5)
              .filter((i) => i)
              .map((i) => i.toString()),
          ],
        },
      ],
    },
  },
})

function classNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default classNames
