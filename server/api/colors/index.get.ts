import { readFileSync } from "fs";
import { resolve } from "path";

export default defineEventHandler(() => {
  const path = resolve("./public/data/colors.json");
  const data = readFileSync(path, "utf-8");
  return JSON.parse(data);
});
