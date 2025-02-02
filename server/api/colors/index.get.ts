import { readFileSync } from "fs";
import { resolve } from "path";

export default defineEventHandler(async () => {
  const storage = useStorage();
  const data = await storage.getItem("data:colors.json");
  return data;
});
