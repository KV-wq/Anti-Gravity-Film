import { writeFileSync } from "fs";
import { resolve } from "path";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const path = resolve("./server/data/contacts.json");
  writeFileSync(path, JSON.stringify(body, null, 2));
  return { success: true };
});
