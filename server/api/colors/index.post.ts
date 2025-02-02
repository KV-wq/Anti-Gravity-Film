import { writeFileSync } from "fs";
import { resolve } from "path";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const path = resolve("./server/data/colors.json");

    writeFileSync(
      path,
      JSON.stringify({ colors: body.colors, title: body.title }, null, 2)
    );

    return { success: true };
  } catch (error) {
    console.error("Error saving colors:", error); // Логируем ошибки
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
});
