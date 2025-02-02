import { readFileSync } from "fs";
import { resolve } from "path";

export default defineEventHandler(() => {
  const path = resolve("./server/data/contacts.json");
  const data = readFileSync(path, "utf-8");
  return JSON.parse(data);
});
