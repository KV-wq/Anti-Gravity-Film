import colorsData from "../../data/colors.json" assert { type: "json" };

export default defineEventHandler(() => {
  return colorsData;
});
