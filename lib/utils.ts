import { createCn } from "cn/config"

/** Class merger that knows the custom type scale and elevation tokens from globals.css. */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["h1", "h1-m", "h1-compact", "display", "h2", "h3", "h4", "body", "legal"] },
      ],
      shadow: [{ shadow: ["card", "float"] }],
    },
  },
})
